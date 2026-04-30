import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function IgSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" width={28} height={28} className="text-white">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WaSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={28} height={28} className="text-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_ITEMS = [
  {
    id: 'ig',
    label: 'Instagram',
    hoverBg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
    hoverShadow: '0 0 22px rgba(225,48,108,0.65)',
    Icon: IgSvg,
  },
  {
    id: 'wa',
    label: 'WhatsApp',
    hoverBg: '#25D366',
    hoverShadow: '0 0 22px rgba(37,211,102,0.65)',
    Icon: WaSvg,
  },
  {
    id: 'email',
    label: 'Email',
    hoverBg: '#fe2d2d',
    hoverShadow: '0 0 22px rgba(254,45,45,0.65)',
    Icon: () => <Mail size={28} className="text-white" strokeWidth={1.5} />,
  },
  {
    id: 'phone',
    label: 'Phone',
    hoverBg: '#2D8CF0',
    hoverShadow: '0 0 22px rgba(45,140,240,0.65)',
    Icon: () => <Phone size={28} className="text-white" strokeWidth={1.5} />,
  },
];

export function SocialConnect({ email, phone, instagram, whatsapp, location }) {
  const [hovered, setHovered] = useState(null);
  const [shaking, setShaking] = useState(null);

  const hrefs = { ig: instagram, wa: whatsapp, email: `mailto:${email}`, phone: `tel:${phone}` };

  const handleEnter = (id) => {
    setHovered(id);
    setShaking(id);
    setTimeout(() => setShaking(null), 500);
  };

  return (
    <div
      className="rounded-3xl p-8 border border-white/10 backdrop-blur-xl"
      style={{
        background: 'rgba(13,13,13,0.8)',
        boxShadow: '0 0 48px rgba(254,45,45,0.18), 0 0 80px rgba(196,16,16,0.1)',
      }}
    >
      <div className="flex flex-wrap justify-center gap-8">
        {SOCIAL_ITEMS.map(({ id, label, hoverBg, hoverShadow, Icon }) => {
          const isHov = hovered === id;
          const isShaking = shaking === id;
          return (
            <a
              key={id}
              href={hrefs[id]}
              target={id === 'ig' || id === 'wa' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center no-underline"
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => handleEnter(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full border border-white/10 relative overflow-hidden"
                style={{
                  background: isHov ? hoverBg : 'rgba(255,255,255,0.05)',
                  boxShadow: isHov ? `${hoverShadow}, 0 8px 32px rgba(0,0,0,0.3)` : '0 8px 32px rgba(0,0,0,0.3)',
                  transform: isHov ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ animation: isShaking ? 'socialShake 0.5s' : 'none' }}>
                  <Icon />
                </span>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
                    opacity: isHov ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                />
              </div>
              <span
                className="mt-3 text-white text-sm font-medium"
                style={{
                  opacity: isHov ? 1 : 0.6,
                  transform: isHov ? 'translateY(5px)' : 'translateY(0)',
                  transition: 'all 0.3s ease',
                }}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>

      {location && (
        <div className="mt-7 flex items-center justify-center gap-2 text-sm" style={{ color: '#555' }}>
          <MapPin size={14} />
          <span>{location}</span>
        </div>
      )}
    </div>
  );
}
