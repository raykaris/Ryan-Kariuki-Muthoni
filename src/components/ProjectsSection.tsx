import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Smartphone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'app' | 'web';
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Watu Collection',
    description: 'A basic E-Commerce website with nice UI for better UX.',
    image: '/api/placeholder/600/400',
    technologies: ['Html', 'Css', 'JavaScript'],
    liveUrl: 'https://watu-collection.vercel.app/',
    githubUrl: 'https://github.com/raykaris/Watu-collection',
    category: 'web',
    featured: true
  },
  {
    id: '2',
    title: 'Pesa Track',
    description: 'Cross-platform Expense tracking application with clerk authentication. ',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Express JS', 'Upstash Redis', 'Neon', 'RESTful API'],
    liveUrl: '',
    githubUrl: 'https://github.com/raykaris/pesa-track',
    category: 'app',
    featured: true
  },
  {
    id: '3',
    title: 'Quantum E-Commerce',
    description: 'Next-generation shopping platform with quantum-inspired recommendations and immersive 3D product previews.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Three.js', 'Stripe', 'MongoDB', 'Redis'],
    liveUrl: 'https://quantum-shop.demo',
    githubUrl: 'https://github.com/ryan/quantum-shop',
    category: 'web'
  },
  {
    id: '4',
    title: '7-17 Gaming & Laundry',
    description: 'A Laundry and gaming service web-app.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'Shadcn-ui'],
    liveUrl: 'https://7-17-laundry-app.vercel.app/',
    githubUrl: 'https://github.com/raykaris/7-17-laundry-app',
    category: 'app'
  },
  {
    id: '5',
    title: 'Shelfie Inventory',
    description: 'Inventory management web-app.',
    image: '/api/placeholder/600/400',
    technologies: ['Vite', 'TypeScript', 'React', 'Shadcn-ui', 'Tailwind CSS'],
    liveUrl: 'https://hypercloud.demo',
    githubUrl: 'https://github.com/raykaris/shelfie-inventory-management-app',
    category: 'web'
  },
  {
    id: '6',
    title: 'NeoBank Mobile',
    description: 'Digital banking app with biometric security, cryptocurrency support, and AI-powered financial insights.',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Blockchain', 'Biometrics', 'GraphQL'],
    liveUrl: 'https://neobank.demo',
    githubUrl: 'https://github.com/ryan/neobank',
    category: 'app'
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  const categoryConfig = {
    web: { icon: Globe, color: 'cyber-primary', label: 'Web App' },
    app: { icon: Smartphone, color: 'cyber-secondary', label: 'Mobile App' }
  };
  
  const config = categoryConfig[project.category];
  const Icon = config.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      className={`cyber-card group ${project.featured ? "lg:col-span-2" : ""}`}
    >
      <div className="relative h-full flex flex-col">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-t-lg bg-background-elevated h-48">
          <div className="w-full h-full bg-gradient-cyber opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`w-16 h-16 text-${config.color} opacity-50`} />
          </div>

          {/* Category Badge */}
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold bg-${config.color}/20 border border-${config.color}/30 text-${config.color}`}
          >
            {config.label}
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold bg-cyber-accent/20 border border-cyber-accent/30 text-cyber-accent">
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-3 group-hover:text-cyber-primary transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-foreground-muted leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-background-elevated/50 text-foreground-muted border border-card-border"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group/btn border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group/btn border-card-border hover:border-cyber-secondary hover:text-cyber-secondary"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg pointer-events-none" />
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const webProjects = projects.filter(p => p.category === 'web');
  const appProjects = projects.filter(p => p.category === 'app');

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 scan-lines opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="text-cyber bg-gradient-cyber bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Innovative solutions that push the boundaries of technology, 
            crafted with precision and futuristic vision.
          </p>
        </motion.div>

        {/* Web Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-orbitron font-bold text-cyber-primary mb-8 flex items-center gap-3">
            <Globe className="w-6 h-6" />
            Web Applications
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {webProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Mobile Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-orbitron font-bold text-cyber-secondary mb-8 flex items-center gap-3">
            <Smartphone className="w-6 h-6" />
            Mobile Applications
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {appProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};