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
  visualLabel: string; // Large decorative text behind the mockup area
}

export const projectsByLocale = {
  en: [
    {
      id: "tonepilot",
      number: "01",
      tag: "AI Product · 2025",
      title: "TonePilot",
      problem:
        "Communication is one of the highest-leverage skills in any organization — yet most professionals struggle to consistently strike the right tone across contexts, whether it's stakeholder emails, slack messages, or client-facing copy.",
      solution:
        "TonePilot is an AI-powered communication assistant that rewrites, refines, and improves text with emotional intelligence. Built with a modern, minimal UI and real-time OpenAI integration, it gives users a history of transformations and nuanced tone selection.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
      accentColor: "#6C8EFF",
      visualLabel: "AI",
    },
    {
      id: "barsan",
      number: "02",
      tag: "Corporate · 2024",
      title: "Barsan Website Redesign",
      problem:
        "A well-established logistics company with a fragmented digital presence: outdated frontend, no unified content system, and a codebase that made simple content updates a developer task.",
      solution:
        "A full architecture rebuild — new component-driven frontend in Next.js, a headless CMS integration via Strapi, containerized deployment with Docker, and a design system that scales with the company's content needs without engineering intervention.",
      stack: ["Next.js", "Strapi CMS", "Tailwind CSS", "Docker"],
      accentColor: "#00D4FF",
      visualLabel: "CMS",
    },
    {
      id: "mobile-ai",
      number: "03",
      tag: "Mobile · 2025",
      title: "Mobile AI App",
      problem:
        "Building a mobile AI product means solving two hard problems simultaneously: designing an intuitive cross-platform UX that feels native, and architecting a real-time backend that's fast enough to keep up with user interactions.",
      solution:
        "A React Native application with Firebase as the real-time backend layer and integrated AI APIs for intelligent features. Focus on mobile UX patterns, offline-first architecture, and seamless state management across the native/web boundary.",
      stack: ["React Native", "Firebase", "TypeScript", "AI APIs"],
      accentColor: "#8B5CF6",
      visualLabel: "APP",
    },
  ] as Project[],
  tr: [
    {
      id: "tonepilot",
      number: "01",
      tag: "Yapay Zeka Urunu · 2025",
      title: "TonePilot",
      problem:
        "Iletisim, kurumlarda en yuksek etkili yetkinliklerden biri; ancak profesyoneller paydas e-postalari, Slack mesajlari veya musteriye donuk metinlerde dogru tonu surekli yakalamakta zorlanir.",
      solution:
        "TonePilot; metinleri duygusal zekayla yeniden yazan, iyilestiren ve netlestiren yapay zeka destekli bir iletisim asistanidir. Modern ve minimal arayuz, gercek zamanli OpenAI entegrasyonu, donusum gecmisi ve nufansli ton secimleri sunar.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
      accentColor: "#6C8EFF",
      visualLabel: "AI",
    },
    {
      id: "barsan",
      number: "02",
      tag: "Kurumsal · 2024",
      title: "Barsan.com Yeniden Tasarim",
      problem:
        "Koklu bir lojistik markasinin parcalanmis dijital yapisi: eski bir arayuz, birlesik icerik sistemi eksikligi ve basit guncellemeleri bile gelistirici bagimli hale getiren bir kod tabani.",
      solution:
        "Mimariyi bastan kurduk: Next.js ile bilesen odakli yeni frontend, Strapi tabanli headless CMS entegrasyonu, Docker ile konteyner dagitimi ve muhendislik bagimsiz icerik buyumesini destekleyen bir tasarim sistemi.",
      stack: ["Next.js", "Strapi CMS", "Tailwind CSS", "Docker"],
      accentColor: "#00D4FF",
      visualLabel: "CMS",
    },
    {
      id: "mobile-ai",
      number: "03",
      tag: "Mobil · 2025",
      title: "Mobil AI Uygulamasi",
      problem:
        "Mobil bir yapay zeka urunu gelistirmek iki zor problemi ayni anda cozmeyi gerektirir: yerel hisseden sezgisel capraz platform deneyimi ve kullanici etkilesimine yetisecek kadar hizli gercek zamanli backend mimarisi.",
      solution:
        "Firebase destekli gercek zamanli backend ve AI API entegrasyonlariyla React Native bir uygulama gelistirildi. Odak: mobil UX kaliplari, offline-first yapi ve native/web siniri boyunca kesintisiz durum yonetimi.",
      stack: ["React Native", "Firebase", "TypeScript", "AI APIs"],
      accentColor: "#8B5CF6",
      visualLabel: "APP",
    },
  ] as Project[],
};
