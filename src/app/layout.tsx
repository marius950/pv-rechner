import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PV-Rechner – effi',
  description: 'Dein persönlicher PV-Potenzialrechner von effi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `if(localStorage.getItem('effi-theme')==='light')document.documentElement.classList.add('light')` }}/>
      </head>
      <body>{children}</body>
    </html>
  );
}
