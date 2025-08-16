import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isContactVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isContactVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+254746046246"; 
    const message = "Hi Ryan! I'd like to discuss a project with you.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={handleWhatsAppClick}
            className="relative group"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Main Button */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-green-400 transition-colors duration-300">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>

            {/* Pulsing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-400"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl group-hover:bg-green-400/40 transition-colors duration-300" />

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-background-card border border-card-border rounded-lg whitespace-nowrap pointer-events-none"
            >
              <span className="text-sm font-medium text-foreground">
                Chat on WhatsApp
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-[6px] border-l-card-border border-y-[6px] border-y-transparent" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};