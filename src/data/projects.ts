export interface Project {
  id: string;
  number: string;
  tag: string;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  visualLabel: string;
  images: string[];
}

export const projectsByLocale = {
  en: [
    {
      id: "crm-lead-intelligence",
      number: "01",
      tag: "AI · Full-Stack · 2025",
      title: "CRM Lead Intelligence",
      problem:
        "Sales teams often work with large CRM exports where valuable signals are hidden inside inconsistent data and free-text notes. Reviewing every lead manually makes prioritization slow and difficult to scale.",

      solution:
        "Built an AI-assisted lead intelligence system that processes CRM exports, normalizes data, scores leads, detects sales signals, and generates actionable insights. The system combines deterministic scoring with AI enrichment through a FastAPI and PostgreSQL backend and a Next.js dashboard.",

      stack: [
        "Next.js",
        "TypeScript",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "AI",
      ],

      accentColor: "#6C8EFF",
      visualLabel: "AI",
      images: [
        "/projects/crm/crm1.png",
        "/projects/crm/crm2.png",
        "/projects/crm/crm3.png",
        "/projects/crm/crm4.png",
        "/projects/crm/crm5.png"
      ],
    },

    {
      id: "barsan",
      number: "02",
      tag: "Corporate · 2024",
      title: "Barsan Website Redesign",

      problem:
        "Barsan Global Logistics needed a more flexible and maintainable digital platform. The existing structure made content management and future development more difficult.",

      solution:
        "Contributed to the redevelopment of the corporate website using Next.js and a component-based architecture. The project integrated Strapi CMS and Docker while improving the structure of reusable UI components and content management workflows.",

      stack: [
        "Next.js",
        "Strapi CMS",
        "Tailwind CSS",
        "Docker",
      ],

      accentColor: "#00D4FF",
      visualLabel: "CMS",

      images: [
        "/projects/barsan/barsan-1.png",
        "/projects/barsan/barsan-2.png",
        "/projects/barsan/barsan-3.png",
        "/projects/barsan/barsan-4.png",
        "/projects/barsan/barsan-5.png",
      ],
    },

    {
      id: "mobile-ai",
      number: "03",
      tag: "Mobile · Research · 2025",
      title: "TÜBİTAK 2209-A Research Project",

      problem:
        "Students looking for accommodation often have to collect information from different sources, verify it manually, and compare options with inconsistent or incomplete data.",

      solution:
        "Developed as a TÜBİTAK 2209-A supported university research project, this platform brings student accommodation data together in one place and provides a mobile experience for discovering and comparing options. The project uses React Native and Firebase for cross-platform development and real-time data management.",

      stack: [
        "React Native",
        "Firebase",
        "TypeScript",
        "AI APIs",
      ],

      accentColor: "#8B5CF6",
      visualLabel: "APP",

      images: [
        "/projects/mobile-ai/mobile-1.jpg",
        "/projects/mobile-ai/mobile-2.jpg",
      ],
    },
  ] as Project[],

  tr: [
    {
      id: "crm-lead-intelligence",
      number: "01",
      tag: "Yapay Zeka · Full-Stack · 2025",
      title: "CRM Lead Intelligence",

      problem:
        "Satış ekipleri, CRM verilerinde yer alan büyük miktardaki kayıt içerisinden önemli satış sinyallerini bulmakta zorlanabiliyor. Özellikle açıklama ve görüşme notlarının manuel incelenmesi, doğru müşterilere öncelik vermeyi zaman alıcı hâle getiriyor.",

      solution:
        "CRM verilerini işleyen, normalize eden, potansiyel müşteri skorları oluşturan ve satış için anlamlı aksiyonlar üreten yapay zekâ destekli bir sistem geliştirdim. FastAPI ve PostgreSQL tabanlı backend ile Next.js dashboard'u bir araya getirerek kural tabanlı skorlamayı AI destekli analizlerle birleştirdim.",

      stack: [
        "Next.js",
        "TypeScript",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "AI",
      ],

      accentColor: "#6C8EFF",
      visualLabel: "AI",

      images: [
        "/projects/crm/crm-1.webp",
        "/projects/crm/crm-2.webp",
        "/projects/crm/crm-3.webp",
      ],
    },

    {
      id: "barsan",
      number: "02",
      tag: "Kurumsal · 2024",
      title: "Barsan Web Sitesi Yenileme",

      problem:
        "Barsan Global Logistics, büyüyen içerik ve geliştirme ihtiyaçlarını karşılayabilecek daha esnek ve sürdürülebilir bir dijital yapıya ihtiyaç duyuyordu.",

      solution:
        "Kurumsal web sitesinin yeniden geliştirilmesi sürecinde görev aldım. Next.js ve bileşen tabanlı bir yapı kullanılırken Strapi CMS ve Docker entegrasyonlarıyla içerik yönetimi ve geliştirme süreçleri daha sürdürülebilir hâle getirildi.",

      stack: [
        "Next.js",
        "Strapi CMS",
        "Tailwind CSS",
        "Docker",
      ],

      accentColor: "#00D4FF",
      visualLabel: "CMS",

      images: [
        "/projects/barsan/barsan-1.webp",
        "/projects/barsan/barsan-2.webp",
        "/projects/barsan/barsan-3.webp",
        "/projects/barsan/barsan-4.webp",
        "/projects/barsan/barsan-5.webp",
      ],
    },

    {
      id: "mobile-ai",
      number: "03",
      tag: "Mobil · Araştırma · 2025",
      title: "TÜBİTAK 2209-A Araştırma Projesi",

      problem:
        "Öğrenciler için uygun yurt ve konaklama seçeneklerini bulmak, farklı kaynaklardan bilgi toplamak ve seçenekleri karşılaştırmak nedeniyle zaman alıcı bir süreç olabiliyor.",

      solution:
        "TÜBİTAK 2209-A kapsamında geliştirdiğimiz bu üniversite araştırma projesinde öğrenci konaklama verilerini tek bir platformda toplamayı ve kullanıcıların seçenekleri daha kolay keşfedip karşılaştırmasını hedefledik. React Native ve Firebase kullanılarak geliştirilen proje, platformlar arası mobil deneyim ve gerçek zamanlı veri yönetimi sunuyor.",

      stack: [
        "React Native",
        "Firebase",
        "TypeScript",
        "AI APIs",
      ],

      accentColor: "#8B5CF6",
      visualLabel: "APP",

      images: [
        "/projects/mobile-ai/mobile-1.webp",
        "/projects/mobile-ai/mobile-2.webp",
      ],
    },
  ] as Project[],
};