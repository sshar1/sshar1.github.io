import React, { useState, useEffect, useRef } from 'react';
import { ChevronsDown, Cpu, Code, Linkedin, Github, Mail, Send, HardDrive, BrainCircuit, Bot } from 'lucide-react';

// Data for the portfolio
const portfolioData = {
    name: "Sami Sharif",
    title: "Electrical & Computer Engineer | Software Engineer",
    about: "I'm a sophomore at Carnegie Mellon University pursuing a Bachelor's degree in Electrical & Computer Engineering and Robotics. My main interests lie in robotics software and embedded systems, but I also have experience developing games, making apps, and coding random things. I love swimming, playing frisbee, and cats.",
    selfie: "./src/assets/me.jpg",
    skills: {
        languages: [
            { name: "C++", icon: Code },
            { name: "Java", icon: Code },
            { name: "Python", icon: Code },
            { name: "C#", icon: Code },
            { name: "C", icon: Code },
            { name: "Lua", icon: Code },
            { name: "Dart", icon: Code },
            { name: "JavaScript", icon: Code },
            { name: "HTML/CSS", icon: Code },
        ],
        toolsAndFrameworks: [
            { name: "React", icon: Code },
            { name: "ROS", icon: Bot },
            { name: "Unity", icon: Code },
            { name: "Arduino", icon: Cpu },
            { name: "Raspberry Pi", icon: Cpu },
            { name: "OpenCV", icon: BrainCircuit },
            { name: "OpenAI", icon: BrainCircuit },
            { name: "Flutter", icon: Code },
            { name: "MATLAB", icon: Code },
        ],
        fabricationAndDesign: [
            { name: "OnShape", icon: Cpu },
            { name: "3D Printing", icon: Cpu },
            { name: "Laser Cutting", icon: Cpu },
        ]
    },
    projects: [
        {
            title: "PandaFan",
            img: "./src/assets/pandafan.png",
            description: "Engineered and prototyped a custom toroidal fan, translating a 3D model from Onshape into a physical assembly using digital fabrication techniques.\nEngineered an autonomous tracking system where a Raspberry Pi uses OpenCV cascade classifiers for real-time face detection, commanding an Arduino via serial communication to aim the fan with stepper motors.",
            tech: ["Python", "Raspberry Pi", "OpenCV", "Arduino", "Solidworks", "Digital Fabrication", "Laser Cutting"]
        },
        {
            title: "NOVA Hackathon - 1st Place",
            img: "./src/assets/intellinote.png",
            description: "Won 1st place of 42 teams by using the OpenAI API to generate test questions from an uploaded note file and provide feedback to user's answers.\nImplemented a spaced repetition algorithm to inform what questions to ask based on a heatmap of user's understanding.\nWon the Everyday Impact Award sponsored by Sandia National Laboratories.",
            tech: ["OpenAI API", "Python", "Streamlit", "Spaced Repetition"]
        },
        {
            title: "Red Robot Hackathon - 1st Place",
            img: "./src/assets/redrobot.png",
            description: "Won 1st place in Red Robot, Carnegie Mellon’s Roboclub Hackathon, by designing and manufacturing a robot with a 4-bar linkage lift to stack and deliver objects.\nWon the Autonomous Award sponsored by Caterpillar for an autonomous routine using feedback control and an IR sensor to follow a path.",
            tech: ["Arduino", "Laser Cutting", "3D Printing", "OnShape", "Design"]
        },
        {
            title: "Autonomous Robot Simulator",
            img: "./src/assets/robotsim.png",
            description: "Remodeled, animated, and added controls to FRC 118's 2022 robot within a custom robot simulator leveraging Unity.\nDeveloped a reliable launching algorithm based on calculus and kinematics, now utilized in FRC 2601's simulations.\nIntegrated an A* pathfinding algorithm to allow the robot to autonomously create and follow trajectories.",
            tech: ["Unity", "C#", "A* Pathfinding", "Kinematics"]
        },
        {
            title: "Enigma",
            img: "./src/assets/enigma.png",
            description: "Created a user interface and backend for an app to practice decoding common ciphers from the Science Olympiad, utilizing the Flutter framework.\nImplemented a monoalphabetic substitution solver algorithm in Dart to automatically decode Aristocrat ciphers.",
            tech: ["Flutter", "Dart"]
        }
    ],
    experience: [
        {
            role: "Software Engineering Intern",
            company: "Roblox",
            date: "May 2025 - August 2025",
            description: "Designed and proposed a backwards-compatible API for new UIStroke features, collaborating with the engine review board to ensure backwards compatibility and future extensibility.\nEngineered support for image-based strokes by implementing a custom HLSL shader and a jump flooding algorithm.\nRefactored the C++-based UIStroke rendering architecture to support multiple, dynamic, and screen-responsive stroke effects.\nValidated performance impact by writing a suite of unit tests, confirming new features maintained a render time of ~0.04 ms and decreased memory consumption by ~25%."
        },
        {
            role: "Software Lead & Driver",
            company: "FRC 2601",
            date: "September 2021 - May 2024",
            description: "Revamped team's legacy coding framework, implementing a command-based structure with safer control of interconnected mechanisms, improved modularity, and a 70% decrease in CAN bus utilization.\nDesigned team's programming curriculum and handbook to introduce 30+ members to Java and control theory.\nDrove robot in high-intensity matches at all competitions, leading to 2 competition wins and 2 finalist placements."
        }

    ],
    contact: {
        email: "ssharif@andrew.cmu.edu",
        linkedin: "https://linkedin.com/in/sami-sharif1",
        github: "https://github.com/sshar1"
    }
};


// Custom Hook for Scroll Animation
const useScrollAnimation = () => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, inView];
};

// Animated Component Wrapper
const AnimatedSection = ({ children, className }) => {
    const [ref, inView] = useScrollAnimation();
    return (
        <section
            ref={ref}
            className={`transition-all duration-1000 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </section>
    );
};

// Section Title Component
const SectionTitle = ({ title }) => (
    <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold inline-block relative pb-4">
            {title}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[3px] bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
        </h2>
    </div>
);

// Corrected SVG-based PCB Trace Component
const PcbTrace = ({ pathData, endPoint, top, side, width, delay }) => {
    const pathRef = useRef(null);
    const [traceState, setTraceState] = useState({
        dashArray: 0,
        dashOffset: 0,
        isAnimating: false,
    });
    const sideClass = side === 'left' ? 'left-0' : 'right-0';

    useEffect(() => {
        if (pathRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            setTraceState(s => ({ ...s, dashArray: pathLength, dashOffset: pathLength }));

            const timer = setTimeout(() => {
                setTraceState(s => ({ ...s, isAnimating: true }));
            }, parseFloat(delay) * 1000);

            return () => clearTimeout(timer);
        }
    }, [pathData, delay]);

    const circleTop = (endPoint.y / 150) * 100;
    const circleSidePosition = side === 'left' ? { right: '-4px' } : { left: '-4px' };
    const circleScale = traceState.isAnimating ? 1 : 0;

    return (
        <div className={`absolute ${top} ${sideClass} ${width} h-[150px] pointer-events-none`}>
            <svg className="w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
                <path
                    ref={pathRef}
                    d={pathData}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={traceState.dashArray}
                    strokeDashoffset={traceState.dashOffset}
                    className={traceState.isAnimating ? 'animate-trace' : ''}
                />
            </svg>
            <div
                className="absolute w-2 h-2 bg-white rounded-full transition-transform duration-500"
                style={{
                    top: `${circleTop}%`,
                    ...circleSidePosition,
                    transform: `translateY(-50%) scale(${circleScale})`,
                    transitionDelay: traceState.isAnimating ? '1.3s' : '0s',
                }}
            />
        </div>
    );
};


// --- Components ---

const Hero = ({ data }) => {
    const [typedTitle, setTypedTitle] = useState('');

    useEffect(() => {
        setTypedTitle('');
        const interval = setInterval(() => {
            setTypedTitle(prev => {
                if (prev.length < data.title.length) {
                    return data.title.slice(0, prev.length + 1);
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 75);
        return () => clearInterval(interval);
    }, [data.title]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            <PcbTrace top="top-[10%]" side="left" width="w-[35vw] md:w-[30vw]" pathData="M 0 20 L 120 20 L 150 50 L 200 50" endPoint={{x: 200, y: 50}} delay="0.5s" />
            <PcbTrace top="top-[25%]" side="left" width="w-[25vw] md:w-[20vw]" pathData="M 0 80 L 150 80 L 200 130" endPoint={{x: 200, y: 130}} delay="1.1s" />
            <PcbTrace top="top-[40%]" side="left" width="w-[30vw] md:w-[25vw]" pathData="M 0 100 L 80 100 L 110 70 L 200 70" endPoint={{x: 200, y: 70}} delay="0.8s" />
            <PcbTrace top="top-[65%]" side="left" width="w-[28vw] md:w-[22vw]" pathData="M 0 40 L 140 40 L 200 100" endPoint={{x: 200, y: 100}} delay="0.6s" />
            <PcbTrace top="top-[80%]" side="left" width="w-[32vw] md:w-[28vw]" pathData="M 0 60 L 100 60 L 130 90 L 200 90" endPoint={{x: 200, y: 90}} delay="1.3s" />

            <PcbTrace top="top-[12%]" side="right" width="w-[33vw] md:w-[28vw]" pathData="M 200 30 L 80 30 L 50 60 L 0 60" endPoint={{x: 0, y: 60}} delay="0.7s" />
            <PcbTrace top="top-[30%]" side="right" width="w-[28vw] md:w-[24vw]" pathData="M 200 110 L 50 110 L 0 60" endPoint={{x: 0, y: 60}} delay="1.2s" />
            <PcbTrace top="top-[50%]" side="right" width="w-[30vw] md:w-[25vw]" pathData="M 200 50 L 120 50 L 90 80 L 0 80" endPoint={{x: 0, y: 80}} delay="0.4s" />
            <PcbTrace top="top-[68%]" side="right" width="w-[36vw] md:w-[30vw]" pathData="M 200 90 L 80 90 L 50 120 L 0 120" endPoint={{x: 0, y: 120}} delay="0.9s" />
            <PcbTrace top="top-[85%]" side="right" width="w-[25vw] md:w-[20vw]" pathData="M 200 20 L 50 20 L 0 70" endPoint={{x: 0, y: 70}} delay="1.4s" />


            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="z-10 p-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white animate-fade-in-down">
                    {data.name}
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-gray-300 font-mono h-8">
                    {typedTitle}
                    <span className="animate-ping">|</span>
                </p>
            </div>
            <div className="absolute bottom-10 animate-bounce">
                <ChevronsDown className="w-8 h-8 text-gray-300" />
            </div>
        </div>
    );
};

const About = ({ data }) => {
    return (
        <AnimatedSection className="py-20 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <SectionTitle title="About Me" />
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/3 flex justify-center">
                        <div className="w-48 h-48 md:w-90 md:h-90 rounded-full bg-gradient-to-br from-gray-600 to-gray-200 p-1 shadow-lg">
                            <img
                                src={`${data.selfie}`}
                                alt={data.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3 text-2xl text-gray-300 text-center md:text-left">
                        <p>{data.about}</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};


const Skills = ({ data }) => {
    const skillCategories = [
        { title: 'Languages', skills: data.skills.languages },
        { title: 'Tools & Frameworks', skills: data.skills.toolsAndFrameworks },
        { title: 'Fabrication & Design', skills: data.skills.fabricationAndDesign },
    ];

    return (
        <AnimatedSection className="py-20 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12">
                <SectionTitle title="Skills" />
                <div className="max-w-7xl mx-auto space-y-8">
                    {skillCategories.map(category => (
                        <div key={category.title} className="flex flex-col md:flex-row md:items-start">
                            <h3 className="text-3xl font-semibold mb-4 md:mb-0 md:w-1/3">{category.title}</h3>
                            <div className="flex flex-wrap gap-4 md:w-2/3">
                                {category.skills.map((skill, index) => {
                                    const Icon = skill.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg shadow-sm">
                                            <Icon className="w-6 h-6 text-gray-300"/>
                                            <span className="font-medium text-gray-200">{skill.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}

// A new component for individual project tiles to handle their own animation
const AnimatedProjectTile = ({ project }) => {
    const [ref, inView] = useScrollAnimation();
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-black rounded-2xl overflow-hidden border-2 border-white hover:scale-105 flex flex-col md:flex-row`}
        >
            <div className="md:w-1/3 bg-gray-900 flex items-center justify-center">
                <img
                    src={`${project.img}`}
                    alt={`${project.title} placeholder`}
                    className="w-full h-auto rounded-md object-cover"
                />
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-6 text-lg whitespace-pre-line">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                        <span key={i} className="bg-gray-800 text-gray-200 px-4 py-2 rounded-full font-medium">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Projects = ({ data }) => {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto">
                <SectionTitle title="Projects" />
                <div className="space-y-12 w-11/12 mx-auto">
                    {data.projects.map((project, index) => (
                        <AnimatedProjectTile key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Experience = ({ data }) => {
    return (
        <AnimatedSection className="py-20 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12">
                <SectionTitle title="Experience" />
                <div className="relative border-l-2 border-gray-700 ml-6 md:ml-0 md:mx-auto max-w-7xl">
                    {data.experience.map((item, index) => (
                        <div key={index} className="mb-12 pl-10 md:pl-0">
                            <div className="absolute -left-3.5 mt-1.5 w-6 h-6 bg-white rounded-full border-4 border-black"></div>
                            <div className="md:flex md:items-start md:gap-8">
                                <div className="md:w-1/3 md:text-right">
                                    <h3 className="text-2xl font-bold text-white mt-1">{item.role}</h3>
                                    <p className="text-lg text-gray-400">{item.company}</p>
                                    <p className="text-md text-gray-500">{item.date}</p>
                                </div>
                                <div className="md:w-2/3 mt-4 md:mt-0">
                                    <p className="text-gray-300 text-lg whitespace-pre-line">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const Contact = ({ data }) => {
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Message sent!');
        setTimeout(() => setFormStatus(''), 3000);
        e.target.reset();
    };

    return (
        <AnimatedSection className="py-20 bg-black text-white">
            <div className="container mx-auto px-6 md:px-12">
                <SectionTitle title="Get In Touch" />
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <input type="text" placeholder="Your Name" required className="w-full p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"/>
                            <input type="email" placeholder="Your Email" required className="w-full p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"/>
                        </div>
                        <textarea placeholder="Your Message" rows="6" required className="w-full p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"></textarea>
                        <div className="text-center">
                            <button type="submit" className="inline-flex items-center gap-2 bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-colors duration-300 transform hover:scale-105">
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </div>
                    </form>
                    {formStatus && <p className="text-center mt-4 text-green-400">{formStatus}</p>}
                    <div className="flex justify-center space-x-8 mt-12">
                        <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="w-8 h-8"/>
                        </a>
                        <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-8 h-8"/>
                        </a>
                        <a href={`mailto:${data.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                            <Mail className="w-8 h-8"/>
                        </a>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Footer = ({ data }) => {
    return (
        <footer className="bg-black text-gray-500 py-6 text-center">
            <p>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</p>
        </footer>
    );
};


// --- Main App Component ---

export default function App() {
    return (
        <main>
            <Hero data={portfolioData} />
            <About data={portfolioData} />
            <Skills data={portfolioData} />
            <Projects data={portfolioData} />
            <Experience data={portfolioData} />
            <Contact data={portfolioData} />
            <Footer data={portfolioData} />
        </main>
    );
}
