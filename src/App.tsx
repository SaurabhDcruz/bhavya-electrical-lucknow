import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Wrench, 
  Lightbulb, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star, 
  User, 
  CheckCircle2, 
  Menu, 
  X,
  Smartphone,
  Facebook,
  Instagram,
  Construction,
  Power,
  Fan,
  CircuitBoard,
  Droplets,
  HardHat,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// --- Data ---
const SERVICES: Service[] = [
  { id: 'wiring', title: 'Home Wiring & Rewiring', description: 'Complete residential electrical solutions with safety-first approach.', icon: <CircuitBoard className="w-8 h-8" /> },
  { id: 'fault', title: 'Electrical Fault Repair', description: 'Expert troubleshooting and emergency repair for all household faults.', icon: <Zap className="w-8 h-8" /> },
  { id: 'appliances', title: 'Fan, Cooler & AC Repair', description: 'Swift repair services for all your cooling and home ventilation systems.', icon: <Fan className="w-8 h-8" /> },
  { id: 'motor', title: 'Motor Rewinding & Repair', description: 'Professional rewinding services for industrial and domestic motors.', icon: <Construction className="w-8 h-8" /> },
  { id: 'pump', title: 'Water Pump Repair', description: 'Reliable water pump maintenance to ensure uninterrupted water supply.', icon: <Droplets className="w-8 h-8" /> },
  { id: 'inverter', title: 'Inverter & Battery Services', description: 'Power backup installation, battery testing, and inverter optimization.', icon: <Power className="w-8 h-8" /> },
  { id: 'industrial', title: 'Industrial Machine Repair', description: 'Heavy-duty electrical maintenance for factory and workshop equipment.', icon: <HardHat className="w-8 h-8" /> },
  { id: 'plumbing', title: 'Plumbing Support', description: 'Integrated plumbing maintenance to complement electrical works.', icon: <Wrench className="w-8 h-8" /> },
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rahul Sharma', role: 'Home Owner', content: 'Anoop and his team did a fantastic job rewiring our entire house. Extremely professional and clean work.', rating: 5 },
  { id: '2', name: 'Sunita Mishra', role: 'Business Owner', content: 'Rescued our workshop after a major short circuit. Fast service and very reasonable pricing.', rating: 5 },
  { id: '3', name: 'Amit Verma', role: 'Manager, Indus Tech', content: 'We rely on Bhavya Electrical for our annual industrial maintenance. They are the best in Gomti Nagar.', rating: 4 },
];

// --- Sub-components ---

const Logo = ({ className = "" }: { className?: string }) => {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className="relative h-10 md:h-12 w-auto min-w-[40px] flex items-center justify-center">
        {!logoError ? (
          <img 
            src="/logo.png" 
            alt="Bhavya Electrical Logo" 
            className="h-full w-auto object-contain transition-transform group-hover:scale-105"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-gold rounded-lg rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-gold/20"></div>
            <div className="absolute inset-0 bg-rich-black rounded-lg -rotate-3 group-hover:rotate-0 transition-transform flex items-center justify-center border border-gold/30">
              <span className="font-display font-bold text-2xl text-gold pb-0.5">B</span>
            </div>
          </div>
        )}
        {/* Subtle wire-like accent if no real logo */}
        {logoError && (
          <div className="absolute -right-1 -bottom-1 w-4 h-4 text-gold/60">
             <Zap className="w-full h-full fill-current" />
          </div>
        )}
      </div>
      <span className="font-display font-bold text-lg md:text-xl tracking-tight hidden sm:block text-white">
        <span className="text-gold">BHAVYA</span> ELECTRICAL
      </span>
    </div>
  );
};

const SEO = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "name": "Bhavya Electrical Work Shop",
    "image": "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=2070",
    "telephone": "+918802656640",
    "email": "anoopchaurasia.8826@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Badi Jugauli Main Road, Vishwas Khand, Gomti Nagar",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8646525,
      "longitude": 80.981004
    },
    "url": window.location.href,
    "openingHours": "Mo-Su 09:00-20:00",
    "founder": {
      "@type": "Person",
      "name": "Anoop Chaurasiya"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-rich-black/80 backdrop-blur-md py-3 md:py-4 border-b border-white/10' : 'bg-transparent py-5 md:py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="relative z-60">
          <Logo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-white/70 hover:text-gold transition-colors tracking-wide uppercase"
            >
              {link.name}
            </a>
          ))}
          <a href="tel:+918802656640" className="bg-gold text-rich-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gold-light transition-all gold-glow active:scale-95">
            CALL NOW
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-60 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-white rounded-full flex-shrink-0 origin-center"
          />
          <motion.span 
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-0.5 bg-white rounded-full flex-shrink-0"
          />
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-white rounded-full flex-shrink-0 origin-center"
          />
        </button>
      </div>

      {/* Modern Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-rich-black z-50 md:hidden overflow-hidden"
          >
            {/* Background Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[150%] aspect-square bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[150%] aspect-square bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative h-full flex flex-col justify-center px-10 pb-10">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl xs:text-5xl font-display font-bold text-white hover:text-gold transition-colors flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-12 border-t border-white/10"
              >
                <div className="flex flex-col gap-4">
                  <a href="tel:+918802656640" className="bg-gold text-rich-black px-6 py-4 rounded-xl font-bold text-base whitespace-nowrap text-center shadow-xl shadow-gold/20 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5 fill-current" /> GET EXPERT ASSISTANCE
                  </a>
                  <p className="text-center text-white/40 text-[10px] mt-4 font-mono font-medium tracking-[0.2em] uppercase">Available 24/7 in Lucknow</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold-light text-xs font-bold tracking-widest uppercase mb-6">
            <Zap className="w-4 h-4" /> !! जय माता दी !!
          </div>
          <h1 className="text-4xl xs:text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-white text-balance tracking-tight">
            Powering Your <span className="gold-gradient-text">World</span> With Expert Repairs
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-xl leading-relaxed">
            From home wiring to industrial machine maintenance, Anoop Chaurasiya's Bhavya Electrical delivers premium, safe, and reliable services across Lucknow. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#services" className="bg-gold text-rich-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all gold-glow flex items-center justify-center sm:justify-start gap-2">
              Our Services <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl border border-white/20 font-bold text-lg text-white hover:bg-white/5 transition-all text-center">
              Get A Quote
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-rich-black bg-charcoal flex items-center justify-center overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${[
                    '1507003211169-0a1dd7228f2d',
                    '1494790108377-be9c29b29330',
                    '1500648767791-00dcc994a43e',
                    '1573497019940-1c28c88b4f3e'
                  ][i-1]}?auto=format&fit=crop&q=80&w=100&h=100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-medium text-white/80">Trusted by 500+ Happy Clients</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl blue-glow group">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2070" 
              alt="Electrical Work"
              className="w-full h-auto grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=2070";
              }}
              referrerPolicy="no-referrer"
            />
            {/* Experience Badge */}
            <div className="absolute bottom-6 left-6 glass-card p-6 border-gold/20 flex items-center gap-4 animate-float">
              <div className="text-4xl font-display font-bold text-gold">10+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/70 leading-tight">Years Of<br/>Excellence</div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding bg-charcoal/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-xs font-bold text-gold tracking-[0.2em] uppercase mb-4">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">Commercial & Residential Expertise</h3>
          <p className="text-white/60 text-sm md:text-base">We provide high-end electrical solutions tailored to the specific needs of our Lucknow clients, ensuring safety and precision in every connection.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 group hover:border-gold/40 transition-all duration-500 hover:gold-glow"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-500">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 text-white group-hover:text-gold transition-colors">{service.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed mb-6 group-hover:text-white/80 transition-colors">{service.description}</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Book Repair <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative z-10 group">
             <div className="absolute inset-0 bg-linear-to-t from-rich-black via-transparent to-transparent opacity-50 z-20" />
             <img 
               src="/proprietor.png" 
               alt="Anoop Chaurasiya" 
               className="w-full h-full object-cover transition-all duration-700" 
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2070";
               }}
               referrerPolicy="no-referrer" 
             />
             <div className="absolute bottom-8 right-8 z-30 text-right">
               <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">Proprietor / प्रो०</p>
               <h4 className="text-2xl font-display font-bold text-white">Anoop Chaurasiya</h4>
             </div>
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 border border-gold/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:pl-10"
        >
          <h2 className="text-xs font-bold text-gold tracking-[0.2em] uppercase mb-4">Our History</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-8 text-white leading-tight">Crafting Excellence Since 2014</h3>
          <p className="text-white/60 text-base md:text-lg mb-6 leading-relaxed">
            Bhavya Electrical Work Shop started with a simple vision: to provide Lucknow with premium electrical services that combine traditional craftsmanship with modern technology.
          </p>
          <p className="text-white/60 text-sm md:text-base mb-10 leading-relaxed">
            Under the leadership of Anoop Chaurasiya, we have grown from a small neighborhood shop into a trusted partner for hundreds of homes and industrial units in Gomti Nagar and beyond. Our commitment to safety, reliability, and precision remains unchanged.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card border-gold/20 flex items-center justify-center text-gold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1 text-white">Expert Wiring</h5>
                <p className="text-xs text-white/50">Modern safety standards</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card border-gold/20 flex items-center justify-center text-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1 text-white">Certified Safe</h5>
                <p className="text-xs text-white/50">Guaranteed reliability</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card border-gold/20 flex items-center justify-center text-gold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1 text-white">24/7 Support</h5>
                <p className="text-xs text-white/50">Emergency repairs</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card border-gold/20 flex items-center justify-center text-gold">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold mb-1 text-white">5★ Service</h5>
                <p className="text-xs text-white/50">Top rated in Lucknow</p>
              </div>
            </div>
          </div>
          
          <a href="#contact" className="inline-flex items-center gap-3 font-bold text-gold group">
            Our Mission & Vision <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="section-padding bg-charcoal/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div className="max-w-xl">
             <h2 className="text-xs font-bold text-gold tracking-[0.2em] uppercase mb-4">Testimonials</h2>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">What Our Premium Clients Say</h3>
          </div>
          <div className="flex gap-4">
             <div className="text-left md:text-right">
               <div className="flex text-gold mb-1">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
               </div>
               <p className="text-xs md:text-sm font-medium text-white/60">4.9/5 Average Rating</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-gold group-hover:opacity-10 transition-opacity pointer-events-none">
                <span className="text-8xl font-display">"</span>
              </div>
              <div className="flex text-gold mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                ))}
              </div>
              <p className="text-white/70 italic mb-8 relative z-10 leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-white">{review.name}</h5>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, we will contact you shortly!`);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-bold text-gold tracking-[0.2em] uppercase mb-4">Contact Us</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-8 text-white">Ready to Start Your Project?</h3>
            <p className="text-white/60 text-sm md:text-base mb-12 max-w-lg">
              Visit our workshop or call us directly. We are available for all kinds of electrical repairs and maintenance in Gomti Nagar, Lucknow.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 glass-card border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold mb-1 text-white">Our Workshop</h5>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Badi Jugauli Main Road, Vishwas Khand,<br/>Gomti Nagar, Lucknow, UP - 226010
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 glass-card border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold mb-1 text-white">Call Us</h5>
                  <div className="text-white/60 text-sm">
                    <p><a href="tel:+918802656640" className="hover:text-gold transition-colors">+91 88026 56640</a></p>
                    <p><a href="tel:+917080934305" className="hover:text-gold transition-colors">+91 70809 34305</a></p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 glass-card border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold mb-1 text-white">Email Us</h5>
                  <p className="text-white/60 text-sm">
                    <a href="mailto:anoopchaurasia.8826@gmail.com" className="hover:text-gold transition-colors">anoopchaurasia.8826@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 h-64 grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.2552809634424!2d80.9784291!3d26.8646525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUxJzUyLjgiTiA4MMKwNTgnNDIuMyJF!5e0!3m2!1sen!2sin!4v1714650000000!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Bhavya Electrical Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 lg:p-12 gold-glow shadow-gold/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-3">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-rich-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-white transition-colors" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-3">Phone Number</label>
                <input 
                  type="tel" required
                  className="w-full bg-rich-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-white transition-colors" 
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-3">Your Message</label>
                <textarea 
                  required rows={4}
                  className="w-full bg-rich-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-white transition-colors resize-none" 
                  placeholder="Describe your electrical issue..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gold text-rich-black font-bold p-5 rounded-xl hover:bg-gold-light transition-all gold-glow active:scale-95"
              >
                SEND MESSAGE
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-rich-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Premium electrical repair and maintenance services in Lucknow. Expert solutions for residential and industrial needs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass-card border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass-card border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass-card border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all">
                <Smartphone className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm text-gold">Quick Links</h5>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Reviews', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <ChevronRight className="w-4 h-4" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm text-gold">Our Services</h5>
            <ul className="space-y-4">
              {['Home Wiring', 'Motor Repair', 'AC Maintenance', 'Industrial Repair', 'Plumbing'].map(link => (
                <li key={link}>
                  <a href="#services" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <ChevronRight className="w-4 h-4" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Bhavya Electrical Work Shop. All rights reserved.
          </p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest flex items-center gap-1">
            Developed by <a href="https://www.linkedin.com/in/saurabh-dcruz-sd786/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-bold">Saurabh Gupta</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FloatingActions = () => {
  return (
    <>
      <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-4">
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/918802656640" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
      <div className="fixed bottom-8 right-8 z-40">
        {/* Call Button */}
        <a 
          href="tel:+918802656640" 
          className="w-14 h-14 bg-gold text-rich-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all gold-glow"
        >
          <Phone className="w-7 h-7 fill-current" />
        </a>
      </div>
    </>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="selection:bg-gold selection:text-rich-black bg-rich-black min-h-screen">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        {/* Stats Section */}
        <section className="section-padding py-16 border-y border-white/5 bg-rich-black">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { label: 'Founded', value: '2014' },
                { label: 'Total Repairs', value: '2k+' },
                { label: 'Happy Clients', value: '1.5k' },
                { label: 'Average Rating', value: '4.9' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-3 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
