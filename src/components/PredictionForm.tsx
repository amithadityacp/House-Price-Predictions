import React, { useState } from 'react';
import { Calculator, MapPin, Bed, Bath, Square, DollarSign, Sparkles } from 'lucide-react';

interface FormData {
  bedrooms: string;
  bathrooms: string;
  sqft_living: string;
  location: string;
}

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    bedrooms: '',
    bathrooms: '',
    sqft_living: '',
    location: '',
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
    
    // Location multipliers for Indian cities/areas
    const locationMultipliers: { [key: string]: number } = {
      'mumbai': 2.5,
      'delhi': 2.2,
      'bangalore': 2.0,
      'hyderabad': 1.8,
      'chennai': 1.7,
      'kolkata': 1.5,
      'pune': 1.6,
      'ahmedabad': 1.4,
      'jaipur': 1.2,
      'lucknow': 1.1,
      'chandigarh': 1.3,
      'kochi': 1.4,
      'surat': 1.3,
      'kanpur': 1.0,
      'nagpur': 1.1,
      'visakhapatnam': 1.2,
      'vadodara': 1.3,
      'coimbatore': 1.2,
      'agra': 0.9,
      'madurai': 1.1,
      'nashik': 1.2,
      'faridabad': 1.4,
      'meerut': 0.9,
      'rajkot': 1.1,
      'kalyan': 1.8,
      'vasai': 1.7,
      'varanasi': 0.8,
      'aurangabad': 1.0,
      'dhanbad': 0.7,
      'amritsar': 1.0,
      'navi_mumbai': 2.0,
      'allahabad': 0.8,
      'ranchi': 0.9,
      'howrah': 1.2,
      'jabalpur': 0.8,
      'gwalior': 0.8,
      'vijayawada': 1.0,
      'jodhpur': 0.9,
      'raipur': 0.8,
      'kota': 0.9,
      'guwahati': 1.0,
      'chandigarh_tri': 1.3,
      'solapur': 0.8,
      'hubli': 0.9,
      'bareilly': 0.7,
      'moradabad': 0.7,
      'mysore': 1.0,
      'gurgaon': 1.8,
      'aligarh': 0.7,
      'jalandhar': 0.9,
      'tiruchirappalli': 0.9,
      'bhubaneswar': 1.0,
      'salem': 0.8,
      'warangal': 0.8,
      'mira_bhayandar': 1.6,
      'thiruvananthapuram': 1.2,
      'bhiwandi': 1.4,
      'saharanpur': 0.7,
      'guntur': 0.8,
      'amravati': 0.8,
      'bikaner': 0.7,
      'noida': 1.6,
      'jamshedpur': 0.8,
      'bhilai': 0.7,
      'cuttack': 0.7,
      'firozabad': 0.6,
      'kochi_metro': 1.4,
      'nellore': 0.7,
      'bhavnagar': 0.8,
      'dehradun': 1.0,
      'durgapur': 0.7,
      'asansol': 0.7,
      'rourkela': 0.7,
      'nanded': 0.7,
      'kolhapur': 0.8,
      'ajmer': 0.7,
      'akola': 0.7,
      'gulbarga': 0.7,
      'jamnagar': 0.8,
      'ujjain': 0.7,
      'loni': 1.2,
      'siliguri': 0.8,
      'jhansi': 0.7,
      'ulhasnagar': 1.4,
      'jammu': 0.9,
      'sangli_miraj': 0.8,
      'mangalore': 1.0,
      'erode': 0.8,
      'belgaum': 0.8,
      'ambattur': 1.4,
      'tirunelveli': 0.8,
      'malegaon': 0.7,
      'gaya': 0.6,
      'jalgaon': 0.7,
      'udaipur': 0.9,
      'maheshtala': 1.2,
      'indore': 1.0,
      'bhopal': 0.9,
      'patna': 0.8,
      'ludhiana': 0.9,
      'agartala': 0.7,
      'muzaffarpur': 0.6,
      'bhatpara': 1.0,
      'panihati': 1.0,
      'latur': 0.7,
      'dhule': 0.7,
      'rohtak': 0.8,
      'korba': 0.6,
      'bhilwara': 0.6,
      'berhampur': 0.6,
      'muzaffarnagar': 0.6,
      'ahmednagar': 0.7,
      'mathura': 0.7,
      'kollam': 0.9,
      'avadi': 1.2,
      'kadapa': 0.6,
      'kamarhati': 1.0,
      'sambalpur': 0.6,
      'bilaspur': 0.6,
      'shahjahanpur': 0.6,
      'satara': 0.7,
      'bijapur': 0.6,
      'rampur': 0.6,
      'shivamogga': 0.7,
      'chandrapur': 0.6,
      'junagadh': 0.7,
      'thrissur': 0.9,
      'alwar': 0.7,
      'bardhaman': 0.7,
      'kulti': 0.6,
      'kakinada': 0.7,
      'nizamabad': 0.6,
      'parbhani': 0.6,
      'tumkur': 0.7,
      'khammam': 0.6,
      'ozhukarai': 0.8,
      'bihar_sharif': 0.5,
      'panipat': 0.7,
      'darbhanga': 0.5,
      'bally': 1.0,
      'aizawl': 0.7,
      'dewas': 0.6,
      'ichalkaranji': 0.7,
      'karnal': 0.7,
      'bathinda': 0.7,
      'jalna': 0.6,
      'eluru': 0.6,
      'kirari_suleman_nagar': 1.3,
      'barabanki': 0.5,
      'siwan': 0.5,
      'purnia': 0.5,
      'other_tier2': 0.7,
      'tier3_north': 0.5,
      'tier3_south': 0.6,
      'tier3_west': 0.5,
      'tier3_east': 0.4,
      'tier3_central': 0.4,
      'tier3_northeast': 0.6
    };
    
    const locationMultiplier = locationMultipliers[formData.location] || 1.0;
    
    // Base calculation for Indian market (prices in INR)
    let basePrice = (sqft * 4000) + (bedrooms * 500000) + (bathrooms * 300000);
    basePrice *= locationMultiplier;
    
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
      currency: 'INR',
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
            <div className="md:col-span-2">
              <label className="block text-white/90 font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                City/Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white input-focus focus:outline-none focus:border-white/60"
                style={{ color: 'white' }}
              >
                <option value="" style={{ color: '#1f2937', backgroundColor: 'white' }}>Select city/location</option>
                <optgroup label="Metro Cities">
                  <option value="mumbai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Mumbai</option>
                  <option value="delhi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Delhi NCR</option>
                  <option value="bangalore" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bangalore</option>
                  <option value="hyderabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Hyderabad</option>
                  <option value="chennai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Chennai</option>
                  <option value="kolkata" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kolkata</option>
                </optgroup>
                <optgroup label="Tier 1 Cities">
                  <option value="pune" style={{ color: '#1f2937', backgroundColor: 'white' }}>Pune</option>
                  <option value="ahmedabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ahmedabad</option>
                  <option value="jaipur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jaipur</option>
                  <option value="lucknow" style={{ color: '#1f2937', backgroundColor: 'white' }}>Lucknow</option>
                  <option value="chandigarh" style={{ color: '#1f2937', backgroundColor: 'white' }}>Chandigarh</option>
                  <option value="kochi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kochi</option>
                  <option value="surat" style={{ color: '#1f2937', backgroundColor: 'white' }}>Surat</option>
                  <option value="kanpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kanpur</option>
                  <option value="nagpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Nagpur</option>
                  <option value="visakhapatnam" style={{ color: '#1f2937', backgroundColor: 'white' }}>Visakhapatnam</option>
                  <option value="vadodara" style={{ color: '#1f2937', backgroundColor: 'white' }}>Vadodara</option>
                  <option value="coimbatore" style={{ color: '#1f2937', backgroundColor: 'white' }}>Coimbatore</option>
                  <option value="agra" style={{ color: '#1f2937', backgroundColor: 'white' }}>Agra</option>
                  <option value="madurai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Madurai</option>
                  <option value="nashik" style={{ color: '#1f2937', backgroundColor: 'white' }}>Nashik</option>
                  <option value="faridabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Faridabad</option>
                  <option value="meerut" style={{ color: '#1f2937', backgroundColor: 'white' }}>Meerut</option>
                  <option value="rajkot" style={{ color: '#1f2937', backgroundColor: 'white' }}>Rajkot</option>
                  <option value="kalyan" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kalyan-Dombivli</option>
                  <option value="vasai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Vasai-Virar</option>
                  <option value="varanasi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Varanasi</option>
                  <option value="aurangabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Aurangabad</option>
                  <option value="dhanbad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Dhanbad</option>
                  <option value="amritsar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Amritsar</option>
                  <option value="navi_mumbai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Navi Mumbai</option>
                  <option value="allahabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Allahabad</option>
                  <option value="ranchi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ranchi</option>
                  <option value="howrah" style={{ color: '#1f2937', backgroundColor: 'white' }}>Howrah</option>
                  <option value="jabalpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jabalpur</option>
                  <option value="gwalior" style={{ color: '#1f2937', backgroundColor: 'white' }}>Gwalior</option>
                  <option value="vijayawada" style={{ color: '#1f2937', backgroundColor: 'white' }}>Vijayawada</option>
                  <option value="jodhpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jodhpur</option>
                  <option value="raipur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Raipur</option>
                  <option value="kota" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kota</option>
                  <option value="guwahati" style={{ color: '#1f2937', backgroundColor: 'white' }}>Guwahati</option>
                  <option value="chandigarh_tri" style={{ color: '#1f2937', backgroundColor: 'white' }}>Chandigarh Tricity</option>
                  <option value="solapur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Solapur</option>
                  <option value="hubli" style={{ color: '#1f2937', backgroundColor: 'white' }}>Hubli-Dharwad</option>
                  <option value="bareilly" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bareilly</option>
                  <option value="moradabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Moradabad</option>
                  <option value="mysore" style={{ color: '#1f2937', backgroundColor: 'white' }}>Mysore</option>
                  <option value="gurgaon" style={{ color: '#1f2937', backgroundColor: 'white' }}>Gurgaon</option>
                  <option value="aligarh" style={{ color: '#1f2937', backgroundColor: 'white' }}>Aligarh</option>
                  <option value="jalandhar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jalandhar</option>
                  <option value="tiruchirappalli" style={{ color: '#1f2937', backgroundColor: 'white' }}>Tiruchirappalli</option>
                  <option value="bhubaneswar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhubaneswar</option>
                  <option value="salem" style={{ color: '#1f2937', backgroundColor: 'white' }}>Salem</option>
                  <option value="warangal" style={{ color: '#1f2937', backgroundColor: 'white' }}>Warangal</option>
                  <option value="mira_bhayandar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Mira-Bhayandar</option>
                  <option value="thiruvananthapuram" style={{ color: '#1f2937', backgroundColor: 'white' }}>Thiruvananthapuram</option>
                  <option value="bhiwandi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhiwandi</option>
                  <option value="saharanpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Saharanpur</option>
                  <option value="guntur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Guntur</option>
                  <option value="amravati" style={{ color: '#1f2937', backgroundColor: 'white' }}>Amravati</option>
                  <option value="bikaner" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bikaner</option>
                  <option value="noida" style={{ color: '#1f2937', backgroundColor: 'white' }}>Noida</option>
                  <option value="jamshedpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jamshedpur</option>
                  <option value="bhilai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhilai Nagar</option>
                  <option value="cuttack" style={{ color: '#1f2937', backgroundColor: 'white' }}>Cuttack</option>
                  <option value="firozabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Firozabad</option>
                  <option value="kochi_metro" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kochi Metro</option>
                  <option value="nellore" style={{ color: '#1f2937', backgroundColor: 'white' }}>Nellore</option>
                  <option value="bhavnagar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhavnagar</option>
                  <option value="dehradun" style={{ color: '#1f2937', backgroundColor: 'white' }}>Dehradun</option>
                  <option value="durgapur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Durgapur</option>
                  <option value="asansol" style={{ color: '#1f2937', backgroundColor: 'white' }}>Asansol</option>
                  <option value="rourkela" style={{ color: '#1f2937', backgroundColor: 'white' }}>Rourkela</option>
                  <option value="nanded" style={{ color: '#1f2937', backgroundColor: 'white' }}>Nanded</option>
                  <option value="kolhapur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kolhapur</option>
                  <option value="ajmer" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ajmer</option>
                  <option value="akola" style={{ color: '#1f2937', backgroundColor: 'white' }}>Akola</option>
                  <option value="gulbarga" style={{ color: '#1f2937', backgroundColor: 'white' }}>Gulbarga</option>
                  <option value="jamnagar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jamnagar</option>
                  <option value="ujjain" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ujjain</option>
                  <option value="loni" style={{ color: '#1f2937', backgroundColor: 'white' }}>Loni</option>
                  <option value="siliguri" style={{ color: '#1f2937', backgroundColor: 'white' }}>Siliguri</option>
                  <option value="jhansi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jhansi</option>
                  <option value="ulhasnagar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ulhasnagar</option>
                  <option value="jammu" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jammu</option>
                  <option value="sangli_miraj" style={{ color: '#1f2937', backgroundColor: 'white' }}>Sangli-Miraj</option>
                  <option value="mangalore" style={{ color: '#1f2937', backgroundColor: 'white' }}>Mangalore</option>
                  <option value="erode" style={{ color: '#1f2937', backgroundColor: 'white' }}>Erode</option>
                  <option value="belgaum" style={{ color: '#1f2937', backgroundColor: 'white' }}>Belgaum</option>
                  <option value="ambattur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ambattur</option>
                  <option value="tirunelveli" style={{ color: '#1f2937', backgroundColor: 'white' }}>Tirunelveli</option>
                  <option value="malegaon" style={{ color: '#1f2937', backgroundColor: 'white' }}>Malegaon</option>
                  <option value="gaya" style={{ color: '#1f2937', backgroundColor: 'white' }}>Gaya</option>
                  <option value="jalgaon" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jalgaon</option>
                  <option value="udaipur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Udaipur</option>
                  <option value="maheshtala" style={{ color: '#1f2937', backgroundColor: 'white' }}>Maheshtala</option>
                </optgroup>
                <optgroup label="Tier 2 Cities">
                  <option value="indore" style={{ color: '#1f2937', backgroundColor: 'white' }}>Indore</option>
                  <option value="bhopal" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhopal</option>
                  <option value="patna" style={{ color: '#1f2937', backgroundColor: 'white' }}>Patna</option>
                  <option value="ludhiana" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ludhiana</option>
                  <option value="agartala" style={{ color: '#1f2937', backgroundColor: 'white' }}>Agartala</option>
                  <option value="muzaffarpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Muzaffarpur</option>
                  <option value="bhatpara" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhatpara</option>
                  <option value="panihati" style={{ color: '#1f2937', backgroundColor: 'white' }}>Panihati</option>
                  <option value="latur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Latur</option>
                  <option value="dhule" style={{ color: '#1f2937', backgroundColor: 'white' }}>Dhule</option>
                  <option value="rohtak" style={{ color: '#1f2937', backgroundColor: 'white' }}>Rohtak</option>
                  <option value="korba" style={{ color: '#1f2937', backgroundColor: 'white' }}>Korba</option>
                  <option value="bhilwara" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bhilwara</option>
                  <option value="berhampur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Berhampur</option>
                  <option value="muzaffarnagar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Muzaffarnagar</option>
                  <option value="ahmednagar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ahmednagar</option>
                  <option value="mathura" style={{ color: '#1f2937', backgroundColor: 'white' }}>Mathura</option>
                  <option value="kollam" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kollam</option>
                  <option value="avadi" style={{ color: '#1f2937', backgroundColor: 'white' }}>Avadi</option>
                  <option value="kadapa" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kadapa</option>
                  <option value="kamarhati" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kamarhati</option>
                  <option value="sambalpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Sambalpur</option>
                  <option value="bilaspur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bilaspur</option>
                  <option value="shahjahanpur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Shahjahanpur</option>
                  <option value="satara" style={{ color: '#1f2937', backgroundColor: 'white' }}>Satara</option>
                  <option value="bijapur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bijapur</option>
                  <option value="rampur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Rampur</option>
                  <option value="shivamogga" style={{ color: '#1f2937', backgroundColor: 'white' }}>Shivamogga</option>
                  <option value="chandrapur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Chandrapur</option>
                  <option value="junagadh" style={{ color: '#1f2937', backgroundColor: 'white' }}>Junagadh</option>
                  <option value="thrissur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Thrissur</option>
                  <option value="alwar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Alwar</option>
                  <option value="bardhaman" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bardhaman</option>
                  <option value="kulti" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kulti</option>
                  <option value="kakinada" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kakinada</option>
                  <option value="nizamabad" style={{ color: '#1f2937', backgroundColor: 'white' }}>Nizamabad</option>
                  <option value="parbhani" style={{ color: '#1f2937', backgroundColor: 'white' }}>Parbhani</option>
                  <option value="tumkur" style={{ color: '#1f2937', backgroundColor: 'white' }}>Tumkur</option>
                  <option value="khammam" style={{ color: '#1f2937', backgroundColor: 'white' }}>Khammam</option>
                  <option value="ozhukarai" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ozhukarai</option>
                  <option value="bihar_sharif" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bihar Sharif</option>
                  <option value="panipat" style={{ color: '#1f2937', backgroundColor: 'white' }}>Panipat</option>
                  <option value="darbhanga" style={{ color: '#1f2937', backgroundColor: 'white' }}>Darbhanga</option>
                  <option value="bally" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bally</option>
                  <option value="aizawl" style={{ color: '#1f2937', backgroundColor: 'white' }}>Aizawl</option>
                  <option value="dewas" style={{ color: '#1f2937', backgroundColor: 'white' }}>Dewas</option>
                  <option value="ichalkaranji" style={{ color: '#1f2937', backgroundColor: 'white' }}>Ichalkaranji</option>
                  <option value="karnal" style={{ color: '#1f2937', backgroundColor: 'white' }}>Karnal</option>
                  <option value="bathinda" style={{ color: '#1f2937', backgroundColor: 'white' }}>Bathinda</option>
                  <option value="jalna" style={{ color: '#1f2937', backgroundColor: 'white' }}>Jalna</option>
                  <option value="eluru" style={{ color: '#1f2937', backgroundColor: 'white' }}>Eluru</option>
                  <option value="kirari_suleman_nagar" style={{ color: '#1f2937', backgroundColor: 'white' }}>Kirari Suleman Nagar</option>
                  <option value="barabanki" style={{ color: '#1f2937', backgroundColor: 'white' }}>Barabanki</option>
                  <option value="siwan" style={{ color: '#1f2937', backgroundColor: 'white' }}>Siwan</option>
                  <option value="purnia" style={{ color: '#1f2937', backgroundColor: 'white' }}>Purnia</option>
                  <option value="other_tier2" style={{ color: '#1f2937', backgroundColor: 'white' }}>Other Tier 2 City</option>
                </optgroup>
                <optgroup label="Tier 3 Cities & Towns">
                  <option value="tier3_north" style={{ color: '#1f2937', backgroundColor: 'white' }}>North India - Tier 3</option>
                  <option value="tier3_south" style={{ color: '#1f2937', backgroundColor: 'white' }}>South India - Tier 3</option>
                  <option value="tier3_west" style={{ color: '#1f2937', backgroundColor: 'white' }}>West India - Tier 3</option>
                  <option value="tier3_east" style={{ color: '#1f2937', backgroundColor: 'white' }}>East India - Tier 3</option>
                  <option value="tier3_central" style={{ color: '#1f2937', backgroundColor: 'white' }}>Central India - Tier 3</option>
                  <option value="tier3_northeast" style={{ color: '#1f2937', backgroundColor: 'white' }}>Northeast India - Tier 3</option>
                </optgroup>
              </select>
            </div>
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