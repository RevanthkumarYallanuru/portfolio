import { useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github: string;
  liveDemo: boolean;
  featured: boolean;
}

interface ProjectScrollProps {
  projects: Project[];
  speed?: number;
  pauseOnHover?: boolean;
}

export const ProjectScroll = ({ projects }: ProjectScrollProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();
  const cardWidth = 344; // w-80 (320px) + gap-6 (24px)
  const currentIndex = useMemo(() => Math.round(offset / cardWidth), [offset, cardWidth]);
  const maxOffset = useMemo(() => (projects.length - 1) * cardWidth, [projects.length, cardWidth]);

  // Debounced scroll handler for mobile performance
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current || isTransitioning) return;
    
    setIsTransitioning(true);
    let newOffset = offset;
    
    if (direction === 'right') {
      newOffset = offset >= maxOffset ? 0 : offset + cardWidth;
    } else {
      newOffset = offset <= 0 ? maxOffset : offset - cardWidth;
    }
    
    setOffset(newOffset);
    
    // Apply transform with GPU acceleration
    trackRef.current.style.transform = `translateX(-${newOffset}px)`;
    trackRef.current.style.transition = isMobile 
      ? 'transform 0.4s ease-out' 
      : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Reset transition flag after animation completes
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 500);
  }, [offset, maxOffset, cardWidth, isMobile, isTransitioning]);

  const goToProject = useCallback((index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newOffset = index * cardWidth;
    setOffset(newOffset);
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newOffset}px)`;
      trackRef.current.style.transition = isMobile 
        ? 'transform 0.4s ease-out' 
        : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 500);
  }, [cardWidth, isMobile, isTransitioning]);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Fade gradient left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-background to-transparent" />
      
      {/* Fade gradient right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-background to-transparent" />

      {/* Left Arrow - Mobile & Desktop */}
      <motion.button
        onClick={() => scroll('left')}
        disabled={isTransitioning}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full glass border border-primary/30 disabled:opacity-50 transition-colors"
        whileTap={!isMobile ? { scale: 0.95 } : {}}
        aria-label="Previous project"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-primary" />
      </motion.button>

      {/* Right Arrow - Mobile & Desktop */}
      <motion.button
        onClick={() => scroll('right')}
        disabled={isTransitioning}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full glass border border-primary/30 disabled:opacity-50 transition-colors"
        whileTap={!isMobile ? { scale: 0.95 } : {}}
        aria-label="Next project"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
      </motion.button>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-6 w-max"
        style={{
          willChange: 'transform',
          transform: `translateX(-${offset}px)`,
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        {/* Render projects single time - manual control */}
        {projects.map((project) => (
          <div
            key={`project-${project.id}`}
            className="flex-shrink-0 w-80"
          >
            <div className="glass rounded-2xl overflow-hidden h-full flex flex-col transition-shadow duration-300 hover:shadow-lg">
              {/* Project Image */}
              <div className="relative h-48 bg-muted overflow-hidden flex-shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover ${
                      !isMobile ? 'hover:scale-110 transition-transform duration-300' : ''
                    }`}
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 gradient-primary opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
                      {project.id}
                    </div>
                  </>
                )}
              </div>

              {/* Project Info */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2 line-clamp-1 transition-colors hover:text-primary">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-3 text-sm line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium glass rounded-full bg-opacity-30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium glass rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                {project.liveDemo && project.link ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="glass border-primary/30 w-full text-xs"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3" />
                      View Demo
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
              currentIndex === index
                ? 'bg-primary w-3 h-3 md:w-3.5 md:h-3.5'
                : 'bg-primary/30 w-2 h-2 md:w-2.5 md:h-2.5'
            }`}
            aria-label={`Go to project ${index + 1}`}
            aria-current={currentIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectScroll;
