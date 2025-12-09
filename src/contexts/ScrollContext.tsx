import React, { createContext, useContext, useCallback, useRef, useMemo, useEffect } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

interface ScrollContextType {
  scrollToBottom: () => void;
  setScrollRef: (ref: OverlayScrollbarsComponent | null) => void;
  resetAutoScroll: () => void;
  isAtBottom: () => boolean;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<OverlayScrollbarsComponent | null>(null);
  const userHasScrolledUp = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const programmaticScrollStartRef = useRef<number | null>(null);
  const lastScrollTopRef = useRef<number>(0);

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

        lastScrollTopRef.current = viewport.scrollTop;

        const handleScroll = () => {
          const { scrollTop, scrollHeight, clientHeight } = viewport;
          const isCurrentlyAtBottom = scrollHeight - scrollTop <= clientHeight + 2;

          if (programmaticScrollStartRef.current !== null) {
            if (scrollTop < programmaticScrollStartRef.current) {
              userHasScrolledUp.current = true;
              programmaticScrollStartRef.current = null;
              lastScrollTopRef.current = scrollTop;
            } else if (isCurrentlyAtBottom) {
              userHasScrolledUp.current = false;
              programmaticScrollStartRef.current = null;
            }
            return;
          }

          if (scrollTop < lastScrollTopRef.current) {
            userHasScrolledUp.current = true;
          }

          if (isCurrentlyAtBottom) {
            userHasScrolledUp.current = false;
          }

          lastScrollTopRef.current = scrollTop;
        };

        viewport.addEventListener("scroll", handleScroll);

        cleanupRef.current = () => {
          viewport.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, []);

  const isAtBottom = useCallback(() => {
    if (!scrollRef.current) return false;
    
    const instance = scrollRef.current.osInstance();
    if (!instance) return false;
    
    const viewport = instance.getElements().viewport;
    const { scrollTop, scrollHeight, clientHeight } = viewport;
    
    return scrollHeight - scrollTop <= clientHeight + 2;
  }, []);

  const resetAutoScroll = useCallback(() => {
    if (isAtBottom()) {
      userHasScrolledUp.current = false;
    }
  }, [isAtBottom]);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;

    const instance = scrollRef.current.osInstance();
    if (!instance) return;

    if (!userHasScrolledUp.current) {
      const viewport = instance.getElements().viewport;
      programmaticScrollStartRef.current = viewport.scrollTop;
      
      instance.scroll({ y: "100%" }, 200);
      
      setTimeout(() => {
        programmaticScrollStartRef.current = null;
        const finalViewport = instance.getElements().viewport;
        if (finalViewport) {
          lastScrollTopRef.current = finalViewport.scrollTop;
        }
      }, 250);
    }
  }, []);

  const contextValue = useMemo(() => ({
    scrollToBottom,
    setScrollRef,
    resetAutoScroll,
    isAtBottom,
  }), [scrollToBottom, setScrollRef, resetAutoScroll, isAtBottom]);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
