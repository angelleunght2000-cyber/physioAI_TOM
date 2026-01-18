
import React, { useState } from 'react';
import { MUSCLE_ZONES_FRONT, MUSCLE_ZONES_BACK } from '../constants';
import { MuscleZone } from '../types';

interface Props {
  onZoneClick: (zone: MuscleZone) => void;
  selectedZoneId?: string;
}

const AnatomyModel: React.FC<Props> = ({ onZoneClick, selectedZoneId }) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const zones = view === 'front' ? MUSCLE_ZONES_FRONT : MUSCLE_ZONES_BACK;
  const selectedZone = zones.find(z => z.id === selectedZoneId);

  // Helper to find a point for the label (simplistic centroid-ish)
  const getLabelCoords = (points: string) => {
    const coords = points.split(' ').map(p => p.split(',').map(Number));
    const x = coords.reduce((acc, curr) => acc + curr[0], 0) / coords.length;
    const y = coords.reduce((acc, curr) => acc + curr[1], 0) / coords.length;
    return { x, y };
  };

  const labelPos = selectedZone ? getLabelCoords(selectedZone.points) : null;

  return (
    <div className="flex flex-col items-center bg-white p-4 lg:p-6 rounded-3xl shadow-xl border border-slate-100 w-full relative">
      {/* Speech Bubble for Tom */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl relative animate-bounce">
          <p className="text-sm font-black italic tracking-tight whitespace-nowrap">
            "I am so damn painful in..."
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45"></div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 w-full items-start mt-8">
        {/* Tom's Interactive Model */}
        <div className="flex-1 flex flex-col items-center w-full">
          <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-xl w-full">
            <button 
              onClick={() => setView('front')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'front' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              Anterior (Tom)
            </button>
            <button 
              onClick={() => setView('back')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'back' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              Posterior (Tom)
            </button>
          </div>

          <div className="relative w-full aspect-[1/1.8] bg-slate-50 rounded-2xl border border-slate-200 p-2 shadow-inner overflow-hidden">
            <svg 
              viewBox="0 0 300 580" 
              className="w-full h-full drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tom Silhouette */}
              <g fill="#f9dcc4" stroke="#e9c8ae" strokeWidth="1">
                <path d="M150,20 C135,20 125,30 125,50 C125,70 135,80 150,80 C165,80 175,70 175,50 C175,30 165,20 150,20 Z" />
                <path d="M150,80 L135,80 L165,80 L170,100 L220,110 L235,170 L220,230 L235,280 L235,350 L220,350 L220,300 L200,300 L200,400 L210,550 L180,550 L175,450 L150,450 L125,450 L120,550 L90,550 L100,400 L100,300 L80,300 L80,350 L65,350 L65,280 L80,230 L65,170 L80,110 L130,100 Z" />
              </g>

              {/* Muscle Groups */}
              {zones.map((zone) => (
                <polygon
                  key={zone.id}
                  points={zone.points}
                  className={`anatomy-path ${selectedZoneId === zone.id ? 'selected' : ''}`}
                  style={{ fill: zone.color }}
                  onClick={() => onZoneClick(zone)}
                />
              ))}

              {/* Dynamic Label on Tap */}
              {selectedZone && labelPos && (
                <g className="animate-in fade-in zoom-in duration-200">
                  <line 
                    x1={labelPos.x} 
                    y1={labelPos.y} 
                    x2={labelPos.x > 150 ? labelPos.x + 30 : labelPos.x - 30} 
                    y2={labelPos.y - 20} 
                    stroke="black" 
                    strokeWidth="1.5"
                  />
                  <rect 
                    x={labelPos.x > 150 ? labelPos.x + 25 : labelPos.x - 105} 
                    y={labelPos.y - 45} 
                    width="80" 
                    height="25" 
                    rx="6" 
                    fill="black"
                  />
                  <text 
                    x={labelPos.x > 150 ? labelPos.x + 65 : labelPos.x - 65} 
                    y={labelPos.y - 28} 
                    fill="white" 
                    fontSize="8" 
                    fontWeight="bold" 
                    textAnchor="middle"
                  >
                    {selectedZone.name.toUpperCase()}
                  </text>
                </g>
              )}
            </svg>
            <div className="absolute top-4 left-4">
               <span className="bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-600 border border-slate-200">TOM (ID: 001)</span>
            </div>
          </div>
        </div>

        {/* Reference Atlas (Replacing brain image with actual muscle diagram placeholder) */}
        <div className="hidden xl:flex flex-1 flex-col items-center w-full">
          <div className="mb-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <i className="fa-solid fa-book-open"></i> Reference Atlas
          </div>
          <div className="w-full aspect-[1/1.8] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm relative group">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
              alt="Medical Muscle Reference"
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider">Muscular System</p>
              <p className="text-[8px] opacity-70">Anatomical cross-reference chart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl w-full">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Diagnosis Target</p>
        <p className="text-slate-900 font-bold text-xl flex items-center justify-center gap-3">
          {selectedZone ? (
            <span className="text-red-600 animate-pulse">Tom's {selectedZone.name}</span>
          ) : (
            <span className="text-slate-300 italic">Select an area on Tom</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AnatomyModel;
