'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Inicio', icon: HomeIcon },
  { href: '/explore', label: 'Explorar', icon: SearchIcon },
  { href: '/store', label: 'En tienda', icon: StoreIcon },
  { href: '/ai-stylist', label: 'AI Dress', icon: AiIcon },
  { href: '/cesta', label: 'Cesta', icon: BagIcon },
  { href: '/profile', label: 'Cuenta', icon: UserIcon },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t shadow-sm">
      <ul className="flex justify-around items-center py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link href={href}>
                <div className="flex flex-col items-center text-xs">
                  <Icon active={isActive} />
                  <span className={isActive ? 'text-black font-semibold' : 'text-gray-500'}>
                    {label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }) {
  return (
    <svg width="25" height="24" viewBox="0 0 24 24">
      <polygon points="4,12 4,6 20,12 4,18" fill={active ? 'green' : 'none'} stroke="black" />
    </svg>
  );
}

function SearchIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="10" cy="10" r="6" stroke="black" fill="none" />
      <line x1="14" y1="14" x2="20" y2="20" stroke="black" />
      <line x1="13" y1="10" x2="20" y2="10" stroke="black" />
    </svg>
  );
}

function StoreIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="6" y="8" width="12" height="12" stroke="black" fill="none" />
      <polygon points="10,8 10,4 14,4 14,8" fill={active ? 'green' : 'none'} stroke="black" />
    </svg>
  );
}

function AiIcon({ active }) {
  const color = active ? 'green' : 'green';

  return (
    <svg width="28" height="28" viewBox="0 0 32 32">
      {/* Triángulo más grande (A) */}
      <polygon
        points="8,24 16,6 24,24"
        fill={color}
      />
      {/* Barra vertical (I), separada */}
      <rect
        x="26"
        y="6"
        width="5"
        height="18"
        fill={color}
      />
    </svg>
  );
}



function BagIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="6" y="8" width="12" height="12" stroke="black" fill="none" />
      <line x1="9" y1="8" x2="9" y2="4" stroke="black" />
      <line x1="15" y1="8" x2="15" y2="4" stroke="black" />
    </svg>
  );
}

function UserIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="2" stroke="black" fill="none" />
      <path d="M8 18c1-3 7-3 8 0" stroke="black" fill="none" />
    </svg>
  );
}
