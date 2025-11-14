import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function LoginLeftPanel() {
  return (
    <div className="text-white text-center max-w-md mx-auto relative z-10">
      {/* Subtitle */}
      <h3 className="text-sm font-light tracking-widest uppercase mb-4 opacity-70">
        Welcome Back
      </h3>

      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Welcome<br />Back
      </h1>

      {/* Description */}
      <p className="text-base font-light leading-relaxed mb-8 opacity-90">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point using.
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 items-center mt-12">
        <a
          href="#"
          className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/60"
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/60"
          aria-label="Twitter"
        >
          <Twitter size={20} />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/60"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/60"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
      </div>
    </div>
  );
}
