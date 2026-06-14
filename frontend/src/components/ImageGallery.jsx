import React, { useState } from 'react';
import { Image, X, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images }) {
  const [zoomedImg, setZoomedImg] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-2 px-1">
        <Image className="w-5 h-5 text-accentCyan" />
        <h3 className="text-lg font-black text-white">Visual Evidence & Screenshots</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => setZoomedImg(img)}
            className="rounded-2xl overflow-hidden border border-white/5 bg-glassBg relative group cursor-zoom-in hover:border-accentCyan/30 transition-all duration-300 shadow-xl"
          >
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-36 object-cover group-hover:scale-105 transition-all duration-500"
              onError={(e) => {
                // Fallback image in case Unsplash throws an error or user offline
                e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80";
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-bold text-accentCyan uppercase tracking-widest mb-1">Source: {img.source}</span>
              <p className="text-[10px] text-white leading-normal line-clamp-2">{img.caption}</p>
            </div>
            
            {/* Quick zoom icon */}
            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity text-white">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Zoom Modal overlay */}
      {zoomedImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button 
            onClick={() => setZoomedImg(null)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl max-h-[85vh] relative flex flex-col items-center">
            <img 
              src={zoomedImg.url} 
              alt={zoomedImg.caption} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80";
              }}
            />
            <div className="mt-4 text-center">
              <p className="text-white font-bold text-sm md:text-base">{zoomedImg.caption}</p>
              <span className="text-xs text-slate-500 mt-1 block">Indexed via: {zoomedImg.source}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
