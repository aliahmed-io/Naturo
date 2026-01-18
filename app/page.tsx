import ScrollSequence from "@/components/ScrollSequence";
import ProductSection from "@/components/ProductSection";
import Ritual from "@/components/Ritual";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <ScrollSequence />

      <ProductSection />
      <Ritual />
      <Testimonials />
      <FAQ />

      {/* Footer */}
      <footer className="w-full bg-[#1B3022] text-[#E5D3B3] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="font-serif text-2xl block mb-6">Naturo</span>
            <p className="font-sans text-sm opacity-60 leading-relaxed max-w-xs">
              Potency by Nature.<br />
              Science by Design.<br />
              Elevate your everyday ritual.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm tracking-widest uppercase mb-6 opacity-80">Explore</h4>
            <div className="flex flex-col gap-4 font-serif text-lg opacity-70">
              <a href="#" className="hover:opacity-100 transition-opacity">Apothecary</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Rituals</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Journal</a>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm tracking-widest uppercase mb-6 opacity-80">Company</h4>
            <div className="flex flex-col gap-4 font-serif text-lg opacity-70">
              <a href="#" className="hover:opacity-100 transition-opacity">Ethos</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Sustainability</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Whakapapa</a>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm tracking-widest uppercase mb-6 opacity-80">Support</h4>
            <div className="flex flex-col gap-4 font-serif text-lg opacity-70">
              <a href="#" className="hover:opacity-100 transition-opacity">FAQ</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Shipping</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Connect</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between font-sans text-xs opacity-40">
          <span>© 2026 Naturo Inc.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
