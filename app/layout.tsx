import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'BrightPath – Study with Nova',
  description: 'AI study mentor with a talking avatar for 4th–8th graders.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
