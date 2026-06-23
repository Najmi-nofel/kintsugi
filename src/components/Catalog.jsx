import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

function Catalog() {
  useGSAP(() => {
    const split = new SplitText(".catalog-2, .catalog-1", { type: "chars" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".catalog",
        start: "top 50%",
        end: "bottom 90%",
        scrub: true,
        // pin: true,
        // anticipatePin: 1,
      },
    });

    tl.fromTo(
      ".cards",
      {
        opacity: 0,
        scale: 0.7,
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power3.out",
      },
    );

    tl.from(split.chars, {
      scale: 1.6,
      opacity: 0,
      stagger: 0.02,
      ease: "power3.out",
    });

    tl.fromTo(
      ".catalog-3",
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power3.out",
      },
    );

    return () => split.revert();
  }, []);
  return (
    <>
      <section className="catalog min-h-screen pb-2 bg-charcoal relative z-11 before:w-full before:h-20 before:absolute before:-top-10 before:left-0 before:bg-linear-to-b/decreasing before:from-[#ododod]/90 before:to-transparent before:via-[#ododod]/40 before:backdrop-blur-sm before:-z-20 before:content-['']">
        <div className="flex flex-col items-start justify-center w-full mt-5 md:mt-8 lg:mt-14 md:pl-6">
          <p className="head-title catalog-1">Bagian III — Arsyip Karya</p>
          <h2 className="catalog-2">Galeri "Reruntuhan Jiwa"</h2>
          <p className="desc-title catalog-3">
            Saksikan seri masterpiece kami yang didedikasikan untuk
            merepresentasikan perjalanan emosi terdalam manusia.
          </p>
        </div>

        <div className="product-cards grid md:grid-cols-3 md:px-6 md:gap-6 md:mt-5">
          {/* Product Cards */}
          {/* Bowl */}
          <div className="cards w-full">
            <div className="product-cards-1 box-border w-full bg-black/70 rounded-xl shadow-xl/70 shadow-white/5  md:py-3 md:px-2 relative border-[0.2px] border-transparent group hover:border-[0.2px] hover:border-main hover:-translate-y-1 transition-all duration-500">
              <span className="border-main border-[0.2px] px-3 py-1 rounded-full text-main absolute top-4 right-4 z-10 group-hover:animate-bounce group-hover:bg-white/5 group-hover:backdrop-blur-md">
                Collection 01
              </span>
              <div
                id="target-bowl"
                className="w-full mt-4 h-48 bg-radial from-white/40 to-black"
              ></div>
              <h3 className="py-3 font-bold text-xl group-hover:text-main">
                Kintsugi Bowl
              </h3>
              <p className="text-md text-justify group-hover:text-cream">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                debitis eaque cum saepe nihil voluptatem, tempore quas
                dignissimos, recusandae repellendus ipsam totam provident
                voluptatibus? Unde quibusdam ducimus, in quae iste reiciendis
                asperiores aperiam animi incidunt amet ullam expedita sequi quis
                enim? Doloremque molestiae aperiam dolor.
              </p>
              <div className="flex items-center justify-between w-full pt-2 md:pt-4 mt-1 md:mt-2 border-t border-white/10">
                <p className="text-lg font font-semibold text-main">2300000</p>
                <div className="flex items-center justify-between gap-6">
                  <button className="px-3 bg-orange-300 rounded-lg h-9 text-black font-bold shadow-lg/70 shadow-orange-300/50 cursor-pointer hover:opacity-80">
                    Add to Cart
                  </button>
                  <a className="text-lg font-light opacity-35 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                    Show Detail →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Coffe */}
          <div className="cards w-full">
            <div className="product-cards-2 box-border w-full bg-black/70 rounded-xl shadow-xl/70 shadow-white/5  md:py-3 md:px-2 relative border-[0.2px] border-transparent group hover:border-[0.2px] hover:border-main hover:-translate-y-1 transition-all duration-500">
              <span className="border-main border-[0.2px] px-3 py-1 rounded-full text-main absolute top-4 right-4 z-10 group-hover:animate-bounce group-hover:bg-white/5 group-hover:backdrop-blur-md">
                Collection 02
              </span>
              <div
                id="target-coffe"
                className="w-full mt-4 h-48 bg-radial from-white/40 to-black"
              ></div>
              <h3 className="py-3 font-bold text-xl group-hover:text-main">
                Kintsugi Coffe Cup
              </h3>
              <p className="text-md text-justify group-hover:text-cream">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                debitis eaque cum saepe nihil voluptatem, tempore quas
                dignissimos, recusandae repellendus ipsam totam provident
                voluptatibus? Unde quibusdam ducimus, in quae iste reiciendis
                asperiores aperiam animi incidunt amet ullam expedita sequi quis
                enim? Doloremque molestiae aperiam dolor.
              </p>
              <div className="flex items-center justify-between w-full pt-2 md:pt-4 mt-1 md:mt-2 border-t border-white/10">
                <p className="text-lg font font-semibold text-main">2300000</p>
                <div className="flex items-center justify-between gap-6">
                  <button className="px-3 bg-orange-300 rounded-lg h-9 text-black font-bold shadow-lg/70 shadow-orange-300/50 cursor-pointer hover:opacity-80">
                    Add to Cart
                  </button>
                  <a className="text-lg font-light opacity-35 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                    Show Detail →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Heart */}
          <div className="cards w-full">
            <div className="product-cards-3 box-border w-full bg-black/70 rounded-xl shadow-xl/70 shadow-white/5  md:py-3 md:px-2 relative border-[0.2px] border-transparent group hover:border-[0.2px] hover:border-main hover:-translate-y-1 transition-all duration-500">
              <span className="border-main border-[0.2px] px-3 py-1 rounded-full text-main absolute top-4 right-4 z-10 group-hover:animate-bounce group-hover:bg-white/5 group-hover:backdrop-blur-md">
                Collection 03
              </span>
              <div
                id="target-heart"
                className="w-full mt-4 h-48 bg-radial from-white/40 to-black"
              ></div>
              <h3 className="py-3 font-bold text-xl group-hover:text-main">
                Kintsugi Heart
              </h3>
              <p className="text-md text-justify group-hover:text-cream">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                debitis eaque cum saepe nihil voluptatem, tempore quas
                dignissimos, recusandae repellendus ipsam totam provident
                voluptatibus? Unde quibusdam ducimus, in quae iste reiciendis
                asperiores aperiam animi incidunt amet ullam expedita sequi quis
                enim? Doloremque molestiae aperiam dolor.
              </p>
              <div className="flex items-center justify-between w-full pt-2 md:pt-4 mt-1 md:mt-2 border-t border-white/10">
                <p className="text-lg font font-semibold text-main">2300000</p>
                <div className="flex items-center justify-between gap-6">
                  <button className="px-3 bg-orange-300 rounded-lg h-9 text-black font-bold shadow-lg/70 shadow-orange-300/50 cursor-pointer hover:opacity-80">
                    Add to Cart
                  </button>
                  <a className="text-lg font-light opacity-35 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                    Show Detail →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;
