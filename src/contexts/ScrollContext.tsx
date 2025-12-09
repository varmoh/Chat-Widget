import React, { createContext, useContext, useCallback, useRef, useMemo, useEffect } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

interface ScrollContextType {
  scrollToBottom: () => void;
  setScrollRef: (ref: OverlayScrollbarsComponent | null) => void;
  resetAutoScroll: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<OverlayScrollbarsComponent | null>(null);
  const userHasScrolledUp = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const rafRef = useRef<number | null>(null);

  const setScrollRef = useCallback((ref: OverlayScrollbarsComponent | null) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    scrollRef.current = ref;

    if (ref) {
      const instance = ref.osInstance();

      if (instance) {
        const viewport = instance.getElements().viewport;

        let lastScrollTop = 0;

        const handleScroll = () => {
          const { scrollTop, scrollHeight, clientHeight } = viewport;

          if (scrollTop < lastScrollTop) {
            userHasScrolledUp.current = true;
          }

          if (scrollHeight - scrollTop <= clientHeight + 2) {
            userHasScrolledUp.current = false;
          }

          lastScrollTop = scrollTop;
        };

        viewport.addEventListener("scroll", handleScroll);

        cleanupRef.current = () => {
          viewport.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, []);

  const resetAutoScroll = useCallback(() => {
    userHasScrolledUp.current = false;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;

    const instance = scrollRef.current.osInstance();
    if (!instance) return;

    if (!userHasScrolledUp.current) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      rafRef.current = requestAnimationFrame(() => {
        instance.scroll({ y: "100%" }, 50);
        rafRef.current = null;
      });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      scrollToBottom,
      setScrollRef,
      resetAutoScroll,
    }),
    [scrollToBottom, setScrollRef, resetAutoScroll]
  );

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <ScrollContext.Provider value={contextValue}>{children}</ScrollContext.Provider>;
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
 
