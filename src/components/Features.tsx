import React from 'react';
import { Brain, Shield, Zap, TrendingUp, Users, Award } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze thousands of data points for accurate predictions.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your property valuation in seconds with our lightning-fast prediction engine.'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Real-time market trends and neighborhood analysis for informed decision making.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your property information is encrypted and never shared with third parties.'
    },
    {
      icon: Users,
      title: 'Expert Validated',
      description: 'Our models are continuously refined by real estate professionals and market experts.'
    },
    {
      icon: Award,
      title: '95% Accuracy',
      description: 'Industry-leading accuracy rate based on thousands of successful predictions.'
    }
  ];

  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Why Choose HomePricer?
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Trusted by thousands of homeowners, real estate agents, and investors for accurate property valuations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-effect rounded-xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;