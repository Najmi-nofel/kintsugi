import { useMemo, useRef } from "react";
import { Card, Body, Tag, Title } from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

gsap.registerPlugin(ScrollTrigger);

function Process() {
  const processSectionRef = useRef(null);
  const glowLineRef = useRef("");
  const mainLineRef = useRef("");

  // setup crack
  const crackLine = {
    width: 500,
    height: 300,
    segments: 15,
    deviation: 25,
    seedModifier: 12,
  };

  const { width, height, segments, deviation, seedModifier } = crackLine;
  // making crack look realistic
  const pathData = useMemo(() => {
    let startX = 0;
    let startY = height / 2;
    let points = [`M ${startX} ${startY}`];
    const segmentWidth = width / segments;

    for (let i = 1; i <= segments; i++) {
      // 1. Hitung koordinat X dengan variasi jarak acak terstruktur
      // Kita gunakan (i + seedModifier) sebagai pengaman agar polanya unik
      const randomX = seededRandom(i * 123.45 + seedModifier);
      const x = i * segmentWidth - randomX * (segmentWidth * 0.3);

      // 2. Ambil posisi Y dari titik sebelumnya
      const prevY = points[i - 1]
        ? parseFloat(points[i - 1].split(" ")[2])
        : startY;

      // 3. Hitung pergeseran Y menggunakan seededRandom yang berbeda nilainya dari X
      const randomY = seededRandom(i * 678.9 + seedModifier);
      const y = prevY + (randomY - 0.5) * deviation;

      // 4. Batasi agar tidak keluar dari area SVG
      const clampedY = Math.max(15, Math.min(height - 15, y));

      points.push(`L ${x.toFixed(1)} ${clampedY.toFixed(1)}`);
    }

    return points.join(" ");
  }, [width, height, segments, deviation, seedModifier]);

  // gsap code
  useGSAP(
    () => {
      // animation setup
      const lines = [glowLineRef.current, mainLineRef.current];

      lines.forEach((line) => {
        if (line) {
          // get total length
          const length = line.getTotalLength();
          // hide line when first render
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        }
      });
      // animation flow
      // predict the media size
      const media = gsap.matchMedia();
      // if not in mobile
      media.add("(min-width: 769px)", () => {
        // creating timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        // title animation
        tl.from(".process-1, .process-2, .process-3", {
          opacity: 0,
          y: -45,
          stagger: 0.4,
          duration: 1,
        })
          // cracks animation
          .fromTo(
            lines,
            { opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 4,
              ease: "none",
            },
            "+=0.2",
          )
          // cards animation
          .fromTo(
            "#card-1",
            { opacity: 0, y: 100, x: -100, rotate: 120 },
            {
              opacity: 1,
              y: -90,
              x: -10,
              rotate: 20,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=3.2",
          )
          .fromTo(
            "#card-2",
            { opacity: 0, y: 110, x: 90, rotate: -160 },
            {
              opacity: 1,
              y: -110,
              x: -21,
              rotate: -16,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=2.0",
          )
          .from(
            "#card-3",
            { opacity: 0, y: 40, duration: 0.8, ease: "power2.out" },
            "-=0.8",
          );
      });

      // if media is mobile
      media.add("(max-width: 768px)", () => {
        // creating timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        // title animation
        tl.from(".process-1, .process-2, .process-3", {
          opacity: 0,
          y: -30,
          stagger: 0.3,
          duration: 1,
        })
          // cracks animation
          .fromTo(
            lines,
            { opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 9,
              ease: "none",
            },
            "startLine",
          );
        // cards animation
        // card 1 enter the viewport
        tl.to(
          "#card-1",
          {
            top: "0%",
            duration: 2,
            ease: "power2.out",
          },
          "startLine+=0.5",
        )
          .to(
            "#card-1",
            {
              y: -70,
              scale: 0.6,
              rotate: -4,
              duration: 1.8,
              ease: "power2.inOut",
            },
            "startLine+=3.0",
          )

          .to(
            "#card-2",
            {
              top: "0%",
              duration: 1.8,
              ease: "power2.out",
            },
            "<",
          )

          .set("#card-1", { zIndex: 10 }, "startLine+=4.0")
          .set("#card-2", { zIndex: 30 }, "startLine+=4.0")

          .to(
            "#card-1",
            {
              y: 20,
              scale: 0,
              rotate: 0,
              duration: 1,
              ease: "power2.out",
            },
            "startLine+=4.1",
          )

          .to(
            "#card-2",
            {
              y: -40,
              scale: 0.6,
              rotate: 4,
              duration: 1.8,
              ease: "power2.inOut",
            },
            "startLine+=6.0",
          )

          .to(
            "#card-3",
            {
              top: "0%",
              duration: 1.8,
              ease: "power2.out",
            },
            "startLine+=6.0",
          )

          .set("#card-2", { zIndex: 10 }, "startLine+=7.0")
          .set("#card-3", { zIndex: 30 }, "startLine+=7.0")
          .set("#card-1", { zIndex: 20 }, "startLine+=7.0")

          .to(
            "#card-2",
            {
              y: 20,
              scale: 0,
              rotate: 0,
              duration: 1,
              ease: "power2.out",
            },
            "startLine+=7.1",
          );
      });

      return () => media.revert();
    },
    { scope: processSectionRef },
  );

  return (
    <>
      <section
        id="process"
        ref={processSectionRef}
        className="bg-charcoal h-screen overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center overflow-hidden mt-5 md:mt-8 lg:mt-14">
          <p className="head-title process-1">Bagian II — Pengaliran Emas</p>
          <h2 className="process-2">Proses Menghormati Luka</h2>
          <p className="desc-title process-3">
            Kintsugi tidak menyembunyikan retakan, melainkan meneranginya dengan
            emas murni 24 karat. Gerakan gulir Anda di bawah ini secara perlahan
            melukiskan ketahanan baru pada permukaan keramik.
          </p>
        </div>

        {/* Crack SVG */}
        <div className="h-80 bg-linear-to-b from-transparent to-transparent via-white/20 flex items-center">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
          >
            {/* Glow Effect */}
            <path
              ref={glowLineRef}
              d={pathData}
              fill="none"
              stroke="#eab308"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.25"
              className="blur-[5px]"
            />

            {/* Main Crack Line */}
            <path
              ref={mainLineRef}
              d={pathData}
              fill="none"
              stroke="#fef08a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Card */}
        <div className="relative h-60 md:h-auto grid grid-cols-1 md:grid-cols-3 justify-items-center w-full gap-6.5 md:gap-6 px-6">
          <div
            id="card-1"
            className="absolute md:relative top-full md:top-0 w-full max-w-90 md:max-w-none z-10"
          >
            <Card>
              <Tag>Tahap 01</Tag>
              <Title>Membasuh Luka (Urusushi)</Title>
              <Body
                desc="Serpihan dibersihkan dan dipersatukan dengan getah pohon lacquer
              alami Jepang."
              >
                Serpihan dibersihkan dan dipersatukan dengan getah pohon lacquer
                alami Jepang.
              </Body>
            </Card>
          </div>

          <div
            id="card-2"
            className="absolute md:relative top-full md:top-0 w-full max-w-90 md:max-w-none z-20"
          >
            <Card>
              <Tag>Tahap 02</Tag>
              <Title>Menyisipkan Emas (Kintsugi)</Title>
              <Body
                desc="Garis retakan dilukis ulang dengan bubuk emas 24k cair murni lapis
              demi lapis."
              >
                Garis retakan dilukis ulang dengan bubuk emas 24k cair murni
                lapis demi lapis.
              </Body>
            </Card>
          </div>

          <div
            id="card-3"
            className="absolute md:relative top-full md:top-0 w-full max-w-90 md:max-w-none z-30"
          >
            <Card>
              <Tag>Tahap 03</Tag>
              <Title>Seni Penerimaan (Wabi-Sabi)</Title>
              <Body
                desc="Hasil akhir melambangkan kedewasaan, estetika, dan ketahanan hidup
              yang megah."
              >
                Hasil akhir melambangkan kedewasaan, estetika, dan ketahanan
                hidup yang megah.
              </Body>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default Process;
