import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Database, Globe, Smartphone, Server, Palette } from 'lucide-react';

interface Skill {
  category: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const skillsData: Skill[] = [
  {
    category: 'Frontend',
    icon: Globe,
    skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    color: 'cyber-primary'
  },
  {
    category: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Python', 'Express', 'Django', 'GraphQL', 'REST APIs'],
    color: 'cyber-secondary'
  },
  {
    category: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Redis', 'MySQL'],
    color: 'cyber-accent'
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Flutter',  'Expo'],
    color: 'cyber-pink'
  },
  {
    category: 'DevOps',
    icon: Code2,
    skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Kubernetes'],
    color: 'cyber-orange'
  },
  {
    category: 'Design',
    icon: Palette,
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX', 'Prototyping', 'Blender'],
    color: 'cyber-primary'
  }
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const Icon = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      className="cyber-card p-6 h-full group"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-lg bg-${skill.color}/20 border border-${skill.color}/30`}>
            <Icon className={`w-6 h-6 text-${skill.color}`} />
          </div>
          <h3 className="text-xl font-orbitron font-bold text-foreground">
            {skill.category}
          </h3>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3">
            {skill.skills.map((skillName, skillIndex) => (
              <motion.div
                key={skillName}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.2 + skillIndex * 0.1 + 0.3 
                }}
                className="bg-background-elevated/50 rounded-md px-3 py-2 text-sm font-space text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all duration-300 cursor-default"
              >
                {skillName}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Level Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
          className={`h-1 bg-gradient-to-r from-${skill.color} to-${skill.color}/50 rounded-full mt-6`}
        />
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg pointer-events-none" />
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-background-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="text-cyber bg-gradient-cyber bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and frameworks, 
            constantly evolving with the latest industry standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.category} skill={skill} index={index} />
          ))}
        </div>

        {/* Additional Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <div className="hexagon pulse-glow" />
        </motion.div>
      </div>
    </section>
  );
};