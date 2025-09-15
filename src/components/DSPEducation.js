import React, { useState } from 'react';
import { 
  MapPin, 
  Hospital, 
  ChevronRight, 
  ChevronDown,
  Search,
  Filter,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Map,
  Building,
  Users,
  Shield
} from 'lucide-react';

const DSPEducation = ({ data }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [expandedNetworks, setExpandedNetworks] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvince, setFilterProvince] = useState('');

  const toggleNetwork = (network) => {
    setExpandedNetworks(prev => ({
      ...prev,
      [network]: !prev[network]
    }));
  };

  const getNetworkIcon = (network) => {
    if (network.includes('KeyCare')) return <Users size={20} />;
    if (network.includes('Smart')) return <Shield size={20} />;
    if (network.includes('Delta')) return <Building size={20} />;
    if (network.includes('Coastal')) return <Map size={20} />;
    return <Hospital size={20} />;
  };

  const getNetworkDescription = (network) => {
    const descriptions = {
      'KeyCare Hospital Network': 'Affordable network with designated hospitals for KeyCare plans',
      'Smart Hospital Network': 'Optimized network for Smart plans with digital health features',
      'Delta Hospital Network': 'Cost-effective network for Delta plans with upfront payments for non-network',
      'Coastal Hospital Network': 'Regional network covering four coastal provinces'
    };
    return descriptions[network] || 'Designated Service Provider network for medical aid plans';
  };

  const getNetworkRules = (network) => {
    const rules = {
      'KeyCare Hospital Network': {
        coverage: 'Full cover for planned admissions in network hospitals only',
        emergency: 'Emergency care covered at any hospital',
        coPayment: 'R10,700 upfront payment for non-network planned admissions',
        benefits: 'Specialist cover up to R5,550 per person per year'
      },
      'Smart Hospital Network': {
        coverage: 'Full cover for planned admissions in Smart network hospitals',
        emergency: 'Emergency care covered at any hospital',
        coPayment: 'R12,200 upfront payment for non-network planned admissions',
        benefits: 'Digital health features and network optimization'
      },
      'Delta Hospital Network': {
        coverage: 'Full cover for planned admissions in Delta network hospitals',
        emergency: 'Emergency care covered at any hospital',
        coPayment: 'R10,700 upfront payment for non-network planned admissions',
        benefits: 'Cost-effective coverage with network optimization'
      },
      'Coastal Hospital Network': {
        coverage: 'Full cover for planned admissions in coastal provinces only',
        emergency: 'Emergency care covered at any hospital',
        coPayment: '70% of Discovery Health Rate for non-coastal hospitals',
        benefits: 'Regional coverage for Eastern Cape, KZN, Northern Cape, Western Cape'
      }
    };
    return rules[network] || {
      coverage: 'Coverage as per plan specifications',
      emergency: 'Emergency care always covered',
      coPayment: 'Co-payments apply for non-network use',
      benefits: 'Benefits as per plan terms'
    };
  };

  const getProvinceIcon = (province) => {
    const icons = {
      'GAUTENG': '🏙️',
      'WESTERN CAPE': '🏔️',
      'KWAZULU-NATAL': '🌊',
      'EASTERN CAPE': '🌊',
      'FREE STATE': '🌾',
      'LIMPOPO': '🌳',
      'MPUMALANGA': '🌳',
      'NORTH WEST': '🏜️',
      'NORTHERN CAPE': '🏜️'
    };
    return icons[province] || '🏥';
  };

  const filteredHospitals = data.allHospitals.filter(hospital => {
    const matchesSearch = searchQuery === '' || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProvince = filterProvince === '' || hospital.province === filterProvince;
    
    return matchesSearch && matchesProvince;
  });

  const provinces = [...new Set(data.allHospitals.map(h => h.province))].sort();
  const networks = Object.keys(data.networks);

  return (
    <div>
      <div className="card mb-6">
        <div className="card-header">
          <h3 className="card-title flex items-center gap-2">
            <MapPin size={24} />
            Designated Service Provider (DSP) Education
          </h3>
        </div>
        <div className="card-content">
          <p className="mb-4">
            DSPs are hospitals and healthcare providers that are part of your medical aid plan's network. 
            Using network providers ensures full coverage, while going outside the network may result in co-payments.
          </p>
          <div className="grid grid-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Network hospitals - Full coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle size={16} className="text-red-500" />
              <span>Non-network - Co-payments apply</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-yellow-500" />
              <span>Emergency - Always covered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2 gap-6">
        {/* Network List */}
        <div className="card">
          <h4 className="card-title mb-4">Hospital Networks</h4>
          <div className="space-y-2">
            {networks.map((network) => (
              <div key={network} className="border rounded-lg">
                <button
                  onClick={() => toggleNetwork(network)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {getNetworkIcon(network)}
                    <div>
                      <div className="font-medium">{network}</div>
                      <div className="text-sm text-gray-600">{getNetworkDescription(network)}</div>
                    </div>
                  </div>
                  {expandedNetworks[network] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                
                {expandedNetworks[network] && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="space-y-3">
                      {(() => {
                        const rules = getNetworkRules(network);
                        return (
                          <>
                            <div>
                              <h5 className="font-medium text-sm mb-1">Coverage Rules</h5>
                              <p className="text-sm text-gray-600">{rules.coverage}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-1">Emergency Care</h5>
                              <p className="text-sm text-gray-600">{rules.emergency}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-1">Co-payments</h5>
                              <p className="text-sm text-gray-600">{rules.coPayment}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-1">Special Benefits</h5>
                              <p className="text-sm text-gray-600">{rules.benefits}</p>
                            </div>
                          </>
                        );
                      })()}
                      
                      <button
                        onClick={() => setSelectedNetwork(network)}
                        className="button w-full text-sm"
                      >
                        View Hospitals in This Network
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hospital List */}
        <div className="card">
          <div className="card-header">
            <h4 className="card-title flex items-center gap-2">
              <Hospital size={20} />
              {selectedNetwork ? `${selectedNetwork} Hospitals` : 'Select a Network'}
            </h4>
          </div>
          
          {selectedNetwork ? (
            <div className="card-content">
              {/* Search and Filter */}
              <div className="mb-4 space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search hospitals or cities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <select
                    value={filterProvince}
                    onChange={(e) => setFilterProvince(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">All Provinces</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hospital List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredHospitals
                  .filter(hospital => !selectedNetwork || hospital.network === selectedNetwork)
                  .map((hospital, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{hospital.name}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                            <span>{getProvinceIcon(hospital.province)}</span>
                            <span>{hospital.city}, {hospital.province}</span>
                          </div>
                          {hospital.codes.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {hospital.codes.map((code, codeIndex) => (
                                <span
                                  key={codeIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                >
                                  {code}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle size={16} className="text-green-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                
                {filteredHospitals.filter(hospital => !selectedNetwork || hospital.network === selectedNetwork).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Hospital size={32} className="mx-auto mb-2" />
                    <p>No hospitals found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">Select a Network</h4>
              <p className="text-gray-500">
                Choose a hospital network to view available hospitals and their locations.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Important Information */}
      <div className="card mt-6">
        <h4 className="card-title mb-4 flex items-center gap-2">
          <Info size={20} />
          Important DSP Information
        </h4>
        <div className="grid grid-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle size={16} />
              Using Network Hospitals
            </h5>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Full coverage for planned admissions</li>
              <li>• No upfront payments required</li>
              <li>• Direct billing to medical aid</li>
              <li>• Access to all plan benefits</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle size={16} />
              Non-Network Hospitals
            </h5>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Upfront payments may be required</li>
              <li>• Co-payments for non-PMB conditions</li>
              <li>• You may need to claim back</li>
              <li>• Limited benefit coverage</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
          <h5 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <AlertCircle size={16} />
            Emergency Situations
          </h5>
          <p className="text-yellow-700 text-sm">
            In emergency situations, you can go to any hospital and your medical aid will cover you. 
            Emergency care is always covered regardless of whether the hospital is in your network or not.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DSPEducation;
