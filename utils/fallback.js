// Shown when the Laravel API is unreachable, so the site always renders.
// Same shape as GET /api/portfolio. Keep in sync with portfolio-api/database/seeders/DatabaseSeeder.php.
export const fallbackPortfolio = {
  projects: [
    {
      id: 1, title: 'Nasery Web-Based Event Management System', year: 2025, featured: true,
      description: 'A complete web application built from scratch to help users book, plan and manage events easily online.',
      tags: ['Fullstack', 'Web App'], url: '#', repo: '#'
    },
    {
      id: 2, title: 'StayWise Boarding House Management System', year: 2025, featured: true,
      description: 'Clean screens and click-through prototypes that help landlords track room availability and payments with ease.',
      tags: ['UI/UX Design', 'Prototype'], url: '#', repo: '#'
    },
    {
      id: 3, title: 'Hotel Management System', year: 2025, featured: false,
      description: 'A modern dashboard layout that makes hotel room bookings and guest check-ins much faster.',
      tags: ['UI/UX Design', 'Dashboard'], url: '#', repo: '#'
    },
    {
      id: 4, title: 'Personal Portfolio Website', year: 2026, featured: false,
      description: 'A responsive personal website built with Nuxt and Laravel to showcase my best design and web development work.',
      tags: ['UI/UX Design', 'Frontend', 'Nuxt', 'Laravel'], url: '#', repo: '#'
    }
  ],
  skills: [
    { id: 1, name: 'UI Design', category: 'Design', level: 90 },
    { id: 2, name: 'UX Design', category: 'Design', level: 88 },
    { id: 3, name: 'Wireframing', category: 'Design', level: 90 },
    { id: 4, name: 'Interactive Prototyping', category: 'Design', level: 88 },
    { id: 5, name: 'Visual Storytelling', category: 'Design', level: 82 },

    { id: 6, name: 'HTML & CSS', category: 'Frontend', level: 90 },
    { id: 7, name: 'Responsive Design', category: 'Frontend', level: 90 },
    { id: 8, name: 'Mobile-first Optimization', category: 'Frontend', level: 86 },
    { id: 9, name: 'Cross-browser Compatibility', category: 'Frontend', level: 84 },
    { id: 10, name: 'Vue & Nuxt', category: 'Frontend', level: 78 },

    { id: 11, name: 'Video Production', category: 'Multimedia', level: 82 },
    { id: 12, name: 'Digital Assets', category: 'Multimedia', level: 84 },
    { id: 13, name: 'Brand Guidelines', category: 'Multimedia', level: 80 },

    { id: 14, name: 'Laravel', category: 'Backend & Data', level: 70 },
    { id: 15, name: 'MySQL', category: 'Backend & Data', level: 72 },
    { id: 16, name: 'Data Management', category: 'Backend & Data', level: 88 },
    { id: 17, name: 'Spreadsheets', category: 'Backend & Data', level: 90 },

    { id: 18, name: 'Critical Thinking', category: 'Workflow', level: 90 },
    { id: 19, name: 'Quality Assurance', category: 'Workflow', level: 86 },
    { id: 20, name: 'Attention to Detail', category: 'Workflow', level: 92 }
  ],
  experiences: [
    {
      id: 1, role: 'Freelance UI/UX Designer & Frontend Developer', company: 'Self-employed', period: '2025 — Present',
      summary: 'Designed intuitive interfaces with high-fidelity wireframes and interactive prototypes. Built and deployed fast, responsive, mobile-first websites with seamless cross-browser compatibility. Produced video content and digital assets aligned with client branding and visual storytelling goals.'
    },
    {
      id: 2, role: 'Freelance Data Entry', company: 'Self-employed', period: '2023 — 2024',
      summary: 'Maintained, updated and verified large-scale digital databases with high accuracy and confidentiality. Ran regular data audits to catch input errors, and structured raw data with spreadsheet functions to speed up team workflows and data retrieval.'
    }
  ]
}
