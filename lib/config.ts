export const siteConfig = {
  name: "T.Y CULTURE", // UPDATED NAME
  tagline: "Everyday elegance for modern living", 
  description: "Handpicked bags, hand fans, face masks and beauty essentials — curated for the modern lifestyle.",
  
  currency: "NGN",
  locale: "en-NG",
  
  email: "hello@tyculture.com",
  phone: "+2348012345678",
  whatsapp: "2348012345678", 
  
  socials: {
    instagram: "https://instagram.com/tyculture",
    tiktok: "https://tiktok.com/@tyculture",
    facebook: "https://facebook.com/tyculture",
  },
  
  address: "Lagos, Nigeria",
};

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: siteConfig.currency,
    minimumFractionDigits: 0,
  }).format(amount);
};