/**
 * Decorative SVG icons — designed to feel romantic & handcrafted
 * (vs. generic Lucide outlines). Each accepts className for sizing/coloring.
 */

interface IconProps {
  className?: string;
}

/** Ornate heart with soft inner gradient + tiny shine highlight */
export const OrnateHeart = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="heart-grad" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
        <stop offset="60%" stopColor="currentColor" stopOpacity="0.7" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
      </radialGradient>
    </defs>
    <path
      d="M16 27.5C13.5 25.5 4 19 4 11.5C4 7.4 7.1 4.5 10.8 4.5C13 4.5 14.9 5.7 16 7.5C17.1 5.7 19 4.5 21.2 4.5C24.9 4.5 28 7.4 28 11.5C28 19 18.5 25.5 16 27.5Z"
      fill="url(#heart-grad)"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    {/* Shine highlight */}
    <ellipse cx="11.5" cy="10" rx="2.2" ry="1.4" fill="white" opacity="0.4" transform="rotate(-30 11.5 10)" />
  </svg>
);

/** Replay icon — clock with arrow + sparkle, "from the beginning" feel */
export const ReplayOrnate = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer arc */}
    <path
      d="M5 12C5 8 8 5 12 5C15 5 17.5 6.7 18.7 9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M19 12C19 16 16 19 12 19C9 19 6.5 17.3 5.3 15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.55"
    />
    {/* Arrowhead */}
    <path
      d="M19 5L19 9L15 9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tiny sparkle */}
    <path
      d="M12 11L12 13M11 12L13 12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

/** Decorative sparkle/star (4-pointed) */
export const Sparkle4 = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
);

/** Pause icon stylized */
export const PauseSoft = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="5" width="4" height="14" rx="2" />
    <rect x="14" y="5" width="4" height="14" rx="2" />
  </svg>
);

/** Play icon stylized (rounded triangle) */
export const PlaySoft = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.5C8 4.7 8.9 4.2 9.6 4.6L19 11.1C19.6 11.5 19.6 12.5 19 12.9L9.6 19.4C8.9 19.8 8 19.3 8 18.5V5.5Z" />
  </svg>
);

/** Music note ornate */
export const MusicOrnate = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 18V6L19 4V16"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse cx="6.5" cy="18" rx="2.5" ry="2" fill="currentColor" />
    <ellipse cx="16.5" cy="16" rx="2.5" ry="2" fill="currentColor" />
  </svg>
);

/** Close icon (delicate X) */
export const CloseDelicate = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 7L17 17M17 7L7 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" opacity="0.5" />
  </svg>
);

/** Chevron with elegant taper */
export const ChevronOrnate = ({ className, direction = "left" }: IconProps & { direction?: "left" | "right" | "down" }) => {
  const rotation = { left: 0, right: 180, down: -90 }[direction];
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotation}deg)` }}>
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="0.8" fill="currentColor" opacity="0.6" />
    </svg>
  );
};
