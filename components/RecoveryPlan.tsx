
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
      const sImg = await generatePhysioImage(`stretching exercise for ${data.muscleName}: ${data.stretch}`);
      const stImg = await generatePhysioImage(`strengthening exercise for ${data.muscleName}: ${data.strength}`);
      setStretchImg(sImg);
      setStrengthImg(stImg);
      setLoadingImages(false);
    };
    fetchImages();
  }, [data]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
        <h4 className="text-blue-800 font-bold text-sm uppercase tracking-wider mb-2">Physio Insight</h4>
        <p className="text-blue-900 leading-relaxed text-sm">{data.explanation}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The Stretch */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <i className="fa-solid fa-person-walking-reach"></i>
            </div>
            <h5 className="font-bold text-slate-800">The Stretch</h5>
          </div>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">{data.stretch}</p>
          {loadingImages ? (
             <div className="w-full aspect-video bg-slate-50 rounded-lg animate-pulse flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin text-slate-300"></i>
             </div>
          ) : stretchImg && (
            <img src={stretchImg} alt="Stretch visualization" className="w-full aspect-video object-cover rounded-lg shadow-inner" />
          )}
        </div>

        {/* The Strength */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            <h5 className="font-bold text-slate-800">The Strength</h5>
          </div>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">{data.strength}</p>
          {loadingImages ? (
             <div className="w-full aspect-video bg-slate-50 rounded-lg animate-pulse flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin text-slate-300"></i>
             </div>
          ) : strengthImg && (
            <img src={strengthImg} alt="Strength exercise visualization" className="w-full aspect-video object-cover rounded-lg shadow-inner" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The Smooth */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <i className="fa-solid fa-hands-holding"></i>
            </div>
            <h5 className="font-bold text-slate-800">The Smooth</h5>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{data.smooth}</p>
        </div>

        {/* The Heal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <h5 className="font-bold text-slate-800">The Heal</h5>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{data.heal}</p>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPlan;
