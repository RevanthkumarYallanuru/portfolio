import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import LazyImage from "./LazyImage";

const Projects = () => {
  const { projects } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          <div className="max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="h-full p-4">
                      <motion.div
                        className="glass border border-primary/20 rounded-lg overflow-hidden h-full flex flex-col hover:border-primary/40 transition-colors duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <LazyImage
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-white">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-4 flex-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-auto">
                            {project.liveDemo && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                asChild
                              >
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              asChild
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                GitHub
                              </a>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12" />
              <CarouselNext className="right-0 md:-right-12" />
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
