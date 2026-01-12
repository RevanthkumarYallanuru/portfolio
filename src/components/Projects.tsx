import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProjectScroll from "./ProjectScroll";

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

          <div className="max-w-7xl mx-auto">
            <ProjectScroll projects={projects} speed={40} pauseOnHover={true} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
