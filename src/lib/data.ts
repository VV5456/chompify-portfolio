export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  depthLayer: number;
  commissionStatus: "Available for Commission" | "Commissioned Work" | "Personal Piece";
  description: string;
  imageSrc: string;
}

export const ARTWORKS: Artwork[] = [
  { 
    id: "royal", 
    title: "Royalty", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Personal Piece",
    description: "An elegant character study featuring ornate regal details, rich warm tones, and intricate digital textures.",
    imageSrc: "/artworks/Royal.JPG" 
  },
  { 
    id: "river-walk", 
    title: "The Lady by the Lotus Lake", 
    medium: "Digital Art", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Personal Piece",
    description: "Atmospheric landscape composition exploring serene water reflections and peaceful natural surroundings.",
    imageSrc: "/artworks/River Walk.JPG" 
  },
  { 
    id: "blue-hair", 
    title: "The Blue-haired Queen", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Commissioned Work",
    description: "Captivating portrait illustration featuring vibrant blue hair, expressive facial lighting, and smooth color transitions.",
    imageSrc: "/artworks/Blue Hair.jpg" 
  },
  { 
    id: "portrait", 
    title: "Calm Before the Storm", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Commissioned Work",
    description: "Captivating portrait illustration focusing on expressive facial lighting and smooth color transitions.",
    imageSrc: "/artworks/Portrait.JPG" 
  },
  { 
    id: "ravana", 
    title: "Rani, The Protector", 
    medium: "Digital Illustration", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Commissioned Work",
    description: "A dramatic narrative illustration depicting a mother protecting her child within a grand palace hall, confronting the imposing figure of Ravana.",
    imageSrc: "/artworks/Ravana.jpg" 
  },
  { 
    id: "img-0005", 
    title: "Velvet Reverie", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Commissioned Work",
    description: "Expressive character portrait featuring rich velvet tones and luminous digital brushwork.",
    imageSrc: "/artworks/IMG_0005.JPG" 
  },
  { 
    id: "img-0927", 
    title: "Sunlit Reflections", 
    medium: "Digital Illustration", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Commissioned Work",
    description: "Atmospheric illustration exploring warm sunlight reflections and delicate linework.",
    imageSrc: "/artworks/IMG_0927.PNG" 
  },
  { 
    id: "img-0929", 
    title: "Serenade in Gold", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 3,
    commissionStatus: "Commissioned Work",
    description: "Luminous character concept painting painted with warm golden accents.",
    imageSrc: "/artworks/IMG_0929.PNG" 
  },
  { 
    id: "img-0930", 
    title: "Ethereal Shadows", 
    medium: "Digital Art", 
    year: "2026", 
    depthLayer: 3,
    commissionStatus: "Personal Piece",
    description: "Dramatic lighting exploration blending high-contrast shadow play with organic forms.",
    imageSrc: "/artworks/IMG_0930.PNG" 
  },
  { 
    id: "img-0931", 
    title: "Mystic Aura", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Personal Piece",
    description: "Enchanting character portrait painted with rich color palettes and soft atmospheric depth.",
    imageSrc: "/artworks/IMG_0931.PNG" 
  },
  { 
    id: "img-0933", 
    title: "I see you", 
    medium: "Digital Art", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Commissioned Work",
    description: "Vibrant visual story capturing summer highlights and smooth color transitions.",
    imageSrc: "/artworks/IMG_0933.PNG" 
  },
  { 
    id: "img-0935", 
    title: "Golden Reverie", 
    medium: "Mixed Media", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Personal Piece",
    description: "Stylized character art exploring warm afternoon light and expressive digital linework.",
    imageSrc: "/artworks/IMG_0935.PNG" 
  },
  { 
    id: "img-0961", 
    title: "Girls' night out", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Commissioned Work",
    description: "Stylized portrait painting depicting soft cosmic lighting and ambient atmosphere.",
    imageSrc: "/artworks/IMG_0961.PNG" 
  },
  { 
    id: "img-1023", 
    title: "windows to the soul", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 3,
    commissionStatus: "Commissioned Work",
    description: "Quiet contemplative scene featuring delicate floral elements and subtle pastel hues.",
    imageSrc: "/artworks/IMG_1023.PNG" 
  },
  { 
    id: "img-1129", 
    title: "Intertwined", 
    medium: "Digital Illustration", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Commissioned Work",
    description: "Rich narrative artwork depicting magical atmosphere and stylized environment lighting.",
    imageSrc: "/artworks/IMG_1129.png" 
  },
  { 
    id: "img-1150", 
    title: "grumpy x sunshine", 
    medium: "Digital Illustration", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Commissioned Work",
    description: "Vibrant fantasy illustration with glowing ethereal accents and luminous character design.",
    imageSrc: "/artworks/IMG_1150.PNG" 
  },
  { 
    id: "untitled-artwork-main", 
    title: "Royal portrait", 
    medium: "Digital Painting", 
    year: "2026", 
    depthLayer: 1,
    commissionStatus: "Commissioned Work",
    description: "High-detail digital artwork highlighting cinematic composition and expressive color choices.",
    imageSrc: "/artworks/Untitled_Artwork.png" 
  },
  { 
    id: "untitled-artwork-1", 
    title: "The bittersweet threat", 
    medium: "Digital Art", 
    year: "2026", 
    depthLayer: 2,
    commissionStatus: "Commissioned Work",
    description: "Soft ambient illustration capturing dawn light over gentle architectural contours.",
    imageSrc: "/artworks/Untitled_Artwork(1).png" 
  },
  { 
    id: "untitled-artwork-2", 
    title: "The Artist", 
    medium: "Digital Illustration", 
    year: "2026", 
    depthLayer: 3,
    commissionStatus: "Commissioned Work",
    description: "Dynamic visual piece emphasizing strong silhouettes and vibrant accent colors.",
    imageSrc: "/artworks/Untitled_Artwork(2).png" 
  },
  { 
    id: "a1dff15b", 
    title: "Sand and Scales", 
    medium: "Digital Art", 
    year: "2026", 
    depthLayer: 3,
    commissionStatus: "Commissioned Work",
    description: "Intricate concept design exploring architectural depth and narrative storytelling.",
    imageSrc: "/artworks/A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg" 
  }
];

export interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  sketch: number;
  flatColours: number;
  fullRender: number;
  bgImage: string;
  bgTitle: string;
}

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: "headshots",
    title: "HEADSHOTS",
    subtitle: "Expressive portrait focused from the shoulders up",
    sketch: 20,
    flatColours: 30,
    fullRender: 50,
    bgImage: "/artworks/IMG_0930.PNG",
    bgTitle: "Ethereal Shadows",
  },
  {
    id: "half-body",
    title: "HALF-BODY",
    subtitle: "Mid-length figure illustration from waist up",
    sketch: 40,
    flatColours: 50,
    fullRender: 70,
    bgImage: "/artworks/IMG_0961.PNG",
    bgTitle: "Girls' night out",
  },
  {
    id: "full-body",
    title: "FULL-BODY",
    subtitle: "Complete figure artwork with dynamic pose",
    sketch: 60,
    flatColours: 70,
    fullRender: 90,
    bgImage: "/artworks/Untitled_Artwork.png",
    bgTitle: "Royal portrait",
  },
];

export const ADDITIONAL_FEES = [
  { label: "Additional Character", value: "+100%" },
  { label: "Commercial Use Fee", value: "+50%" },
  { label: "Merchandising Fee", value: "+40%" },
];

export const BOOK_COVER_PRICING = {
  title: "Book Covers, Endpaper Illustrations",
  subtitle: "Full-scale custom artwork tailored for book covers, jackets, and endpaper spreads.",
  startingRate: 250,
  rateDisplay: "$250 onwards",
  features: [
    "depends on complexity",
    "commercial license included!"
  ]
};

export const PRICING_NOTES = {
  background: "$20–$80 depending on background complexity",
  discount: "10% off when purchasing 3 or more character art pieces.",
  disclaimer: "Rates displayed are an investment guide to help plan your commission. Final quotes are confirmed after project inquiry based on specific requirements.",
};

export const PRICING_TIERS = PRICING_CATEGORIES;



