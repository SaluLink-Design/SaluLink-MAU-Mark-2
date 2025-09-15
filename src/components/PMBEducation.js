import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Stethoscope, 
  Pill,
  Brain,
  Eye,
  Lungs,
  Heart,
  Activity,
  Info
} from 'lucide-react';

const PMBEducation = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPMB, setSelectedPMB] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const getCategoryIcon = (category) => {
    if (category.includes('BRAIN') || category.includes('NERVOUS')) return <Brain size={20} />;
    if (category.includes('EYE')) return <Eye size={20} />;
    if (category.includes('RESPIRATORY') || category.includes('LUNG')) return <Lungs size={20} />;
    if (category.includes('HEART') || category.includes('VASCULATURE')) return <Heart size={20} />;
    return <Activity size={20} />;
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const explainPMB = (pmb) => {
    // Simulate Authi 1.0 explanation
    const explanations = {
      '906A': {
        condition: 'Acute generalised paralysis (including polio and Guillain-Barré syndrome)',
        explanation: 'This is a serious condition where your muscles suddenly become weak or paralyzed. It can happen after infections and affects your ability to move, breathe, and sometimes even swallow.',
        treatment: 'Treatment includes medical management to support your breathing (ventilation) and a procedure called plasmapheresis to remove harmful substances from your blood.',
        whyPMB: 'This is a PMB because it can be life-threatening and requires immediate, expensive treatment. Without proper care, you could stop breathing or have permanent paralysis.',
        examples: 'Examples include Guillain-Barré syndrome (often after a cold or flu), polio, and other causes of sudden paralysis.'
      },
      '341A': {
        condition: 'Movement disorders (dystonias)',
        explanation: 'These are conditions that cause involuntary muscle contractions, making parts of your body twist or move in unusual ways. It can affect your face, neck, arms, or legs.',
        treatment: 'Treatment starts with proper diagnosis and medical management, often including medications to control the muscle movements.',
        whyPMB: 'These conditions can severely impact your quality of life and ability to work or perform daily activities. Early treatment is crucial for the best outcomes.',
        examples: 'Examples include cervical dystonia (twisted neck), writer\'s cramp, and generalized dystonia affecting multiple body parts.'
      },
      '950A': {
        condition: 'Brain tumors (treatable)',
        explanation: 'These are growths in your brain that can be either benign (non-cancerous) or malignant (cancerous). They can cause headaches, seizures, or changes in personality.',
        treatment: 'Treatment includes medical management, surgery to remove the tumor, radiation therapy, and chemotherapy depending on the type and location.',
        whyPMB: 'Brain tumors can be life-threatening and require expensive, specialized treatment. Early detection and treatment are crucial for survival.',
        examples: 'Examples include gliomas, meningiomas, and metastatic brain tumors from other cancers.'
      }
    };

    return explanations[pmb.code] || {
      condition: pmb.description,
      explanation: 'This is a medical condition that requires specific treatment as outlined in the PMB regulations.',
      treatment: pmb.treatment,
      whyPMB: 'This condition is covered under PMB because it meets the criteria for mandatory coverage by all medical schemes.',
      examples: 'Please consult with your healthcare provider for specific examples and treatment options.'
    };
  };

  const categories = Object.keys(data.categories);

  return (
    <div>
      <div className="card mb-6">
        <div className="card-header">
          <h3 className="card-title flex items-center gap-2">
            <BookOpen size={24} />
            Prescribed Minimum Benefits (PMBs)
          </h3>
        </div>
        <div className="card-content">
          <p className="mb-4">
            PMBs are conditions that all medical schemes must cover by law. There are 271 specific diagnoses 
            and 27 chronic conditions that qualify for PMB coverage. This means your medical aid must pay 
            for the diagnosis, treatment, and ongoing care for these conditions.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info size={16} />
            <span>Click on a category below to explore specific PMB conditions and treatments.</span>
          </div>
        </div>
      </div>

      <div className="grid grid-2 gap-4">
        {/* Categories List */}
        <div className="card">
          <h4 className="card-title mb-4">PMB Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="border rounded-lg">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(category)}
                    <span className="font-medium">{category}</span>
                  </div>
                  {expandedCategories[category] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                
                {expandedCategories[category] && (
                  <div className="border-t bg-gray-50 p-3">
                    <div className="space-y-2">
                      {data.categories[category].map((pmb) => (
                        <button
                          key={pmb.code}
                          onClick={() => setSelectedPMB(pmb)}
                          className="w-full p-2 text-left text-sm hover:bg-white rounded border"
                        >
                          <div className="font-medium">{pmb.code}</div>
                          <div className="text-gray-600 truncate">{pmb.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PMB Details */}
        <div className="card">
          {selectedPMB ? (
            <div>
              <div className="card-header">
                <h4 className="card-title flex items-center gap-2">
                  <Stethoscope size={20} />
                  {selectedPMB.code} - {selectedPMB.description}
                </h4>
              </div>
              
              <div className="card-content space-y-4">
                {(() => {
                  const explanation = explainPMB(selectedPMB);
                  return (
                    <>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">What is this condition?</h5>
                        <p className="text-gray-600">{explanation.explanation}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Pill size={16} />
                          Treatment Options
                        </h5>
                        <p className="text-gray-600">{explanation.treatment}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Why is this a PMB?</h5>
                        <p className="text-gray-600">{explanation.whyPMB}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Examples</h5>
                        <p className="text-gray-600">{explanation.examples}</p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2">Important PMB Information</h5>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• You must use designated service providers (DSPs) for full coverage</li>
                          <li>• Emergency treatment is always covered regardless of provider</li>
                          <li>• Your medical aid must pay for the full cost of PMB treatment</li>
                          <li>• Treatment must be documented and clinically appropriate</li>
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">Select a PMB Condition</h4>
              <p className="text-gray-500">
                Choose a category from the list to explore specific PMB conditions and learn about their treatments.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Search */}
      <div className="card mt-6">
        <h4 className="card-title mb-4">Quick PMB Search</h4>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for a PMB code or condition..."
            className="flex-1 p-3 border border-gray-300 rounded-lg"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (query.length > 2) {
                const found = data.allPMBs.find(pmb => 
                  pmb.code.toLowerCase().includes(query) || 
                  pmb.description.toLowerCase().includes(query)
                );
                if (found) {
                  setSelectedPMB(found);
                }
              }
            }}
          />
          <button className="button">
            <Activity size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PMBEducation;
