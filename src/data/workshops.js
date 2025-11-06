// src/data/workshops.js

const workshopsData = [
  {
    id: 'wk-1', // Unique ID for routing
    audience: "Professionals",
    title: "Advanced React Patterns",
    topic: "Technology",
    image: "/images/code-screen.jpg",
    
    // Details for the detail page
    scheduleDate: "Thursday, August 15, 2024",
    scheduleTime: "7:30 PM",
    duration: "120 minutes",
    instructorName: "Arepalli Gopi",
    instructorTopic: "Technology",
    description: "Dive deep into advanced React patterns, including hooks, context, and performance optimization techniques. This workshop is for experienced developers looking to level up their skills.",
    detailsTab: "Details",
    instructorTab: "Instructor",
    modulesTab: "Modules",
    
    // Modules and Lessons (with video IDs for the player)
    modules: [
        { 
            title: 'Module 1: Custom Hooks & Performance', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'Introduction and Setup', 
                    duration: '12 min',
                    // IMPORTANT: Replace 'dQw4w9WgXcQ' with an actual YouTube video ID
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'article', name: 'Core Concepts Overview', duration: '20 min read' },
                { 
                    type: 'video', 
                    name: 'Building a Custom Hook', 
                    duration: '25 min',
                    videoId: 'QpJSf-3TPfA' 
                },
            ]
        },
        { 
            title: 'Module 2: Context API vs. Redux', 
            lessons: [
                { type: 'article', name: 'Understanding Global State', duration: '15 min read' },
                { 
                    type: 'video', 
                    name: 'Deep Dive into Context API', 
                    duration: '30 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'quiz', name: 'Module 2 Quiz', duration: '10 questions' },
                
            ]
        },
    ]
  },
  {
    id: 'wk-2',
    audience: "Beginners",
    title: "UI/UX Design Fundamentals",
    topic: "Arts",
    image: "/images/desk-screen.png",
    
    // Details for the detail page
    scheduleDate: "Tuesday, August 20, 2024",
    scheduleTime: "11:50 AM",
    duration: "90 minutes",
    instructorName: "Jane Smith",
    instructorTopic: "Design",
    description: "Learn the core principles of UI and UX design, focusing on wireframing, prototyping, and user-centered design methodologies.",
    detailsTab: "Details",
    instructorTab: "Instructor",
    modulesTab: "Modules",
    
    // Modules and Lessons (with video IDs)
    modules: [
        { 
            title: 'Module 1: Design Thinking Process', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'What is UX?', 
                    duration: '10 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'article', name: 'User Personas and Scenarios', duration: '15 min read' },
            ]
        },
        { 
            title: 'Module 2: Wireframing and Prototyping', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'Low-Fidelity Wireframing', 
                    duration: '20 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'article', name: 'Tools and Techniques', duration: '10 min read' },
                { type: 'quiz', name: 'Module 2 Quiz', duration: '8 questions' },
            ]
        },
    ]
  },  
  {
    id: 'wk-3',
    audience: "Beginners",
    title: "UI Design Fundamentals",
    topic: "Arts",
    image: "/images/desk-screen.png",
    
    // Details for the detail page
    scheduleDate: "Tuesday, August 20, 2024",
    scheduleTime: "11:50 AM",
    duration: "90 minutes",
    instructorName: "Jane Smith",
    instructorTopic: "Design",
    description: "Learn the core principles of UI design, focusing on typography, color theory, and visual hierarchy.",
    detailsTab: "Details",
    instructorTab: "Instructor",
    modulesTab: "Modules",
    
    // Modules and Lessons (with video IDs)
    modules: [
        { 
            title: 'Module 1: Color and Typography', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'Color Theory for Web', 
                    duration: '15 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'article', name: 'Choosing the Right Font Pairings', duration: '10 min read' },
            ]
        },
        { 
            title: 'Module 2: Layout and Grids', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'Applying the 8-Point Grid System', 
                    duration: '20 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'quiz', name: 'Module 2 Quiz', duration: '8 questions' },
                
            ]
        },
    ]
  },
  {
    id: 'wk-4',
    audience: "Beginners",
    title: "UX Design Fundamentals",
    topic: "Arts",
    image: "/images/desk-screen.png",
    
    // Details for the detail page
    scheduleDate: "Tuesday, August 20, 2024",
    scheduleTime: "11:50 AM",
    duration: "90 minutes",
    instructorName: "Jane Smith",
    instructorTopic: "Design",
    description: "Learn the core principles of UI design, focusing on typography, color theory, and visual hierarchy.",
    detailsTab: "Details",
    instructorTab: "Instructor",
    modulesTab: "Modules",
    
    // Modules and Lessons (with video IDs)
    modules: [
        { 
            title: 'Module 1: Color and Typography', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'Color Theory for Web', 
                    duration: '15 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'article', name: 'Choosing the Right Font Pairings', duration: '10 min read' },
                { type: 'quiz', name: 'Module 2 Quiz', duration: '8 questions' },
            ]
        },
        { 
            title: 'Module 2: Layout and Grids', 
            lessons: [
                { 
                    type: 'video', 
                    name: 'Applying the 8-Point Grid System', 
                    duration: '20 min',
                    videoId: 'QpJSf-3TPfA' 
                },
                { type: 'quiz', name: 'Module 2 Quiz', duration: '8 questions' },
                
            ]
        },
    ]
  },
  // Add more workshop objects here as needed
];

export default workshopsData;