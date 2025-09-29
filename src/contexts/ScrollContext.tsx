import React, { createContext, useContext, useCallback, useRef, useMemo } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

interface ScrollContextType {
  scrollToBottom: () => void;
  setScrollRef: (ref: OverlayScrollbarsComponent | null) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<OverlayScrollbarsComponent | null>(null);

  const setScrollRef = useCallback((ref: OverlayScrollbarsComponent | null) => {
    scrollRef.current = ref;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const instance = scrollRef.current.osInstance();
      instance?.scroll({ y: '100%' }, 200);
    }
  }, []);

  const contextValue = useMemo(() => ({
    scrollToBottom,
    setScrollRef
  }), [scrollToBottom, setScrollRef]);

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
