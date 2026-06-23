import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Logs, Plus, ShoppingCart } from "lucide-react";
import { useRef, useState } from "react";
import giftVideo from "../assets/gift.webm";

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const iconConteinerRef = useRef();

  const lastScrollTop = useRef(0);

  const accumlatedScroll = useRef(0);

  useGSAP(() => {
    gsap.from("header", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
    });

    gsap.to("header", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const currentScroll = self.scroll();
          const delta = currentScroll - lastScrollTop.current;

          if (self.direction === 1) {
            accumlatedScroll.current += delta;

            if (accumlatedScroll.current > 60) {
              gsap.to("header", {
                yPercent: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          } else {
            accumlatedScroll.current = 0;
            gsap.to("header", {
              opacity: 1,
              yPercent: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          lastScrollTop.current = currentScroll;
        },
      },
    });
  }, []);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(".icon-log", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(".icon-plus", {
        scale: 1,
        opacity: 1,
        rotation: 45,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(".icon-log", {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(".icon-plus", {
        rotation: 0,
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  const menuToggle = () => {
    setIsOpen(!isOpen);
  };

  const menuBar = [
    "philosophy",
    "process",
    "collection",
    "customization",
    "contact",
  ];

  return (
    <>
      {isOpen && (
        // blur background
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/10 backdrop-blur-xs z-9 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <header className="sticky top-0 bg-slate-900 z-100 w-full lg:w-3/4 lg:mx-auto shadow shadow-gray-700 p-3 rounded-b-2xl flex justify-between items-center">
        <div>Logo</div>

        {/* Desktop Menu Bar */}
        <div className="hidden md:block">
          <ul className="flex text-md font-semibold">
            {menuBar.map((e) => (
              <li key={e}>
                <a
                  className="bg-hover px-3 py-2 rounded-lg capitalize"
                  href={`#${e}`}
                >
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Gift */}
        <div className="hidden lg:flex gap-2 items-center">
          <div className="p-1 rounded bg-hover cursor-pointer">
            <ShoppingCart size={24} />
          </div>
          <div className="text-lg font-semibold hidden lg:flex lg:gap-2 lg:w-24 px-2  bg-slate-700 rounded lg:items-center cursor-pointer hover:bg-slate-800">
            Gift{" "}
            <video
              src={giftVideo}
              className="w-10 h-10 object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        {/* Menu Mobile */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="p-1 rounded bg-hover cursor-pointer">
            <ShoppingCart size={24} />
          </div>
          <video
            src="src/assets/gift.webm"
            className="w-10 h-10 object-contain hidden md:block lg:hidden"
            autoPlay
            loop
            muted
            playsInline
          />
          <div
            className="relative border z-10 p-1 rounded bg-hover cursor-pointer w-9 h-9 md:hidden flex items-center justify-center overflow-hidden"
            onClick={menuToggle}
            ref={iconConteinerRef}
          >
            {/* set menu toggle icon (default:Logs) */}
            <div className="icon-log absolute flex items-center justify-center ">
              <Logs size={24} />
            </div>

            <div className="icon-plus absolute opacity-0 scale-0 flex items-center justify-center ">
              <Plus size={24} />
            </div>
          </div>
        </div>

        {isOpen && (
          <>
            <div className="fixed top-full right-4 left-4 md:hidden border border-secondary rounded z-10 bg-slate-900">
              <ul className="flex flex-col text-md font-semibold gap-3">
                {menuBar.map((element) => (
                  <li key={element}>
                    <a
                      onClick={() => setIsOpen(false)}
                      className="block bg-hover px-4 py-3 rounded-xl hover:bg-slate-700 capitalize"
                      href={`#${element}`}
                    >
                      {element}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
