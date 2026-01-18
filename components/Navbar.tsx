import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between text-black">
            {/* We use mix-blend-difference to ensure visibility against changing backgrounds, 
            but for the specific glassmorphism requested on beige background, we might want standard colors. 
            Reverting to standard colors with blur as requested. */}

            <div className="absolute inset-0 bg-[#E5D3B3]/10 backdrop-blur-md border-b border-white/10" />

            <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-black">
                    Naturo
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-black">
                    <Link href="#apothecary" className="hover:opacity-70 transition-opacity">Apothecary</Link>
                    <Link href="#ethos" className="hover:opacity-70 transition-opacity">Ethos</Link>
                    <Link href="#rituals" className="hover:opacity-70 transition-opacity">Rituals</Link>
                    <Link href="#journal" className="hover:opacity-70 transition-opacity">Journal</Link>
                </div>

                {/* CTA */}
                <button className="bg-[#1B3022] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1B3022]/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#1B3022]/20">
                    Buy Now
                </button>
            </div>
        </nav>
    );
}
