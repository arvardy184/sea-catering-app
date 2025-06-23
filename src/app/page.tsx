import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Contact />
    </main>
  );
}
