import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export const useInfiniteScroll = ({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const wrapperEl = wrapperRef.current;
    const triggerEl = triggerRef.current;

    if (callback) {
      const options = {
        root: wrapperEl,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerEl);
    }

    return () => {
      if (observer && triggerEl) {
        observer.unobserve(triggerEl);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
