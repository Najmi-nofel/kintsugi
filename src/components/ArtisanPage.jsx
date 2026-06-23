import About from "./About";
import Catalog from "./Catalog";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Intro from "./Intro";

gsap.registerPlugin(ScrollTrigger);

function ArtisanPage() {
  useGSAP(() => {
    const pairs = [
      { source: "#asset-bowl", target: "#target-bowl" },
      { source: "#asset-coffe", target: "#target-coffe" },
      { source: "#asset-heart", target: "#target-heart" },
    ];

    const tlFly = gsap.timeline({
      scrollTrigger: {
        trigger: ".catalog",
        start: "top bottom",
        end: "top 10%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    pairs.forEach((pair) => {
      tlFly.to(
        pair.source,
        {
          x: () => {
            const source = document.querySelector(pair.source);
            const target = document.querySelector(pair.target);
            if (!source || !target) return 0;
            const sRect = source.getBoundingClientRect();
            const tRect = target.getBoundingClientRect();
            return (
              tRect.left + tRect.width / 2 - (sRect.left + sRect.width / 2)
            );
          },
          y: () => {
            const source = document.querySelector(pair.source);
            const target = document.querySelector(pair.target);
            if (!source || !target) return 0;
            const sRect = source.getBoundingClientRect();
            const tRect = target.getBoundingClientRect();

            return (
              tRect.top + tRect.height / 2 - (sRect.top + sRect.height / 2)
            );
          },
          scale: 0.8,
          ease: "power1.inOut",
        },
        0,
      );
    });
  });

  return (
    <div className="relative w-full overflow-hidden">
      <Intro />
      <About />
      <Catalog />
    </div>
  );
}

export default ArtisanPage;
