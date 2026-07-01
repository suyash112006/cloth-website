"use client";
import { Thumbnail } from "./CategoryShowcase";

interface ThumbnailSwitcherProps {
  thumbnails: Thumbnail[];
  active: number;
  onSelect: (index: number) => void;
  thumbnailRefs?: React.MutableRefObject<HTMLElement[]>;
}

export default function ThumbnailSwitcher({ thumbnails, active, onSelect, thumbnailRefs }: ThumbnailSwitcherProps) {
  
  const setRef = (el: HTMLElement | null) => {
    if (el && thumbnailRefs && !thumbnailRefs.current.includes(el)) {
      thumbnailRefs.current.push(el);
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 overflow-x-auto w-full max-w-full pt-4 pb-4 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {thumbnails.map((thumb, idx) => {
        const isActive = active === idx;
        return (
          <button
            key={thumb.id}
            ref={setRef}
            onClick={() => onSelect(idx)}
            aria-label={`Select look ${thumb.look}`}
            aria-pressed={isActive}
            className={`flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-primary/15 transition-all duration-300 relative border snap-center ${
              isActive ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            {/* Thumbnail Placeholder */}
            <div className="absolute inset-2 bg-primary/20 rounded-lg pointer-events-none" />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-text-muted">
              {thumb.look}
            </span>
          </button>
        );
      })}
    </div>
  );
}
