import './globals.css';
import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import Header from '../components/layout/Header';

const barlow = Barlow({ weight: '600', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hôm nay ăn gì',
  description: 'Ứng dụng hôm nay ăn gì',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={barlow.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex h-screen flex-col'>
            <Header />
            <main className='flex-1 overflow-auto'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
