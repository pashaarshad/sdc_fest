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
    maxTeamsPerCollege?: string;
}

// ============ MANAGEMENT EVENTS ============
export const managementEvents: Event[] = [
    {
        id: "dhurandharah",
        title: "DHURANDHARAH",
        description: "Entrepreneurship-based event focusing on creativity & decision-making",
        longDescription: "Entrepreneurship-based event focusing on creativity & decision-making. Test your business acumen and strategic thinking.",
        coordinator: "Priya M R",
        coordinatorPhone: "9972672012",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Best Manager.jpeg",
        rules: [
            "Team of 2 members",
            "College ID is mandatory",
            "Rules and details of the rounds will be disclosed on the spot",
            "Participants should adhere to the time limits given",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "samanvaya",
        title: "SAMANVAYA",
        description: "HR & people management event (teamwork, leadership, communication)",
        longDescription: "HR & people management event focusing on teamwork, leadership, and communication skills.",
        coordinator: "Ranjitha N",
        coordinatorPhone: "6362120827",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/hr_logo.jpeg",
        rules: [
            "Team of 2 members",
            "Rules and details of the rounds will be disclosed on the spot",
            "Use of mobile phones may be part of the event round. So at least one participant should have the mobile phone with internet",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "arthasangram",
        title: "ARTHASANGRAM",
        description: "Finance & strategy competition",
        longDescription: "Finance & strategy competition testing your ability to manage resources and make smart financial decisions.",
        coordinator: "Prajwal S",
        coordinatorPhone: "9343537050",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/ARTHASANGRAM.jpeg",
        rules: [
            "Team of 2 members",
            "Rules and details of the rounds will be disclosed on the spot",
            "The event is based on general knowledge of finance and financial markets",
            "Participants must have android phone with sufficient internet data. The use of laptop is optional",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
    {
        id: "vikraya",
        title: "VIKRAYA",
        description: "Marketing & business acumen event",
        longDescription: "Marketing & business acumen event. Showcase your innovative marketing ideas and strategy.",
        coordinator: "Adheena Jojo",
        coordinatorPhone: "9902630615",
        category: "management",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Marketing logo.jpeg",
        rules: [
            "Team of 2 members",
            "Completion of the task is required within the designated time-frame",
            "Rules and details of the rounds will be disclosed on the spot",
            "There will be no selling of any products in any rounds of the event",
        ],
        teamSize: "2 Members",
        registrationFee: "₹300/Team",
    },
];

// ============ IT EVENTS ============
export const itEvents: Event[] = [
    {
        id: "logic-overload",
        title: "LOGIC OVERLOAD",
        description: "Logic, Pattern, DSA, Web & AI coding contest",
        longDescription: "Logic, Pattern, DSA, Web & AI coding contest. Solve complex problems and debug code to win.",
        coordinator: "Arshad Pasha",
        coordinatorPhone: "7760554350",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Computer Lab",
        image: "/Logic Overload.jpeg",
        rules: [
            "Team of 2 members",
            "Rules and details of event rounds are disclosed on the spot",
            "Participants can code using programming languages such as Java, Python, C and C++",
            "Laptops are required, but if not, the college will provide computer system",
            "Each team have to bring one USB Cable (charger cable)",
        ],
        teamSize: "2 Members",
        registrationFee: "₹200/Team",
    },
    {
        id: "pratyaya",
        title: "PRATYAYA",
        description: "UI/UX design & creativity challenge",
        longDescription: "UI/UX design & creativity challenge. Showcase your design thinking and user experience skills.",
        coordinator: "Kruthika B",
        coordinatorPhone: "7892826828",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Computer Lab",
        image: "/UI/UX event.jpeg",
        rules: [
            "Team of 2 members",
            "One-hour training will be provided on usage of the tool",
            "Design tools allowed are – Figma or Paper Sketching only",
            "Originality is expected. Copied content/templates will lead to disqualification",
            "Rules and details will be told on the spot",
            "Laptops are required. If laptop is not brought, system will be provided",
        ],
        teamSize: "2 Members",
        registrationFee: "₹200/Team",
    },

    {
        id: "nidhi-anveshanam",
        title: "NIDHI ANVESHANAM",
        description: "Shadow Fight & clue-based hunt",
        longDescription: "Shadow Fight & clue-based hunt. Solve puzzles and find the treasure to win.",
        coordinator: "T L Sinchana",
        coordinatorPhone: "9845882275",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:00 AM",
        venue: "SDC Campus",
        image: "/nidhi_anveshanam_final.png",
        rules: [
            "Team of 4 members",
            "Registration strictly closes at first 60 teams",
            "Using vehicles, any digital gadgets during the event is strictly prohibited",
            "Seeking help from others & inter communication between teams is prohibited",
            "Participants should carry each and every clue till the end of the Event",
            "Violation of rules during any rounds, team will be disqualified",
        ],
        teamSize: "4 Members",
        registrationFee: "₹600/Team",
        maxTeamsPerCollege: "Only 3 teams per college",
    },
    {
        id: "e-sports",
        title: "E-SPORTS",
        description: "Battle survival game",
        longDescription: "Battle survival game. Compete against other teams in an intense gaming showdown.",
        coordinator: "Hari Kiran",
        coordinatorPhone: "9591047558",
        category: "it",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "IT Lab",
        image: "/e-sports.jpeg",
        rules: [
            "Team of 4 members",
            "Registration strictly closes at first 36 teams",
            "Only mobile is to be used with latest version of the game (No other devices allowed)",
            "Mode: Classic TPP Squad (Erangel / Miramar / Sanhok / Rondo)",
            "After third round, there will be elimination of teams based on the points",
        ],
        teamSize: "4 Members",
        registrationFee: "₹500/Team",
    },
];

// ============ CULTURAL EVENTS ============
export const culturalEvents: Event[] = [
    {
        id: "lasyagathi",
        title: "LASYAGATHI",
        description: "Fashion ramp walk event",
        longDescription: "Fashion ramp walk event. Walk the ramp with style and confidence.",
        coordinator: "Poornima M",
        coordinatorPhone: "8217787905",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Main Stage",
        image: "/Rampwalk_new.png",
        rules: [
            "Team participation",
            "College ID is mandatory",
            "Register on or before 15th February 2026",
            "Judges decision will be considered as final",
        ],
        teamSize: "Team",
        registrationFee: "₹900/Team",
    },
    {
        id: "lasya-tandava",
        title: "LASYA TANDAVA",
        description: "Solo freestyle dance",
        longDescription: "Solo freestyle dance. Express yourself through dance.",
        coordinator: "Aishwarya",
        coordinatorPhone: "7892984853",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Main Stage",
        image: "/sance_solo.jpeg",
        rules: [
            "Dance form- Freestyle (Any genre other than Classical)",
            "Time duration for each participant is 3+1 minutes",
            "Participants should come fully dressed up for the performance by 10am",
            "Dance audio file in MP3 format should be sent to WhatsApp number 9483370324 before 15th Feb 2026",
            "Lyrics of the song should not contain any offensive or vulgar content",
        ],
        teamSize: "1 Person",
        registrationFee: "₹200/Person",
    },
    {
        id: "swara-madurya",
        title: "SWARA MADURYA",
        description: "Solo & group singing competition",
        longDescription: "Solo & group singing competition. Showcase your vocal talents.",
        coordinator: "Poorvi H",
        coordinatorPhone: "9380327667",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "Open Air Theatre",
        image: "/singin.jpeg",
        rules: [
            "Solo singing – Kannada or Hindi Movie Songs, 3+1 minutes",
            "Group singing – Kannada or Hindi Melody Songs, 4+1 minutes",
            "Lyrics should not contain any offensive or inappropriate content",
            "Singing can be with or without instrumental backing",
            "Karaoke should be sent in MP3 format to 9380327667 before 15th Feb 2026",
        ],
        teamSize: "Solo/Group",
        registrationFee: "Solo: ₹150 | Group: ₹400",
    },
    {
        id: "drushyavahini",
        title: "DRUSHYAVAHINI",
        description: "Videography & storytelling challenge",
        longDescription: "Videography & storytelling challenge. Capture moments and tell stories through your lens.",
        coordinator: "Kowshik",
        coordinatorPhone: "7259607095",
        category: "cultural",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "SDC Campus",
        image: "/Video graphy logo.jpeg",
        rules: [
            "Both camera (DSLR/Mirrorless) and mobile can be used. Drone is prohibited",
            "Video must be in MP4 format and must not exceed 1 minute 10 seconds",
            "No watermarks, copyright, signature, or identifying marks",
            "Video editing must be done within the campus using own laptops/software",
            "Use of any copyrighted audio and video materials is prohibited",
        ],
        teamSize: "1 Person",
        registrationFee: "₹200",
    },
];

// ============ SPORTS EVENTS ============
export const sportsEvents: Event[] = [
    {
        id: "dandashataka",
        title: "DANDASHATAKA",
        description: "30-meter yards cricket",
        longDescription: "30-meter yards cricket. Fast-paced cricket action.",
        coordinator: "Puneeth S",
        coordinatorPhone: "7676380741",
        category: "sports",
        date: "Feb 17, 2026",
        time: "8:30 AM",
        venue: "College Ground",
        image: "/Cricket.jpeg",
        rules: [
            "Team of 8 + 2 players",
            "Only Degree College Students having College ID card and Principal's permission letter are allowed",
            "Only limited teams allowed for tournament (Only First 32 Teams)",
            "Registration is to be done at the earliest that is, before 15th February 2026",
        ],
        teamSize: "8 + 2 Players",
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
    { role: "Sports Minister", name: "Keerthi S", phone: "9876543210" },
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
