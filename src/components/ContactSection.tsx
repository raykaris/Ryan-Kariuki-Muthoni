import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/raykaris', color: 'cyber-primary' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/ryan_muthoni', color: 'cyber-secondary' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/_kirio_39', color: 'cyber-accent' },
  { icon: Mail, label: 'Email', url: 'mailto:ryanmuthoni050@gmail.com', color: 'cyber-pink' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'ryanmuthoni050@gmail.com', href: 'mailto:ryanmuthoni050@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+254 746 046 246', href: 'tel:+254746046246' },
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya', href: '#' },
];

export const ContactSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Form data to be sent:", formData);

    try {
      // Replace with your EmailJS Service ID, Template ID, and Public Key
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      console.log("EmailJS response:", Response);

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact"
      className="py-20 px-4 bg-background-secondary relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10 pointer-events-none" />
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
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? 
            Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="cyber-card p-8"
          >
            <h3 className="text-2xl font-orbitron font-bold text-foreground mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground-muted">Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="bg-background-elevated border-card-border focus:border-cyber-primary transition-colors cursor-text relative z-10"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground-muted">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background-elevated border-card-border focus:border-cyber-primary transition-colors cursor-text relative z-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground-muted">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                  className="bg-background-elevated border-card-border focus:border-cyber-primary transition-colors cursor-text relative z-10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground-muted">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  className="bg-background-elevated border-card-border focus:border-cyber-primary transition-colors resize-none cursor-text relative z-10"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cyber-button py-3 text-lg font-semibold cursor-pointer relative z-10 hover:shadow-cyber transform hover:scale-105 transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-orbitron font-bold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-elevated transition-colors duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-cyber-primary/20 border border-cyber-primary/30 group-hover:bg-cyber-primary/30 transition-colors">
                        <Icon className="w-5 h-5 text-cyber-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground-muted">{info.label}</p>
                        <p className="text-foreground font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-orbitron font-bold text-foreground mb-6">
                Connect With Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  const getColorClasses = (colorName: string) => {
                    switch(colorName) {
                      case 'cyber-primary':
                        return {
                          border: 'border-cyber-primary/30 hover:border-cyber-primary/50',
                          bg: 'bg-cyber-primary/10 hover:bg-cyber-primary/20',
                          icon: 'text-cyber-primary',
                          shadow: 'hover:shadow-cyber'
                        };
                      case 'cyber-secondary':
                        return {
                          border: 'border-cyber-secondary/30 hover:border-cyber-secondary/50',
                          bg: 'bg-cyber-secondary/10 hover:bg-cyber-secondary/20',
                          icon: 'text-cyber-secondary',
                          shadow: 'hover:shadow-purple'
                        };
                      case 'cyber-accent':
                        return {
                          border: 'border-cyber-accent/30 hover:border-cyber-accent/50',
                          bg: 'bg-cyber-accent/10 hover:bg-cyber-accent/20',
                          icon: 'text-cyber-accent',
                          shadow: 'hover:shadow-green'
                        };
                      case 'cyber-pink':
                        return {
                          border: 'border-cyber-pink/30 hover:border-cyber-pink/50',
                          bg: 'bg-cyber-pink/10 hover:bg-cyber-pink/20',
                          icon: 'text-cyber-pink',
                          shadow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-pink)/0.3)]'
                        };
                      default:
                        return {
                          border: 'border-cyber-primary/30 hover:border-cyber-primary/50',
                          bg: 'bg-cyber-primary/10 hover:bg-cyber-primary/20',
                          icon: 'text-cyber-primary',
                          shadow: 'hover:shadow-cyber'
                        };
                    }
                  };
                  const colorClasses = getColorClasses(social.color);

                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transform transition-all duration-300 group hover:scale-105 hover:-translate-y-1 ${colorClasses.border} ${colorClasses.bg} ${colorClasses.shadow}`}
                      style={{ transition: 'box-shadow 0.3s, transform 0.3s, background 0.3s, border-color 0.3s' }}
                    >
                      <Icon className={`w-5 h-5 ${colorClasses.icon} group-hover:animate-pulse-glow transition-all duration-300`} />
                      <span className="font-medium text-foreground group-hover:text-foreground-accent transition-colors">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};