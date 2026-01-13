import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-is-mobile";

const Experience = () => {
  const { experience } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Turning ideas into reality through quality development
          </p>

          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                whileHover={isMobile ? {} : { y: -8 }}
                className="group"
              >
                <div className={`glass rounded-2xl p-6 md:p-8 border border-border/50 transition-all duration-300 ${
                  !isMobile ? 'hover:border-primary/50 hover:shadow-xl hover:glow' : ''
                }`}>
                  {/* Top Section: Title, Type Badge, and Location */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                      </div>
                      <p className="text-lg font-semibold text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>
                    <Badge className={`w-fit px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/30 transition-colors ${
                      !isMobile ? 'hover:bg-primary/20' : ''
                    }`}>
                      {exp.type}
                    </Badge>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mb-5 text-sm text-muted-foreground pb-5 border-b border-border/30">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground mb-5 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                      {exp.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs px-3 py-1.5 bg-secondary/50 hover:bg-secondary transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
