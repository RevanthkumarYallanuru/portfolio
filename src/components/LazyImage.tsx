import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  imageClassName?: string;
  onLoad?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  imageClassName = "",
  onLoad,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse ${placeholderClassName}`}
        />
      )}

      {/* Lazy-loaded image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full h-full object-cover ${imageClassName} ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Fallback content when image isn't in view */}
      {!isInView && (
        <div
          className={`w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${placeholderClassName}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
