function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const variants = {
  default: 'bg-[#fe2d2d] text-white border-transparent',
  secondary: 'bg-[rgba(255,255,255,0.08)] text-[#f0f0f0] border-transparent',
  outline: 'text-[#f0f0f0] border-[#1e1e1e]',
  destructive: 'bg-red-600 text-white border-transparent',
};

function Badge({ className, variant = 'secondary', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant] ?? variants.secondary,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
