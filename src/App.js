import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  BarChart3, 
  MapPin, 
  MessageCircle, 
  Send,
  ChevronRight,
  Search,
  Calculator,
  Hospital,
  Heart,
  Brain,
  Eye,
  Lungs,
  Activity
} from 'lucide-react';
import { loadAllData } from './utils/dataProcessor';
import PMBEducation from './components/PMBEducation';
import PlanComparison from './components/PlanComparison';
import DSPEducation from './components/DSPEducation';

function App() {
  const [activeSection, setActiveSection] = useState('pmb');
  const [data, setData] = useState({ pmbData: { categories: {}, allPMBs: [] }, planData: { series: {}, allPlans: [] }, hospitalData: { networks: {}, allHospitals: [] } });
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loadedData = await loadAllData();
        setData(loadedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate Authi 1.0 response
    const response = await simulateAuthiResponse(chatInput);
    const aiMessage = { type: 'ai', content: response };
    setChatHistory(prev => [...prev, aiMessage]);
  };

  const simulateAuthiResponse = async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerQuery = query.toLowerCase();
    
    // PMB-related queries
    if (lowerQuery.includes('pmb') || lowerQuery.includes('prescribed minimum benefit')) {
      return "PMBs (Prescribed Minimum Benefits) are conditions that all medical schemes must cover by law. These include 271 specific diagnoses and 27 chronic conditions. Would you like me to explain a specific PMB condition or show you the categories available?";
    }
    
    // Plan-related queries
    if (lowerQuery.includes('plan') || lowerQuery.includes('contribution') || lowerQuery.includes('cost')) {
      return "I can help you understand Discovery Health plans and their costs. We have Executive, Comprehensive, Priority, Saver, Smart, Core, and KeyCare series. Each has different benefits and contribution levels. Would you like to compare specific plans or calculate contributions?";
    }
    
    // Hospital-related queries
    if (lowerQuery.includes('hospital') || lowerQuery.includes('dsp') || lowerQuery.includes('network')) {
      return "DSPs (Designated Service Providers) are hospitals and healthcare providers in your plan's network. Using network providers ensures full coverage, while going outside the network may result in co-payments. Would you like to find hospitals in your area or learn about network rules?";
    }
    
    // Emergency queries
    if (lowerQuery.includes('emergency') || lowerQuery.includes('accident')) {
      return "In emergencies, you can go to any hospital and your medical aid will cover you. However, for planned procedures, you should use network hospitals to avoid co-payments. Emergency care is always covered regardless of the hospital.";
    }
    
    // General response
    return "I'm here to help you understand your medical aid benefits, PMBs, and hospital networks. You can ask me about specific conditions, plan comparisons, hospital networks, or any other medical aid questions. What would you like to know more about?";
  };

  const getSectionIcon = (section) => {
    switch (section) {
      case 'pmb': return <BookOpen size={20} />;
      case 'plans': return <BarChart3 size={20} />;
      case 'dsp': return <MapPin size={20} />;
      default: return <MessageCircle size={20} />;
    }
  };

  const getSectionTitle = (section) => {
    switch (section) {
      case 'pmb': return 'PMB Education';
      case 'plans': return 'Plan Comparison';
      case 'dsp': return 'DSP Education';
      default: return 'SaluLink Medical Aid App';
    }
  };

  const getSectionDescription = (section) => {
    switch (section) {
      case 'pmb': return 'Learn about Prescribed Minimum Benefits and what conditions are covered';
      case 'plans': return 'Compare Discovery Health plans and calculate contributions';
      case 'dsp': return 'Find hospitals and healthcare providers in your network';
      default: return 'Your comprehensive medical aid education platform';
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <Activity className="animate-spin" size={32} />
          <span style={{ marginLeft: '1rem' }}>Loading SaluLink Medical Aid App...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>SaluLink</h1>
          <p>Medical Aid Education Platform</p>
        </div>
        
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <button
                className={`nav-button ${activeSection === 'pmb' ? 'active' : ''}`}
                onClick={() => setActiveSection('pmb')}
              >
                <BookOpen size={20} />
                PMB Education
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${activeSection === 'plans' ? 'active' : ''}`}
                onClick={() => setActiveSection('plans')}
              >
                <BarChart3 size={20} />
                Plan Comparison
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${activeSection === 'dsp' ? 'active' : ''}`}
                onClick={() => setActiveSection('dsp')}
              >
                <MapPin size={20} />
                DSP Education
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h2>{getSectionTitle(activeSection)}</h2>
          <p>{getSectionDescription(activeSection)}</p>
        </div>

        <div className="content-body">
          {activeSection === 'pmb' && <PMBEducation data={data.pmbData} />}
          {activeSection === 'plans' && <PlanComparison data={data.planData} />}
          {activeSection === 'dsp' && <DSPEducation data={data.hospitalData} />}
        </div>

        {/* Chat History */}
        {chatHistory.length > 0 && (
          <div className="text-bar-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`card ${message.type === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`} style={{ marginBottom: '0.5rem' }}>
                <div className="flex items-center gap-2">
                  {message.type === 'user' ? <MessageCircle size={16} /> : <Activity size={16} />}
                  <span className="font-semibold">{message.type === 'user' ? 'You' : 'Authi 1.0'}:</span>
                </div>
                <p className="mt-2">{message.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Text Bar */}
        <div className="text-bar-container">
          <form onSubmit={handleChatSubmit} className="text-bar">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Authi 1.0 anything about your medical aid..."
              className="text-input"
            />
            <button type="submit" className="send-button">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
