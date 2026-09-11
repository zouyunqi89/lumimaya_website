/* Lumimaya product catalog (placeholder data — replace with real products before launch) */
const PRODUCTS = [
  {
    id: 1, no: "NO.123", name: "Daytona Flared Blouse",
    category: "tops", scene: "daily", fabric: "100% cotton",
    colors: ["cream", "black", "beige"], sizes: ["XS","S","M","L","XL","2XL","3XL"],
    price: 89, isNew: true, isBestSeller: true, img: "images/product-1.jpg",
    care: ["Machine wash cold gentle with like colours", "Use mild detergent", "Do not tumble dry", "Do not bleach", "Iron on medium heat", "Store in a cool, dry place", "Avoid direct sunlight to prevent fading"],
    desc: "A relaxed flared blouse with a Mandarin knot button opening, straight cutting and an unwired collar. Comfortable for daily wear in tropical weather."
  },
  {
    id: 2, no: "NO.124", name: "Aria Kurung Moden",
    category: "baju-kurung", scene: "office", fabric: "Premium crepe",
    colors: ["navy", "maroon"], sizes: ["S","M","L","XL","2XL"],
    price: 259, isNew: true, isBestSeller: true, img: "images/product-2.jpg",
    care: ["Hand wash cold", "Do not bleach", "Hang dry in shade", "Cool iron on reverse"],
    desc: "Modern-cut baju kurung with clean lines and a subtle A-line skirt. Suitable for office and formal occasions."
  },
  {
    id: 3, no: "NO.125", name: "Melur Kebaya Lace",
    category: "baju-kebaya", scene: "festive", fabric: "Lace / brocade",
    colors: ["red", "purple"], sizes: ["S","M","L","XL"],
    price: 299, isNew: false, isBestSeller: true, img: "images/product-3.jpg",
    care: ["Dry clean recommended", "Do not tumble dry", "Store flat"],
    desc: "Elegant kebaya with floral lace detailing and traditional curved hem. A festive favourite for celebrations and weddings."
  },
  {
    id: 4, no: "NO.126", name: "Senja Pleated Skirt",
    category: "skirts", scene: "daily", fabric: "Chiffon lining, pleated georgette",
    colors: ["black", "blue"], sizes: ["XS","S","M","L","XL","2XL"],
    price: 119, isNew: false, isBestSeller: false, img: "images/product-4.jpg",
    care: ["Machine wash cold in garment bag", "Do not bleach", "Low iron"],
    desc: "Lightweight pleated midi skirt with an elastic back waist. Easy to match for daily or office looks."
  },
  {
    id: 5, no: "NO.127", name: "Lestari Wide-Leg Pants",
    category: "pants", scene: "office", fabric: "Linen blend",
    colors: ["beige", "black"], sizes: ["S","M","L","XL","2XL","3XL"],
    price: 139, isNew: false, isBestSeller: false, img: "images/product-5.jpg",
    care: ["Machine wash cold", "Iron while damp", "Do not tumble dry"],
    desc: "High-waist wide-leg pants in breathable linen blend. Sharp enough for the office, comfortable all day."
  },
  {
    id: 6, no: "NO.128", name: "Cahaya Tudung",
    category: "tudung", scene: "daily", fabric: "Cotton voile",
    colors: ["black", "cream", "pink", "green"], sizes: ["S","M","L"],
    price: 45, isNew: true, isBestSeller: false, img: "images/product-6.jpg",
    care: ["Hand wash cold", "Do not wring", "Air dry", "No iron needed"],
    desc: "Soft cotton voile headscarf with neat stitching and an easy drape. Everyday essential in versatile colours."
  },
  {
    id: 7, no: "NO.129", name: "Embun Maxi Dress",
    category: "dresses", scene: "holiday", fabric: "Rayon",
    colors: ["blue", "multicolor"], sizes: ["XS","S","M","L","XL"],
    price: 189, isNew: false, isBestSeller: true, img: "images/product-7.jpg",
    care: ["Machine wash cold gentle", "Do not bleach", "Hang dry", "Cool iron"],
    desc: "Flowing maxi dress in cool rayon with a subtle waist tie. Made for holidays and breezy weekends."
  },
  {
    id: 8, no: "NO.130", name: "Rimba Print Blouse",
    category: "tops", scene: "holiday", fabric: "100% cotton",
    colors: ["green", "multicolor"], sizes: ["S","M","L","XL"],
    price: 99, isNew: false, isBestSeller: false, img: "images/product-8.jpg",
    care: ["Machine wash cold", "Wash inside out", "Do not tumble dry"],
    desc: "Tropical-print blouse with a relaxed camp collar. Brings holiday mood to any outfit."
  },
  {
    id: 9, no: "NO.131", name: "Cempaka Kurung Cotton",
    category: "baju-kurung", scene: "daily", fabric: "Cotton poplin",
    colors: ["yellow", "white"], sizes: ["XS","S","M","L","XL","2XL","3XL"],
    price: 229, isNew: true, isBestSeller: false, img: "images/product-9.jpg",
    care: ["Machine wash cold", "Warm iron", "Do not bleach"],
    desc: "Classic baju kurung in crisp cotton poplin — a breathable everyday traditional set."
  },
  {
    id: 10, no: "NO.132", name: "Mega Raya Set",
    category: "dresses", scene: "festive", fabric: "Satin finish jacquard",
    colors: ["gold", "maroon"], sizes: ["S","M","L","XL"],
    price: 349, isNew: true, isBestSeller: true, img: "images/product-10.jpg",
    care: ["Dry clean recommended", "Cool iron on reverse", "Store on hanger"],
    desc: "Festive Raya set with jacquard sheen and matching scarf. Limited festive collection."
  },
  {
    id: 11, no: "NO.133", name: "Anggun Office Shirt",
    category: "tops", scene: "office", fabric: "Cotton oxford",
    colors: ["white", "blue"], sizes: ["XS","S","M","L","XL","2XL"],
    price: 109, isNew: false, isBestSeller: false, img: "images/product-11.jpg",
    care: ["Machine wash warm", "Medium iron", "Tumble dry low"],
    desc: "Crisp oxford shirt with a modest relaxed fit. A wardrobe staple for professional settings."
  },
  {
    id: 12, no: "NO.134", name: "Sutera Slip Skirt",
    category: "skirts", scene: "holiday", fabric: "Silk-touch satin",
    colors: ["purple", "beige"], sizes: ["XS","S","M","L","XL"],
    price: 129, isNew: false, isBestSeller: false, img: "images/product-12.jpg",
    care: ["Hand wash cold", "Do not wring", "Cool iron", "Dry in shade"],
    desc: "Bias-cut satin slip skirt with a gentle sheen. Dresses up any evening or holiday look."
  }
];

const CATEGORIES = [
  { id: "tops", en: "Tops", zh: "上衣" },
  { id: "dresses", en: "Dresses", zh: "连衣裙" },
  { id: "skirts", en: "Skirts", zh: "半裙" },
  { id: "pants", en: "Pants", zh: "裤子" },
  { id: "tudung", en: "Tudung", zh: "头巾" },
  { id: "baju-kurung", en: "Baju Kurung", zh: "传统马来服·古笼装" },
  { id: "baju-kebaya", en: "Baju Kebaya", zh: "传统马来服·可峇雅" }
];

const SCENES = [
  { id: "daily", en: "Daily wear", zh: "日常穿搭" },
  { id: "holiday", en: "Holiday", zh: "度假" },
  { id: "festive", en: "Festive 节日庆典", zh: "节日庆典" },
  { id: "office", en: "Office", zh: "办公" }
];

const COLOR_HEX = {
  black: "#222222", cream: "#f2e8d5", white: "#ffffff", beige: "#d9c7a7",
  brown: "#7a5230", yellow: "#e7c63c", orange: "#e08a2e", red: "#b3364a",
  pink: "#e8a7b8", purple: "#7d5ba6", blue: "#3d6b9e", green: "#4a7d5c",
  navy: "#24344d", maroon: "#6e2b3a", gold: "#c9a227", multicolor: "multicolor"
};
