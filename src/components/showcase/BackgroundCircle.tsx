import React, { forwardRef } from "react";

const BackgroundCircle = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] pointer-events-none flex items-center justify-center z-0">
      <div 
        ref={ref}
        className="w-[120%] aspect-square rounded-full border border-black/5 opacity-0 will-change-transform"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-3xl opacity-50" />
      </div>
    </div>
  );
});

BackgroundCircle.displayName = "BackgroundCircle";

export default BackgroundCircle;
