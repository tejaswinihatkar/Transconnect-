export interface Mentor {
  id: string;
  name: string;
  pronouns: string;
  city: string;
  languages: string[];
  topics: string[];
  verified: boolean;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  badges: string[];
  reviewSnippet: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
}

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Aarav",
    pronouns: "He/Him",
    city: "Mumbai",
    languages: ["Hindi", "English"],
    topics: ["Medical Transition", "Coming Out"],
    verified: true,
    initials: "A",
    gradientFrom: "#f472b6",
    gradientTo: "#7c3aed",
  },
  {
    id: "2",
    name: "Priya",
    pronouns: "She/Her",
    city: "Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    topics: ["Career", "Legal"],
    verified: true,
    initials: "P",
    gradientFrom: "#7c3aed",
    gradientTo: "#38bdf8",
  },
  {
    id: "3",
    name: "Rohan",
    pronouns: "He/Him",
    city: "Bangalore",
    languages: ["English", "Kannada"],
    topics: ["Medical Transition", "Mental Health"],
    verified: true,
    initials: "R",
    gradientFrom: "#38bdf8",
    gradientTo: "#f472b6",
  },
  {
    id: "4",
    name: "Kavya",
    pronouns: "She/Her",
    city: "Chennai",
    languages: ["English", "Tamil"],
    topics: ["Coming Out", "Family Support"],
    verified: true,
    initials: "K",
    gradientFrom: "#f472b6",
    gradientTo: "#38bdf8",
  },
  {
    id: "5",
    name: "Sam",
    pronouns: "They/Them",
    city: "Pune",
    languages: ["Hindi", "English", "Marathi"],
    topics: ["Non-binary Identity", "Career"],
    verified: true,
    initials: "S",
    gradientFrom: "#7c3aed",
    gradientTo: "#f472b6",
  },
  {
    id: "6",
    name: "Anjali",
    pronouns: "She/Her",
    city: "Kolkata",
    languages: ["Bengali", "English", "Hindi"],
    topics: ["Legal", "Documentation"],
    verified: true,
    initials: "A",
    gradientFrom: "#38bdf8",
    gradientTo: "#7c3aed",
  },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Meera Sharma",
    specialty: "Endocrinologist",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    badges: ["Trans-Friendly Certified", "Judgment-Free"],
    reviewSnippet: "Very respectful of my pronouns. Made me feel comfortable throughout.",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Psychiatrist",
    location: "Delhi, NCR",
    rating: 4.8,
    badges: ["LGBTQ+ Specialist", "Judgment-Free"],
    reviewSnippet: "Understanding and supportive. Great experience with therapy sessions.",
  },
  {
    id: "3",
    name: "Dr. Priya Desai",
    specialty: "General Physician",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    badges: ["Trans-Friendly Certified"],
    reviewSnippet: "Knowledgeable about HRT and hormone therapy. Highly recommended.",
  },
  {
    id: "4",
    name: "Dr. Anil Verma",
    specialty: "Plastic Surgeon",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    badges: ["Trans-Friendly Certified", "Experienced"],
    reviewSnippet: "Excellent consultation for gender-affirming surgery. Very professional.",
  },
  {
    id: "5",
    name: "Dr. Sneha Gupta",
    specialty: "Psychologist",
    location: "Pune, Maharashtra",
    rating: 4.8,
    badges: ["LGBTQ+ Specialist", "Judgment-Free"],
    reviewSnippet: "Helped me navigate my gender identity journey. Compassionate and caring.",
  },
  {
    id: "6",
    name: "Dr. Vikram Singh",
    specialty: "Endocrinologist",
    location: "Hyderabad, Telangana",
    rating: 4.7,
    badges: ["Trans-Friendly Certified"],
    reviewSnippet: "Great doctor for hormone replacement therapy. Explains everything clearly.",
  },
];

export const resources: Resource[] = [
  {
    id: "1",
    title: "HRT Guide for India",
    category: "Medical",
    description: "Complete guide to Hormone Replacement Therapy, including where to access it legally in India.",
    icon: "pill",
  },
  {
    id: "2",
    title: "Legal Name Change Process",
    category: "Legal",
    description: "Step-by-step guide to legally changing your name and gender marker in India.",
    icon: "scale",
  },
  {
    id: "3",
    title: "Mental Health Resources",
    category: "Wellness",
    description: "Coping strategies, therapy resources, and mental wellness tips for trans individuals.",
    icon: "heart",
  },
  {
    id: "4",
    title: "Trans Job Board",
    category: "Career",
    description: "Inclusive job opportunities from companies committed to trans rights and diversity.",
    icon: "briefcase",
  },
  {
    id: "5",
    title: "Coming Out Guide",
    category: "Support",
    description: "Tips and strategies for coming out to family, friends, and at workplace.",
    icon: "users",
  },
  {
    id: "6",
    title: "NALSA Judgment Explained",
    category: "Legal",
    description: "Understanding your rights under the NALSA judgment and transgender rights in India.",
    icon: "book",
  },
  {
    id: "7",
    title: "Voice Training Resources",
    category: "Medical",
    description: "Exercises and techniques for voice feminization and masculinization.",
    icon: "mic",
  },
  {
    id: "8",
    title: "Community Events",
    category: "Community",
    description: "Upcoming pride events, support groups, and community gatherings across India.",
    icon: "calendar",
  },
];
