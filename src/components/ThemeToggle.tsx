import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette, Moon, Sun, Zap, Sparkles } from 'lucide-react';

const themes = [
  { name: 'dark', icon: Moon, label: 'Dark', color: 'cyber-primary' },
  { name: 'light', icon: Sun, label: 'Light', color: 'cyber-secondary' },
  { name: 'cyberpunk', icon: Zap, label: 'Cyberpunk', color: 'cyber-pink' },
  { name: 'neon', icon: Sparkles, label: 'Neon', color: 'cyber-accent' },
] as const;

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-background-card/50 border-card-border hover:bg-background-elevated hover:border-cyber-primary transition-all duration-300"
      >
        <Palette className="h-4 w-4" />
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="absolute top-12 right-0 z-50 bg-background-card/95 backdrop-blur-sm border border-card-border rounded-lg p-2 min-w-[200px]"
        >
          <div className="grid gap-1">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.name;
              
              return (
                <Button
                  key={themeOption.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                  }}
                  className={`justify-start gap-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-cyber text-primary-foreground' 
                      : 'hover:bg-background-elevated'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{themeOption.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full bg-accent"
                    />
                  )}
                </Button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};