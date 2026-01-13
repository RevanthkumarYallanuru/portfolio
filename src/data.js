// Import project images
import ecomImage from '@/assets/Ecom.png';
import rapidbloodImage from '@/assets/rapidblood.png';
import jprinfraImage from '@/assets/jprinfra.png';
import vghotel from '@/assets/vghotel.png'
import gcf from '@/assets/gcfactory.png'
import resumePDF from '@/assets/Revanth_kumar_Yallanuru_2026_resume.pdf';
import agri from '@/assets/agri.png'

// Centralized portfolio data
export const portfolioData = {
  personal: {
    name: "Yallanuru Revanth Kumar",
    role: "FullStack Web Developer",
    tagline: "Turning bold ideas into blazing web experiences.",
    about: "I am a detail-oriented web developer with a strong foundation in React.js and a commitment to creating user-friendly applications. I thrive on enhancing user experience through collaboration and effective debugging techniques. My education in Artificial Intelligence and practical experience in internships have equipped me with modern web technologies and teamwork skills necessary to excel in dynamic environments.",
    email: "revanthkumaryallanuru103@gmail.com",
    phone: "+91 7207357312",
    location: "Tirupati, India",
    portraitImage: "/portrait.jpg",
    resumeUrl: resumePDF, 
    emailJsServiceId: "service_wh1e55s", 
    emailJsTemplateId: "template_v7hlhyr",
    emailJsPublicKey: "wYWNraaxlIDzx3Yc7", 
  },

  social: [
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/revanthkumaryallanuru",
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://www.linkedin.com/in/revanth-kumar-yallanuru-434488329/",
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://instagram.com/revanth_kumar_yallanuru",
    },
   
    {
      name: "Email",
      icon: "Mail",
      url: "mailto:revanthkumaryallanuru103@gmail.com",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React.js", icon: "⚛️" },
        { name: "JavaScript", icon: "🟨" },
        { name: "TypeScript", icon: "🔷" },
        { name: "HTML5", icon: "📄" },
        { name: "CSS3", icon: "🎨" },
        { name: "Responsive Design", icon: "📱" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚂" },
        { name: "PHP", icon: "🐘" },
        { name: "REST APIs", icon: "🔌" },
      ],
    },
    {
      category: "Database & Services",
      items: [
        { name: "Firebase", icon: "🔥" },
        { name: "MySQL", icon: "🐬" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Git & GitHub", icon: "📦" },
      ],
    },
    {
      category: "Other Skills",
      items: [
        { name: "SEO", icon: "🔍" },
        { name: "Project Management", icon: "📋" },
        { name: "Debugging", icon: "🐛" },
        { name: "Web Development", icon: "🌐" },
      ],
    },
  ],

  projects: [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "Collaborated on a team-based e-commerce platform with a strong focus on responsive design. Built dynamic product pages and ensured smooth user experience across devices for a real-time client project.",
    tech: ["Reactjs", "Responsive Design", "TailwindCss", "Product Page" , "Team Project"],
    image: ecomImage,
    link: "",
    github: "https://github.com/RevanthkumarYallanuru",
    liveDemo: false,
    featured: true,
  },
  /*{
    id: 2,
    title: "Rapid Blood",
    description:
      "Developed a team-based full-stack web application during a hackathon. Implemented Firebase authentication and responsive layouts for efficient blood donation coordination.",
    tech: ["React", "Firebase", "JavaScript", "Authentication", "Responsive Design"],
    image: rapidbloodImage,
    link: "https://rappid-blood.netlify.app/",
    github: "https://github.com/RevanthkumarYallanuru",
    liveDemo: true,
    featured: true,
  },*/
  {
    id: 3,
    title: "JPR Infraworks",
    description:
      "Built a professional service showcase application using React and Firebase. Implemented secure login, data handling, and deployed using Netlify and Hostinger for production use.",
    tech: ["React", "Firebase", "Authentication", "Deployment"],
    image: jprinfraImage,
    link: "https://jprinfraworks.com/",
    github: "https://github.com/RevanthkumarYallanuru",
    liveDemo: true,
    featured: true,
  },
  {
    id: 4,
    title: "Hotel Management Software",
    description:
      "Developed a hotel management system with billing and staff modules. Designed a personal dashboard tailored for client usage and deployed the application for real-world operations.",
    tech: ["React", "JavaScript", "Dashboard", "Client Deployment"],
    image: vghotel,
    link: "",
    github: "https://github.com/RevanthkumarYallanuru",
    liveDemo: false,
    featured: false,
  },
  {
    id: 5,
    title: "GCF Gifts – Personalized Gifts & Custom Photo Frames",
    description:
      "A responsive e-commerce storefront offering custom gift products and photo frames with an intuitive UI and user-friendly shopping experience",
    tech: ["HTML5", "CSS3", "JavaScript", "Performance Optimization"],
    image: gcf,
    link: "https://gcfactory.netlify.app/",
    github: "https://github.com/RevanthkumarYallanuru",
    liveDemo: true,
    featured: false,
  },
 /* {
    id: 6,
    title: "Freelance Web Projects",
    description:
      "Delivered multiple client-based web solutions focusing on custom UI development, responsive layouts, and SEO-friendly pages. Maintained direct client communication and implemented client-centric solutions.",
    tech: ["React", "JavaScript", "SEO", "Responsive Design", "UI Development"],
    image: jprinfraImage,
    link: "http://yrk.life/",
    github: "https://github.com/RevanthkumarYallanuru",
    liveDemo: true,
    featured: false,
  },*/
  {
  id: 7,
  title: "AgriConnect - Chittoor",
  description:
    "A responsive AgriTech platform connecting local farmers directly with buyers. Enables transparent product listings and promotes farm-to-consumer trade through a simple, user-friendly interface.",
  tech: ["React", "JavaScript", "MVP", "Responsive Design"],
  image: agri,
  link: "https://agriconnectchithoor.netlify.app/",
  github: "https://github.com/RevanthkumarYallanuru",
  liveDemo: true,
  featured: false,
}

],


  experience: [
    {
      id: 1,
      title: "Web Developer Intern",
      company: "Web Development Company",
      location: "Tirupati, India",
      period: "Sep-2024 - Feb-2025",
      type: "Internship",
      description: "Built responsive web applications using React.js with focus on clean code and user experience. Collaborated with team to develop mobile-friendly websites and ensure cross-browser compatibility.",
      achievements: [
        "Developed React.js applications with responsive design",
        "Collaborated on feature enhancements and bug fixes",
        "Tested across multiple browsers and devices"
      ],
      skills: ["React", "JavaScript", "Responsive Design", "Git"]
    },
    {
      id: 2,
      title: "Freelance Web Developer",
      company: "Self Employed",
      location: "Remote | India",
      period: "Feb 2025 – Present",
      type: "Freelance",
      description: "Delivering custom web solutions for clients with focus on responsive design, performance, and SEO. Building scalable, modern web applications with clean code and excellent user experience.",
      achievements: [
        "Designed and developed responsive, user-centric websites",
        "Built custom components and layouts for client requirements",
        "Optimized performance and implemented SEO best practices"
      ],
      skills: ["React", "TypeScript", "TailwindCSS", "Node.js", "MongoDB", "SEO"]
    }
  ],

  services: [
    {
      id: 1,
      title: "Full Stack Web Applications 🚀",
      tagline: "End-to-end digital solutions",
      description: "Transform your business vision into scalable, production-ready web applications. From database architecture to responsive UI, I build complete solutions that drive growth and deliver measurable results.",
      features: [
        "React.js frontend with modern UI/UX",
        "Node.js & Express backend infrastructure",
        "Database design & optimization",
        "Responsive design for all devices",
        "Performance optimization & SEO",
        "Deployment & maintenance support"
      ],
      icon: "",
      color: "from-blue-500 to-cyan-500",
      highlighted: true
    },
    /*{
      id: 2,
      title: "Frontend Development",
      tagline: "Beautiful, interactive interfaces",
      description: "Craft stunning, interactive web interfaces that engage users and drive conversions. Specialized in creating responsive, accessible components with smooth animations and exceptional performance.",
      features: [
        "React.js component architecture",
        "TypeScript for type safety",
        "TailwindCSS & custom styling",
        "State management & performance",
        "Accessibility compliance (WCAG)",
        "Cross-browser testing & optimization"
      ],
      icon: "✨",
      color: "from-purple-500 to-pink-500",
      highlighted: false
    },*/
    {
      id: 3,
      title: "💡From Idea to App",
      tagline: "Your vision, realized",
      description: "Have a brilliant idea but unsure where to start? I guide you through the entire development journey—from concept and planning to launch. Turn your vision into a live application.",
      features: [
        "Idea validation & feasibility analysis",
        "Technical architecture planning",
        "Agile development approach",
        "User research & feedback integration",
        "MVP development & iteration",
        "Launch strategy & support"
      ],
      icon: "",
      color: "from-yellow-500 to-orange-500",
      highlighted: true
    },
    {
      id: 4,
      title: "📈 SEO Content & Optimization ",
      tagline: "Rank higher, reach further",
      description: "Boost your online visibility with strategic SEO optimization. I create keyword-rich content and implement technical SEO best practices to help your site dominate search rankings.",
      features: [
        "Keyword research & strategy",
        "On-page SEO optimization",
        "Technical SEO implementation",
        "Meta tags & structured data",
        "Performance optimization (Core Web Vitals)",
        "Content strategy & planning"
      ],
      icon: "",
      color: "from-green-500 to-emerald-500",
      highlighted: true
    },
    /*{
      id: 5,
      title: "Domain & Hosting Management",
      tagline: "Solid foundation for growth",
      description: "Expert domain registration and hosting configuration to ensure your site runs smoothly. Secure, reliable, and optimized infrastructure for maximum uptime and performance.",
      features: [
        "Domain registration & transfer",
        "DNS configuration & management",
        "SSL certificate setup",
        "Hosting selection & optimization",
        "Email configuration",
        "Backup & security management"
      ],
      icon: "🔒",
      color: "from-red-500 to-pink-500",
      highlighted: false
    }*/
  ],

};