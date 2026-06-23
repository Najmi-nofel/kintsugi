import gsap from "gsap";
import { useState } from "react";

const clayOption = [
  {
    id: "obsidian",
    hex: "#2C2A29",
    name: "Hitam Obsidian",
    label: "Obsidian",
    desc: "Keras & Gelap",
    dotBg: "bg-clay border border-white/10",
  },
  {
    id: "terracotta",
    hex: "#C68B59",
    name: "Terracotta",
    label: "Terracotta",
    desc: "Klasik Hangat",
    dotBg: "bg-[#C68B59]",
  },
  {
    id: "alabaster",
    hex: "#E5D3B3",
    name: "Alabaster",
    label: "Alabaster",
    desc: "Porselen Putih",
    dotBg: "bg-[#E5D3B3]",
  },
];

const metalOption = [
  {
    id: "emas",
    name: "Emas 24K",
    hex: "#D4AF37",
    bg: "bg-yellow-500",
    shadow: "shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    label: "Emas 24K",
    desc: "Emas Murni",
  },
  {
    id: "platinum",
    name: "Platinum",
    hex: "#E0E0E0",
    bg: "bg-gray-300",
    shadow: "shadow-[0_0_8px_rgba(200,200,200,0.5)]",
    label: "Platinum",
    desc: "Perak Dingin",
  },
  {
    id: "tembaga",
    name: "Tembaga Sakura",
    hex: "#B87333",
    bg: "bg-orange-700",
    shadow: "shadow-[0_0_8px_rgba(194,120,3,0.5)]",
    label: "Tembaga",
    desc: "Keemasan Merah",
  },
];

function Costumize() {
  const [, setClayColor] = useState("#2C2A29");
  const [, setInfillColor] = useState("#D4AF37");
  const [selectedColor, setSelectedColor] = useState("Hitam Obsidian");
  const [selectedMineral, setSelectedMineral] = useState("Emas 24K");

  const changeClay = (colorHex, name) => {
    setClayColor(colorHex);
    setSelectedColor(name);

    gsap.to("#clay-texture-base", {
      backgroundColor: colorHex,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const changeInfill = (colorHex, name) => {
    setInfillColor(colorHex);
    setSelectedMineral(name);

    gsap.to("#customizer-seam", {
      stroke: colorHex,
      duration: 0.5,
      ease: "power1.out",
    });

    gsap
      .timeline()
      .to("#customizer-seam", {
        strokeWidth: 8,
        filter: "drop-shadow(0 0 16px " + colorHex + ")",
        duration: 0.2,
      })
      .to("#customizer-seam", {
        strokeWidth: 4,
        filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))",
        duration: 0.3,
      });
  };

  return (
    <>
      <section className="min-h-screen bg-radial from-emerald-950/40 to-charcoal">
        <div className="flex flex-col items-center justify-center pt-5 md:pt-8 lg:pt-14 mb-5">
          <p className="head-title costumize-1">Bagian IV — Personal Galery</p>
          <h2 className="costumize-2">Rancang Filosofi Anda</h2>
          <p className="desc-title costumize-3">
            Setiap jiwa memiliki jenis retakan dan kemewahan pemulihan yang
            berbeda. Silakan sesuaikan jenis tanah liat dasar dan bahan pengisi
            kintsugi pilihan Anda.
          </p>
        </div>

        <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 mx-auto bg-charcoal/40 p-6 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative z-10">
          <div class="lg:col-span-7 flex flex-col items-center justify-center relative bg-black/60 rounded-2xl border border-white/5 py-12 px-6">
            <div class="relative w-64 h-80 flex items-center justify-center">
              <div
                id="clay-texture-base"
                class="absolute inset-0 bg-[#222] rounded-[100px_100px_90px_90px] transition-all duration-700 clay-shadow flex items-center justify-center overflow-hidden"
              >
                <div class="absolute inset-0 opacity-25 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')]"></div>
              </div>

              <svg
                class="absolute w-full h-full z-20 gold-glow pointer-events-none"
                viewBox="0 0 300 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="customizer-seam"
                  d="M150 60 L140 150 L180 210 L120 280 L150 340 M140 150 L100 180 M120 280 L170 300"
                  stroke="#D4AF37"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <div class="absolute top-0 left-12 w-6 h-full bg-white/5 blur-md transform -skew-x-12 pointer-events-none"></div>
            </div>

            <span class="mt-6 text-[10px] tracking-widest text-gray-500 uppercase flex items-center gap-2">
              <span class="animate-pulse block w-2 h-2 rounded-full bg-main"></span>{" "}
              Visualisasi (Simulasi)
            </span>
          </div>

          <div class="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span class="text-xs uppercase tracking-widest text-main font-semibold mb-3 block">
                1. Pilih Jenis Tanah Liat
              </span>
              <div class="grid grid-cols-3 gap-3">
                {clayOption.map((option) => {
                  const iActiveColor = selectedColor === option.name;

                  return (
                    <button
                      key={option.id}
                      onClick={() => changeClay(option.hex, option.name)}
                      className={`clay-btn bg-charcoal text-white rounded-xl p-3 text-left transition duration-300 hover:border-main/70 ${iActiveColor ? "border-2 border-main" : "border border-white/10"}`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full ${option.dotBg} mb-2`}
                      ></span>
                      <span className={`text-xs font-semibold block`}>
                        {option.label}
                      </span>
                      <span className={`text-[9px] text-gray-400 block`}>
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Infill Metal Selection */}
            <div>
              <span class="text-xs uppercase tracking-widest text-main font-semibold mb-3 block">
                2. Logam Pengisi (Kintsugi)
              </span>
              <div class="grid grid-cols-3 gap-3">
                {metalOption.map((option) => {
                  const isMetalActive = selectedMineral === option.name;

                  return (
                    <button
                      key={option.id}
                      onClick={() => changeInfill(option.hex, option.name)}
                      className={`infill-btn bg-charcoal text-white rounded-xl p-3 text-left transition duration-300 hover:border-main/70 ${isMetalActive ? "border-2 border-main" : "border border-white/10"}`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full ${option.bg} mb-2 ${option.shadow}`}
                      ></span>
                      <span className="text-xs font-semibold block">
                        {option.label}
                      </span>
                      <span className="text-[9px] text-gray-400 block">
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div class="pt-6 border-t border-white/5 flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-[10px] text-gray-400 uppercase tracking-widest">
                    Kombinasi Terpilih
                  </span>
                  <div class="text-sm font-serif text-white mt-0.5">
                    <span id="label-clay">{selectedColor}</span> x{" "}
                    <span id="label-infill" class="text-main">
                      {selectedMineral}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-[10px] text-gray-400 uppercase tracking-widest">
                    Estimasi Harga
                  </span>
                  <div class="text-lg font-serif text-main font-bold">
                    Rp 3.200.000
                  </div>
                </div>
              </div>
              <button
                onclick="orderShareMock()"
                class="w-full bg-main hover:bg-secondary text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-xl transition duration-500 ease-in-out cursor-pointer"
              >
                Ambil Hasil Kustomisasi Ini
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Costumize;
