// SHRESHTA 2026 - Seshadripuram Degree College, Mysuru
// Event Date: 17th February 2026 (Tuesday)

export interface Event {
    id: string;
    title: string;
    titleKannada?: string;
    description: string;
    longDescription: string;
    coordinator: string;
    coordinatorPhone: string;
    category: "it" | "management" | "cultural" | "sports";
    date: string;
    time: string;
    venue: string;
    image: string;
    rules: string[];
    prizes?: {
        first: string;
        second: string;
        third: string;
    };
    teamSize: string;
    registrationFee: string;
}

// ============ MANAGEMENT EVENTS ============
export const managementEvents: Event[] = [
    {
        id: "dhurandharah",
        title: "DHURANDHARAH",
        titleKannada: "ధురంధరః",
        description: "The spirit of entrepreneurship where ideas turn into opportunities and challenges spark innovation.",
        longDescription: "DHURANDHARAH, the spirit of entrepreneurship where ideas turn into opportunities and challenges spark innovation. This event is crafted to test the participants' creativity, decision-making ability, just like in the real entrepreneurial world. Step into the world of business innovation and prove your entrepreneurial mettle!",
        coordinator: "Adheena Jojo",
        coordinatorPhone: "9902630615",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Best Manager.jpeg",
        rules: [
            "Team of 2 members mandatory",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Discipline should be maintained",
            "Reporting time - 8:30AM onwards",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "pratyaya",
        title: "PRATYAYA",
        titleKannada: "प्रत्यय",
        description: "HR event providing a platform to understand people management, teamwork and leadership.",
        longDescription: "PRATYAYA - The HR event provides a platform to understand the importance of people management, teamwork and leadership. It also offers an opportunity to enhance decision making and communication skills through engaging activities. Showcase your HR acumen and management capabilities!",
        coordinator: "Priya M R",
        coordinatorPhone: "9972672012",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/HR event.jpeg",
        rules: [
            "Team of 2 members mandatory",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Discipline should be maintained",
            "Formal dress code recommended",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "arthasangram",
        title: "ARTHASANGRAM",
        titleKannada: "अर्थसङ्ग्राम",
        description: "A high-energy finance showdown where strategy, speed, and smart decisions define victory.",
        longDescription: "ARTHASANGRAM invites you to step into a high-energy finance showdown where strategy, speed, and smart decisions define victory. If you have the insight to calculate, the courage to compete, and the hunger to win—this is your battleground. Test your financial acumen and strategic thinking!",
        coordinator: "Ranjitha N",
        coordinatorPhone: "6362120827",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/ARTHASANGRAM.jpeg",
        rules: [
            "Team of 2 members mandatory",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Discipline should be maintained",
            "Basic finance knowledge required",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "vikraya",
        title: "VIKRAYA",
        titleKannada: "विक्रय",
        description: "A platform to showcase your marketing skills and emerge as a confident, future-ready marketer.",
        longDescription: "VIKRAYA is a platform designed to bring together creativity, strategy, and business acumen in a professional environment. Step forward to showcase your marketing skills and emerge as a confident, future-ready marketer. Bring your innovative marketing ideas to life!",
        coordinator: "T L Sinchana",
        coordinatorPhone: "9845882275",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Marketing logo.jpeg",
        rules: [
            "Individual participation",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Discipline should be maintained",
            "Creative presentations encouraged",
        ],
        teamSize: "Individual",
        registrationFee: "₹200/Person",
    },
    {
        id: "nidhi-anveshanam",
        title: "NIDHI ANVESHANAM",
        titleKannada: "निधि अन्वेषणम्",
        description: "Enter the world of Shadow Fight and awaken your inner warrior in this ultimate treasure hunt.",
        longDescription: "NIDHI ANVESHANAM - Enter the world of Shadow Fight and awaken your inner warrior. Test your wit, teamwork, and battle spirit as you unravel secrets, chase hidden clues, and rise victorious with the ultimate treasure hunt. An exciting adventure awaits!",
        coordinator: "Poornima M",
        coordinatorPhone: "8217787905",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Treasure_hunt_SN.png",
        rules: [
            "Team participation",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Discipline should be maintained",
            "Stay within campus boundaries",
        ],
        teamSize: "Team",
        registrationFee: "₹900/Team",
    },
];

// ============ IT EVENTS ============
export const itEvents: Event[] = [
    {
        id: "logic-overload",
        title: "LOGIC OVERLOAD",
        description: "Competitive coding event where students solve logic, pattern, DSA, web, and AI challenges.",
        longDescription: "LOGIC OVERLOAD is a competitive coding event where students solve logic, pattern, DSA, web, and AI challenges, earning points based on accuracy and efficiency. Test your programming skills and logical thinking in this intense coding competition!",
        coordinator: "Arshad Pasha",
        coordinatorPhone: "7760554350",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Computer Lab",
        image: "/Logic Overload.jpeg",
        rules: [
            "Team of 2 members mandatory",
            "Languages: C, C++, Java, Python",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "No external resources allowed",
        ],
        teamSize: "2 Members",
        registrationFee: "₹200/Team",
    },
    {
        id: "e-sports",
        title: "E-SPORTS",
        titleKannada: "ई-स्पोर्ट्स",
        description: "Drop in. Gear up. Survive till the last bullet. Battle it out in the ultimate gaming showdown!",
        longDescription: "E-SPORTS - Drop in. Gear up. Survive till the last bullet. Get ready for the most intense gaming experience at SHRESHTA! Battle it out in competitive gaming and prove your skills. Squad up with your team and dominate the battleground!",
        coordinator: "Kowshik",
        coordinatorPhone: "7259607095",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "IT Lab",
        image: "/e-sports.jpeg",
        rules: [
            "Team of 4 players mandatory",
            "Own mobile devices required",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Use of emulators strictly prohibited",
        ],
        teamSize: "4 Players",
        registrationFee: "₹500/Team",
    },
    {
        id: "chhaya-yuddha",
        title: "CHHAYA YUDDHA",
        titleKannada: "छाया युद्ध",
        description: "Enter the world of Shadow Fight and awaken your inner warrior in this epic battle.",
        longDescription: "CHHAYA YUDDHA - Enter the world of Shadow Fight and awaken your inner warrior. Test your gaming skills in this intense one-on-one combat game. Show your reflexes, strategy, and fighting spirit!",
        coordinator: "Prajwal S",
        coordinatorPhone: "9343537050",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "IT Lab",
        image: "/chhaya yuddha_SN.png",
        rules: [
            "Team of 2 members",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
            "Discipline should be maintained",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "ui-ux",
        title: "UI/UX DESIGN",
        description: "Design beyond screens and create experiences that users truly feel.",
        longDescription: "Design beyond screens and create experiences that users truly feel. Join our UI/UX event to explore creativity, empathy, and innovation. Show your design skills and create beautiful, user-centered interfaces!",
        coordinator: "Kruthika B",
        coordinatorPhone: "7892826828",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Design Lab",
        image: "/UI/UX event.jpeg",
        rules: [
            "Team of 2 members mandatory",
            "Bring your own laptop",
            "Any design tool allowed (Figma, Adobe XD, Sketch)",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Original work only",
        ],
        teamSize: "2 Members",
        registrationFee: "₹200/Team",
    },
];

// ============ CULTURAL EVENTS ============
export const culturalEvents: Event[] = [
    {
        id: "lasyagathi",
        title: "LASYAGATHI",
        titleKannada: "लास्यगति",
        description: "Showcase your talent, style, and passion for solo freestyle dance.",
        longDescription: "LASYAGATHI - Showcase your talent, style, and passion for solo freestyle dance. Captivate the audience with your rhythm, expression, and grace. Any dance form is welcome - let your moves tell your story!",
        coordinator: "Aishwarya",
        coordinatorPhone: "7892984853",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Main Stage",
        image: "/LASYA TANDAVA.jpeg",
        rules: [
            "Individual participation",
            "Any dance form allowed",
            "Performance time: 3-5 minutes",
            "Own music track required",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
        ],
        teamSize: "Individual",
        registrationFee: "₹200/Person",
    },
    {
        id: "swara-madurya",
        title: "SWARA MADURYA",
        titleKannada: "स्वर माधुर्य",
        description: "Solo & Group Singing Competition - captivate the crowd with soulful melodies.",
        longDescription: "SWARA MADURYA - Join us for an exciting Solo & Group Singing Competition! Whether you captivate the crowd with a soulful solo or create magical harmonies in a group, this is your chance to shine on stage. Let your voice be heard!",
        coordinator: "Poorvi H",
        coordinatorPhone: "9380327667",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Open Air Theatre",
        image: "/Rampwalk.jpeg",
        rules: [
            "Solo or Group participation",
            "Any genre allowed",
            "Maximum 5 minutes per performance",
            "Own backing track (instrumental only)",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
        ],
        teamSize: "Solo/Group",
        registrationFee: "Solo: ₹150 | Group: ₹400",
    },
    {
        id: "lasya-tandava",
        title: "LASYA TANDAVA",
        titleKannada: "लास्य ताण्डव",
        description: "Step into the spotlight at the Ramp Walk Event - where fashion meets the art of movement.",
        longDescription: "LASYA TANDAVA - Step into the spotlight at the Ramp Walk Event, turning heads and leaving a lasting impact as fashion meets the art of movement. Walk with confidence, style, and grace!",
        coordinator: "Poorvi H",
        coordinatorPhone: "9380327667",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Main Stage",
        image: "/Rampwalk_new.png",
        rules: [
            "Solo or Group participation",
            "Participants provide own costumes",
            "Original choreography encouraged",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judged on confidence, style, and presentation",
        ],
        teamSize: "Solo/Group",
        registrationFee: "Solo: ₹150 | Group: ₹400",
    },
    {
        id: "drushyavahini",
        title: "DRUSHYAVAHINI",
        titleKannada: "दृश्यवाहिनी",
        description: "Step into a space where creativity flows through every frame - the art of videography.",
        longDescription: "DRUSHYAVAHINI - Step into a space where creativity flows through every frame, and your lens becomes the voice of powerful storytelling. This is your moment to stand out and redefine the art of videography. Capture stories that matter!",
        coordinator: "Event Coordinator",
        coordinatorPhone: "9611981857",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Video graphy logo.jpeg",
        rules: [
            "Individual or team participation",
            "Own equipment required",
            "Original content only",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be final",
        ],
        teamSize: "Individual/Team",
        registrationFee: "Contact Coordinator",
    },
];

// ============ SPORTS EVENTS ============
export const sportsEvents: Event[] = [
    {
        id: "dandashataka",
        title: "DANDASHATAKA",
        titleKannada: "दण्डशतक",
        description: "Fast-paced 30-meter yards cricket competition that combines thrill with a unique twist!",
        longDescription: "DANDASHATAKA - Join us for an exciting and fast-paced 30-meter yards cricket competition that combines the thrill of traditional cricket with a unique twist! Teams will battle it out in a short, high-energy format where every run counts. Experience cricket like never before!",
        coordinator: "Hari Kiran",
        coordinatorPhone: "9591047558",
        category: "sports",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "College Ground",
        image: "/DANDASHATAKA.jpeg",
        rules: [
            "Team of 4 players",
            "30-meter yards format",
            "Sports attire mandatory",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Decision of umpire is final",
        ],
        teamSize: "4 Players",
        registrationFee: "₹500/Team",
    },
    {
        id: "cricket",
        title: "CRICKET TOURNAMENT",
        description: "Hit sixes and take wickets in our thrilling inter-college cricket championship.",
        longDescription: "Experience the thrill of cricket at SHRESHTA! Our Cricket Tournament brings together the best teams from colleges across the region. Form your team, practice your shots, and get ready to lift the trophy!",
        coordinator: "Puneeth S",
        coordinatorPhone: "7676380741",
        category: "sports",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "College Ground",
        image: "/Cricket.jpeg",
        rules: [
            "Team of 8+2 players (8 playing + 2 reserves)",
            "Official tournament rules apply",
            "Sports attire mandatory",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Decision of umpire is final",
        ],
        teamSize: "8+2 Players",
        registrationFee: "₹1000/Team",
    },
];

// All events combined
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

// College Information
export const collegeInfo = {
    name: "Seshadripuram Degree College",
    shortName: "SDC",
    location: "Mysuru",
    eventName: "SHRESHTA",
    eventYear: "2026",
    eventDate: "17th February 2026",
    eventDay: "Tuesday",
    reportingTime: "8:30 AM onwards",
    registrationDeadline: "15th February 2026",
    address: "#25, Hebbal Ring Road, Hebbal, Mysuru–570017",
    phone: "+91 96119 81857",
    website: "https://www.sdcmysore.ac.in",
    affiliations: [
        "Permanently Affiliated to the University of Mysore",
        "College Code: 1082",
        "ISO 9001:2015 Certified",
        "NAAC Accredited 'B++' Grade",
        "Approved by AICTE",
        "Recognized by UGC Under 2(f)",
    ],
    programs: ["BCOM", "BBA", "BCA", "MBA"],
    trust: "SESHADRIPURAM EDUCATIONAL TRUST",
};

// Faculty Coordinators
export const facultyCoordinators = [
    { name: "Mrs. Shreedevi N Prabhu", phone: "94483 47273" },
    { name: "Mr. Rudresh Y R", phone: "99865 80226" },
];

// Student Council
export const studentCouncil = [
    { role: "President", name: "T K Hem Changappa", phone: "7259498776" },
    { role: "Secretary", name: "Veekshi B D", phone: "8971366017" },
    { role: "Cultural Secretary", name: "Murali Krishna", phone: "9113903097" },
    { role: "Sports Secretary", name: "Darshan B R", phone: "9980748518" },
];

// Student Coordinators
export const studentCoordinators = {
    management: [
        { name: "Keerthi L.C", phone: "7019037574" },
        { name: "Lisha S", phone: "7349602247" },
        { name: "Deeksha K U", phone: "6363148937" },
        { name: "Gaurav Vasisth", phone: "9483370324" },
    ],
    it: [
        { name: "Mayur G Naidu", phone: "6361400070" },
        { name: "Puneeth", phone: "7676380741" },
        { name: "Keerthana T", phone: "6366268572" },
        { name: "Deepak C G", phone: "6363214067" },
    ],
};
