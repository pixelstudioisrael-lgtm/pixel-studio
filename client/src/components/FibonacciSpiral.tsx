import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663459270785/T2vXmtCoKPgG35XUxSP9Qu/pixel-studio-logo_2c49174d.webp";

interface FibonacciSpiralProps {
  onComplete?: () => void;
}

export function FibonacciSpiral({ onComplete }: FibonacciSpiralProps) {
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    // Trigger burst after spiral animation completes
    const timer = setTimeout(() => {
      setIsDrawn(true);
      onComplete?.();
    }, 2300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="w-64 h-64 mx-auto flex items-center justify-center relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Golden Fibonacci Spiral Background */}
      <svg
        viewBox="0 0 400 400"
        className="absolute w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))",
        }}
      >
        {/* Golden Fibonacci Spiral - Main path */}
        <motion.path
          d="M 200 200 Q 250 200 250 150 Q 250 100 200 100 Q 150 100 150 150 Q 150 200 200 200 Q 225 200 225 175 Q 225 150 200 150 Q 175 150 175 175 Q 175 200 200 200"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />

        {/* Outer spiral segments */}
        <motion.path
          d="M 200 200 Q 200 250 250 250 Q 300 250 300 200 Q 300 150 250 150"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          opacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        {/* Center point */}
        <motion.circle
          cx="200"
          cy="200"
          r="3"
          fill="#D4AF37"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />

        {/* Decorative circles */}
        <motion.circle
          cx="200"
          cy="200"
          r="50"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.4 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1.6 }}
        />
      </svg>

      {/* Studio Logo with entrance animation */}
      <motion.img
        src={LOGO}
        alt="Pixel Design Logo"
        className="relative z-10 w-32 h-32 object-contain"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
      />
    </motion.div>
  );
}

export function BurstParticles({ isActive }: { isActive: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * Math.PI * 2,
    distance: 150,
  }));

  return (
    <div className="relative w-64 h-64 mx-auto">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[#D4AF37]"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-4px",
            marginTop: "-4px",
          }}
          animate={
            isActive
              ? {
                  x: Math.cos(particle.angle) * particle.distance,
                  y: Math.sin(particle.angle) * particle.distance,
                  opacity: [1, 0],
                }
              : { x: 0, y: 0, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: isActive ? 0 : 0,
          }}
        />
      ))}
    </div>
  );
}
