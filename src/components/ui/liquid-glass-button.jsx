import { cva } from "class-variance-authority";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:  "h-8 text-xs px-4",
        lg:  "h-10 px-6",
        xl:  "h-12 px-8",
        xxl: "h-14 px-10",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "xxl" },
  }
);

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter
          id="container-glass"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05"
            numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise"
            scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export function LiquidButton({ className, variant, size, children, ...props }) {
  return (
    <button
      className={cn("relative", liquidbuttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* Liquid glass shadow shell */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full transition-all"
        style={{
          boxShadow: [
            "0 0 6px rgba(0,0,0,0.03)",
            "0 2px 6px rgba(0,0,0,0.08)",
            "inset 3px 3px 0.5px -3px rgba(0,0,0,0.9)",
            "inset -3px -3px 0.5px -3px rgba(0,0,0,0.85)",
            "inset 1px 1px 1px -0.5px rgba(0,0,0,0.6)",
            "inset -1px -1px 1px -0.5px rgba(0,0,0,0.6)",
            "inset 0 0 6px 6px rgba(0,0,0,0.12)",
            "inset 0 0 2px 2px rgba(0,0,0,0.06)",
            "0 0 12px rgba(255,255,255,0.15)",
          ].join(","),
        }}
      />
      {/* Backdrop distortion layer */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      {/* Content */}
      <div className="pointer-events-none z-10 relative">{children}</div>
      <GlassFilter />
    </button>
  );
}
