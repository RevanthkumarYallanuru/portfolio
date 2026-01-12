import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export const ProjectScroll = ({ projects, speed = 40, pauseOnHover = true }: ProjectScrollProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let lastTimestamp = Date.now();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (!prefersReduced) {
        const currentSpeed = isHovered && pauseOnHover ? 0 : speed;
        offset += currentSpeed * deltaTime;

        // Get the width of one complete set of projects
        const trackWidth = track.scrollWidth / 2;
        
        // Loop the animation
        if (offset > trackWidth) {
          offset = 0;
        }

        track.style.transform = `translateX(-${offset}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered, pauseOnHover, speed]);

  return (
    <div
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* Fade gradient left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      
      {/* Fade gradient right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-6 w-max"
        style={{
          willChange: 'transform',
        }}
      >
        {/* Render projects twice for infinite scroll */}
        {[...Array(2)].map((_, setIndex) =>
          projects.map((project) => (
            <motion.div
              key={`${setIndex}-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-80"
              whileHover={{ y: -6 }}
            >
              <div className="glass rounded-2xl overflow-hidden group h-full flex flex-col hover:glow transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectScroll;
