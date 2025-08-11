import { Brand } from '../types';

export const brandDatabase: Brand[] = [
  // Beauty & Skincare
  { id: '1', name: 'The Ordinary', niche: 'beauty', website: 'theordinary.com', suggestedProducts: ['Niacinamide', 'Hyaluronic Acid', 'Retinol'] },
  { id: '2', name: 'CeraVe', niche: 'beauty', website: 'cerave.com', suggestedProducts: ['Moisturizer', 'Cleanser', 'Sunscreen'] },
  { id: '3', name: 'Glossier', niche: 'beauty', website: 'glossier.com', suggestedProducts: ['Boy Brow', 'Cloud Paint', 'Balm Dotcom'] },
  { id: '4', name: 'Fenty Beauty', niche: 'beauty', website: 'fentybeauty.com', suggestedProducts: ['Foundation', 'Highlighter', 'Lipstick'] },
  { id: '5', name: 'Dot & Key', niche: 'beauty', website: 'dotandkey.com', suggestedProducts: ['Vitamin C Serum', 'Sunscreen', 'Face Wash'] },
  
  // Fashion
  { id: '6', name: 'SHEIN', niche: 'fashion', website: 'shein.com', suggestedProducts: ['Dresses', 'Tops', 'Accessories'] },
  { id: '7', name: 'Princess Polly', niche: 'fashion', website: 'princesspolly.com', suggestedProducts: ['Mini Dresses', 'Crop Tops', 'Denim'] },
  { id: '8', name: 'Reformation', niche: 'fashion', website: 'thereformation.com', suggestedProducts: ['Sustainable Dresses', 'Vintage Inspired'] },
  { id: '9', name: 'Aerie', niche: 'fashion', website: 'ae.com/aerie', suggestedProducts: ['Activewear', 'Loungewear', 'Swimwear'] },
  
  // Fitness & Health
  { id: '10', name: 'Gymshark', niche: 'fitness', website: 'gymshark.com', suggestedProducts: ['Leggings', 'Sports Bras', 'Workout Sets'] },
  { id: '11', name: 'Alo Yoga', niche: 'fitness', website: 'aloyoga.com', suggestedProducts: ['Yoga Mats', 'Athletic Wear', 'Wellness'] },
  { id: '12', name: 'Vital Proteins', niche: 'fitness', website: 'vitalproteins.com', suggestedProducts: ['Collagen', 'Protein Powder'] },
  
  // Lifestyle & Home
  { id: '13', name: 'Urban Outfitters', niche: 'lifestyle', website: 'urbanoutfitters.com', suggestedProducts: ['Home Decor', 'Vintage Clothing'] },
  { id: '14', name: 'Anthropologie', niche: 'lifestyle', website: 'anthropologie.com', suggestedProducts: ['Home & Garden', 'Unique Fashion'] },
  
  // Tech & Accessories
  { id: '15', name: 'PopSocket', niche: 'tech', website: 'popsocket.com', suggestedProducts: ['Phone Grips', 'Phone Cases'] },
  { id: '16', name: 'AirPods Pro', niche: 'tech', website: 'apple.com', suggestedProducts: ['Wireless Earbuds', 'Tech Accessories'] },
];

export function getBrandsByNiche(niche: string): Brand[] {
  const lowerNiche = niche.toLowerCase();
  return brandDatabase.filter(brand => 
    brand.niche.toLowerCase().includes(lowerNiche) ||
    brand.name.toLowerCase().includes(lowerNiche)
  );
}

export function searchBrands(query: string): Brand[] {
  const lowerQuery = query.toLowerCase();
  return brandDatabase.filter(brand =>
    brand.name.toLowerCase().includes(lowerQuery) ||
    brand.niche.toLowerCase().includes(lowerQuery) ||
    brand.suggestedProducts?.some(product => product.toLowerCase().includes(lowerQuery))
  );
}