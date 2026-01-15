import { motion } from "framer-motion";
import "./Loader.css";

const Loader = () => {
  // Letter animation variants - clear bounce effect
  const letterVariants = {
    initial: { y: 0, opacity: 0, scale: 0.6 },
    animate: (custom: number) => ({
      y: [0, -40, 0],
      opacity: 1,
      scale: [0.6, 1.15, 1],
      transition: {
        delay: custom * 0.25,
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut" as const,
      },
    }),
  };

  // Glow variants - slower
  const glowVariants = {
    animate: {
      opacity: [0.15, 0.7, 0.15],
      scale: [0.7, 1.2, 0.7],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  // Container variants - slower
  const containerVariants = {
    animate: {
      scale: [1, 1.01, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="loader-container">
      {/* Background gradient - warm tones matching portfolio */}
      <div className="loader-bg-gradient" />

      {/* Animated circles background - behind everything */}
      <motion.div
        className="loader-circle loader-circle-1"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="loader-circle loader-circle-2"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main content */}
      <motion.div
        className="loader-content"
        variants={containerVariants}
        animate="animate"
      >
        {/* Glow effect */}
        <motion.div
          className="loader-glow"
          variants={glowVariants}
          animate="animate"
        />

        {/* YRK Text - LARGE AND IN FRONT */}
        <div className="loader-text-wrapper">
          <div className="loader-text">
            {["Y", "R", "K"].map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className="loader-letter"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Animated dots */}
        <div className="loader-dots">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="loader-dot"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                delay: dot * 0.2,
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
