// All events data for SDC Fest 2026 - February 18-19, 2026

export interface Event {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    coordinator: string;
    coordinatorRole: string;
    coordinatorPhone: string;
    coordinatorEmail: string;
    category: "it" | "management" | "cultural" | "sports";
    date: string;
    time: string;
    venue: string;
    image: string;
    rules: string[];
    prizes: {
        first: string;
        second: string;
        third: string;
    };
    teamSize: string;
    registrationFee: string;
}

export const itEvents: Event[] = [
    {
        id: "bgmi",
        title: "BGMI Tournament",
        description: "Battle it out in the ultimate BGMI showdown. Squad up and dominate the battleground!",
        longDescription: "Get ready for the most intense gaming experience at SDC Fest! Our BGMI Tournament brings together the best mobile gamers from colleges across the region. Form your squad, strategize your gameplay, and compete for glory. Multiple rounds of intense battle royale action await you!",
        coordinator: "Arjun Kumar",
        coordinatorRole: "IT Event Coordinator",
        coordinatorPhone: "+91 98765 12340",
        coordinatorEmail: "arjun.bgmi@shesha.edu.in",
        category: "it",
        date: "Feb 18, 2026",
        time: "10:00 AM",
        venue: "IT Lab 1",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
        rules: [
            "Team of 4 players mandatory",
            "Own mobile devices required",
            "Use of emulators is strictly prohibited",
            "Game version must be up to date",
            "Tournament will follow official BGMI rules",
            "Decision of judges is final",
        ],
        prizes: {
            first: "₹15,000",
            second: "₹8,000",
            third: "₹4,000",
        },
        teamSize: "4 Players",
        registrationFee: "₹400/team",
    },
    {
        id: "uiux",
        title: "UI/UX Design Challenge",
        description: "Showcase your creativity through stunning user interface and experience designs.",
        longDescription: "Dive into the world of design at our UI/UX Challenge! This event tests your ability to create beautiful, user-centered designs. You'll be given a real-world problem statement and have limited time to design a complete solution. Show us your wireframing skills, prototyping abilities, and attention to user experience!",
        coordinator: "Priya Sharma",
        coordinatorRole: "Design Lead",
        coordinatorPhone: "+91 98765 12341",
        coordinatorEmail: "priya.uiux@shesha.edu.in",
        category: "it",
        date: "Feb 18, 2026",
        time: "11:00 AM",
        venue: "Design Studio",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
        rules: [
            "Individual or team of 2",
            "Bring your own laptop",
            "Any design tool allowed (Figma, Adobe XD, Sketch)",
            "Original work only - no templates",
            "5 hours to complete the challenge",
            "Present your design in 5 minutes",
        ],
        prizes: {
            first: "₹10,000",
            second: "₹5,000",
            third: "₹3,000",
        },
        teamSize: "1-2 Members",
        registrationFee: "₹200/person",
    },
    {
        id: "logic-overload",
        title: "Logic Overload",
        description: "Test your programming skills and logical thinking in this intense coding competition.",
        longDescription: "Logic Overload is the ultimate test of your coding prowess! Solve algorithmic challenges, debug complex code, and race against time. Whether you're a competitive programmer or a coding enthusiast, this event will push your limits. Multiple rounds with increasing difficulty await the brave coders!",
        coordinator: "Rahul Verma",
        coordinatorRole: "Tech Lead",
        coordinatorPhone: "+91 98765 12342",
        coordinatorEmail: "rahul.logic@shesha.edu.in",
        category: "it",
        date: "Feb 19, 2026",
        time: "09:00 AM",
        venue: "Computer Lab 2",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
        rules: [
            "Individual participation only",
            "Languages allowed: C, C++, Java, Python",
            "No external resources or internet",
            "3 rounds of increasing difficulty",
            "Time limit: 3 hours",
            "Plagiarism will lead to disqualification",
        ],
        prizes: {
            first: "₹12,000",
            second: "₹6,000",
            third: "₹3,000",
        },
        teamSize: "Individual",
        registrationFee: "₹150/person",
    },
    {
        id: "treasure-hunt",
        title: "Tech Treasure Hunt",
        description: "A thrilling adventure combining tech puzzles with physical challenges across campus.",
        longDescription: "Embark on an exciting treasure hunt that combines technology with adventure! Decode QR codes, solve tech riddles, complete programming mini-challenges, and race across the campus to find hidden treasures. This isn't just about speed - it's about teamwork, problem-solving, and having fun!",
        coordinator: "Sneha Patel",
        coordinatorRole: "Event Manager",
        coordinatorPhone: "+91 98765 12343",
        coordinatorEmail: "sneha.hunt@shesha.edu.in",
        category: "it",
        date: "Feb 18, 2026",
        time: "02:00 PM",
        venue: "Main Campus",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800",
        rules: [
            "Team of 3-4 members",
            "Smartphones required for QR scanning",
            "Stay within campus boundaries",
            "No running inside buildings",
            "Each clue has a time limit",
            "First team to complete wins",
        ],
        prizes: {
            first: "₹8,000",
            second: "₹4,000",
            third: "₹2,000",
        },
        teamSize: "3-4 Members",
        registrationFee: "₹300/team",
    },
];

export const managementEvents: Event[] = [
    {
        id: "best-manager",
        title: "Best Manager",
        description: "Prove your leadership and management skills through challenging business scenarios.",
        longDescription: "Step into the shoes of a top manager! This comprehensive competition tests your leadership, decision-making, communication, and crisis management skills. Navigate through business simulations, case studies, and real-world scenarios to prove you have what it takes to be the Best Manager!",
        coordinator: "Vikram Singh",
        coordinatorRole: "Management Lead",
        coordinatorPhone: "+91 98765 12350",
        coordinatorEmail: "vikram.manager@shesha.edu.in",
        category: "management",
        date: "Feb 18, 2026",
        time: "10:00 AM",
        venue: "Seminar Hall A",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        rules: [
            "Individual participation",
            "Multiple rounds over 2 days",
            "Business formal dress code",
            "Current affairs knowledge essential",
            "Presentation skills will be evaluated",
            "Group discussion included",
        ],
        prizes: {
            first: "₹15,000",
            second: "₹8,000",
            third: "₹4,000",
        },
        teamSize: "Individual",
        registrationFee: "₹200/person",
    },
    {
        id: "hr-challenge",
        title: "HR Challenge",
        description: "Tackle real HR scenarios and showcase your people management expertise.",
        longDescription: "Human Resources is the heart of any organization. In this event, demonstrate your ability to handle recruitment, conflict resolution, employee engagement, and organizational behavior challenges. From mock interviews to policy drafting, show us your HR acumen!",
        coordinator: "Ananya Reddy",
        coordinatorRole: "HR Coordinator",
        coordinatorPhone: "+91 98765 12351",
        coordinatorEmail: "ananya.hr@shesha.edu.in",
        category: "management",
        date: "Feb 18, 2026",
        time: "11:30 AM",
        venue: "Room 201",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
        rules: [
            "Team of 2 members",
            "Includes mock interview rounds",
            "Policy drafting challenge",
            "Role-play scenarios",
            "HR case study analysis",
            "Formal attire mandatory",
        ],
        prizes: {
            first: "₹10,000",
            second: "₹5,000",
            third: "₹2,500",
        },
        teamSize: "2 Members",
        registrationFee: "₹250/team",
    },
    {
        id: "brand-building",
        title: "Brand Building",
        description: "Create and pitch a complete brand strategy from scratch.",
        longDescription: "Marketing meets creativity in Brand Building! You'll receive a product concept and must develop a complete brand identity - from logo and tagline to marketing strategy and campaign ideas. Present your brand to a panel of industry experts and make them believe in your vision!",
        coordinator: "Karthik Nair",
        coordinatorRole: "Marketing Head",
        coordinatorPhone: "+91 98765 12352",
        coordinatorEmail: "karthik.brand@shesha.edu.in",
        category: "management",
        date: "Feb 19, 2026",
        time: "02:00 PM",
        venue: "Auditorium",
        image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800",
        rules: [
            "Team of 2-3 members",
            "Laptops and design tools allowed",
            "Original branding only",
            "15 minutes for final presentation",
            "Working prototype/mockup required",
            "Creativity and feasibility judged equally",
        ],
        prizes: {
            first: "₹12,000",
            second: "₹6,000",
            third: "₹3,000",
        },
        teamSize: "2-3 Members",
        registrationFee: "₹300/team",
    },
    {
        id: "finance-quiz",
        title: "Finance Faceoff",
        description: "Test your financial knowledge in this high-stakes quiz competition.",
        longDescription: "Numbers don't lie, and neither does your financial knowledge! Finance Faceoff is an exhilarating quiz competition covering everything from stock markets to corporate finance, accounting principles to economic policies. Rapid-fire rounds, case studies, and more await the finance enthusiasts!",
        coordinator: "Meera Iyer",
        coordinatorRole: "Finance Coordinator",
        coordinatorPhone: "+91 98765 12353",
        coordinatorEmail: "meera.finance@shesha.edu.in",
        category: "management",
        date: "Feb 18, 2026",
        time: "02:00 PM",
        venue: "Room 305",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        rules: [
            "Team of 2 members",
            "Multiple quiz rounds",
            "Current market knowledge needed",
            "Calculators allowed in specific rounds",
            "Time-bound buzzer rounds",
            "No electronic devices except calculators",
        ],
        prizes: {
            first: "₹8,000",
            second: "₹4,000",
            third: "₹2,000",
        },
        teamSize: "2 Members",
        registrationFee: "₹200/team",
    },
];

export const culturalEvents: Event[] = [
    {
        id: "ramp-walk",
        title: "Ramp Walk",
        description: "Walk the runway with style and confidence in our glamorous fashion show.",
        longDescription: "The spotlight is calling! Our Ramp Walk event is the ultimate platform to showcase your fashion sense and confidence. Walk the ramp with elegance, express yourself through style, and let your personality shine. Themed rounds, designer outfits, and stunning choreography await!",
        coordinator: "Divya Menon",
        coordinatorRole: "Fashion Coordinator",
        coordinatorPhone: "+91 98765 12360",
        coordinatorEmail: "divya.fashion@shesha.edu.in",
        category: "cultural",
        date: "Feb 18, 2026",
        time: "06:00 PM",
        venue: "Main Stage",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
        rules: [
            "Individual participation",
            "Three themed rounds",
            "Participants provide own costumes",
            "2 minutes per walk",
            "Original choreography encouraged",
            "Judged on confidence, style, and presentation",
        ],
        prizes: {
            first: "₹10,000",
            second: "₹5,000",
            third: "₹2,500",
        },
        teamSize: "Individual",
        registrationFee: "₹150/person",
    },
    {
        id: "solo-singing",
        title: "Solo Singing",
        description: "Let your voice be heard! Sing your heart out on the SDC Fest stage.",
        longDescription: "Music speaks where words fail. Our Solo Singing competition welcomes vocalists of all genres - classical, Bollywood, Western, or indie. Take the stage, captivate the audience, and let your voice echo through the halls of SDC Fest 2026!",
        coordinator: "Aditya Rao",
        coordinatorRole: "Music Coordinator",
        coordinatorPhone: "+91 98765 12361",
        coordinatorEmail: "aditya.music@shesha.edu.in",
        category: "cultural",
        date: "Feb 18, 2026",
        time: "04:00 PM",
        venue: "Open Air Theatre",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
        rules: [
            "Individual participation only",
            "Any genre allowed",
            "Maximum 5 minutes per performance",
            "Own backing track (instrumental only)",
            "No karaoke tracks with lyrics",
            "Live instruments bonus points",
        ],
        prizes: {
            first: "₹8,000",
            second: "₹4,000",
            third: "₹2,000",
        },
        teamSize: "Individual",
        registrationFee: "₹100/person",
    },
    {
        id: "solo-dance",
        title: "Solo Dance",
        description: "Move to the rhythm and dazzle the audience with your dance moves.",
        longDescription: "Dance like nobody's watching! Whether it's classical, contemporary, hip-hop, or freestyle - our Solo Dance competition celebrates all forms of dance. Express your emotions, tell your story, and leave the audience spellbound with your performance!",
        coordinator: "Nisha Kulkarni",
        coordinatorRole: "Dance Coordinator",
        coordinatorPhone: "+91 98765 12362",
        coordinatorEmail: "nisha.dance@shesha.edu.in",
        category: "cultural",
        date: "Feb 19, 2026",
        time: "04:00 PM",
        venue: "Main Stage",
        image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800",
        rules: [
            "Individual participation only",
            "Any dance form allowed",
            "Performance time: 3-5 minutes",
            "Own music track required",
            "Props allowed with prior approval",
            "Costume changes not permitted mid-performance",
        ],
        prizes: {
            first: "₹8,000",
            second: "₹4,000",
            third: "₹2,000",
        },
        teamSize: "Individual",
        registrationFee: "₹100/person",
    },
];

export const sportsEvents: Event[] = [
    {
        id: "cricket",
        title: "Cricket Tournament",
        description: "Hit sixes and take wickets in our thrilling inter-college cricket championship.",
        longDescription: "Cricket is not just a sport in India - it's a religion! Our Cricket Tournament brings together the best teams from colleges across the region. Box cricket format ensures fast-paced, exciting matches. Form your team, practice your shots, and get ready to lift the trophy!",
        coordinator: "Suresh Rajan",
        coordinatorRole: "Sports Coordinator",
        coordinatorPhone: "+91 98765 12370",
        coordinatorEmail: "suresh.sports@shesha.edu.in",
        category: "sports",
        date: "Feb 18-19, 2026",
        time: "08:00 AM",
        venue: "College Ground",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
        rules: [
            "Box cricket format (8 overs)",
            "Team of 8 players (6 playing + 2 reserves)",
            "Official tournament rules apply",
            "Sports attire mandatory",
            "Teams must report 30 min before match",
            "Decision of umpire is final",
        ],
        prizes: {
            first: "₹20,000",
            second: "₹10,000",
            third: "₹5,000",
        },
        teamSize: "8 Players",
        registrationFee: "₹500/team",
    },
];

export const allEvents = [
    ...itEvents,
    ...managementEvents,
    ...culturalEvents,
    ...sportsEvents,
];

export const getEventById = (id: string): Event | undefined => {
    return allEvents.find((event) => event.id === id);
};

export const getEventsByCategory = (category: string): Event[] => {
    return allEvents.filter((event) => event.category === category);
};
