import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Contact } from '@/components/sections/Contact';
import { Menu } from '@/components/sections/Menu';
import { Testimonials } from '@/components/sections/Testimonials';
import { Subscription } from '@/components/sections/Subscription';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Menu />
      <Testimonials />
      <Subscription />
      <Contact />
    </main>
  );
}
