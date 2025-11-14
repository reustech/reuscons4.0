export default function LoginLeftPanel() {
  return (
    <div className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-16">
      <div className="text-white max-w-md text-center md:text-left">
        <h1 className="text-3xl md:text-8xl font-bold mb-4 leading-tight">
          Welcome<br />Back
        </h1>
        <p className="text-base font-light leading-relaxed mb-8 opacity-95">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point using.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center md:justify-start">
          <a
            href="#"
            className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f text-sm" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter text-sm" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-sm" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/70 text-white"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
}
