
import React, { useEffect, useState } from 'react';
import { RecoveryPlanData } from '../types';
import { generatePhysioImage } from '../services/gemini';

interface Props {
  data: RecoveryPlanData;
}

const RecoveryPlan: React.FC<Props> = ({ data }) => {
  const [stretchImg, setStretchImg] = useState<string | null>(null);
  const [strengthImg, setStrengthImg] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoadingImages(true);
      const sImg = await generatePhysioImage(`stretching exercise for ${data.muscleName}: ${data.stretch.split('\n')[0]}`);
      const stImg = await generatePhysioImage(`strengthening exercise for ${data.muscleName}: ${data.strength.split('\n')[0]}`);
      setStretchImg(sImg);
      setStrengthImg(stImg);
      setLoadingImages(false);
    };
    fetchImages();
  }, [data]);

  const renderBullets = (text: string) => {
    return text.split('\n').filter(line => line.trim()).map((line, i) => (
      <div key={i} className="flex gap-2 mb-1 items-start">
        <span className="text-blue-400 mt-1">•</span>
        <span className="text-slate-600 text-sm leading-tight">{line.replace(/^- /, '')}</span>
      </div>
    ));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
        <h4 className="text-blue-800 font-bold text-[10px] uppercase tracking-widest mb-2">Diagnosis</h4>
        <div className="space-y-1">
          {renderBullets(data.explanation)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The Stretch */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px]">
              <i className="fa-solid fa-person-walking-reach"></i>
            </div>
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">The Stretch</h5>
          </div>
          <div className="mb-3">
            {renderBullets(data.stretch)}
          </div>
          {loadingImages ? (
             <div className="w-full aspect-video bg-slate-50 rounded-lg animate-pulse flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin text-slate-200"></i>
             </div>
          ) : stretchImg && (
            <img src={stretchImg} alt="Stretch" className="w-full aspect-video object-cover rounded-lg shadow-inner grayscale opacity-80" />
          )}
        </div>

        {/* The Strength */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px]">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">The Strength</h5>
          </div>
          <div className="mb-3">
            {renderBullets(data.strength)}
          </div>
          {loadingImages ? (
             <div className="w-full aspect-video bg-slate-50 rounded-lg animate-pulse flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin text-slate-200"></i>
             </div>
          ) : strengthImg && (
            <img src={strengthImg} alt="Strength" className="w-full aspect-video object-cover rounded-lg shadow-inner grayscale opacity-80" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The Smooth */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
          <h5 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
             <i className="fa-solid fa-hands-holding text-purple-500"></i> The Smooth
          </h5>
          {renderBullets(data.smooth)}
        </div>

        {/* The Heal */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
          <h5 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
             <i className="fa-solid fa-calendar-check text-red-500"></i> The Heal
          </h5>
          {renderBullets(data.heal)}
        </div>
      </div>
    </div>
  );
};

export default RecoveryPlan;
