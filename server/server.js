const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const portfolioData = {
    personalInfo: {
        name: "LAM HUYNH HOA NAM",
        title: "SOFTWARE ENGINEERING",
        email: "hoanam270304@gmail.com",
        phone: "0988494911",
        github: "https://github.com/NammHoa",
        about: "Final-year Software Engineering student at the University of Foreign Languages - Information Technology (HUFLIT). Proficient in using AI-powered development tools to accelerate programming, optimization, and debugging. A quick learner, efficient problem solver, and capable of addressing technical challenges in real-world environments.",
        education: [
            {
                institution: "University of Foreign Languages - Information Technology Ho Chi Minh City (HUFLIT)",
                degree: "Bachelor of Software Engineering",
                period: "2022 - 2026"
            }
        ]
    },
    skills: [
        { category: "Programming Languages", items: ["Dart", "Java", "JavaScript"] },
        { category: "Frontend Development", items: ["Flutter", "React.js"] },
        { category: "Backend Development", items: ["Node.js", "Express.js", "ASP.NET Core", "RESTful API"] },
        { category: "Databases", items: ["SQL Server", "MongoDB", "Firebase"] },
        { category: "Development Environments", items: ["Visual Studio Code", "Visual Studio", "Android Studio"] },
        { category: "Tools", items: ["Git/Github", "Postman"] }
    ],
    experience: [
        {
            company: "Lead Manament Solutions Company",
            companyLink: "https://leaderp.vn/",
            period: "August 2025 - November 2025",
            role: "Fullstack Mobile Development Intern",
            projects: [
                {
                    name: "Sample Management System",
                    description: "Independently developed a comprehensive mobile solution to digitize laboratory workflows—from sample tracking to automated reporting—by implementing a structured database schema to manage over 10 critical field parameters."
                }
            ]
        }
    ],
    projects: [
        {
            id: 1,
            name: "Viren – E-commerce Book Platform",
            period: "May 2025 - July 2025",
            techStack: ["Flutter", "ASP.NET Core API", "SQL Server", "MoMo Payment"],
            details: [
                "Full-stack Development: Developed a cross-platform mobile app and RESTful services from scratch.",
                "State Management: Utilized Provider to ensure smooth UI performance and efficient data handling.",
                "Payment Integration: Integrated MoMo API for secure, real-time online transactions.",
                "Database & Logic: Designed SQL Server schemas and implemented core features: shopping cart, search filters, and user authentication."
            ],
            github: [
                { label: "Github", url: "https://github.com/NammHoa/Viren" }
            ],
            imageUrl: "https://via.placeholder.com/600x400/333333/ffffff?text=Viren+E-commerce"
        },
        {
            id: 2,
            name: "TheGioijack – Electronics E-commerce Platform",
            period: "November 2024 - March 2025",
            techStack: ["React.js", "Redux", "Node.js", "Express.js", "MongoDB", "JWT"],
            details: [
                "Full-stack Development: Independently designed and developed a comprehensive e-commerce website for electronic devices.",
                "State Management: Leveraged Redux for efficient and predictable state management across the application.",
                "API & Backend: Implemented RESTful APIs with Express.js to manage products, user accounts, and order processing.",
                "Security: Developed a secure JWT-based authentication and authorization system.",
                "Database: Integrated MongoDB to handle scalable data storage for users and transactions."
            ],
            github: [
                { label: "Frontend", url: "https://github.com/NammHoa/TheGioiJack" },
                { label: "Backend", url: "https://github.com/NammHoa/TheGioiJack_be" }
            ],
            imageUrl: "https://via.placeholder.com/600x400/333333/ffffff?text=TheGioijack+E-commerce"
        }
    ]
};


app.get('/api/profile', (req, res) => {
    res.json(portfolioData.personalInfo);
});

app.get('/api/skills', (req, res) => {
    res.json(portfolioData.skills);
});

app.get('/api/experience', (req, res) => {
    res.json(portfolioData.experience);
});

app.get('/api/projects', (req, res) => {
    res.json(portfolioData.projects);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
