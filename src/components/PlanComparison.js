import React, { useState } from 'react';
import { 
  BarChart3, 
  Calculator, 
  ChevronRight, 
  ChevronDown,
  Users,
  Heart,
  Stethoscope,
  Baby,
  Pill,
  Hospital,
  DollarSign,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react';

const PlanComparison = ({ data }) => {
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedSeries, setExpandedSeries] = useState({});
  const [comparisonPlans, setComparisonPlans] = useState([]);
  const [calculatorData, setCalculatorData] = useState({
    mainMember: 1,
    adults: 0,
    children: 0
  });

  const toggleSeries = (series) => {
    setExpandedSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  const getSeriesIcon = (series) => {
    switch (series) {
      case 'EXECUTIVE': return <Star size={20} />;
      case 'COMPREHENSIVE': return <Shield size={20} />;
      case 'PRIORITY': return <TrendingUp size={20} />;
      case 'SAVER': return <DollarSign size={20} />;
      case 'SMART': return <BarChart3 size={20} />;
      case 'CORE': return <Heart size={20} />;
      case 'KEYCARE': return <Users size={20} />;
      default: return <BarChart3 size={20} />;
    }
  };

  const getSeriesDescription = (series) => {
    const descriptions = {
      'EXECUTIVE': 'Premium plans with comprehensive coverage and unlimited benefits',
      'COMPREHENSIVE': 'Full coverage plans with extensive benefits and network access',
      'PRIORITY': 'Balanced plans offering good coverage at moderate costs',
      'SAVER': 'Cost-effective plans with essential coverage and savings accounts',
      'SMART': 'Modern plans with digital health features and network optimization',
      'CORE': 'Basic plans with essential coverage and core benefits',
      'KEYCARE': 'Affordable plans with designated provider networks'
    };
    return descriptions[series] || 'Medical aid plans with various benefit levels';
  };

  const calculateContributions = (plan) => {
    const mainMemberCost = parseFloat(plan.mainMember.replace(/,/g, '')) || 0;
    const adultCost = parseFloat(plan.adult.replace(/,/g, '')) || 0;
    const childCost = parseFloat(plan.child.replace(/,/g, '')) || 0;
    
    const total = (mainMemberCost * calculatorData.mainMember) + 
                  (adultCost * calculatorData.adults) + 
                  (childCost * calculatorData.children);
    
    return {
      mainMember: mainMemberCost,
      adult: adultCost,
      child: childCost,
      total: total,
      breakdown: {
        mainMemberTotal: mainMemberCost * calculatorData.mainMember,
        adultsTotal: adultCost * calculatorData.adults,
        childrenTotal: childCost * calculatorData.children
      }
    };
  };

  const getPlanBenefits = (plan) => {
    const benefits = {
      'Executive Plan': {
        dayToDay: 'Unlimited Medical Savings Account with comprehensive day-to-day benefits',
        chronic: 'Full coverage for 27 chronic conditions plus additional conditions',
        maternity: 'Comprehensive maternity cover with 12 antenatal consultations',
        hospital: 'Unlimited private hospital cover with private ward benefits',
        oncology: 'R500,000 cancer treatment cover with extended benefits',
        special: 'Specialized Medicine and Technology Benefit up to R200,000'
      },
      'Classic Comprehensive': {
        dayToDay: 'Medical Savings Account with day-to-day benefits',
        chronic: 'Full coverage for 27 chronic conditions',
        maternity: '8 antenatal consultations with comprehensive maternity care',
        hospital: 'Unlimited private hospital cover',
        oncology: 'R375,000 cancer treatment cover',
        special: 'Standard benefits with network optimization'
      },
      'Classic Smart Comprehensive': {
        dayToDay: 'Medical Savings Account with Smart GP consultations',
        chronic: 'Full coverage for 27 chronic conditions',
        maternity: '8 antenatal consultations with comprehensive maternity care',
        hospital: 'Smart Hospital Network with R12,200 co-payment for non-network',
        oncology: 'R250,000 cancer treatment cover',
        special: 'Smart network optimization and digital health features'
      },
      'KeyCare Plus': {
        dayToDay: 'No MSA - defined benefits through nominated GP',
        chronic: 'Coverage through nominated GP and network pharmacies',
        maternity: 'Subject to defined day-to-day benefits',
        hospital: 'KeyCare Hospital Network only - full cover in network',
        oncology: 'PMB cancer treatment in network only',
        special: 'Specialist cover up to R5,550 per person per year'
      }
    };
    
    return benefits[plan.name] || {
      dayToDay: 'Day-to-day benefits as per plan specifications',
      chronic: 'Chronic condition coverage as per PMB requirements',
      maternity: 'Maternity benefits subject to plan terms',
      hospital: 'Hospital cover according to plan network',
      oncology: 'Cancer treatment coverage as specified',
      special: 'Additional benefits as per plan terms'
    };
  };

  const series = Object.keys(data.series);

  return (
    <div>
      <div className="card mb-6">
        <div className="card-header">
          <h3 className="card-title flex items-center gap-2">
            <BarChart3 size={24} />
            Discovery Health Plan Comparison
          </h3>
        </div>
        <div className="card-content">
          <p className="mb-4">
            Compare Discovery Health medical aid plans to find the best option for you and your family. 
            Each plan offers different levels of coverage, benefits, and contribution requirements.
          </p>
          <div className="grid grid-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <span>Executive - Premium coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-500" />
              <span>Comprehensive - Full coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-500" />
              <span>KeyCare - Network-based</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2 gap-6">
        {/* Plan Series List */}
        <div className="card">
          <h4 className="card-title mb-4">Plan Series</h4>
          <div className="space-y-2">
            {series.map((seriesName) => (
              <div key={seriesName} className="border rounded-lg">
                <button
                  onClick={() => toggleSeries(seriesName)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {getSeriesIcon(seriesName)}
                    <div>
                      <div className="font-medium">{seriesName}</div>
                      <div className="text-sm text-gray-600">{getSeriesDescription(seriesName)}</div>
                    </div>
                  </div>
                  {expandedSeries[seriesName] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                
                {expandedSeries[seriesName] && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="space-y-2">
                      {data.series[seriesName].map((plan) => (
                        <button
                          key={plan.name}
                          onClick={() => setSelectedPlan(plan)}
                          className="w-full p-3 text-left hover:bg-white rounded border"
                        >
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-sm text-gray-600">
                            Main Member: R{plan.mainMember} | Total: R{plan.totalMain}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Plan Details */}
        <div className="card">
          {selectedPlan ? (
            <div>
              <div className="card-header">
                <h4 className="card-title flex items-center gap-2">
                  <Heart size={20} />
                  {selectedPlan.name}
                </h4>
              </div>
              
              <div className="card-content space-y-4">
                {/* Contribution Calculator */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Calculator size={16} />
                    Contribution Calculator
                  </h5>
                  <div className="grid grid-3 gap-3 mb-3">
                    <div>
                      <label className="text-sm font-medium text-blue-700">Main Members</label>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        value={calculatorData.mainMember}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, mainMember: parseInt(e.target.value) || 0 }))}
                        className="w-full p-2 border border-blue-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Adults</label>
                      <input
                        type="number"
                        min="0"
                        value={calculatorData.adults}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, adults: parseInt(e.target.value) || 0 }))}
                        className="w-full p-2 border border-blue-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Children</label>
                      <input
                        type="number"
                        min="0"
                        value={calculatorData.children}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                        className="w-full p-2 border border-blue-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  {(() => {
                    const calc = calculateContributions(selectedPlan);
                    return (
                      <div className="bg-white p-3 rounded border">
                        <div className="text-lg font-bold text-blue-800">
                          Total Monthly: R{calc.total.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600 mt-1">
                          Main: R{calc.breakdown.mainMemberTotal.toLocaleString()} | 
                          Adults: R{calc.breakdown.adultsTotal.toLocaleString()} | 
                          Children: R{calc.breakdown.childrenTotal.toLocaleString()}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Plan Benefits */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Plan Benefits</h5>
                  {(() => {
                    const benefits = getPlanBenefits(selectedPlan);
                    return (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Pill size={16} className="text-green-500 mt-1" />
                          <div>
                            <div className="font-medium text-sm">Day-to-Day Benefits</div>
                            <div className="text-sm text-gray-600">{benefits.dayToDay}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Heart size={16} className="text-red-500 mt-1" />
                          <div>
                            <div className="font-medium text-sm">Chronic Cover</div>
                            <div className="text-sm text-gray-600">{benefits.chronic}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Baby size={16} className="text-pink-500 mt-1" />
                          <div>
                            <div className="font-medium text-sm">Maternity Cover</div>
                            <div className="text-sm text-gray-600">{benefits.maternity}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Hospital size={16} className="text-blue-500 mt-1" />
                          <div>
                            <div className="font-medium text-sm">Hospital Cover</div>
                            <div className="text-sm text-gray-600">{benefits.hospital}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Stethoscope size={16} className="text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium text-sm">Oncology Cover</div>
                            <div className="text-sm text-gray-600">{benefits.oncology}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Add to Comparison */}
                <button
                  onClick={() => {
                    if (!comparisonPlans.find(p => p.name === selectedPlan.name)) {
                      setComparisonPlans(prev => [...prev, selectedPlan]);
                    }
                  }}
                  className="button w-full"
                  disabled={comparisonPlans.find(p => p.name === selectedPlan.name)}
                >
                  {comparisonPlans.find(p => p.name === selectedPlan.name) ? 'Already in Comparison' : 'Add to Comparison'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">Select a Plan</h4>
              <p className="text-gray-500">
                Choose a plan series and specific plan to view details and calculate contributions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Plan Comparison Table */}
      {comparisonPlans.length > 0 && (
        <div className="card mt-6">
          <h4 className="card-title mb-4">Plan Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Plan</th>
                  <th className="text-left p-3">Main Member</th>
                  <th className="text-left p-3">Adult</th>
                  <th className="text-left p-3">Child</th>
                  <th className="text-left p-3">Total Main</th>
                  <th className="text-left p-3">MSA Main</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPlans.map((plan, index) => (
                  <tr key={plan.name} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{plan.name}</td>
                    <td className="p-3">R{plan.mainMember}</td>
                    <td className="p-3">R{plan.adult}</td>
                    <td className="p-3">R{plan.child}</td>
                    <td className="p-3">R{plan.totalMain}</td>
                    <td className="p-3">R{plan.msaMain}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setComparisonPlans(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanComparison;
