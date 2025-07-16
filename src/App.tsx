import React from 'react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <PredictionForm />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;