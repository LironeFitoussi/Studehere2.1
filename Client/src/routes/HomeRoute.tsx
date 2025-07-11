import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useAuth0 } from "@auth0/auth0-react";
import Features from '@/components/Organisms/Features';
import Hero from '@/components/Organisms/Hero';
import Benefits from '@/components/Organisms/Benefits';
import { BookOpen, CalendarCheck, BarChart3, Users, MessageCircle, GraduationCap } from 'lucide-react';

export default function HomeRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { logout } = useAuth0();
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Course Management",
      description: "Easily create, update, and manage courses and materials.",
      details: [
        "Add and edit course information",
        "Upload and organize materials",
        "Assign instructors and students",
        "Archive or delete courses"
      ]
    },
    {
      icon: <CalendarCheck className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Automated attendance for classes and events.",
      details: [
        "Real-time attendance marking",
        "Automated reminders",
        "Attendance analytics",
        "Export attendance records"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Gradebook",
      description: "Efficient grading and performance analytics.",
      details: [
        "Input and manage grades",
        "Visualize student performance",
        "Export grade reports",
        "Customizable grading scales"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student & Teacher Portal",
      description: "Personalized dashboards for students and teachers.",
      details: [
        "Role-based dashboards",
        "Access to assignments and grades",
        "Profile management",
        "Direct messaging"
      ]
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Announcements",
      description: "Centralized communication for important updates.",
      details: [
        "Send announcements to all users",
        "Push/email notifications",
        "Announcement history",
        "Targeted communication"
      ]
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Graduation Progress",
      description: "Track academic progress towards graduation.",
      details: [
        "Visual progress tracker",
        "Credit and requirement monitoring",
        "Alerts for missing requirements",
        "Downloadable progress reports"
      ]
    }
  ];
  const benefits = [
    {
      icon: BarChart3,
      text: "Real-time analytics and insights for better decision making."
    },
    {
      icon: Users,
      text: "Fosters collaboration between teachers and students."
    },
    {
      icon: CalendarCheck,
      text: "Streamlined scheduling and notifications."
    },
    {
      icon: BookOpen,
      text: "Centralized academic resources and materials."
    },
  ];
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-white font-bold text-lg">A</span>
          </motion.div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Hero isAuthenticated={isAuthenticated} isLoading={isLoading} navigate={navigate} logout={logout} />
      <Features features={features} />
      <Benefits benefits={benefits} />
    </div>
  );
}
