import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-8 border-t border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-white/80 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-2 text-red-400" />
            <span>by the HomePricer Team</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © 2024 HomePricer. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;