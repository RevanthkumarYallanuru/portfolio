import { useRef, useState } from 'react';
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
  const isMobile = useIsMobile();
  const cardWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
  const currentIndex = Math.round(offset / cardWidth);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    
    const scrollAmount = cardWidth;
    const maxOffset = (projects.length - 1) * cardWidth;
    let newOffset = offset;
    
    if (direction === 'right') {
      // Right arrow: move to next (increase offset)
      if (offset >= maxOffset) {
        newOffset = 0; // Loop back to first
      } else {
        newOffset = offset + scrollAmount;
      }
    } else {
      // Left arrow: move to previous (decrease offset)
      if (offset <= 0) {
        newOffset = maxOffset; // Loop back to last
      } else {
        newOffset = offset - scrollAmount;
      }
    }
    
    setOffset(newOffset);
    trackRef.current.style.transform = `translateX(-${newOffset}px)`;
    trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  };

  const goToProject = (index: number) => {
    if (!trackRef.current) return;
    const newOffset = index * cardWidth;
    setOffset(newOffset);
    trackRef.current.style.transform = `translateX(-${newOffset}px)`;
    trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Fade gradient left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-background to-transparent" />
      
      {/* Fade gradient right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-background to-transparent" />

      {/* Left Arrow - Mobile & Desktop */}
      <motion.button
        onClick={() => scroll('left')}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full glass border border-primary/50 hover:border-primary transition-all"
        whileHover={isMobile ? {} : { scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-primary" />
      </motion.button>

      {/* Right Arrow - Mobile & Desktop */}
      <motion.button
        onClick={() => scroll('right')}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full glass border border-primary/50 hover:border-primary transition-all"
        whileHover={isMobile ? {} : { scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
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
        }}
      >
        {/* Render projects single time - manual control */}
        {projects.map((project) => (
            <motion.div
              key={`project-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-80"
              whileHover={isMobile ? {} : { y: -6 }}
            >
              <div className="glass rounded-2xl overflow-hidden group h-full flex flex-col hover:glow transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isMobile ? '' : 'group-hover:scale-110'
                      }`}
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
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
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
                      className="glass border-primary/30 hover:border-primary w-full text-xs"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View Demo
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToProject(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? 'bg-primary w-3 h-3 md:w-3.5 md:h-3.5'
                : 'bg-primary/30 hover:bg-primary/50 w-2 h-2 md:w-2.5 md:h-2.5'
            }`}
            whileHover={isMobile ? {} : { scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectScroll;
