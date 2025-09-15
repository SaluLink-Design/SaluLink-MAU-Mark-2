// Demo data for testing the SaluLink Medical Aid App
export const demoPMBData = {
  categories: {
    'BRAIN AND NERVOUS SYSTEM': [
      {
        code: '906A',
        description: 'Acute generalised paralysis, including polio and Guillain-Barre',
        treatment: 'Medical management; ventilation and plasmapheresis',
        category: 'BRAIN AND NERVOUS SYSTEM'
      },
      {
        code: '341A',
        description: 'Basal ganglia, extra-pyramidal disorders; other dystonias not otherwise specified (NOS)',
        treatment: 'Initial diagnosis; initiation of medical management',
        category: 'BRAIN AND NERVOUS SYSTEM'
      },
      {
        code: '950A',
        description: 'Benign and malignant brain tumours, treatable',
        treatment: 'Medical and surgical management which includes radiation therapy and chemotherapy',
        category: 'BRAIN AND NERVOUS SYSTEM'
      }
    ],
    'EYE': [
      {
        code: '47B',
        description: 'Acute orbital cellulitis',
        treatment: 'Medical and surgical management',
        category: 'EYE'
      },
      {
        code: '394B',
        description: 'Angle-closure glaucoma',
        treatment: 'Iridectomy; laser surgery; medical and surgical management',
        category: 'EYE'
      }
    ],
    'RESPIRATORY SYSTEM': [
      {
        code: '903D',
        description: 'Bacterial, viral, fungal pneumonia',
        treatment: 'Medical management, ventilation',
        category: 'RESPIRATORY SYSTEM'
      },
      {
        code: '158D',
        description: 'Respiratory failure, regardless of cause',
        treatment: 'Medical management; oxygen; ventilation',
        category: 'RESPIRATORY SYSTEM'
      }
    ]
  },
  allPMBs: [
    {
      code: '906A',
      description: 'Acute generalised paralysis, including polio and Guillain-Barre',
      treatment: 'Medical management; ventilation and plasmapheresis',
      category: 'BRAIN AND NERVOUS SYSTEM'
    },
    {
      code: '341A',
      description: 'Basal ganglia, extra-pyramidal disorders; other dystonias not otherwise specified (NOS)',
      treatment: 'Initial diagnosis; initiation of medical management',
      category: 'BRAIN AND NERVOUS SYSTEM'
    },
    {
      code: '950A',
      description: 'Benign and malignant brain tumours, treatable',
      treatment: 'Medical and surgical management which includes radiation therapy and chemotherapy',
      category: 'BRAIN AND NERVOUS SYSTEM'
    },
    {
      code: '47B',
      description: 'Acute orbital cellulitis',
      treatment: 'Medical and surgical management',
      category: 'EYE'
    },
    {
      code: '394B',
      description: 'Angle-closure glaucoma',
      treatment: 'Iridectomy; laser surgery; medical and surgical management',
      category: 'EYE'
    },
    {
      code: '903D',
      description: 'Bacterial, viral, fungal pneumonia',
      treatment: 'Medical management, ventilation',
      category: 'RESPIRATORY SYSTEM'
    },
    {
      code: '158D',
      description: 'Respiratory failure, regardless of cause',
      treatment: 'Medical management; oxygen; ventilation',
      category: 'RESPIRATORY SYSTEM'
    }
  ]
};

export const demoPlanData = {
  series: {
    'EXECUTIVE': [
      {
        name: 'Executive Plan',
        series: 'EXECUTIVE',
        mainMember: '8,573',
        adult: '8,573',
        child: '1,639',
        msaMain: '2,857',
        msaAdult: '2,857',
        msaChild: '546',
        totalMain: '11,430',
        totalAdult: '11,430',
        totalChild: '2,185'
      }
    ],
    'COMPREHENSIVE': [
      {
        name: 'Classic Comprehensive',
        series: 'COMPREHENSIVE',
        mainMember: '6,975',
        adult: '6,596',
        child: '1,392',
        msaMain: '2,323',
        msaAdult: '2,197',
        msaChild: '464',
        totalMain: '9,298',
        totalAdult: '8,793',
        totalChild: '1,856'
      },
      {
        name: 'Classic Smart Comprehensive',
        series: 'COMPREHENSIVE',
        mainMember: '6,754',
        adult: '6,237',
        child: '1,577',
        msaMain: '1,191',
        msaAdult: '1,100',
        msaChild: '278',
        totalMain: '7,945',
        totalAdult: '7,337',
        totalChild: '1,855'
      }
    ],
    'KEYCARE': [
      {
        name: 'KeyCare Plus 0 – 9,900',
        series: 'KEYCARE',
        mainMember: '1,817',
        adult: '1,817',
        child: '661',
        msaMain: 'No Medical Savings Account',
        msaAdult: '',
        msaChild: '',
        totalMain: '1,817',
        totalAdult: '1,817',
        totalChild: '661'
      },
      {
        name: 'KeyCare Plus 9,901 – 15,990',
        series: 'KEYCARE',
        mainMember: '2,497',
        adult: '2,497',
        child: '704',
        msaMain: '',
        msaAdult: '',
        msaChild: '',
        totalMain: '2,497',
        totalAdult: '2,497',
        totalChild: '704'
      }
    ]
  },
  allPlans: [
    {
      name: 'Executive Plan',
      series: 'EXECUTIVE',
      mainMember: '8,573',
      adult: '8,573',
      child: '1,639',
      msaMain: '2,857',
      msaAdult: '2,857',
      msaChild: '546',
      totalMain: '11,430',
      totalAdult: '11,430',
      totalChild: '2,185'
    },
    {
      name: 'Classic Comprehensive',
      series: 'COMPREHENSIVE',
      mainMember: '6,975',
      adult: '6,596',
      child: '1,392',
      msaMain: '2,323',
      msaAdult: '2,197',
      msaChild: '464',
      totalMain: '9,298',
      totalAdult: '8,793',
      totalChild: '1,856'
    },
    {
      name: 'Classic Smart Comprehensive',
      series: 'COMPREHENSIVE',
      mainMember: '6,754',
      adult: '6,237',
      child: '1,577',
      msaMain: '1,191',
      msaAdult: '1,100',
      msaChild: '278',
      totalMain: '7,945',
      totalAdult: '7,337',
      totalChild: '1,855'
    },
    {
      name: 'KeyCare Plus 0 – 9,900',
      series: 'KEYCARE',
      mainMember: '1,817',
      adult: '1,817',
      child: '661',
      msaMain: 'No Medical Savings Account',
      msaAdult: '',
      msaChild: '',
      totalMain: '1,817',
      totalAdult: '1,817',
      totalChild: '661'
    }
  ]
};

export const demoHospitalData = {
  networks: {
    'KeyCare Hospital Network': {
      description: 'Affordable network with designated hospitals for KeyCare plans',
      provinces: {
        'GAUTENG': [
          {
            city: 'Johannesburg',
            name: 'Life Brenthurst Hospital',
            province: 'GAUTENG',
            network: 'KeyCare Hospital Network',
            codes: ['KH', 'KC', 'KS']
          },
          {
            city: 'Pretoria',
            name: 'Life Eugene Marais Hospital',
            province: 'GAUTENG',
            network: 'KeyCare Hospital Network',
            codes: ['KH', 'KC', 'KS']
          }
        ],
        'WESTERN CAPE': [
          {
            city: 'Cape Town',
            name: 'Mediclinic Cape Town',
            province: 'WESTERN CAPE',
            network: 'KeyCare Hospital Network',
            codes: ['D', 'S']
          }
        ]
      }
    },
    'Smart Hospital Network': {
      description: 'Optimized network for Smart plans with digital health features',
      provinces: {
        'GAUTENG': [
          {
            city: 'Johannesburg',
            name: 'Life Fourways Hospital',
            province: 'GAUTENG',
            network: 'Smart Hospital Network',
            codes: ['D', 'S']
          }
        ]
      }
    }
  },
  allHospitals: [
    {
      city: 'Johannesburg',
      name: 'Life Brenthurst Hospital',
      province: 'GAUTENG',
      network: 'KeyCare Hospital Network',
      codes: ['KH', 'KC', 'KS']
    },
    {
      city: 'Pretoria',
      name: 'Life Eugene Marais Hospital',
      province: 'GAUTENG',
      network: 'KeyCare Hospital Network',
      codes: ['KH', 'KC', 'KS']
    },
    {
      city: 'Cape Town',
      name: 'Mediclinic Cape Town',
      province: 'WESTERN CAPE',
      network: 'KeyCare Hospital Network',
      codes: ['D', 'S']
    },
    {
      city: 'Johannesburg',
      name: 'Life Fourways Hospital',
      province: 'GAUTENG',
      network: 'Smart Hospital Network',
      codes: ['D', 'S']
    }
  ]
};
