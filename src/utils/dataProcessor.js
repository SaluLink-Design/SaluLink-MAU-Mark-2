import Papa from 'papaparse';
import { demoPMBData, demoPlanData, demoHospitalData } from './demoData';

// Process PMB data
export const processPMBData = (csvText) => {
  const lines = csvText.split('\n');
  const pmbData = {
    categories: {},
    allPMBs: []
  };

  let currentCategory = '';
  let currentCode = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and headers
    if (!line || line.includes('PRESCRIBED MINIMUM BENEFIT') || line.includes('TREATMENT')) {
      continue;
    }

    // Check if this is a category header (all caps, no code)
    if (line.match(/^[A-Z\s,]+$/) && !line.includes('PMB') && !line.includes('CODE') && line.length > 10) {
      currentCategory = line.replace(/,+$/, '').trim();
      if (!pmbData.categories[currentCategory]) {
        pmbData.categories[currentCategory] = [];
      }
      continue;
    }

    // Check if this is a PMB code line
    const pmbMatch = line.match(/^(\w+[A-Z])\s*,\s*(.+?)\s*,\s*(.+?)\s*,/);
    if (pmbMatch) {
      const [, code, description, treatment] = pmbMatch;
      const pmbItem = {
        code: code.trim(),
        description: description.trim(),
        treatment: treatment.trim(),
        category: currentCategory
      };
      
      pmbData.allPMBs.push(pmbItem);
      if (currentCategory && pmbData.categories[currentCategory]) {
        pmbData.categories[currentCategory].push(pmbItem);
      }
    }
  }

  return pmbData;
};

// Process plan comparison data
export const processPlanData = (csvText) => {
  const lines = csvText.split('\n');
  const planData = {
    series: {},
    allPlans: []
  };

  let currentSeries = '';
  let inContributions = false;
  let inBenefits = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;

    // Detect series headers
    if (line.match(/^(EXECUTIVE|COMPREHENSIVE|PRIORITY|SAVER|SMART|CORE|KEYCARE)$/)) {
      currentSeries = line;
      if (!planData.series[currentSeries]) {
        planData.series[currentSeries] = [];
      }
      continue;
    }

    // Detect contribution data section
    if (line.includes('CONTRIBUTIONS (R)') || line.includes('MAIN MEMBER')) {
      inContributions = true;
      inBenefits = false;
      continue;
    }

    // Detect benefits section
    if (line.includes('PMB,Prescribed Minimum Benefits') || line.includes('DAY-TO-DAY BENEFITS')) {
      inContributions = false;
      inBenefits = true;
      continue;
    }

    // Process plan lines
    if (inContributions && line.includes(',')) {
      const parts = line.split(',');
      if (parts.length >= 3 && parts[1] && parts[1].trim() !== '') {
        const planName = parts[1].trim().replace(/"/g, '');
        if (planName && !planName.includes('PLAN') && !planName.includes('CONTRIBUTIONS')) {
          const plan = {
            name: planName,
            series: currentSeries,
            mainMember: parts[2] ? parts[2].trim().replace(/"/g, '') : '',
            adult: parts[3] ? parts[3].trim().replace(/"/g, '') : '',
            child: parts[4] ? parts[4].trim().replace(/"/g, '') : '',
            msaMain: parts[5] ? parts[5].trim().replace(/"/g, '') : '',
            msaAdult: parts[6] ? parts[6].trim().replace(/"/g, '') : '',
            msaChild: parts[7] ? parts[7].trim().replace(/"/g, '') : '',
            totalMain: parts[8] ? parts[8].trim().replace(/"/g, '') : '',
            totalAdult: parts[9] ? parts[9].trim().replace(/"/g, '') : '',
            totalChild: parts[10] ? parts[10].trim().replace(/"/g, '') : ''
          };
          
          planData.allPlans.push(plan);
          if (currentSeries && planData.series[currentSeries]) {
            planData.series[currentSeries].push(plan);
          }
        }
      }
    }
  }

  return planData;
};

// Process hospital network data
export const processHospitalData = (csvText) => {
  const lines = csvText.split('\n');
  const hospitalData = {
    networks: {},
    allHospitals: []
  };

  let currentProvince = '';
  let currentNetwork = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;

    // Detect network descriptions
    if (line.includes('KeyCare Hospital Network') || line.includes('Smart Hospital Network') || 
        line.includes('Delta Hospital Network') || line.includes('Coastal Hospital Network')) {
      currentNetwork = line.split('Hospital Network')[0].trim() + ' Hospital Network';
      if (!hospitalData.networks[currentNetwork]) {
        hospitalData.networks[currentNetwork] = {
          description: line,
          provinces: {}
        };
      }
      continue;
    }

    // Detect province headers
    if (line.match(/^(GAUTENG|EASTERN CAPE|FREE STATE|KWAZULU-NATAL|LIMPOPO|MPUMALANGA|NORTH WEST|NORTHERN CAPE|WESTERN CAPE)$/)) {
      currentProvince = line;
      continue;
    }

    // Process hospital lines
    if (currentProvince && line.includes(',')) {
      const parts = line.split(',');
      if (parts.length >= 2 && parts[0] && parts[1]) {
        const city = parts[0].trim().replace(/"/g, '');
        const hospitalName = parts[1].trim().replace(/"/g, '');
        
        if (city && hospitalName && !city.includes('GAUTENG') && !city.includes('CAPE')) {
          const hospital = {
            city: city,
            name: hospitalName,
            province: currentProvince,
            network: currentNetwork,
            codes: parts.slice(2).map(p => p.trim().replace(/"/g, '')).filter(p => p)
          };
          
          hospitalData.allHospitals.push(hospital);
          
          if (currentNetwork && hospitalData.networks[currentNetwork]) {
            if (!hospitalData.networks[currentNetwork].provinces[currentProvince]) {
              hospitalData.networks[currentNetwork].provinces[currentProvince] = [];
            }
            hospitalData.networks[currentNetwork].provinces[currentProvince].push(hospital);
          }
        }
      }
    }
  }

  return hospitalData;
};

// Load and process all CSV data
export const loadAllData = async () => {
  try {
    // In a real app, you would fetch these from a server
    // For now, we'll use demo data as a fallback
    const pmbData = demoPMBData;
    const planData = demoPlanData;
    const hospitalData = demoHospitalData;
    
    // Uncomment below to use actual CSV processing
    /*
    const pmbData = processPMBData(`
PRESCRIBED MINIMUM BENEFIT (PMB) CODE,PRESCRIBED MINIMUM BENEFIT (PMB) DESCRIPTION,TREATMENT,
BRAIN AND NERVOUS SYSTEM,,,
906A,"Acute generalised paralysis, including polio and Guillain-Barre",Medical management; ventilation and plasmapheresis,
341A,"Basal ganglia, extra-pyramidal disorders; other dystonias not otherwise specified (NOS)",Initial diagnosis; initiation of medical management,
950A,"Benign and malignant brain tumours, treatable",Medical and surgical management which includes radiation therapy and chemotherapy,
49A,Compound/depressed fractures of skull,Craniotomy/craniectomy,
213A,"Difficulty in breathing, eating, swallowing, bowel, or bladder control due to non-progressive neurological (including spinal) condition or injury",Medical and surgical management; ventilation,
83A,Encephalocele; congenital hydrocephalus,Shunt; surgery,
902A,"Epilepsy (status epilepticus, initial diagnosis, candidate for neurosurgery)",Medical management; ventilation; neurosurgery,
211A,Intraspinal and Intracranial abscess,Medical and surgical management,
905A,Meningitis – acute and subacute,Medical and surgical management,
513A,Myasthenia gravis; muscular dystrophy; neuro- myopathies not otherwise specified (NOS),Initial diagnosis; initiation of medical management; therapy for acute complications and exacerbations,
510A,Peripheral nerve injury with open wound,Neuroplasty,
940A,Reversible CNS abnormalities due to other systemic disease,Medical and surgical management,
1A,Severe/moderate head injury: haematoma/oedema with loss of consciousness,Medical and surgical management; ventilation,
84A,Spina Bifida,Surgical management,
941A,"Spinal cord compression, ischaemia or degenerative disease not otherwise specified (NOS)",Medical and surgical management,
901A,"Stroke – due to haemorrhage, or ischaemia",Medical management; surgery,
28A,Subarachnoid and intracranial haemorrhage/haematoma; compression of brain,Medical and surgical management,
305A,Tetanus,Medical management; ventilation,
265A,Transient cerebral ischaemia; life-threatening cerebrovascular conditions not otherwise specified (NOS),Evaluation; medical management; surgery,
109A,"Vertebral dislocations/fractures, open or closed with injury to spinal cord",Repair/reconstruction; medical management; inpatient rehabilitation up to 2 months,
684A,"Viral meningitis, encephalitis, myelitis and encephalomyelitis",Medical management,
EYE,,,
47B,Acute orbital cellulitis,Medical and surgical management,
394B,Angle-closure glaucoma,Iridectomy; laser surgery; medical and surgical management,
586B,Bell's palsy; exposure keratoconjunctivitis,Tarsorrhaphy; medical and surgical management,
950B,Cancer of the eye and orbit - treatable,"Medical and surgical management, which includes radiation therapy and chemotherapy",
901B,Cataract; aphakia,Extraction of cataract; lens implant,
911B,Corneal ulcer; Superficial injury of eye and adnexa,Conjunctival flap; medical management,
405B,Glaucoma associated with disorders of the lens,Surgical management,
386B,Herpes zoster & herpes simplex with ophthalmic complications,Medical management,
389B,Hyphaema,Removal of blood clot; observation,
485B,Inflammation of lacrimal passages,Incision; medical management,
909B,Open wound of eyeball and other eye structures,Medical and surgical management,
407B,Primary and open angle glaucoma with failed medical management,Trabeculectomy; other surgery,
419B,Purulent endophthalmitis,Vitrectomy,
922B,Retained intraocular foreign body,Surgical management,
904B,"Retinal detachment, tear and other retinal disorders",Vitrectomy; laser treatment; other surgery,
906B,Retinal vascular occlusion; central retinal vein occlusion,Laser surgery,
409B,Sympathetic uveitis and degenerative disorders and conditions of globe; sight threatening thyroid optopathy,Enucleation; medical management; surgery,
RESPIRATORY SYSTEM,,,
903D,"Bacterial, viral, fungal pneumonia","Medical management, ventilation",
158D,"Respiratory failure, regardless of cause",Medical management; oxygen; ventilation,
157D,Acute asthmatic attack; pneumonia due to respiratory syncytial virus in persons under three years of age,Medical management,
125D,Adult respiratory distress syndrome; inhalation and aspiration pneumonias,Medical management; ventilation,
315D,Atelectasis (collapse of lung),Medical and surgical management; ventilation,
340D,Benign neoplasm of respiratory and intrathoracic organs,Biopsy; lobectomy; Medical management; radiation therapy,
950D,"Cancer of lung, bronchus, pleura, trachea, mediastinum & other respiratory organs - treatable","Medical and surgical management, which includes chemotherapy and radiation therapy",
170D,Empyema and abscess of lung,Medical and surgical management,
934D,Frank haemoptysis,Medical and surgical management,
203D,Hypoplasia and dysplasia of lung,Medical and surgical management,
900D,Open fracture of ribs and sternum; multiple rib fractures; flail chest,"Medical and surgical management, ventilation",
5D,Pneumothorax and haemothorax,Tube thoracostomy/thoracotomy,
HEART AND VASCULATURE,,,
155E,Myocarditis; cardiomyopathy; transposition of great vessels; hypoplastic left heart syndrome,Medical and surgical management; cardiac transplant,
108E,Pericarditis,Medical and surgical management,
907E,"Acute and subacute ischaemic heart disease, including myocardial infarction and unstable angina",Medical management; surgery; percutaneous procedures,
284E,Acute pulmonary heart disease and pulmonary emboli,Medical and surgical management,
35E,Acute rheumatic fever,Medical management,
908E,"Aneurysm of major artery of chest, abdomen, neck, - unruptured or ruptured not otherwise specified (NOS)",Surgical management,
26E,"Arterial embolism/thrombosis: abdominal aorta, thoracic aorta",Medical and surgical management,
204E,Cardiac failure: acute or recent deterioration of chronic cardiac failure,Medical treatment,
98E,"Complete, corrected and other transposition of great vessels",Repair,
97E,Coronary artery anomaly,Anomalous coronary artery ligation,
309E,Diseases and disorders of aortic valve not otherwise specified (NOS),Aortic valve replacement,
210E,Diseases of endocardium; endocarditis,Medical management,
314E,Diseases of mitral valve,Valvuloplasty; valve replacement; medical management,
902E,Disorders of arteries: visceral,Bypass graft; surgical management,
18E,Dissecting or ruptured aortic aneurysm,Surgical management,
915E,Gangrene; severe atherosclerosis of arteries of extremities; diabetes mellitus with peripheral circulatory disease,Medical and surgical management including amputation,
294E,"Giant cell arteritis, Kawasaki disease, hypersensitivity angiitis",Medical management,
450E,Hereditary haemorrhagic telangiectasia,Excision,
901E,Hypertension – acute life-threatening complications and malignant hypertension; renal artery stenosis and other curable hypertension,Medical and surgical management,
111E,"Injury to major blood vessels - trunk, head and neck, and upper limbs",Repair,
19E,Injury to major blood vessels of extremities,Ligation,
903E,Life-threatening cardiac arrhythmias,"Medical and surgical management, pacemakers, cardioversion",
900E,Life-threatening complications of elective cardiac and major vascular procedures,Medical and surgical management,
497E,Multiple valvular disease,Surgical management,
355E,Other aneurysm of artery – peripheral,Surgical management,
905E,Other correctable congenital cardiac conditions,Surgical repair; medical management,
100E,"Patent ductus arteriosus; aortic pulmonary fistula - persistent",Ligation,
209E,"Phlebitis & thrombophlebitis, deep",Ligation and division; medical management,
914E,Rheumatic pericarditis; rheumatic myocarditis,Medical management,
16E,Rupture of papillary muscle,Medical and surgical management,
627E,Shock/hypotension – life-threatening,Medical management; ventilation,
99E,Tetralogy of Fallot (TOF),Total repair tetralogy,
93E,Ventricular septal defect - persistent,Closure,
    `);

    const planData = processPlanData(`
PLAN COMPARISON,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Discovery Health Medical Scheme 2025 contributions,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
SERIES,,,,,,,,PLAN,,,,,,,,,,CONTRIBUTIONS (R),,,,,,,,,,,,,,,,,,,CONTRIBUTIONS TO MEDICAL SAVINGS ACCOUNT (R),,,,,,,,,,,,,,,,,,,,,,,,TOTAL CONTRIBUTIONS (R),,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,MAIN MEMBER,,,,,ADULT,,,,CHILD**,,,,,,,,,,MAIN MEMBER,,,,,,ADULT,,,,,,,CHILD**,,,,,,MAIN MEMBER,,,,,,,,,,ADULT,,,CHILD**,,,,,,,,
Executive,,,,,,,,,,,,,Executive Plan,,,,,,,"8,573",,,,,,,,,,"8,573",,,,,,,"1,639",,,,,,,"2,857",,,,,,,"2,857",,,,,,546,,,,,,,,,,"11,430",,,,,,"11,430",,,,,"2,185",,,,,
Comprehensive,,,,,,,,,,,,,Classic Comprehensive,,,,,,,"6,975",,,,,,,,,,"6,596",,,,,,,"1,392",,,,,,,"2,323",,,,,,,"2,197",,,,,,464,,,,,,,,,,"9,298",,,,,,"8,793",,,,,"1,856",,,,,
,,,,,,,,,,,,,Classic Smart Comprehensive,,,,,,,"6,754",,,,,,,,,,"6,237",,,,,,,"1,577",,,,,,,"1,191",,,,,,,"1,100",,,,,,278,,,,,,,,,,"7,945",,,,,,"7,337",,,,,"1,855",,,,,
Priority,,,,,,,,,,,,,Classic Priority,,,,,,,"4,348",,,,,,,,,,"3,429",,,,,,,"1,739",,,,,,,"1,448",,,,,,,"1,142",,,,,,579,,,,,,,,,,"5,796",,,,,,"4,571",,,,,"2,318",,,,,
,,,,,,,,,,,,,Essential Priority,,,,,,,"4,234",,,,,,,,,,"3,330",,,,,,,"1,691",,,,,,,747,,,,,,,587,,,,,,298,,,,,,,,,,"4,981",,,,,,"3,917",,,,,"1,989",,,,,
Saver,,,,,,,,,,,,,Classic Saver,,,,,,,"3,629",,,,,,,,,,"2,862",,,,,,,"1,455",,,,,,,906,,,,,,,715,,,,,,362,,,,,,,,,,"4,535",,,,,,"3,577",,,,,"1,817",,,,,
,,,,,,,,,,,,,Classic Delta Saver,,,,,,,"2,900",,,,,,,,,,"2,291",,,,,,,"1,164",,,,,,,724,,,,,,,572,,,,,,291,,,,,,,,,,"3,624",,,,,,"2,863",,,,,"1,455",,,,,
,,,,,,,,,,,,,Essential Saver,,,,,,,"3,271",,,,,,,,,,"2,453",,,,,,,"1,310",,,,,,,363,,,,,,,272,,,,,,145,,,,,,,,,,"3,634",,,,,,"2,725",,,,,"1,455",,,,,
,,,,,,,,,,,,,Essential Delta Saver,,,,,,,"2,609",,,,,,,,,,"1,969",,,,,,,"1,047",,,,,,,289,,,,,,,218,,,,,,116,,,,,,,,,,"2,898",,,,,,"2,187",,,,,"1,163",,,,,
,,,,,,,,,,,,,Coastal Saver,,,,,,,"3,228",,,,,,,,,,"2,427",,,,,,,"1,303",,,,,,,569,,,,,,,428,,,,,,230,,,,,,,,,,"3,797",,,,,,"2,855",,,,,"1,533",,,,,
Smart,,,,,,,,,,,,,Classic Smart,,,,,,,"2,822",,,,,,,,,,"2,227",,,,,,,"1,127",,,,,,,No Medical Savings Account,,,,,,,,,,,,,,,,,,,,,,,"2,822",,,,,,"2,227",,,,,"1,127",,,,,
,,,,,,,,,,,,,Essential Smart,,,,,,,"2,021",,,,,,,,,,"2,021",,,,,,,"2,021",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"2,021",,,,,,"2,021",,,,,"2,021",,,,,
,,,,,,,,,,,,,Essential Dynamic Smart,,,,,,,"1,681",,,,,,,,,,"1,681",,,,,,,"1,681",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"1,681",,,,,,"1,681",,,,,"1,681",,,,,
,,,,,,,,,,,,,Active Smart,,,,,,,"1,350",,,,,,,,,,"1,350",,,,,,,"1,350",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"1,350",,,,,,"1,350",,,,,"1,350",,,,,
Core,,,,,,,,,,,,,Classic Core,,,,,,,"3,652",,,,,,,,,,"2,882",,,,,,,"1,461",,,,,,,No Medical Savings Account,,,,,,,,,,,,,,,,,,,,,,,"3,652",,,,,,"2,882",,,,,"1,461",,,,,
,,,,,,,,,,,,,Classic Delta Core,,,,,,,"2,923",,,,,,,,,,"2,305",,,,,,,"1,169",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"2,923",,,,,,"2,305",,,,,"1,169",,,,,
,,,,,,,,,,,,,Essential Core,,,,,,,"3,138",,,,,,,,,,"2,354",,,,,,,"1,260",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"3,138",,,,,,"2,354",,,,,"1,260",,,,,
,,,,,,,,,,,,,Essential Delta Core,,,,,,,"2,507",,,,,,,,,,"1,887",,,,,,,"1,006",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"2,507",,,,,,"1,887",,,,,"1,006",,,,,
,,,,,,,,,,,,,Coastal Core,,,,,,,"3,011",,,,,,,,,,"2,259",,,,,,,"1,196",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"3,011",,,,,,"2,259",,,,,"1,196",,,,,
KeyCare*,,,,,,,,,,,,,"KeyCare Plus 0 – 9,900",,,,,,,"1,817",,,,,,,,,,"1,817",,,,,,,661,,,,,,,No Medical Savings Account,,,,,,,,,,,,,,,,,,,,,,,"1,817",,,,,,"1,817",,,,,661,,,,,
,,,,,,,,,,,,,"KeyCare Plus 9,901 – 15,990",,,,,,,"2,497",,,,,,,,,,"2,497",,,,,,,704,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"2,497",,,,,,"2,497",,,,,704,,,,,
,,,,,,,,,,,,,"KeyCare Plus 15,991 +",,,,,,,"3,687",,,,,,,,,,"3,687",,,,,,,986,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"3,687",,,,,,"3,687",,,,,986,,,,,
,,,,,,,,,,,,,"KeyCare Core 0 – 9,900",,,,,,,"1,381",,,,,,,,,,"1,381",,,,,,,361,,,,,,,No Medical Savings Account,,,,,,,,,,,,,,,,,,,,,,,"1,381",,,,,,"1,381",,,,,361,,,,,
,,,,,,,,,,,,,"KeyCare Core 9,901 – 15,990",,,,,,,"1,723",,,,,,,,,,"1,723",,,,,,,427,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"1,723",,,,,,"1,723",,,,,427,,,,,
,,,,,,,,,,,,,"KeyCare Core 15,991 +",,,,,,,"2,636",,,,,,,,,,"2,636",,,,,,,598,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"2,636",,,,,,"2,636",,,,,598,,,,,
,,,,,,,,,,,,,"KeyCare Start 0 – 10,550",,,,,,,"1,331",,,,,,,,,,"1,331",,,,,,,811,,,,,,,No Medical Savings Account,,,,,,,,,,,,,,,,,,,,,,,"1,331",,,,,,"1,331",,,,,811,,,,,
,,,,,,,,,,,,,"KeyCare Start 10,551 – 15,950",,,,,,,"1,952",,,,,,,,,,"1,952",,,,,,,878,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"1,952",,,,,,"1,952",,,,,878,,,,,
,,,,,,,,,,,,,"KeyCare Start 15,951 – 24,250",,,,,,,"3,063",,,,,,,,,,"3,063",,,,,,,919,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"3,063",,,,,,"3,063",,,,,919,,,,,
,,,,,,,,,,,,,"KeyCare Start 24,251 +",,,,,,,"3,488",,,,,,,,,,"3,488",,,,,,,949,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"3,488",,,,,,"3,488",,,,,949,,,,,
,,,,,,,,,,,,,"KeyCare Start Regional 0 – 10,550",,,,,,,"1,184",,,,,,,,,,"1,184",,,,,,,713,,,,,,,No Medical Savings Account,,,,,,,,,,,,,,,,,,,,,,,"1,184",,,,,,"1,184",,,,,713,,,,,
,,,,,,,,,,,,,"KeyCare Start Regional 10,551 – 15,950",,,,,,,"1,790",,,,,,,,,,"1,790",,,,,,,805,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"1,790",,,,,,"1,790",,,,,805,,,,,
,,,,,,,,,,,,,"KeyCare Start Regional 15,951 – 24,250",,,,,,,"2,790",,,,,,,,,,"2,790",,,,,,,854,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"2,790",,,,,,"2,790",,,,,854,,,,,
,,,,,,,,,,,,,"KeyCare Start Regional 24,251 +",,,,,,,"3,178",,,,,,,,,,"3,178",,,,,,,890,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"3,178",,,,,,"3,178",,,,,890,,,,,
    `);

    const hospitalData = processHospitalData(`
@Discovery Health Medical Scheme,,,
QUALITY CARE IN OUR HOSPITAL FIND A NETWORK FACILITY FOR YOUR HEALTH PLAN OPTION,,,
Hospital Networks,,,
KeyCare Hospital Network,,,
Smart Hospital Network,,,
Delta Hospital Network,,,
Coastal Hospital Network,,,
GAUTENG,,,
Alberton,Netcare Alberton Hospital,D,S,
Benoni,Life The Glynnwood Hospital,KH,S,
Brakpan,Life Dalview Hospital,KH,,
Centurion,Mediclinic Midstream,,S,
Netcare Unitas Hospital,D,,
Germiston,Life Bedford Gardens Hospital,,D,
Life Roseacres Hospital,KH,KC,D,S,
Heidelberg,Life Suikerbosrand Hospital,KH,,
Johannesburg,Clinix Selby Park Hospital,KH,,
Life Brenthurst Hospital,KH,KC,KS,D,
Life Fourways Hospital,,D,S,
Mediclinic Morningside,,D,S,
Nelson Mandela Children's Hospital,KH,,D,S,
Netcare Garden City Hospital,KH,KC,,
Netcare Park Lane Hospital,,,S,
Wits Donald Gordon Medical Centre,KR,D,S,
Kempton Park,Arwyp Medical Centre,,D,
Krugersdorp,Netcare Pinehaven,,,S,
Lenasia,Lenmed Ahmed Kathrada Private Hospital,KH,KC,D,
Lenmed Daxina Private Hospital,KH,,
Mabopane,Mediclinic Legae,KH,KC,D,S,
Midrand,Life Carstenhof Hospital,KH,KC,,
Netcare Waterfall City Hospital,,D,S,
Pretoria,Life Eugene Marais Hospital,KH,KC,KS,,
Life Faerie Glen Hospital,,D,,
Life Groenkloof Hospital,,D,S,
Life Wilgers Hospital,,D,S,
Louis Pasteur Hospital,,D,,
Mediclinic Medforum,KH,KC,KR,S,
Mediclinic Muelmed,,,S,
Netcare Femina Hospital,,D,,
Netcare Jakaranda Hospital,KH,,
Optimed Eye and Laser Clinic,KH,,D,S,
Zuid Afrikaans Hospital,KH,,
Randburg,Netcare Olivedale Hospital,,,S,
Randfontein,Lenmed Health Randfontein Private Hospital,KH,KC,,
Life Robinson Private Hospital,KH,KC,D,
Roodepoort,Life Flora Hospital,,D,
Life Wilgeheuwel Hospital,,D,S,
Saxonwold,Oxford Maternity Unit,KH,,D,S,
Soshanguve,Botshilu Private Hospital,KH,,
Soweto,Clinix Tshepo-Themba Private Hospital,KH,KC,KS,,
Dr S K Matseke Memorial Hospital,KH,,D,S,
Springs,Life Springs Parkland Hospital,KH,KC,D,
Tembisa,Lenmed Health Zamokuhle Private Hospital,KH,KC,KS,
Vanderbijlpark,Mediclinic Emfuleni,KH,KC,D,
Vereeniging,Clinix Naledi-Nkanyezi Private Hospital,KH,KS,D,
Mediclinic Vereeniging,,,S,
Midvaal Private Hospital,KH,KC,D,
Vosloorus,Clinix Botshelong-Empilweni Private Hospital,KH,KS,D,S,
EASTERN CAPE,,,
East London,Life Beacon Bay Hospital,KH,KC,KS,D,S,
Life East London Private Hospital,KH,,
Life St Dominic's Private Hospital,KH,KC,,
Humansdorp,Life Isivivana Private Hospital,KH,,
Port Elizabeth,Life Mercantile Hospital,KH,KC,KS,,
Life St George's Hospital,KH,KC,KS,D,
Netcare Greenacres Hospital,,,S,
Queenstown,Life Queenstown Private Hospital,KH,,S,
Uitenhage,Netcare Cuyler Hospital,KH,KC,,
Umthatha,St Mary's Private Hospital,KH,KC,,S,
FREE STATE,,,
Bethlehem,Mediclinic Hoogland,KH,,
Bloemfontein,Life Rosepark Hospital,KH,KC,KS,D,
Mediclinic Bloemfontein,,,S,
Netcare Pelonomi Private Hospital,KH,,
Netcare Universitas Private Hospital,KH,,D,
Pasteur Eye Hospital,KH,,D,
Harrismith,Busamed Harrismith Hospital,KH,KS,
Kroonstad,Netcare Kroon Hospital,KH,,
Sasolburg,Netcare Vaalpark Hospital,KH,KC,
Welkom,Mediclinic Welkom,KH,,S,
KWAZULU-NATAL,,,
Amanzimtoti,Netcare Kingsway Hospital,KH,KC,
Ballito,Netcare Alberlito Hospital,,,S,
Chatsworth,Life Chatsmed Garden Hospital,KH,KC,D,
Durban,JMH Ascot Park Hospital,KH,,
JMH City Hospital,KH,KC,KS,,
Lenmed Ethekwini Hospital and Heart Centre,,D,,
Life Entabeni Hospital,KH,KC,KS,D,
Life Westville Hospital,,D,S,
Netcare St Augustine's Hospital,,,S,
Netcare Umhlanga Hospital,,,S,
Empangeni,Life Empangeni Private Hospital,KH,,
Isipingo,JMH Isipingo Hospital,KH,KC,,S,
Kokstad,Netcare Kokstad Private Hospital,KH,,
Ladysmith,Lenmed La Verna Hospital,KH,,
Newcastle,Mediclinic Newcastle,KH,KC,,S,
Phoenix,Life Mount Edgecombe Hospital,KH,KC,
Pietermaritzburg,Life Hilton Private Hospital,,,S,
Mediclinic Pietermaritzburg,,,S,
Midlands Medical Centre,KH,KS,D,
Pinetown,Busamed Hillcrest Private Hospital,,D,
Life Crompton Hospital,KH,KC,
Port Shepstone,Hibiscus Hospital,KH,KC,
Richards Bay,Melomed Richards Bay Private Hospital,KH,KC,KS,D,S,
Netcare The Bay Hospital,KH,KC,D,
Sydenham,Lenmed Shifa Private Hospital,KH,,
Tongaat,Mediclinic Victoria,KH,,
LIMPOPO,,,
Polokwane,Mediclinic Limpopo,KH,KS,KR,D,
Netcare Pholoso Hospital,,,S,
Lephalale,Mediclinic Lephalale,KH,,
Thabazimbi,Mediclinic Thabazimbi,KH,KC,
Tzaneen,Mediclinic Tzaneen,KH,,KR,S,
MPUMALANGA,,,
Barberton,RH Phodiclinic,KH,,
Emalahleni,Life Cosmos Hospital,KH,KC,D,S,
Ermelo,Mediclinic Ermelo,KH,,
Mbombela,Mediclinic Nelspruit,KH,KC,KS,KR,S,
Middelburg,Life Midmed Hospital,KH,KC,KS,
Piet Retief,RH Piet Retief Private Hospital,KH,,
Trichardt,Mediclinic Highveld,KH,KC,KR,
NORTH WEST,,,
Brits,Mediclinic Brits,KH,,
Carletonville,The Fountain Private Hospital,KH,KC,
Klerksdorp,Life Anncron Hospital,KH,KC,,S,
Mafikeng,Clinix Victoria Private Hospital,KH,,
Potchefstroom,Mediclinic Potchefstroom,KH,KC,
Rustenburg,Life Peglerae Hospital,KH,KC,KS,
Netcare Ferncrest Hospital,,D,S,
Vryburg,Vryburg Private Hospital,KH,,
NORTHERN CAPE,,,
Kathu,Lenmed Health Kathu Private Hospital,KH,KC,
Kimberley,Finsch Mine Hospital,KH,,
Lenmed Royal Hospital and Heart Centre,,,S,
Mediclinic Kimberley,KH,,D,
Upington,Mediclinic Upington,KH,,D,
WESTERN CAPE,,,
Bellville,Cape Eye Hospital,KH,,D,S,
Mediclinic Louis Leipoldt,KH,KC,KR,
Melomed Bellville,KH,KC,KS,
Blouberg,Netcare Blaauwberg,,,S,
Cape Town,Life Vincent Pallotti Hospital,,D,
Mediclinic Cape Gate,,,S,
Mediclinic Cape Town,,D,S,
Mediclinic Constantiaberg,,,S,
Mediclinic Panorama,,D,S,
Netcare UCT Medical Centre,KH,,
Rondebosch Heart Centre,KH,KS,
Rondebosch Medical Centre,KH,KS,
Claremont,Life Kingsbury Hospital,,,S,
Life Peninsula Eye Hospital,,D,S,
Gatesville,Melomed Gatesville,KH,KC,KS,D,S,
George,Mediclinic Geneva,KH,KS,KR,S,
Mediclinic George,KH,KS,KR,S,
Hermanus,Mediclinic Hermanus,KH,KC,
Kuils River,Netcare Kuilsriver Hospital,,D,
Milnerton,Mediclinic Milnerton,KH,,KR,S,
    `);

    return { pmbData, planData, hospitalData };
    */
  } catch (error) {
    console.error('Error loading data:', error);
    return { pmbData: demoPMBData, planData: demoPlanData, hospitalData: demoHospitalData };
  }
};
