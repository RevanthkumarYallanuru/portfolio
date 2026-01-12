import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const Services = () => {
  const { services } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Sort services: highlighted first, then by ID
  const sortedServices = [...services].sort((a, b) => {
    if (a.highlighted === b.highlighted) return a.id - b.id;
    return a.highlighted ? -1 : 1;
  });

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Comprehensive solutions to transform your digital vision into reality
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {sortedServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                className={`group ${service.highlighted ? "lg:col-span-1 md:col-span-2" : ""}`}
              >
                <div
                  className={`relative h-full glass rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden ${
                    service.highlighted
                      ? "ring-2 ring-primary/50 hover:ring-primary md:row-span-2 flex flex-col"
                      : ""
                  }`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${service.color}`}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      className={`text-5xl mb-4 w-fit p-4 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title & Tagline */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.4 + idx * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.color} p-0.5 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Highlight Badge */}
                    {service.highlighted && (
                      <motion.div
                        className="mt-8 pt-6 border-t border-border/30"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-sm font-semibold text-primary mb-3">
                          ⭐ Most Popular Service
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Combines all aspects of modern web development for maximum impact
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-20`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-muted-foreground mb-6">
              Ready to get started? Let's build something amazing together.
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
