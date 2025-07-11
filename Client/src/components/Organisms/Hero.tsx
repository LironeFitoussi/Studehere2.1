import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/Molecules/LanguageSwitcher';
import { ArrowRight, ExternalLink, Settings } from 'lucide-react';

interface HeroProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  navigate: (path: string) => void;
  logout: (options: { logoutParams: { returnTo: string } }) => void;
}

const Hero: React.FC<HeroProps> = ({ isAuthenticated, isLoading, navigate, logout }) => {
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
    <>
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <span className="text-white font-bold text-sm">A</span>
              </motion.div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                React-Nest Ultimate
              </h1>
            </motion.div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              {!isAuthenticated && (
                <Button 
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  onClick={() => {
                    localStorage.removeItem("auth0_token");
                    localStorage.removeItem("auth0_id_token");
                    localStorage.removeItem("auth0_user");
                    localStorage.removeItem("auth0_expires_at");
                    logout({ logoutParams: { returnTo: window.location.origin } });
                  }}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-white font-bold text-2xl">A</span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Smart University Management System
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Developed by: <a href="https://www.linkedin.com/in/lirone-fitoussi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lirone Fitoussi</a>
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Empowering teachers and students with seamless academic management, collaboration, and communication.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {!isAuthenticated ? (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/test')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Demo
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/test')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Features
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero; 