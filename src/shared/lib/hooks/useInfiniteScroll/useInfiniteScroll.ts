import { MutableRefObject, useEffect, useRef } from "react"

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export const useInfiniteScroll = ({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (callback) {
      let options = {
        root: wrapperRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      };


      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }

      }, options);

      observer.observe(triggerRef.current)
    }


    return () => {
      if (observer) {
        observer.unobserve(triggerRef.current)
      }
    }
  }, [callback, triggerRef, wrapperRef])
}