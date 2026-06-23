import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";

import { Model as KintsugiBowl } from "./Kintsugi.jsx";
import { Model as KintsugiCup } from "./Kintsugi_cup_of_coffee.jsx";
import { Model as KintsugiHeart } from "./Kintsugi_heart.jsx";

gsap.registerPlugin(ScrollTrigger);

// canvas component
const RotateGroup = ({ children }) => {
  const localRef = useRef(null);
  useFrame((state, delta) => {
    if (localRef.current) {
      localRef.current.rotation.y += 0.2 * delta;
    }
  });
  return <group ref={localRef}>{children}</group>;
};
const CanvasAsset = ({ children }) => {
  return (
    <div className="w-full h-36 md:h-100">
      <Canvas
        gl={{ alpha: true }}
        camera={{ position: [0, 1.5, 5.5], fov: 45 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, 5, -5]} intensity={1} />

        <Center>
          <RotateGroup>{children}</RotateGroup>
        </Center>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

function About() {
  const aboutSesctionRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSesctionRef.current,
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1,
          // pin: true,
          // anticipatePin: 1,
        },
      });

      const media = gsap.matchMedia();
      // if not in mobile
      media.add("(min-width: 769px)", () => {
        tl.to(
          ".kintsugi-card",

          {
            opacity: 1,
            y: (i) => {
              if (i === 0) return 40;
              if (i === 1) return -40;
              if (i === 2) return 80;
            },
            duration: 2.5,
            ease: "bounce.out",
            stagger: 0.6,
          },
        );
      });
      // if in mobile
      media.add("(max-width: 768px)", () => {
        tl.to(".kintsugi-card", {
          opacity: 1,
          y: 5,
          duration: 2.5,
          ease: "bounce.out",
          stagger: 0.6,
        });
      });

      tl.to({}, { duration: 4 });
    },
    { scope: aboutSesctionRef },
  );
  return (
    <>
      <section ref={aboutSesctionRef} id="assets">
        <div
          ref={canvasContainerRef}
          className=" w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:mt-16 items-center justify-center relative z-50"
        >
          {/* Bowl */}
          <div className="kintsugi-card w-full flex items-center justify-center">
            <div id="asset-bowl" className="w-full flex items-center">
              <CanvasAsset>
                <KintsugiBowl scale={1.2} rotation={[0.1, 0.1, -0.5]} />
              </CanvasAsset>
            </div>
          </div>

          {/* Coffe Cup */}
          <div className="kintsugi-card w-full flex items-center justify-center">
            <div id="asset-coffe" className="w-full flex">
              <CanvasAsset>
                <KintsugiCup scale={0.8} rotation={[0.5, 0.1, -0.5]} />
              </CanvasAsset>
            </div>
          </div>

          {/* Heart */}
          <div className="kintsugi-card w-full flex items-center justify-center">
            <div id="asset-heart" className="w-full flex">
              <CanvasAsset>
                <KintsugiHeart scale={1.2} rotation={[0.2, 0.1, -0.2]} />
              </CanvasAsset>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
