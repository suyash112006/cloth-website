"use client";

import { CheckCircle, MousePointer2, Star, Feather } from "lucide-react";
import { MutableRefObject } from "react";

export interface FeatureItem {
  icon: 'rotate' | 'fabric' | 'fit' | 'material';
  label: string;
  description: string;
}

export interface FeatureIconListProps {
  featureItems: FeatureItem[];
  featureRefs: MutableRefObject<HTMLElement[]>;
}

export default function FeatureIconList({ featureItems, featureRefs }: FeatureIconListProps) {
  const getIcon = (name: FeatureItem["icon"]) => {
    switch (name) {
      case 'rotate': return <MousePointer2 size={20} strokeWidth={1.5} />;
      case 'fabric': return <Star size={20} strokeWidth={1.5} />;
      case 'fit': return <CheckCircle size={20} strokeWidth={1.5} />;
      case 'material': return <Feather size={20} strokeWidth={1.5} />;
      default: return <Star size={20} strokeWidth={1.5} />;
    }
  };

  const setRef = (el: HTMLElement | null) => {
    if (el && featureRefs && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-4 lg:gap-8">
      {featureItems.map((feature, idx) => (
        <div 
          key={idx} 
          ref={setRef}
          className="flex items-start gap-4"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-primary-soft/30 text-primary">
            {getIcon(feature.icon)}
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-text mb-1">{feature.label}</h3>
            <p className="font-sans text-sm text-text-muted leading-snug">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
