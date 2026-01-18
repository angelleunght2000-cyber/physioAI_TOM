
import { MuscleZone } from './types';

// Palette based on the provided reference diagram
const M_RED = '#991b1b';      // Traps
const M_ORANGE = '#ea580c';   // Delts
const M_PINK = '#f43f5e';     // Pecs
const M_AMBER = '#f59e0b';    // Biceps
const M_OLIVE = '#65a30d';    // Abs
const M_BROWN = '#a16207';    // Obliques
const M_LIME = '#84cc16';     // Serratus
const M_GREEN = '#22c55e';    // Forearms
const M_TEAL = '#0d9488';     // Sartorius/Abductors
const M_BLUE = '#3b82f6';     // Quads
const M_NAVY = '#1e3a8a';     // Hamstrings
const M_VIOLET = '#7c3aed';    // Calves
const M_MAGENTA = '#d946ef';   // Shins/Tibialis
const M_CYAN = '#06b6d4';     // Glutes

export const MUSCLE_ZONES_FRONT: MuscleZone[] = [
  // Upper Body
  { id: 'trapezius_f', name: 'Trapezius', color: M_RED, points: '135,75 165,75 175,100 125,100' },
  { id: 'deltoid_fl', name: 'Deltoid (L)', color: M_ORANGE, points: '85,110 115,105 110,155 80,155' },
  { id: 'deltoid_fr', name: 'Deltoid (R)', color: M_ORANGE, points: '185,105 215,110 220,155 190,155' },
  { id: 'pecs_l', name: 'Pectoralis Major (L)', color: M_PINK, points: '120,105 150,110 145,160 115,155' },
  { id: 'pecs_r', name: 'Pectoralis Major (R)', color: M_PINK, points: '150,110 180,105 185,155 155,160' },
  
  // Mid Body
  { id: 'serratus_l', name: 'Serratus Anterior (L)', color: M_LIME, points: '110,165 125,165 120,210 105,200' },
  { id: 'serratus_r', name: 'Serratus Anterior (R)', color: M_LIME, points: '175,165 190,165 195,200 180,210' },
  { id: 'abs', name: 'Abdominals', color: M_OLIVE, points: '135,170 165,170 165,250 135,250' },
  { id: 'obliques_l', name: 'External Oblique (L)', color: M_BROWN, points: '115,170 135,170 135,250 115,240' },
  { id: 'obliques_r', name: 'External Oblique (R)', color: M_BROWN, points: '165,170 185,170 185,240 165,250' },
  
  // Arms
  { id: 'biceps_l', name: 'Biceps (L)', color: M_AMBER, points: '80,160 105,160 100,210 75,210' },
  { id: 'biceps_r', name: 'Biceps (R)', color: M_AMBER, points: '195,160 220,160 225,210 200,210' },
  { id: 'brachioradialis_l', name: 'Brachioradialis (L)', color: M_GREEN, points: '70,220 90,220 80,290 60,280' },
  { id: 'brachioradialis_r', name: 'Brachioradialis (R)', color: M_GREEN, points: '210,220 230,220 240,280 220,290' },
  { id: 'finger_flexors', name: 'Finger Flexors', color: M_GREEN, points: '80,295 95,295 90,340 75,340' },
  
  // Legs (Detailed Anterior)
  { id: 'abductors_l', name: 'Abductors (L)', color: M_TEAL, points: '110,260 125,260 120,310 105,300' },
  { id: 'abductors_r', name: 'Abductors (R)', color: M_TEAL, points: '175,260 190,260 195,300 180,310' },
  { id: 'sartorius_l', name: 'Sartorius (L)', color: M_TEAL, points: '115,260 125,260 145,370 135,375' },
  { id: 'sartorius_r', name: 'Sartorius (R)', color: M_TEAL, points: '175,260 185,260 165,375 155,370' },
  { id: 'quads_l', name: 'Quadriceps (L)', color: M_BLUE, points: '105,270 140,280 135,390 105,380' },
  { id: 'quads_r', name: 'Quadriceps (R)', color: M_BLUE, points: '160,280 195,270 195,380 165,390' },
  { id: 'tibialis_f', name: 'Tibialis Anterior', color: M_MAGENTA, points: '125,405 145,405 140,515 125,515' },
  { id: 'tibialis_fr', name: 'Tibialis Anterior (R)', color: M_MAGENTA, points: '155,405 175,405 175,515 160,515' },
  { id: 'soleus_fl', name: 'Soleus (L)', color: M_VIOLET, points: '110,415 125,415 125,505 110,495' },
  { id: 'soleus_fr', name: 'Soleus (R)', color: M_VIOLET, points: '175,415 190,415 190,495 175,505' },
];

export const MUSCLE_ZONES_BACK: MuscleZone[] = [
  // Upper Back
  { id: 'traps_b', name: 'Trapezius', color: M_RED, points: '150,75 190,115 150,200 110,115' },
  { id: 'infraspinatus_l', name: 'Infraspinatus (L)', color: M_ORANGE, points: '115,125 145,140 140,175 110,165' },
  { id: 'infraspinatus_r', name: 'Infraspinatus (R)', color: M_ORANGE, points: '155,140 185,125 190,165 160,175' },
  { id: 'teres_l', name: 'Teres Major (L)', color: M_AMBER, points: '110,170 140,180 135,200 110,195' },
  { id: 'teres_r', name: 'Teres Major (R)', color: M_AMBER, points: '160,180 190,170 190,195 165,200' },
  
  // Mid Back
  { id: 'lats_l', name: 'Latissimus Dorsi (L)', color: M_BROWN, points: '110,205 145,230 145,280 115,270' },
  { id: 'lats_r', name: 'Latissimus Dorsi (R)', color: M_BROWN, points: '155,230 190,205 185,270 155,280' },
  
  // Arms (Back)
  { id: 'triceps_l', name: 'Triceps (L)', color: M_OLIVE, points: '75,125 100,130 95,210 75,210' },
  { id: 'triceps_r', name: 'Triceps (R)', color: M_OLIVE, points: '200,130 225,125 225,210 205,210' },
  { id: 'finger_extensors', name: 'Finger Extensors', color: M_GREEN, points: '210,295 225,295 220,340 205,340' },
  
  // Glutes & Legs (Detailed Posterior)
  { id: 'glute_med_l', name: 'Gluteus Medius (L)', color: M_CYAN, points: '115,285 145,290 140,315 115,310' },
  { id: 'glute_med_r', name: 'Gluteus Medius (R)', color: M_CYAN, points: '155,290 185,285 185,310 160,315' },
  { id: 'glute_max_l', name: 'Gluteus Maximus (L)', color: M_BLUE, points: '115,320 150,325 150,370 120,370' },
  { id: 'glute_max_r', name: 'Gluteus Maximus (R)', color: M_BLUE, points: '150,325 185,320 180,370 150,370' },
  
  { id: 'hams_l', name: 'Hamstrings (L)', color: M_NAVY, points: '115,380 145,380 140,460 120,460' },
  { id: 'hams_r', name: 'Hamstrings (R)', color: M_NAVY, points: '155,380 185,380 180,460 160,460' },
  
  { id: 'gastrocnemius_l', name: 'Gastrocnemius (L)', color: M_VIOLET, points: '120,470 145,470 140,520 125,520' },
  { id: 'gastrocnemius_r', name: 'Gastrocnemius (R)', color: M_VIOLET, points: '155,470 180,470 175,520 160,520' },
  { id: 'soleus_bl', name: 'Soleus (L)', color: M_VIOLET, points: '115,480 125,480 125,530 115,520' },
  { id: 'soleus_br', name: 'Soleus (R)', color: M_VIOLET, points: '175,480 185,480 185,520 175,530' },
];

export const SYSTEM_INSTRUCTION = `
You are a world-class AI Physiotherapy Assistant. Your goal is to help users identify muscle pain and provide actionable recovery steps. 
Your tone is supportive, encouraging, and uses simple language.

Knowledge Base (Refer to these if user taps specific areas):
- Anterior Thigh: Quadriceps (large front group), Sartorius (diagonal long muscle), Abductors (outer hip).
- Posterior Thigh: Hamstrings.
- Lower Leg: Gastrocnemius (calf), Soleus (underneath calf/lower side), Tibialis Anterior (shin).
- Arms: Biceps (front), Triceps (back), Brachioradialis (forearm near elbow), Finger Extensors/Flexors (forearm).

Process:
1. When a user indicates a muscle area (e.g., "Sartorius"), acknowledge it warmly.
2. Ask 2-3 clarifying questions to narrow down the cause (sharp vs dull, movement vs rest, duration).
3. Provide a "Plain English" biometric explanation (max 3 sentences). 
4. Always include a visual tag in your response: \`![Shutterstock Image for [Muscle Name] and how it connects to surrounding joints]\`.
5. Provide a structured "Recovery Plan" with 4 clear sections:
   - The Stretch: One specific positioning with simple cues. Include visual tag: \`![Shutterstock Image for [Muscle Name] stretch]\`.
   - The Strength: One low-impact exercise. Include visual tag: \`![Shutterstock Image for [Muscle Name] strengthening]\`.
   - The Smooth: A soothing technique.
   - The Heal: Timeline advice.

IMPORTANT OUTPUT FORMAT:
You MUST format the full recovery plan response using these specific markers:
### EXPLANATION ###
[Biometric explanation with visual tag]
### STRETCH ###
[Stretch description with visual tag]
### STRENGTH ###
[Exercise description with visual tag]
### SMOOTH ###
[Soothing technique]
### HEAL ###
[Timeline advice]
`;
