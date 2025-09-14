// Project Images
import nyxMainImage from "../../public/details/nyxui.webp"
import nyxProjectImage from "../../public/projects/nyxui.webp"

import digibazaarMainImage from "../../public/details/digibazaar.webp"
import digibazaarProjectImage from "../../public/projects/digi.webp"

import storyweaverMainImage from "../../public/details/storyweaverai.webp"
import storyweaverProjectImage from "../../public/projects/story.webp"

import monsterpediaMainImage from "../../public/details/monsterpedia.webp"
import monsterpediaProjectImage from "../../public/projects/monsterpedia.webp"

import herohqMainImage from "../../public/details/herohq.webp"
import herohqProjectImage from "../../public/projects/herohq.webp"

import inkscrollMainImage from "../../public/details/inkscroll.webp"
import inkscrollProjectImage from "../../public/projects/inkscroll.webp"

import windowsPortfolioMainImage from "../../public/details/windows95portfolio.webp"
import windowsPortfolioProjectImage from "../../public/projects/portfolio.webp"

import ghibliverseMainImage from "../../public/details/ghibliverse.webp"
import ghibliverseProjectImage from "../../public/projects/ghibli.webp"

import cybersphereMainImage from "../../public/details/cybersphere.webp"
import cybersphereProjectImage from "../../public/projects/cybersphere.webp"

import certificateGeneratorMainImage from "../../public/details/certificategenerator.webp"
import certificateGeneratorProjectImage from "../../public/projects/certi.webp"

import gdscMainImage from "../../public/details/gdsc.webp"
import gdscProjectImage from "../../public/projects/gdsc.svg"

import toyMainImage from "../../public/details/toy.webp"
import toyProjectImage from "../../public/projects/toy.webp"

import citronicsMainImage from "../../public/details/citronics.webp"
import citronicsProjectImage from "../../public/projects/citro.webp"

import dreammistMainImage from "../../public/details/dreammist.webp"
import dreammistProjectImage from "../../public/projects/dreammist.jpg"

// Artwork/Drawing Images
import drawing1 from "../../public/drawings/11.webp"
import drawing2 from "../../public/drawings/2.webp"
import drawing3 from "../../public/drawings/3.webp"
import drawing4 from "../../public/drawings/4.webp"
import drawing5 from "../../public/drawings/1.webp"
import drawing7 from "../../public/drawings/10.webp"
import drawing8 from "../../public/drawings/8.webp"
import drawing10 from "../../public/drawings/6.webp"

// Export all images for easy access
export const projectImages = {
  // NYX UI
  nyxUi: {
    main: nyxMainImage,
    project: nyxProjectImage
  },
  // Digi Bazaar
  digiBazaar: {
    main: digibazaarMainImage,
    project: digibazaarProjectImage
  },
  // StoryWeaver AI
  storyweaverAi: {
    main: storyweaverMainImage,
    project: storyweaverProjectImage
  },
  // Monster Pedia
  monsterPedia: {
    main: monsterpediaMainImage,
    project: monsterpediaProjectImage
  },
  // Hero HQ
  heroHq: {
    main: herohqMainImage,
    project: herohqProjectImage
  },
  // Ink Scroll
  inkScroll: {
    main: inkscrollMainImage,
    project: inkscrollProjectImage
  },
  // Windows Portfolio
  windowsPortfolio: {
    main: windowsPortfolioMainImage,
    project: windowsPortfolioProjectImage
  },
  // Ghibli Verse
  ghibliVerse: {
    main: ghibliverseMainImage,
    project: ghibliverseProjectImage
  },
  // CyberSphere
  cyberSphere: {
    main: cybersphereMainImage,
    project: cybersphereProjectImage
  },
  // Certificate Generator
  certificateGenerator: {
    main: certificateGeneratorMainImage,
    project: certificateGeneratorProjectImage
  },
  // GDSC CDGI
  gdscCdgi: {
    main: gdscMainImage,
    project: gdscProjectImage
  },
  // Toy Sandook
  toySandook: {
    main: toyMainImage,
    project: toyProjectImage
  },
  // Citronics
  citronics: {
    main: citronicsMainImage,
    project: citronicsProjectImage
  },
  // Dream Mist
  dreamMist: {
    main: dreammistMainImage,
    project: dreammistProjectImage
  }
}

export const artworkImages = {
  danielRadcliffe: drawing5,
  leonardoDicaprio: drawing2,
  thomasShelby: drawing4,
  bakugou: drawing1,
  toukaKirishima: drawing8,
  xxxtentacion: drawing10,
  snowLeopard: drawing7,
  heisenberg: drawing3
}

// Updated projects array with static imports
export const projects = [
  {
    id: "nyx-ui",
    title: "NYX UI",
    subtitle: "UI COMPONENT LIBRARY",
    description: "A MODERN UI COMPONENT LIBRARY FOR REACT APPLICATIONS",
    category: "web development",
    image: nyxProjectImage,
    mainImage: nyxMainImage,
    details: "MODULAR COMPONENTS WITH FRAMER MOTION ANIMATIONS",
    fullDescription:
      "Nyx UI is a curated library of modular components that can be easily integrated into your web applications. It offers a versatile selection of components, blocks, and templates designed to accelerate your development process.",
    technologies: ["React", "Tailwind", "TypeScript", "Framer Motion"],
    client: "Open Source",
    year: "2024",
    link: "https://nyxui.vercel.com/",
    youtube: 'https://www.youtube.com/watch?v=E3R_lVYSuk8&ab_channel=MihirJaiswal',
  },
  {
    id: "digi-bazaar",
    title: "DIGI BAZAAR",
    subtitle: "ECOMMERCE PLATFORM",
    description: "THE ULTIMATE ECOMMERCE & WAREHOUSE MANAGEMENT SOLUTION",
    category: "full stack",
    image: digibazaarProjectImage,
    mainImage: digibazaarMainImage,
    details: "COMPREHENSIVE BUSINESS ECOSYSTEM WITH WAREHOUSE MANAGEMENT",
    fullDescription:
      "DigiBazaar is a revolutionary platform that merges eCommerce, Warehouse Management, Wholesale, and Community into a single powerful ecosystem. DigiBazaar transcends traditional eCommerce platforms by offering a full-featured business ecosystem.",
    technologies: ["Next.js", "Tailwind", "TypeScript", "Node.js", "MySQL", "Express"],
    client: "Personal",
    year: "2024",
    link: "https://github.com/MihirJaiswal/digibazaar-frontend",
    youtube: 'https://www.youtube.com/watch?v=KVnkONXLbXg&list=LL',
  },
  {
    id: "storyweaver-ai",
    title: "STORYWEAVER",
    subtitle: "AI STORY GENERATOR",
    description: "GENERATES STORY SCENES, DIALOGS, AND IMAGES BASED ON USER INPUT",
    category: "ai application",
    image: storyweaverProjectImage,
    mainImage: storyweaverMainImage,
    details: "POWERED BY QWEN MODEL AND DALL-E FOR IMAGE GENERATION",
    fullDescription:
      "StoryWeaver AI is a web application that generates story scenes, dialogs, and images based on user input plot. The project uses Qwen/QwQ-32B-Preview model for generating story scenes and dialogs, and OpenAI's DALL-E for generating images. The application is built using Next.js, Tailwind CSS, and Framer Motion to deliver an engaging and visually appealing user experience.",
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    client: "Personal Project",
    year: "2024",
    link: "https://story-weaver-ai.vercel.app/",
    youtube: 'https://youtu.be/zoQiy0SFk-o',
  },
  {
    id: "monster-pedia",
    title: "MONSTER PEDIA",
    subtitle: "POKEMON DATABASE",
    description: "COMPREHENSIVE POKEMON DATABASE WITH TOOLS AND FEATURES",
    category: "web application",
    image: monsterpediaProjectImage,
    mainImage: monsterpediaMainImage,
    details: "POKEDEX, TYPE CALCULATOR, TEAM BUILDER, AND CARD GENERATOR",
    fullDescription:
      "Monster Pedia is an interactive web application designed for Pokémon fans. It includes a comprehensive Pokédex, a type weakness calculator, a team builder, and a Pokémon card maker. The project is built using Next.js, Tailwind CSS, and Framer Motion to deliver an engaging and visually appealing user experience.",
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    client: "Personal Project",
    year: "2024",
    link: "https://monsterpedia-orcin.vercel.app/",
    youtube: 'https://www.youtube.com/watch?v=hi3fNjSSy4c&t=38s',
  },
  {
    id: "hero-hq",
    title: "HERO HQ",
    subtitle: "SUPERHERO DATABASE",
    description: "EXPLORE AND COMPARE SUPERHEROES WITH DETAILED ANALYTICS",
    category: "web application",
    image: herohqProjectImage,
    mainImage: herohqMainImage,
    details: "SUPERHERO COMPARISON WITH POWER STATS AND WIN PROBABILITY",
    fullDescription:
      "Hero HQ is a dynamic web application where users can explore details about various superheroes and compare them side by side. The comparison feature includes visual graphs of power stats, height, and a win probability indicator to help users determine the likely winner in a hypothetical match-up.",
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    client: "Personal Project",
    year: "2024",
    link: "https://hero-hq-five.vercel.app/",
    youtube: 'https://www.youtube.com/watch?v=w3m6HlIUoLw&t=46s',
  },
  {
    id: "ink-scroll",
    title: "INK SCROLL",
    subtitle: "MANGA PLATFORM",
    description: "MANGA HOSTING WEBSITE FOR UPLOADING AND READING MANGA",
    category: "web platform",
    image: inkscrollProjectImage,
    mainImage: inkscrollMainImage,
    details: "FULL-STACK PLATFORM FOR MANGA ENTHUSIASTS",
    fullDescription:
      "Inkscroll is a versatile platform designed for manga enthusiasts to host and read manga. Users can easily upload their manga creations and share them with a broader audience, as well as explore and read manga uploaded by others. The website is built using Next.js and Node.js, ensuring a fast, seamless, and dynamic user experience.",
    technologies: ["Next.js", "Node.js", "TypeScript"],
    client: "Personal Project",
    year: "2024",
    link: "https://github.com/MihirJaiswal/InkScroll",
    youtube: 'https://www.youtube.com/watch?v=uP-OGbNdiZI&t=3s',
  },
  {
    id: "windows-95-portfolio",
    title: "WINDOWS PORTFOLIO",
    subtitle: "RETRO PORTFOLIO",
    description: "NOSTALGIC PORTFOLIO WEBSITE IN WINDOWS 95 THEME",
    category: "web design",
    image: windowsPortfolioProjectImage,
    mainImage: windowsPortfolioMainImage,
    details: "NOSTALGIC DESIGN WITH MODERN FUNCTIONALITY AND EASTER EGGS",
    fullDescription:
      "A portfolio website in windows 95 theme, This project is a nostalgic journey back to the era of Windows 95, with a modern twist. Explore my work, play games, view my drawings, and much more!, also there is an easter egg in the website if you find it do let me know.",
    technologies: ["HTML", "CSS", "JavaScript"],
    client: "Personal Branding",
    year: "2024",
    link: "https://mihirjaiswalportfolio-wmtn.vercel.app/",
  },
  {
    id: "ghibli-verse",
    title: "GHIBLI VERSE",
    subtitle: "STUDIO GHIBLI DATABASE",
    description: "COMPREHENSIVE WEB APP EXPLORING STUDIO GHIBLI UNIVERSE",
    category: "web application",
    image: ghibliverseProjectImage,
    mainImage: ghibliverseMainImage,
    details: "DETAILED INFORMATION ABOUT CHARACTERS, MOVIES, AND LOCATIONS",
    fullDescription:
      "Ghibli Verse is a comprehensive web application dedicated to exploring the enchanting world of Studio Ghibli. This project provides detailed information about characters, movies, and locations from the beloved Studio Ghibli films. Used Studio Ghibli API for fetching the information about the characters, movies and locations.",
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    client: "Personal Project",
    year: "2024",
    link: "https://ghibli-verse.vercel.app/",
    youtube: 'https://www.youtube.com/watch?v=QrFH8RzUTiw&list=LL&index=3',
  },
  {
    id: "cybersphere",
    title: "CYBERSPHERE",
    subtitle: "PHISHING DETECTION",
    description: "BROWSER EXTENSION AND WEBSITE FOR PHISHING ATTACK DETECTION",
    category: "cybersecurity",
    image: cybersphereProjectImage,
    mainImage: cybersphereMainImage,
    details: "MACHINE LEARNING POWERED SECURITY SOLUTION",
    fullDescription:
      "CyberSphere is a browser extension and website designed to detect phishing attacks using machine learning techniques. The machine learning model is trained using XGBoost, Random Forest, Decision Tree, and SVM algorithms.The machine learning models are trained on a dataset consisting of over 30,000 samples.It provides Browser extension for real-time phishing detection while browsing.",
    technologies: ["React", "Tailwind", "M.L."],
    client: "Academic Project",
    year: "2024",
    link: "https://cyber-sphere-minor-project.vercel.app/",
  },
  {
    id: "certificate-generator",
    title: "Certi Gen",
    subtitle: "AUTOMATION TOOL",
    description: "GENERATE AND CUSTOMIZE CERTIFICATES FOR FREE",
    category: "web tool",
    image: certificateGeneratorProjectImage,
    mainImage: certificateGeneratorMainImage,
    details: "CUSTOMIZABLE TEMPLATES WITH AUTOMATED NAME INSERTION",
    fullDescription:
      "From customizable templates to automated name insertion, our tool makes certificate generation simple and efficient, perfect for events, and more.",
    technologies: ["React", "SCSS", "Material-UI"],
    client: "Open Source",
    year: "2024",
    link: "https://certificate-generator-rust.vercel.app/",
  },
  {
    id: "gdsc-cdgi-website",
    title: "GDSC CDGI WEBSITE",
    subtitle: "COMMUNITY WEBSITE",
    description: "THE OFFICIAL WEBSITE OF GDSC CDGI",
    category: "web development",
    image: gdscProjectImage,
    mainImage: gdscMainImage,
    details: "MODERN RESPONSIVE DESIGN FOR DEVELOPER COMMUNITY",
    fullDescription:
      "The official website of GDSC CDGI. The website is made using Next.js, Tailwind, and TypeScript. The website is designed and developed by Mihir Jaiswal.",
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    client: "GDSC CDGI",
    year: "2024",
    link: "https://github.com/MihirJaiswal/gdscwebsite",
  },
  {
    id: "toy-sandook",
    title: "TOY SANDOOK",
    subtitle: "ECOMMERCE WEBSITE",
    description: "TOY STORE WEBSITE BUILT FOR CLIENT",
    category: "client work",
    image: toyProjectImage,
    mainImage: toyMainImage,
    details: "FULL-STACK ECOMMERCE SOLUTION WITH DATABASE INTEGRATION",
    fullDescription:
      "Toy Sandook is a website that I made for a client. The website is made using Next.js, MongoDB, and Express. The website is designed and developed by Mihir Jaiswal.",
    technologies: ["Next.js", "MongoDB", "Express"],
    client: "Commercial Client",
    year: "2024",
    link: "https://github.com/MihirJaiswal/toyshopweb",
  },
  {
    id: "citronics-website",
    title: "CITRONICS WEBSITE",
    subtitle: "EVENT WEBSITE",
    description: "ANNUAL TECHNO-MANAGEMENT FEST WEBSITE FOR CDGI, INDORE",
    category: "event website",
    image: citronicsProjectImage,
    mainImage: citronicsMainImage,
    details: "VIBRANT DESIGN FOR COLLEGE TECHNICAL FESTIVAL",
    fullDescription:
      "Citronics is an annual techno-management fest of CDGI, Indore. The website is made using HTML, Tailwind, and JavaScript. The website is designed and developed by Mihir Jaiswal.",
    technologies: ["HTML", "Tailwind", "JavaScript"],
    client: "CDGI College",
    year: "2024",
    link: "https://mihirjaiswal.github.io/Citronics-website2024/",
  },
  {
    id: "dream-mist",
    title: "DREAM MIST",
    subtitle: "POKEMON GAME",
    description: "IMMERSIVE POKEMON GAME BUILT WITH HTML CANVAS",
    category: "game development",
    image: dreammistProjectImage,
    mainImage: dreammistMainImage,
    details: "RICH GAMEPLAY WITH TOWNS, SHOPS, AND INTERACTIVE ELEMENTS",
    fullDescription:
      "Dream Mist is an immersive Pokémon game built using HTML canvas, offering players a rich and dynamic experience.Explore vibrant towns and cities filled with shops, and hidden secrets. Dream Mist provides a captivating adventure filled with visual flair and interactive gameplay.",
    technologies: ["HTML", "JavaScript", "CSS"],
    client: "Personal Project",
    year: "2024",
    link: "https://mihirjaiswal.github.io/DreamMist/",
  },
];

// Updated artworks array with static imports
export const artworks = [
  {
    id: 1,
    title: "Van Gogh",
    year: "2023",
    medium: "Painting",
    imageUrl: drawing5
  },
  {
    id: 2,
    title: "Leonardo Dicaprio",
    year: "2022",
    medium: "Sketch",
    imageUrl: drawing2
  },
  {
    id: 3,
    title: "Thomaas Shelby",
    year: "2022",
    medium: "Sketch",
    imageUrl: drawing4
  },
  {
    id: 4,
    title: "Bakugou",
    year: "2020",
    medium: "Pencil Colors",
    imageUrl: drawing1
  },
  {
    id: 5,
    title: "Touka Kirishima",
    year: "2020",
    medium: "Pencil Colors",
    imageUrl: drawing8
  },
  {
    id: 6,
    title: "Eijiro",
    year: "2022",
    medium: "Sketch",
    imageUrl: drawing10
  },
  {
    id: 7,
    title: "xxxtentacion",
    year: "2022",
    medium: "Pen Sketch",
    imageUrl: drawing7
  },
  {
    id: 8,
    title: "Heisenberg",
    year: "2022",
    medium: "Sketch",
    imageUrl: drawing3
  }
];