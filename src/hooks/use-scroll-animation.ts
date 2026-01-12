import { useEffect, useRef } from 'react';

/**
 * Hook to detect if an element is in view and apply animations
 * @param options - IntersectionObserver options
 * @returns ref - ref to attach to the element
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return ref;
};
