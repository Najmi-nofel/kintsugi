import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  useGSAP(() => {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.set("#frag-left", { x: -80, y: -40, rotation: -12, opacity: 0.8 });
    gsap.set("#frag-right", { x: 80, y: 20, rotation: 8, opacity: 0.8 });
    gsap.set("#frag-center", { y: 60, scale: 0.9, opacity: 0.8 });

    const seamLine = document.getElementById("gold-seam");
    const seamLength = seamLine.getTotalLength();
    gsap.set(seamLine, {
      strokeDasharray: seamLength,
      strokeDashoffset: seamLength,
    });

    // Build hero timeline animation
    heroTl
      // 1. Move the cracked pieces back together
      .to(
        "#frag-left",
        { x: 0, y: 0, rotation: 0, opacity: 1, ease: "power2.out" },
        0,
      )
      .to(
        "#frag-right",
        { x: 0, y: 0, rotation: 0, opacity: 1, ease: "power2.out" },
        0,
      )
      .to("#frag-center", { y: 0, scale: 1, opacity: 1, ease: "power2.out" }, 0)
      // 2. Draw/animate the golden seam lines as they fuse
      .to(seamLine, { strokeDashoffset: 0, ease: "sine.inOut" }, 0.5)
      // 3. Pulse glow the core from inside
      .to(
        "#gold-core-glow",
        {
          scale: 1.5,
          opacity: 0.6,
          backgroundColor: "rgba(212, 175, 55, 0.25)",
        },
        0.7,
      );
  }, []);

  return (
    <section id="hero" className="h-screen overflow-hidden">
      <div
        id="philosophy"
        className="px-16 flex flex-col md:flex-row gap-6 items-center h-full w-full"
      >
        <div className="flex-1">
          <p>Bagian I — Keindahan dalam Luka</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Menerima <br />{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary via-main to-yellow-600">
              Retakan Takdir
            </span>
          </h1>
          <p>
            Setiap pecahan memiliki sejarahnya sendiri. Kami merajut kembali
            kisah yang runtuh, melapisinya dengan kilau emas murni untuk
            membuktikan bahwa yang pernah terluka bisa tampil jauh lebih
            berharga.
          </p>
          <span className="animate-bounce text-main text-xl mx-auto mt-5 border rounded-full h-9 w-9 flex justify-center">
            ↓
          </span>
        </div>

        {/* hero animation */}

        <div className="w-full md:w-1/2 flex flex-1 items-center justify-center relative min-h-25 ">
          <div className="relative w-80 h-96 flex items-center justify-center">
            {/* Broken Pieces Container */}
            <div id="pottery-container" className="relative w-full h-full">
              {/*  Fragment 1 (Left Wing)  */}
              <svg
                id="frag-left"
                className="absolute w-full h-full transition-transform"
                viewBox="0 0 300 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M150 50 C110 50 80 120 70 200 C60 280 85 330 115 350 L150 250 L110 180 L150 140 Z"
                  fill="#201f1e"
                  stroke="#111"
                  strokeWidth="2"
                />

                <path
                  d="M110 180 L150 140 L150 50 C130 50 110 80 100 130 Z"
                  fill="#171615"
                />
              </svg>

              {/* Fragment 2 (Right Wing) */}
              <svg
                id="frag-right"
                className="absolute w-full h-full transition-transform"
                viewBox="0 0 300 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M150 50 C190 50 220 120 230 200 C240 280 215 330 185 350 L150 250 L190 180 L150 140 Z"
                  fill="#2c2a29"
                  stroke="#111"
                  strokeWidth="2"
                />

                <path
                  d="M190 180 L150 140 L150 50 C170 50 190 80 200 130 Z"
                  fill="#22201f"
                />
              </svg>

              {/* Fragment 3 (Center Lower Base) */}
              <svg
                id="frag-center"
                className="absolute w-full h-full transition-transform"
                viewBox="0 0 300 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M150 250 L115 350 C125 355 137 358 150 358 C163 358 175 355 185 350 Z"
                  fill="#3a3836"
                  stroke="#111"
                  strokeWidth="2"
                />
              </svg>

              {/* Golden Crack Lines (initially invisible, reveals on scroll) */}
              <svg
                className="absolute w-full h-full z-10 pointer-events-none gold-glow"
                viewBox="0 0 300 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Golden Seam Line */}
                <path
                  id="gold-seam"
                  d="M150 50 L150 140 L110 180 L150 250 L185 350 M150 140 L190 180 L150 250 L115 350"
                  stroke="url(#goldGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <defs>
                  <linearGradient
                    id="goldGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFF3CD" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#AA7C11" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Ambient Glowing Core inside vase */}
            <div
              id="gold-core-glow"
              className="absolute w-32 h-32 rounded-full bg-main/20 blur-2xl pointer-events-none"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
