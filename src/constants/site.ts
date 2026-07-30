import { ROUTES } from "./routes";

/** Brand + contact facts sourced from the Figma design. */
export const SITE = {
  name: "Powerfit",
  legalName: "Multi Gym Premium Powerfit",
  tagline: "JUST BELIEVE YOUR TRAINER",
  secondaryTagline: "Transform Your Body, Transform Your Life",
  description:
    "Multi Gym Premium Powerfit is the largest premium gym facility in the Mohammadpur / Lalmatia area. Soundproof 4K TV environment, dedicated ladies floor, steam & sauna, custom exercise programs, and expert dietitians.",
  locale: "en_US",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hotline: "+880 1313-197426",
  email: "info@powerfit.com.bd",
  admissionFee: 3500,
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/powerfit",
  instagram: "https://instagram.com/powerfit",
  youtube: "https://youtube.com/@powerfit",
  linkedin: "https://linkedin.com/company/powerfit",
  twitter: "https://x.com/powerfit",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation, in the order shown in the Figma top bar. */
export const MAIN_NAV: readonly NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: ROUTES.about },
  { label: "Team", href: ROUTES.team },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Equipment", href: ROUTES.equipment },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact Us", href: ROUTES.contact },
];

export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Team", href: ROUTES.team },
  { label: "Equipment", href: ROUTES.equipment },
  { label: "Contact", href: ROUTES.contact },
];

export const FOOTER_LEGAL_LINKS: readonly NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

/** Opening hours as rendered in the footer and on the pricing page. */
export const OPERATING_HOURS = [
  { days: "Sat - Thu", time: "7:00 AM - 11:00 PM" },
  { days: "Friday", time: "Closed" },
] as const;

export const HOURS_NOTE =
  "* Separate co-ed and ladies-only floor schedules available daily.";

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  image: string;
}

/** The three Powerfit branches shown on Home and Contact. */
export const BRANCHES: readonly Branch[] = [
  {
    id: "adabor",
    name: "Multi Gym Premium Power Fit — Adabor",
    address:
      "5th & 6th Floors, 48/49 Jonota Cooperative Housing Society, Ring Road, Shyamoli, Adabor, Dhaka-1207.",
    phone: "+880 1313-197426",
    mapUrl: "https://maps.google.com/?q=Adabor+Shyamoli+Dhaka",
    image: "/images/branches/adabor.jpg",
  },
  {
    id: "shia-masjid",
    name: "Multi Gym Premium — Shiya Masjid",
    address:
      "24/1, 24/2 (3rd & 4th Floor), Ring Road, Shiya Masjid Mor, Mohammadpur, Dhaka-1207.",
    phone: "+880 1313-197435",
    mapUrl: "https://maps.google.com/?q=Shia+Masjid+Mohammadpur+Dhaka",
    image: "/images/branches/shia-masjid.jpg",
  },
  {
    id: "lalmatia",
    name: "Multi Gym Premium — Lalmatia",
    address:
      "Lalmatia Shopping Center (2nd Floor), Lalmatia New Colony, Beside Fire Service & Civil Defence (Fire Brigade), Dhaka-1207.",
    phone: "+880 1313-197427",
    mapUrl: "https://maps.google.com/?q=Lalmatia+Dhaka",
    image: "/images/branches/lalmatia.jpg",
  },
];

export interface PriceItem {
  package: string;
  price: string;
  notes?: string;
  featured?: boolean;
}

/** Standard Individual Membership Packages */
export const MEMBERSHIP_PACKAGES: readonly PriceItem[] = [
  { package: "Admission Fee", price: "3,500 BDT", notes: "One-time Lifetime Registration (No re-admission fee)" },
  { package: "Monthly Fee", price: "2,500 BDT", notes: "Standard monthly rate" },
  { package: "Daily Basis Package", price: "600 BDT", notes: "Single day access" },
  { package: "Weekly Package", price: "2,000 BDT", notes: "7-day full access" },
  { package: "1 Month Package", price: "5,000 BDT" },
  { package: "3 Month Package", price: "9,000 BDT" },
  { package: "6 Month Package", price: "16,000 BDT", featured: true },
  { package: "12 Month Package", price: "28,000 BDT", featured: true },
  { package: "24 Month Package", price: "45,000 BDT" },
];

/** Special / Group / Corporate Packages */
export const PACKAGE_CATEGORY: readonly PriceItem[] = [
  { package: "Personal Package", price: "14,500 BDT", notes: "1 Month / 1 Person (1-on-1 PT)" },
  { package: "Couple Package", price: "30,000 BDT", notes: "6 Months / 2 Persons" },
  { package: "Silver Package", price: "70,000 BDT", notes: "6 Months / 5 Persons" },
  { package: "Gold Package", price: "180,000 BDT", notes: "12 Months / 7 Persons", featured: true },
  { package: "Platinum Package", price: "200,000 BDT", notes: "12 Months / 9 Persons", featured: true },
];

/** Lockers & Spa Add-ons */
export const ADDON_PRICING: readonly PriceItem[] = [
  { package: "Steam Bath (Daily)", price: "100 BDT", notes: "1 time per day" },
  { package: "Sauna Bath (Daily)", price: "150 BDT", notes: "1 time per day" },
  { package: "Rental Locker (1 Month)", price: "700 BDT" },
  { package: "Rental Locker (3 Months)", price: "2,000 BDT" },
  { package: "Rental Locker (6 Months)", price: "4,000 BDT" },
  { package: "Rental Locker (12 Months)", price: "6,000 BDT" },
];

/** Admission Requirements */
export const ADMISSION_REQUIREMENTS = [
  "One Copy of Recent Photograph (Passport Size)",
  "Copy of NID / Passport / Birth Certificate",
] as const;

/** Facility Highlights */
export const FACILITY_HIGHLIGHTS = [
  "The largest MULTI GYM PREMIUM in Mohammadpur / Lalmatia Area",
  "Soundproof and 4K TV environment",
  "Separate floors for men and women (Dedicated Ladies Floor)",
  "Custom Exercise Program by Expert & Qualified Trainer",
  "Custom Meal Plan by Nutritionist or Registered Dietitian",
  "Professional Trainer-led Zumba classes",
  "Yoga & Meditation classes conducted daily",
  "Individual exercise programs & Athletes area available",
  "Personal lockers and regular lockers available",
  "Shower facilities & fully air-conditioned",
  "Steam bath & Sauna bath available",
  "Free Wi-Fi available & Open Saturday to Thursday",
] as const;

/** All Services Offered */
export const SERVICES_LIST = [
  { title: "Building Healthy Lifestyle & Habit", category: "Wellness" },
  { title: "Strength Training", category: "Fitness" },
  { title: "Cardio Training", category: "Endurance" },
  { title: "Body Building", category: "Physique" },
  { title: "CrossFit Workout", category: "Conditioning" },
  { title: "Training for Women", category: "Ladies Only" },
  { title: "Aerobics Dance & Zumba", category: "Group Fitness" },
  { title: "Yoga & Meditation", category: "Mind & Body" },
  { title: "Fat Loss Program", category: "Transform" },
  { title: "Nutrition & Diet Consultation", category: "Health" },
  { title: "Personal Training", category: "1-on-1 Coaching" },
  { title: "Customized Workout Plans", category: "Tailored" },
] as const;

export interface LeadershipMessage {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  quote: string;
  paragraphs: readonly string[];
}

export const LEADERSHIP_MESSAGES: readonly LeadershipMessage[] = [
  {
    id: "managing-director",
    name: "Abul Kalam Azad",
    role: "Managing Director, PowerFit",
    badge: "Managing Director",
    image: "/images/leadership/abul-kalam-azad.jpg",
    quote: "Our vision is to create a fitness destination where people can improve their health, build confidence, and achieve lasting results.",
    paragraphs: [
      "Welcome to PowerFit.",
      "Our vision is to create a fitness destination where people can improve their health, build confidence, and achieve lasting results. At PowerFit, we are committed to providing a premium fitness experience through world-class equipment, professional trainers, modern facilities, and outstanding member support.",
      "We believe that every fitness journey is unique. Whether your goal is weight loss, muscle building, strength training, or overall wellness, our team is dedicated to helping you reach your full potential in a safe and motivating environment.",
      "Thank you for choosing PowerFit as your fitness partner. We are honored to be part of your journey and remain committed to helping you become the best version of yourself.",
    ],
  },
  {
    id: "director",
    name: "Col Md Boney Yiamin",
    role: "Director, PowerFit",
    badge: "Director",
    image: "/images/leadership/col-boney-yeamin.jpg",
    quote: "Train with discipline. Stay committed. Achieve your goals.",
    paragraphs: [
      "Welcome to PowerFit.",
      "As someone who has served in the Army, I believe that discipline, hard work, and consistency are the keys to success. These values are also the foundation of PowerFit.",
      "Our mission is to help every member become stronger, healthier, and more confident. Every workout is a step toward a better future. Stay focused, never give up, and keep moving forward.",
      "Our team is here to support and guide you every day. Together, we can build not only a stronger body but also a stronger mind.",
      "Train with discipline. Stay committed. Achieve your goals.",
    ],
  },
];
