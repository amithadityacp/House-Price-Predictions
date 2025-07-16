import React from 'react';
import { Home, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Home className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">HomePricer</h1>
              <p className="text-white/80 text-sm">AI-Powered Price Predictions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-white/90">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Market Insights</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;