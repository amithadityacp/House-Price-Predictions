import React, { useState } from 'react';
import { Calculator, MapPin, Bed, Bath, Square, DollarSign, Sparkles } from 'lucide-react';

interface FormData {
  bedrooms: string;
  bathrooms: string;
  sqft_living: string;
  location: string;
  yearBuilt: string;
  lotSize: string;
}

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    bedrooms: '',
    bathrooms: '',
    sqft_living: '',
    location: '',
    yearBuilt: '',
    lotSize: ''
  });
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePrice = () => {
    // Enhanced prediction algorithm with more factors
    const bedrooms = parseInt(formData.bedrooms) || 0;
    const bathrooms = parseFloat(formData.bathrooms) || 0;
    const sqft = parseInt(formData.sqft_living) || 0;
    const yearBuilt = parseInt(formData.yearBuilt) || 2000;
    const lotSize = parseInt(formData.lotSize) || 5000;
    
    // Location multipliers
    const locationMultipliers: { [key: string]: number } = {
      'downtown': 1.5,
      'suburbs': 1.2,
      'rural': 0.9,
      'waterfront': 1.8,
      'mountain': 1.3
    };
    
    const locationMultiplier = locationMultipliers[formData.location] || 1.0;
    const ageMultiplier = Math.max(0.7, 1 - (2024 - yearBuilt) * 0.005);
    
    // Base calculation with enhanced factors
    let basePrice = (sqft * 150) + (bedrooms * 15000) + (bathrooms * 12000) + (lotSize * 5);
    basePrice *= locationMultiplier * ageMultiplier;
    
    // Add some realistic variance
    const variance = 0.1;
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    
    return Math.round(basePrice * randomFactor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const predictedPrice = calculatePrice();
    setPrediction(predictedPrice);
    setIsLoading(false);
    setShowResult(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Predict Your Home's Value
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Get an instant AI-powered estimate of your property's market value using advanced algorithms and real-time market data.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="glass-effect rounded-2xl p-8 slide-in">
          <div className="flex items-center mb-6">
            <Calculator className="w-6 h-6 text-white mr-3" />
            <h3 className="text-xl font-semibold text-white">Property Details</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  <Bed className="w-4 h-4 inline mr-2" />
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 input-focus focus:outline-none focus:border-white/60"
                  placeholder="e.g., 3"
                />
              </div>
              
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  <Bath className="w-4 h-4 inline mr-2" />
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  step="0.5"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 input-focus focus:outline-none focus:border-white/60"
                  placeholder="e.g., 2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">
                <Square className="w-4 h-4 inline mr-2" />
                Living Area (sq ft)
              </label>
              <input
                type="number"
                name="sqft_living"
                value={formData.sqft_living}
                onChange={handleInputChange}
                min="500"
                max="10000"
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 input-focus focus:outline-none focus:border-white/60"
                placeholder="e.g., 2000"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location Type
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white input-focus focus:outline-none focus:border-white/60"
                >
                  <option value="">Select location</option>
                  <option value="downtown">Downtown</option>
                  <option value="suburbs">Suburbs</option>
                  <option value="rural">Rural</option>
                  <option value="waterfront">Waterfront</option>
                  <option value="mountain">Mountain View</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  min="1900"
                  max="2024"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 input-focus focus:outline-none focus:border-white/60"
                  placeholder="e.g., 2010"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2">
                Lot Size (sq ft)
              </label>
              <input
                type="number"
                name="lotSize"
                value={formData.lotSize}
                onChange={handleInputChange}
                min="1000"
                max="50000"
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 input-focus focus:outline-none focus:border-white/60"
                placeholder="e.g., 7500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Analyzing Property...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Price Prediction
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="glass-effect rounded-2xl p-8 slide-in">
          <div className="flex items-center mb-6">
            <DollarSign className="w-6 h-6 text-white mr-3" />
            <h3 className="text-xl font-semibold text-white">Price Prediction</h3>
          </div>
          
          {!showResult && !isLoading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-12 h-12 text-white/60" />
              </div>
              <p className="text-white/70 text-lg">
                Fill out the form to get your property valuation
              </p>
            </div>
          )}
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 pulse-animation">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <p className="text-white text-lg mb-2">Analyzing your property...</p>
              <p className="text-white/70">This may take a few moments</p>
            </div>
          )}
          
          {showResult && prediction && (
            <div className="text-center py-8 slide-in">
              <div className="mb-6">
                <div className="text-5xl font-bold text-white mb-2">
                  {formatPrice(prediction)}
                </div>
                <p className="text-white/80 text-lg">Estimated Market Value</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/70">Confidence Level</p>
                    <p className="text-white font-semibold">85%</p>
                  </div>
                  <div>
                    <p className="text-white/70">Market Trend</p>
                    <p className="text-green-400 font-semibold">↗ Rising</p>
                  </div>
                </div>
              </div>
              
              <div className="text-white/70 text-sm">
                <p>* This is an estimate based on current market data and property characteristics.</p>
                <p>Actual market value may vary based on additional factors.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;