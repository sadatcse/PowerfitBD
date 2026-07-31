import { type TeamMember } from "@/types/team";

/**
 * Role hierarchy order map for public Team page display:
 * 1. Senior Trainer
 * 2. Trainer
 * 3. Female Trainer
 * 4. Assistant Trainer
 * 5. Front Desk Officer
 * 6. Office Assistant
 */
export const DESIGNATION_ORDER: Record<string, number> = {
  "Senior Trainer": 1,
  Trainer: 2,
  "Female Trainer": 3,
  "Assistant Trainer": 4,
  "Front Desk Officer": 5,
  "Office Assistant": 6,
};

/**
 * Authentic team members ordered strictly by designation hierarchy.
 */
export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  // 1. Senior Trainer
  {
    _id: "team-manik",
    name: "MD. FOYJUR RAHMAN MANIK",
    designation: "Senior Trainer",
    description:
      "Specialized in high-intensity strength conditioning, athletic body transformation, and customized training programs.",
    image: "/images/team/manik.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 1,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 2. Trainer
  {
    _id: "team-md-altaf",
    name: "Md. Altaf",
    designation: "Trainer",
    description:
      "Professional strength & hypertrophy trainer focused on form correction, progressive overload, and physical conditioning.",
    image: "/images/team/md-altaf.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 2,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 3. Female Trainer
  {
    _id: "team-maria-anny",
    name: "Maria Anny",
    designation: "Female Trainer",
    description:
      "Dedicated ladies floor trainer specializing in female strength, weight loss, aerobics, and custom fitness coaching.",
    image: "/images/team/maria-anny.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 3,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "team-karabi-sultana",
    name: "Karabi Sultana",
    designation: "Female Trainer",
    description:
      "Dedicated female fitness coach specializing in ladies floor workouts, posture, weight management, and personal training.",
    image: "/images/team/karabi-sultana1.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 4,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 4. Assistant Trainer
  {
    _id: "team-abdur-rahman",
    name: "Abdur Rahman",
    designation: "Assistant Trainer",
    description:
      "Attentive assistant trainer supporting members with equipment technique, safety, and daily workout execution.",
    image: "/images/team/abdur-rahman.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 5,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 5. Front Desk Officer
  {
    _id: "team-armina-rupa",
    name: "Armina Khatun Rupa",
    designation: "Front Desk Officer",
    description:
      "Managing front desk reception, member registrations, package inquiries, and floor hospitality support.",
    image: "/images/team/armina-khatun-rupa.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 6,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "team-asif-raihan",
    name: "MD Asif Raihan",
    designation: "Front Desk Officer",
    description:
      "Managing front desk operations, member registrations, package inquiries, and floor hospitality support.",
    image: "/images/team/md-asif-raihan.jpg",
    socials: { facebook: "https://facebook.com/powerfit" },
    displayOrder: 7,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 6. Office Assistant
  {
    _id: "team-md-shisir",
    name: "MD. SHISIR",
    designation: "Office Assistant",
    description:
      "Ensuring smooth daily floor operations, locker management, facility organization, and prompt member support.",
    image: "/images/team/md-shisir.jpg",
    socials: {},
    displayOrder: 8,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "team-md-sobahan",
    name: "MD. SOBAHAN",
    designation: "Office Assistant",
    description:
      "Dedicated facility assistant maintaining clean workout environments, sanitation standards, and operational care.",
    image: "/images/team/md-sobahan.jpg",
    socials: {},
    displayOrder: 9,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/** Utility to sort any team array by designation hierarchy first, then displayOrder. */
export function sortTeamMembers(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => {
    const orderA = DESIGNATION_ORDER[a.designation] ?? 99;
    const orderB = DESIGNATION_ORDER[b.designation] ?? 99;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
  });
}
