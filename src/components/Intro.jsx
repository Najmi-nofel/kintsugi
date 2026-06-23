import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function Intro() {
  const introSectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const spliText = new SplitType(textRef.current, { types: "words" });

      gsap.set(spliText.words, {
        opacity: 0,
        scale: 0.3,
        rotate: 6,
        display: "inline-block",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(spliText.words, {
        opacity: 1,
        scale: 1,
        stagger: 0.8,
        rotate: 0,
        ease: "bounce.in",
        duration: 5,
      });
    },
    { scope: introSectionRef },
  );
  return (
    <>
      <section ref={introSectionRef} id="about" className="h-auto">
        <div className="flex flex-col items-center justify-center overflow-hidden mt-5 md:mt-8 lg:mt-14">
          <p
            ref={textRef}
            className="desc-title font-semibold px-6 md:px-0 md:text-xl md:max-w-4xl text-justify"
          >
            Kintsugi is the ancient Japanese art of repairing broken pottery
            with lacquer dusted with powdered gold, silver, or platinum. Rather
            than hiding cracks, this philosophy treats breakage and repair as a
            beautiful, essential part of an object’s history—teaching us to
            embrace flaws and find resilience in imperfection. In a world that
            demands perfection, Kintsugi reminds us that our scars are not
            things to be hidden, but gold-filled lines of strength and history.
          </p>
        </div>
      </section>
    </>
  );
}

export default Intro;
