import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import FluidGlass from "./FluidGlass";
import { useIsMobile } from "@/hooks/use-is-mobile";

const Hero = () => {
  const { personal } = portfolioData;
  const isMobile = useIsMobile();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* 3D Background - FluidGlass */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-background" />}>
          <FluidGlass />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm{" "}
              <span className="text-gradient animate-glow-pulse">
                {personal.name}
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {personal.role}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                asChild
                size="lg"
                className={`bg-primary text-primary-foreground glow transition-all ${
                  !isMobile ? 'hover:bg-primary/90' : ''
                }`}
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`glass border-primary/30 transition-all ${
                  !isMobile ? 'hover:border-primary' : ''
                }`}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = personal.resumeUrl;
                  link.download = 'Revanth_Kumar_Resume.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a
              href="#about"
              className={`inline-flex items-center text-primary animate-float transition-colors ${
                !isMobile ? 'hover:text-primary/80' : ''
              }`}
            >
              <ArrowDown className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
