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
    modulesTab: "Modules"
  },
  {
    id: 'wk-2',
    audience: "Beginners",
    title: "UI/UX Design Fundamentals",
    topic: "Arts",
    image: "/images/desk-setup.jpg",
    
    // Details for the detail page
    scheduleDate: "Tuesday, August 20, 2024",
    scheduleTime: "11:50 AM",
    duration: "90 minutes",
    instructorName: "Jane Smith",
    instructorTopic: "Design",
    description: "Learn the core principles of UI and UX design, focusing on wireframing, prototyping, and user-centered design methodologies.",
    detailsTab: "Details",
    instructorTab: "Instructor",
    modulesTab: "Modules"
  },
  // ... (You would add similar detail fields for wk-3, wk-4, and any new workshops)
  // ...
];

export default workshopsData;