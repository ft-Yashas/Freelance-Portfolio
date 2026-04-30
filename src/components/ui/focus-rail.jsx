import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = { type: 'spring', stiffness: 300, damping: 30, mass: 1 };
const TAP_SPRING  = { type: 'spring', stiffness: 450, damping: 18, mass: 1 };

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}) {
  const [active, setActive]         = useState(initialIndex);
  const [isHovering, setIsHovering] = useState(false);
  const [xStep, setXStep]           = useState(450);
  const lastWheelTime               = useRef(0);

  const count       = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem  = items[activeIndex];

  // Responsive card x-spacing based on landscape card width
  useEffect(() => {
    const update = () => setXStep(window.innerWidth < 768 ? 300 : 460);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handlePrev = useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  const onWheel = useCallback((e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 20) {
      delta > 0 ? handleNext() : handlePrev();
      lastWheelTime.current = now;
    }
  }, [handleNext, handlePrev]);

  useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const onDragEnd = (_e, { offset, velocity }) => {
    const power = Math.abs(offset.x) * velocity.x;
    if (power < -10000) handleNext();
    else if (power > 10000) handlePrev();
  };

  return (
    <div
      className={cn(
        'group relative flex w-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none',
        className
      )}
      style={{ minHeight: '640px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Dynamic blurred ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center gap-10 py-12">

        {/* ── Rail row: [← arrow] [3-D landscape cards] [→ arrow] ── */}
        <div className="relative flex w-full items-center">

          {/* Left arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-4 md:left-8 z-30 flex items-center justify-center w-14 h-14 rounded-full border border-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fe2d2d'; e.currentTarget.style.borderColor = '#fe2d2d'; e.currentTarget.style.boxShadow = '0 0 20px rgba(254,45,45,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* 3-D landscape rail */}
          <motion.div
            className="relative mx-auto flex w-full max-w-6xl items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: '1200px', height: '290px' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            {[-2, -1, 0, 1, 2].map((offset) => {
              const absIndex = active + offset;
              const index    = wrap(0, count, absIndex);
              const item     = items[index];

              if (!loop && (absIndex < 0 || absIndex >= count)) return null;

              const isCenter  = offset === 0;
              const dist      = Math.abs(offset);
              const opacity   = isCenter ? 1 : Math.max(0.08, 1 - dist * 0.52);

              return (
                <motion.div
                  key={absIndex}
                  className={cn(
                    'absolute rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl overflow-hidden',
                    isCenter ? 'z-20' : 'z-10'
                  )}
                  style={{
                    /* landscape: 16:9 */
                    width: '420px',
                    height: '236px',
                    transformStyle: 'preserve-3d',
                  }}
                  initial={false}
                  animate={{
                    x:       offset * xStep,
                    z:       -dist * 160,
                    scale:   isCenter ? 1 : 0.80,
                    rotateY: offset * -18,
                    opacity,
                    filter:  `blur(${isCenter ? 0 : dist * 5}px) brightness(${isCenter ? 1 : 0.42})`,
                  }}
                  transition={{ scale: TAP_SPRING, default: BASE_SPRING }}
                  onClick={() => { if (offset !== 0) setActive((p) => p + offset); }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                  {/* subtle top sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-4 md:right-8 z-30 flex items-center justify-center w-14 h-14 rounded-full border border-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fe2d2d'; e.currentTarget.style.borderColor = '#fe2d2d'; e.currentTarget.style.boxShadow = '0 0 20px rgba(254,45,45,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>

        {/* ── Project info + big Explore button ── */}
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 px-16 md:flex-row">

          {/* Text */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                exit={  { opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: '#fe2d2d', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-lg leading-relaxed" style={{ color: '#888' }}>
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Large Explore button — stable mount, href updates silently */}
          {activeItem.href && (
            <a
              href={activeItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center gap-3 rounded-xl text-white transition-all hover:-translate-y-1 active:scale-95"
              style={{
                background: '#fe2d2d',
                boxShadow: '0 8px 32px rgba(254,45,45,0.4)',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: '1.2rem',
                padding: '22px 52px',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 52px rgba(254,45,45,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(254,45,45,0.4)'; }}
            >
              Explore
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={24}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
