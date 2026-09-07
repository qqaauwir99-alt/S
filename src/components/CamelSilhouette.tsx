import React from 'react';

export const CamelSilhouette: React.FC<{ className?: string }> = ({ className = 'w-48 h-48 text-[#C5A96A]' }) => {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="رسم ظلي أصيل لناقة عربية أصيلة"
    >
      {/* Refined silhouette of a noble, high-crested Arabian riding camel (ناقة عربية نجيبة) */}
      <path
        d="M 330 75
           C 335 70, 342 68, 348 70
           C 353 72, 355 78, 350 82
           C 344 86, 335 88, 330 95
           C 324 103, 318 118, 316 130
           C 313 145, 315 160, 305 175
           C 298 185, 285 190, 275 195
           C 270 175, 260 140, 235 130
           C 210 120, 190 145, 180 170
           C 165 172, 145 178, 130 190
           C 125 185, 115 188, 105 195
           C 95 180, 85 200, 88 220
           L 82 270
           C 80 280, 75 285, 78 288
           C 82 290, 88 285, 92 275
           L 102 225
           C 112 225, 125 220, 130 215
           L 136 270
           C 137 282, 134 287, 138 290
           C 142 292, 148 285, 150 275
           L 155 210
           C 175 205, 210 205, 235 210
           L 242 270
           C 243 282, 240 287, 245 290
           C 249 292, 255 285, 258 275
           L 262 215
           C 275 212, 285 205, 290 195
           L 295 270
           C 296 282, 292 287, 298 290
           C 302 292, 308 285, 310 275
           L 315 190
           C 325 175, 330 155, 332 140
           C 336 125, 342 105, 350 95
           C 358 85, 362 75, 355 68
           C 345 60, 330 65, 320 70
           Z"
        opacity="0.9"
      />
      {/* Ground horizon / sand curve */}
      <path
        d="M 40 288 Q 200 280, 360 288"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
};
