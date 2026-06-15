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
  images: string[];
}

export const projectsByLocale = {
  en: [
    {
      id: "tonepilot",
      number: "01",
      tag: "AI Product · 2025",
      title: "TonePilot",
      problem:
        "Every day, professionals spend significant time rewriting messages to ensure they sound clear, confident, and appropriate for their audience. Small changes in tone can dramatically affect how communication is perceived, yet achieving that consistency remains difficult.",
      solution:
        "TonePilot is an AI-powered writing assistant that helps users improve communication through intelligent tone transformation and contextual rewriting. Built with Next.js, OpenAI, and a modern real-time experience, it enables users to experiment with different communication styles, compare revisions, and craft more effective messages with confidence.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Python"],
      accentColor: "#6C8EFF",
      visualLabel: "AI",
      images: [
        "/projects/tonepilot/tonepilot1.jpg",
        "/projects/tonepilot/tonepilot-2.jpg"
      ],
    },
    {
      id: "barsan",
      number: "02",
      tag: "Corporate · 2024",
      title: "Barsan Website Redesign",
      problem:
        "Barsan Global Logistics needed a modern, scalable, and maintainable digital platform. The existing website suffered from outdated frontend architecture, fragmented content management workflows, and limited flexibility for future growth.",
      solution:
        "I contributed to the redesign and redevelopment of the corporate website using Next.js and a component-driven architecture. The project included CMS integration with Strapi, Docker-based deployment workflows, reusable UI systems, and a scalable content structure that enables non-technical teams to manage content efficiently.",
      stack: ["Next.js", "Strapi CMS", "Tailwind CSS", "Docker"],
      accentColor: "#00D4FF",
      visualLabel: "CMS",
      images: [
        "/projects/barsan/barsan-1.png",
        "/projects/barsan/barsan-2.png",
        "/projects/barsan/barsan-3.png",
        "/projects/barsan/barsan-4.png",
        "/projects/barsan/barsan-5.png"
      ],
    },
    {
      id: "mobile-ai",
      number: "03",
      tag: "Mobile · 2025",
      title: "TÜBİTAK 2209-A Research Project",
      problem:
        "Finding reliable student accommodation is often a fragmented and time-consuming process. Students must compare multiple sources, verify information manually, and navigate inconsistent data when searching for suitable housing options.",
      solution:
        "Developed as a TÜBİTAK 2209-A supported university research project, this platform centralizes student accommodation data and provides an intuitive mobile experience for discovering and comparing housing options. The application combines a React Native frontend with Firebase infrastructure to deliver real-time data management, scalable architecture, and a seamless cross-platform experience.",
      stack: ["React Native", "Firebase", "TypeScript", "AI APIs"],
      accentColor: "#8B5CF6",
      visualLabel: "APP",
      images: [
        "/projects/mobile-ai/mobile-1.jpg",
        "/projects/mobile-ai/mobile-2.jpg"
      ],
    },
  ] as Project[],
  tr: [
    {
      id: "tonepilot",
      number: "01",
      tag: "Yapay Zeka Urunu · 2025",
      title: "TonePilot",
      problem:
        "Profesyonel iletişimde doğru tonu yakalamak her zaman kolay değildir. E-postalar, müşteri mesajları veya ekip içi yazışmalar gibi farklı senaryolarda; mesajın net, profesyonel ve amacına uygun olması için kullanıcılar çoğu zaman metinlerini tekrar tekrar düzenlemek zorunda kalır.",
      solution:
        "TonePilot, kullanıcıların yazılı iletişimlerini yapay zekâ desteğiyle geliştirmelerine yardımcı olan bir platformdur. OpenAI entegrasyonu ve gerçek zamanlı çalışan modern arayüzü sayesinde metinleri yeniden yazar, farklı ton alternatifleri sunar ve yapılan değişikliklerin geçmişini takip ederek daha etkili iletişim kurulmasını sağlar.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
      accentColor: "#6C8EFF",
      visualLabel: "AI",
      images: [
        "/projects/tonepilot/tonepilot1.jpg",
        "/projects/tonepilot/tonepilot-2.jpg"
      ],
    },
    {
      id: "barsan",
      number: "02",
      tag: "Kurumsal · 2024",
      title: "Barsan.com Yeniden Tasarim",
      problem:
        "Barsan Global Logistics, büyüyen içerik ihtiyaçlarını karşılayabilecek, ölçeklenebilir ve sürdürülebilir bir dijital altyapıya ihtiyaç duyuyordu. Mevcut yapı içerik güncellemelerini zorlaştırıyor, geliştirme süreçlerini yavaşlatıyor ve uzun vadeli büyüme için yeterli esnekliği sunmuyordu.",
      solution:
        "Geliştirme ekibinin bir parçası olarak kurumsal web sitesinin yeniden yapılandırılması sürecinde görev aldım. Projede Next.js, Strapi, Tailwind CSS ve Docker teknolojileri kullanılarak bileşen tabanlı modern bir mimari oluşturuldu. Bu sayede içerik yönetimi kolaylaştırıldı, performans artırıldı ve gelecekteki geliştirmeler için güçlü bir temel sağlandı.",
      stack: ["Next.js", "Strapi CMS", "Tailwind CSS", "Docker"],
      accentColor: "#00D4FF",
      visualLabel: "CMS",
      images: [
        "/projects/barsan/barsan-1.jpg",
        "/projects/barsan/barsan-2.jpg",
        "/projects/barsan/barsan-3.jpg",
        "/projects/barsan/barsan-4.jpg",
        "/projects/barsan/barsan-5.jpg"
      ],
    },
    {
      id: "mobile-ai",
      number: "03",
      tag: "Mobil · 2025",
      title: "TÜBİTAK 2209-A Araştırma Projesi",
      problem:
        "Öğrenciler için güvenilir konaklama seçeneklerine ulaşmak çoğu zaman dağınık kaynaklar nedeniyle zaman alıcı ve karmaşık bir süreçtir. Farklı platformlardan bilgi toplamak, doğruluğunu kontrol etmek ve seçenekleri karşılaştırmak önemli bir zorluk oluşturmaktadır.",
      solution:
        "Bu proje, TÜBİTAK 2209-A desteği kapsamında geliştirilen bir araştırma ve mobil uygulama projesidir. Amaç, öğrenci konaklama verilerini tek bir platformda toplayarak kullanıcıların yurt ve konaklama seçeneklerini daha kolay keşfetmesini sağlamaktır. React Native ve Firebase teknolojileri kullanılarak geliştirilen uygulama, gerçek zamanlı veri yönetimi, ölçeklenebilir altyapı ve platformlar arası tutarlı bir kullanıcı deneyimi sunmaktadır.",
      stack: ["React Native", "Firebase", "TypeScript", "AI APIs"],
      accentColor: "#8B5CF6",
      visualLabel: "APP",
      images: [
        "/projects/mobile-ai/mobile-1.jpg",
        "/projects/mobile-ai/mobile-2.jpg"
      ],
    },
  ] as Project[],
};
