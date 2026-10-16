/**
 * Dish photograph resolution utility for TASTE OF Pulao's Shreyas Grand
 * Maps every dish to an authentic, high-definition culinary image based on cuisine category and recipe attributes.
 */

export const FOOD_IMAGES = {
  andhraChickenPulao: '/src/assets/images/food_andhra_chicken_pulao_1792160600012.jpg',
  muttonBiryaniPot: '/src/assets/images/food_mutton_biryani_pot_1792160601752.jpg',
  biryaniPlatter: '/src/assets/images/food_biryani_platter_1792160337933.jpg',
  vegPulaoSpread: '/src/assets/images/hero_pulao_spread_1792134326469.jpg',
  andhraKodiVepudu: '/src/assets/images/food_andhra_kodi_vepudu_1792160601871.jpg',
  crispyChilliPaneer: '/src/assets/images/food_crispy_chilli_paneer_1792160601911.jpg',
  tandooriPlatter: '/src/assets/images/food_tandoori_platter_1792160620645.jpg',
  tandooriTikka: '/src/assets/images/food_tandoori_tikka_1792160338858.jpg',
  spicyPrawnsFry: '/src/assets/images/food_spicy_prawns_fry_1792160621594.jpg',
  chineseNoodles: '/src/assets/images/food_chinese_noodles_1792160339341.jpg',
  chineseManchowSoup: '/src/assets/images/food_chinese_manchow_soup_1792160621459.jpg',
  curryMasala: '/src/assets/images/food_curry_paneer_1792160339732.jpg',
  butterNaanBasket: '/src/assets/images/food_butter_naan_basket_1792160620891.jpg',
  dessertGulabJamun: '/src/assets/images/food_dessert_gulabjamun_1792160340110.jpg',
  beverageShake: '/src/assets/images/food_beverage_shake_1792160676551.jpg',
};

export function getDishImage(item: {
  name: string;
  category?: string;
  subCategory?: string;
  isVegetarian?: boolean;
  image?: string;
}): string {
  // If an explicit valid custom image is provided and exists, return it
  if (item.image && item.image.trim() !== '') {
    return item.image;
  }

  const name = item.name.toLowerCase();
  const category = (item.category || '').toLowerCase();
  const isVeg = !!item.isVegetarian;

  // 1. Seafood / Fish / Prawns
  if (
    name.includes('prawn') ||
    name.includes('royyala') ||
    name.includes('fish') ||
    name.includes('apollo') ||
    name.includes('loose prawn') ||
    name.includes('golden prawn')
  ) {
    return FOOD_IMAGES.spicyPrawnsFry;
  }

  // 2. Mutton specialties
  if (name.includes('mutton') || name.includes('lamb') || name.includes('gosht')) {
    return FOOD_IMAGES.muttonBiryaniPot;
  }

  // 3. Soups
  if (category === 'chinese_soups' || name.includes('soup') || name.includes('shorba')) {
    return FOOD_IMAGES.chineseManchowSoup;
  }

  // 4. Indian Breads
  if (
    category === 'indian_breads' ||
    name.includes('naan') ||
    name.includes('roti') ||
    name.includes('kulcha') ||
    name.includes('paratha') ||
    name.includes('bread')
  ) {
    return FOOD_IMAGES.butterNaanBasket;
  }

  // 5. Beverages, Shakes & Drinks
  if (
    category === 'beverages_and_shakes' ||
    name.includes('shake') ||
    name.includes('milk') ||
    name.includes('lassi') ||
    name.includes('juice') ||
    name.includes('soda') ||
    name.includes('mojito') ||
    name.includes('beverage') ||
    name.includes('water')
  ) {
    return FOOD_IMAGES.beverageShake;
  }

  // 6. Desserts, Sweets & Ice Creams
  if (
    category === 'desserts_and_icecreams' ||
    name.includes('jamun') ||
    name.includes('apricot') ||
    name.includes('ice cream') ||
    name.includes('icecream') ||
    name.includes('sweet') ||
    name.includes('halwa') ||
    name.includes('dessert')
  ) {
    return FOOD_IMAGES.dessertGulabJamun;
  }

  // 7. Noodles & Fried Rice
  if (
    category === 'rice_and_noodles' ||
    name.includes('noodle') ||
    name.includes('fried rice') ||
    name.includes('schezwan rice') ||
    name.includes('singapore rice')
  ) {
    return FOOD_IMAGES.chineseNoodles;
  }

  // 8. Tandoori Tikka / Kebabs
  if (
    name.includes('tikka') ||
    name.includes('seekh') ||
    name.includes('hariyali') ||
    name.includes('malai') ||
    name.includes('kebab') ||
    name.includes('kabab')
  ) {
    return FOOD_IMAGES.tandooriTikka;
  }

  // 9. Whole Tandoori / Sizzlers
  if (
    category === 'tandoori_starters' ||
    name.includes('tandoori') ||
    name.includes('tangdi') ||
    name.includes('kalmi') ||
    name.includes('joint')
  ) {
    return FOOD_IMAGES.tandooriPlatter;
  }

  // 10. South Indian / Andhra Spicy Chicken Starters & Fries
  if (
    !isVeg &&
    (name.includes('vepudu') ||
      name.includes('roast') ||
      name.includes('fry') ||
      name.includes('65') ||
      name.includes('pepper') ||
      name.includes('lollipop') ||
      name.includes('drumstick') ||
      name.includes('guntur') ||
      name.includes('kodi') ||
      category === 'south_indian_starters')
  ) {
    return FOOD_IMAGES.andhraKodiVepudu;
  }

  // 11. Curries, Gravies & Main Course
  if (
    category === 'main_course' ||
    name.includes('curry') ||
    name.includes('masala') ||
    name.includes('gravy') ||
    name.includes('kadai') ||
    name.includes('butter masala') ||
    name.includes('dal') ||
    name.includes('korma')
  ) {
    return FOOD_IMAGES.curryMasala;
  }

  // 12. Vegetarian Starters (Paneer, Crispy Veg, Gobi, Mushroom)
  if (
    isVeg &&
    (name.includes('paneer') ||
      name.includes('gobi') ||
      name.includes('manchurian') ||
      name.includes('crispy') ||
      name.includes('corn') ||
      name.includes('mushroom') ||
      name.includes('chilli') ||
      category === 'chinese_starters' ||
      category === 'south_indian_starters')
  ) {
    return FOOD_IMAGES.crispyChilliPaneer;
  }

  // 13. Pulao Specials
  if (category === 'taste_of_pulao' || name.includes('pulao')) {
    if (isVeg || name.includes('veg') || name.includes('paneer') || name.includes('kaju') || name.includes('jeera')) {
      return FOOD_IMAGES.vegPulaoSpread;
    }
    return FOOD_IMAGES.andhraChickenPulao;
  }

  // 14. Biryanis & Combos
  if (category === 'biryani' || category === 'special_combos' || name.includes('biryani')) {
    if (name.includes('mutton')) {
      return FOOD_IMAGES.muttonBiryaniPot;
    }
    if (isVeg) {
      return FOOD_IMAGES.vegPulaoSpread;
    }
    return FOOD_IMAGES.biryaniPlatter;
  }

  // Default fallback according to vegetarian indicator
  return isVeg ? FOOD_IMAGES.vegPulaoSpread : FOOD_IMAGES.andhraChickenPulao;
}
