import React, { useState, useEffect, useRef } from 'react';
import { ChevronsDown, Linkedin, Github, Mail, ArrowLeft, ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

const portfolioData = {
    name: "Sami Sharif",
    title: "Electrical & Computer Engineer | Software Engineer",
    about: "I'm a junior at Carnegie Mellon University pursuing a B.S. in ECE and Robotics. My main interests lie in computer graphics (check out my garage section below!) and robotics software, but I also love developing games, FPGAs in SystemVerilog, and pretty much anything involving computer systems. I love swimming, playing frisbee, Star Wars, cats, and any combination of those things.",
    selfie: "/assets/me.jpg",
    projects: [
        {
            title: "Dunes Tower Defense",
            img: "/assets/dunes.png",
            description: "Build18 2026 project. We won the Officer's Award for creating a Tower Defense game that you play in real life. The game is projected onto a sandbox and you place pieces in real life to defend your base. The sand serves as an extra dimension of play, allowing you to alter terrain so enemies behave differently. Created with OpenGL, SDL2, and OpenCV.",
        },
        {
            title: "PandaFan",
            img: "/assets/pandafan.png",
            description: "Build18 2025 project. We CADed and fabricated a custom toroidal fan that tracks your face and follows it around. You'll always be cool!",
        },
        {
            title: "NOVA Hackathon — 1st Place",
            img: "/assets/intellinote.png",
            description: "We won 1st place of 42 teams in the NOVA 2024 Hackathon by making an app that allows you to upload your notes from class and get quizzed on it. We use an algorithm based on spaced repetition along with the OpenAI API to generate appropriate questions and create a heatmap of user understanding. We also won the Everyday Impact Award!",
        },
        {
            title: "Red Robot Hackathon — 1st Place",
            img: "/assets/redrobot.png",
            description: "Won 1st place in Red Robot, Carnegie Mellon's Roboclub Hackathon, by designing and manufacturing a robot with a 4-bar linkage lift to stack and deliver objects.\nWon the Autonomous Award sponsored by Caterpillar for an autonomous routine using feedback control and an IR sensor to follow a path.",
        },
        {
            title: "Autonomous Robot Simulator",
            img: "/assets/robotsim.png",
            description: "I remodeled, animated, and added controls to FRC 118's 2022 robot within a custom robot simulator in Unity.\nDeveloped a reliable launching algorithm based on calculus and kinematics, now utilized in FRC 2601's simulations.\nIntegrated an A* pathfinding algorithm to allow the robot to autonomously create and follow trajectories.",
        },
        {
            title: "Enigma",
            img: "/assets/enigma.png",
            description: "Created a user interface and backend for an app to practice decoding common ciphers from the Science Olympiad, utilizing the Flutter framework.\nImplemented a monoalphabetic substitution solver algorithm in Dart to automatically decode Aristocrat ciphers.",
        }
    ],
    experience: [
        {
            role: "Software Engineering Intern",
            company: "Roblox",
            dates: ["May 2026 — August 2026", "May 2025 — August 2025"],
            description: "Designed and proposed a backwards-compatible API for new UIStroke features, collaborating with the engine review board to ensure backwards compatibility and future extensibility.\nEngineered support for image-based strokes by implementing a custom HLSL shader and a jump flooding algorithm.\nRefactored the C++-based UIStroke rendering architecture to support multiple, dynamic, and screen-responsive stroke effects.\nValidated performance impact by writing a suite of unit tests, confirming new features maintained a render time of ~0.04 ms and decreased memory consumption by ~25%."
        },
        {
            role: "Teaching Assistant",
            company: "Carnegie Mellon University",
            dates: ["August 2025 — Present"],
            description: "18-x13\nDesigned lesson plans to teach computer systems concepts such as x86 assembly, cache, virtual memory, dynamic memory allocators, and concurrency to masters and undergraduate students.\nGuided students through intensive C labs such as implementing a memory allocator, a proxy server, and a tiny shell.\n\n21-127\nGraded assignments, tests, homework, etc. for Concepts of Mathematics, CMU's discrete math course. Held office hours to support students."
        },
        {
            role: "Software Lead & Driver",
            company: "FRC 2601",
            dates: ["September 2021 — May 2024"],
            description: "Revamped team's legacy coding framework, implementing a command-based structure with safer control of interconnected mechanisms, improved modularity, and a 70% decrease in CAN bus utilization.\nDesigned team's programming curriculum and handbook to introduce 30+ members to Java and control theory.\nDrove robot in high-intensity matches at all competitions, leading to 2 competition wins and 2 finalist placements."
        }
    ],
    education: [
        { semester: "Fall 2024", courses: ["18-100: Introduction to ECE", "21-259: Calculus 3", "21-254: Linear Algebra and Vector Calc", "85-102: Intro to Psychology"] },
        { semester: "Spring 2025", courses: ["24-101: Intro to Mechanical Engineering", "15-122: Principles of Imperative Computation", "21-127: Concepts of Mathematics", "76-107/8: First Year Writing"] },
        { semester: "Fall 2025", courses: ["18-220: Electronic Devices & Analog Circuits", "18-213: Intro to Computer Systems", "36-225: Intro to Probability", "21-241: Matrices and Linear Transformations", "24-204: Metal Jewelry", "98-341: Make Your Own Breadboard Computer"] },
        { semester: "Spring 2026", courses: ["07-280: AI/ML 1", "16-281: General Robotics", "18-240: Structure & Design of Digital Systems", "18-290: Signals and Systems"] },
        { semester: "Fall 2026", courses: ["15-418: Parallel Computer Architecture and Programming", "15-362: Computer Graphics", "16-385: Computer Vision", "15-440: Distributed Systems", "82-119: Arabic Calligraphy", "98-008: Intro to Rust"] },
    ],
    garage: [
        { title: "3D Voronoi Visualizer", slug: "voronoi", img: "/assets/voronoi.png", href: "/voronoi/" },
    ],
    contact: {
        email: "samisharf26@gmail.com",
        linkedin: "https://linkedin.com/in/sami-sharif1",
        github: "https://github.com/sshar1"
    }
};

/* ── Hooks ── */
const useScrollAnimation = () => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setInView(true); observer.unobserve(entry.target); }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    return [ref, inView];
};

/* ── Utility Components ── */
const AnimatedSection = ({ children, className, id }) => {
    const [ref, inView] = useScrollAnimation();
    return (
        <section ref={ref} id={id} className={`transition-all duration-1000 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
            {children}
        </section>
    );
};

const SectionTitle = ({ title, index }) => (
    <div className="relative mb-14 pt-8">
        {/* Ghost number backdrop */}
        <span
            aria-hidden="true"
            className="absolute top-[-2rem] md:top-[-1rem] right-0 text-[7rem] md:text-[9rem] font-black text-white/[0.04] leading-none select-none pointer-events-none tracking-tighter"
        >
            {index}
        </span>
        {/* Top rule */}
        <div className="w-full h-px bg-white/10 mb-6" />
        {/* Label row */}
        <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-none">
                {title}
            </h2>
            <span className="font-mono text-xs text-white/20 tracking-widest mb-1">{index}</span>
        </div>
    </div>
);

const PcbTrace = ({ pathData, endPoint, top, side, width, delay }) => {
    const pathRef = useRef(null);
    const [traceState, setTraceState] = useState({ dashArray: 0, dashOffset: 0, isAnimating: false });
    const sideClass = side === 'left' ? 'left-0' : 'right-0';
    useEffect(() => {
        if (pathRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            setTraceState(s => ({ ...s, dashArray: pathLength, dashOffset: pathLength }));
            const timer = setTimeout(() => { setTraceState(s => ({ ...s, isAnimating: true })); }, parseFloat(delay) * 1000);
            return () => clearTimeout(timer);
        }
    }, [pathData, delay]);
    const circleTop = (endPoint.y / 150) * 100;
    const circleSidePosition = side === 'left' ? { right: '-4px' } : { left: '-4px' };
    const circleScale = traceState.isAnimating ? 1 : 0;
    return (
        <div className={`absolute ${top} ${sideClass} ${width} h-[150px] pointer-events-none`}>
            <svg className="w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
                <path ref={pathRef} d={pathData} fill="none" stroke="white" strokeWidth="2"
                    strokeDasharray={traceState.dashArray} strokeDashoffset={traceState.dashOffset}
                    className={traceState.isAnimating ? 'animate-trace' : ''} />
            </svg>
            <div className="absolute w-2 h-2 bg-white rounded-full transition-transform duration-500"
                style={{ top: `${circleTop}%`, ...circleSidePosition, transform: `translateY(-50%) scale(${circleScale})`, transitionDelay: traceState.isAnimating ? '1.3s' : '0s' }} />
        </div>
    );
};

/* ── Navbar ── */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const links = [
        { label: 'About', id: 'about' },
        { label: 'Projects', id: 'projects' },
        { label: 'Experience', id: 'experience' },
        { label: 'Education', id: 'education' },
        { label: 'The Garage', id: 'garage' },
    ];
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur bg-black/80 border-b border-white/[0.06]' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white font-bold text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity whitespace-nowrap">Sami Sharif</button>
                <div className="hidden md:flex items-center gap-8">
                    {links.map(l => (
                        <button key={l.id} onClick={() => scrollTo(l.id)} className="text-gray-400 hover:text-white transition-colors text-[13px] uppercase tracking-widest font-medium">{l.label}</button>
                    ))}
                </div>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>
            {mobileOpen && (
                <div className="md:hidden nav-blur bg-black/95 border-t border-white/[0.06] px-6 pb-6 pt-2">
                    {links.map(l => (
                        <button key={l.id} onClick={() => scrollTo(l.id)} className="block w-full text-left py-3 text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">{l.label}</button>
                    ))}
                </div>
            )}
        </nav>
    );
};

/* ── Hero ── */
const Hero = ({ data }) => {
    const [typedTitle, setTypedTitle] = useState('');
    useEffect(() => {
        setTypedTitle('');
        const interval = setInterval(() => {
            setTypedTitle(prev => {
                if (prev.length < data.title.length) return data.title.slice(0, prev.length + 1);
                clearInterval(interval);
                return prev;
            });
        }, 75);
        return () => clearInterval(interval);
    }, [data.title]);
    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            <PcbTrace top="top-[10%]" side="left" width="w-[35vw] md:w-[30vw]" pathData="M 0 20 L 120 20 L 150 50 L 200 50" endPoint={{x:200,y:50}} delay="0.5s" />
            <PcbTrace top="top-[25%]" side="left" width="w-[25vw] md:w-[20vw]" pathData="M 0 80 L 150 80 L 200 130" endPoint={{x:200,y:130}} delay="1.1s" />
            <PcbTrace top="top-[40%]" side="left" width="w-[30vw] md:w-[25vw]" pathData="M 0 100 L 80 100 L 110 70 L 200 70" endPoint={{x:200,y:70}} delay="0.8s" />
            <PcbTrace top="top-[65%]" side="left" width="w-[28vw] md:w-[22vw]" pathData="M 0 40 L 140 40 L 200 100" endPoint={{x:200,y:100}} delay="0.6s" />
            <PcbTrace top="top-[80%]" side="left" width="w-[32vw] md:w-[28vw]" pathData="M 0 60 L 100 60 L 130 90 L 200 90" endPoint={{x:200,y:90}} delay="1.3s" />
            <PcbTrace top="top-[12%]" side="right" width="w-[33vw] md:w-[28vw]" pathData="M 200 30 L 80 30 L 50 60 L 0 60" endPoint={{x:0,y:60}} delay="0.7s" />
            <PcbTrace top="top-[30%]" side="right" width="w-[28vw] md:w-[24vw]" pathData="M 200 110 L 50 110 L 0 60" endPoint={{x:0,y:60}} delay="1.2s" />
            <PcbTrace top="top-[50%]" side="right" width="w-[30vw] md:w-[25vw]" pathData="M 200 50 L 120 50 L 90 80 L 0 80" endPoint={{x:0,y:80}} delay="0.4s" />
            <PcbTrace top="top-[68%]" side="right" width="w-[36vw] md:w-[30vw]" pathData="M 200 90 L 80 90 L 50 120 L 0 120" endPoint={{x:0,y:120}} delay="0.9s" />
            <PcbTrace top="top-[85%]" side="right" width="w-[25vw] md:w-[20vw]" pathData="M 200 20 L 50 20 L 0 70" endPoint={{x:0,y:70}} delay="1.4s" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="z-10 p-4">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white animate-fade-in-down">{data.name}</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-400 font-mono h-7">
                    {typedTitle}<span className="animate-ping">|</span>
                </p>
            </div>
            <div className="absolute bottom-10 animate-bounce"><ChevronsDown className="w-7 h-7 text-gray-500" /></div>
        </div>
    );
};

/* ── About ── */
const About = ({ data }) => (
    <AnimatedSection id="about" className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle title="About Me" index="01" />
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                    <div className="w-60 h-60 rounded-full bg-gradient-to-br from-gray-700 to-gray-300 p-[2px]">
                        <img src={data.selfie} alt={data.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed text-center md:text-left">{data.about}</p>
            </div>
        </div>
    </AnimatedSection>
);

/* ── Projects ── */
const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);
    const [ref, inView] = useScrollAnimation();
    return (
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div onClick={() => setExpanded(!expanded)} className="project-card bg-gray-950 border border-white/[0.08] rounded-xl overflow-hidden cursor-pointer">
                <div className="aspect-square overflow-hidden bg-gray-900">
                    <img src={project.img} alt={project.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`expand-enter ${expanded ? 'expanded' : ''}`}>
                        <p className="text-gray-400 text-sm leading-relaxed mt-4 whitespace-pre-line">{project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = ({ data }) => (
    <section id="projects" className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
            <SectionTitle title="Projects" index="02" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.projects.map((p, i) => <ProjectCard key={i} project={p} />)}
            </div>
        </div>
    </section>
);

/* ── Experience ── */
const Experience = ({ data }) => (
    <AnimatedSection id="experience" className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle title="Experience" index="03" />
            <div className="space-y-10">
                {data.experience.map((item, i) => (
                    <div key={i} className="relative pl-8 border-l border-white/10">
                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-white"></div>
                        <div className="md:flex md:justify-between md:items-start mb-3">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                                <p className="text-gray-400 text-sm">{item.company}</p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-0.5 mt-1 md:mt-0">
                                {(item.dates || []).map((d, di) => (
                                    <p key={di} className="text-gray-500 text-sm font-mono">{d}</p>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

/* ── Education ── */
const Education = ({ data }) => {
    // Group semesters into academic years: each year = [Fall, Spring]
    // data is ordered: Fall 2023, Spring 2024, Fall 2024, Spring 2025, ...
    const years = [];
    for (let i = 0; i < data.education.length; i += 2) {
        const fall = data.education[i];
        const spring = data.education[i + 1];
        const yearLabel = fall.semester.replace('Fall ', '') + '–' + (parseInt(fall.semester.replace('Fall ', '')) + 1);
        years.push({ label: yearLabel, fall, spring });
    }

    const [selectedYear, setSelectedYear] = useState(years.length - 1);
    const year = years[selectedYear];

    return (
        <AnimatedSection id="education" className="py-20 bg-black text-white">
            <div className="max-w-5xl mx-auto px-6">
                <SectionTitle title="Education" index="04" />
                {/* Year selector tabs */}
                <div className="flex justify-center gap-2 mb-10 flex-wrap">
                    {years.map((y, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedYear(i)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                                selectedYear === i
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                        >
                            {y.label}
                        </button>
                    ))}
                </div>
                {/* Two-semester list */}
                <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-24">
                    {[year.fall, year.spring].filter(Boolean).map((sem, si) => (
                        <div key={si} className="w-full max-w-xs">
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium text-center md:text-left">{sem.semester}</p>
                            <ul className="space-y-2">
                                {sem.courses.map((c, j) => (
                                    <li key={j} className="text-gray-300 text-sm flex items-start gap-3 py-2 border-b border-white/[0.05]">
                                        <span className="text-white/20 mt-0.5 select-none">›</span>
                                        <span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

/* ── The Garage ── */
const GarageCard = ({ item }) => {
    const [ref, inView] = useScrollAnimation();
    return (
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href={item.href || `#/garage/${item.slug}`} className="garage-tile group block bg-gray-950 border border-white/[0.08] rounded-xl overflow-hidden no-underline">
                <div className="aspect-video overflow-hidden bg-gray-900 relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-x-0 bottom-0 garage-title-gradient px-5 pb-4 pt-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

const TheGarage = ({ data }) => (
    <AnimatedSection id="garage" className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle title="The Garage" index="05" />
            <p className="text-gray-500 text-sm mb-10">Side projects, experiments, and things I'm tinkering with.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.garage.map((item, i) => <GarageCard key={i} item={item} />)}
            </div>
        </div>
    </AnimatedSection>
);

/* ── Footer ── */
const Footer = ({ data }) => (
    <footer className="bg-black border-t border-white/[0.06] py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                <a href={`mailto:${data.contact.email}`} className="text-gray-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} {data.name}</p>
        </div>
    </footer>
);

/* ── Garage Sub-Page ── */
const GaragePage = ({ slug }) => {
    const project = portfolioData.garage.find(g => g.slug === slug);
    if (!project) return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <p className="text-gray-400 mb-6">Project not found.</p>
            <a href="#/" className="text-white underline text-sm">← Back home</a>
        </div>
    );
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <a href="#/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </a>
                <div className="text-6xl mb-6">{project.emoji}</div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{project.title}</h1>
                <p className="text-gray-400 text-lg mb-12">{project.description}</p>
                <div className="border border-white/[0.08] rounded-xl p-12 text-center">
                    <p className="text-gray-600 text-sm uppercase tracking-widest mb-2">Coming Soon</p>
                    <p className="text-gray-500 text-sm">This project page is under construction.</p>
                </div>
            </div>
        </div>
    );
};

/* ── App ── */
export default function App() {
    const [route, setRoute] = useState({ page: 'home', slug: null });

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#/garage/')) {
                setRoute({ page: 'garage', slug: hash.slice(9) });
            } else {
                setRoute({ page: 'home', slug: null });
            }
        };
        window.addEventListener('hashchange', handleHash);
        handleHash();
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    if (route.page === 'garage') {
        return <GaragePage slug={route.slug} />;
    }

    return (
        <main>
            <Navbar />
            <Hero data={portfolioData} />
            <div className="section-divider" />
            <About data={portfolioData} />
            <div className="section-divider" />
            <Projects data={portfolioData} />
            <div className="section-divider" />
            <Experience data={portfolioData} />
            <div className="section-divider" />
            <Education data={portfolioData} />
            <div className="section-divider" />
            <TheGarage data={portfolioData} />
            <Footer data={portfolioData} />
        </main>
    );
}
