import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';




const SvgMask = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      <clipPath id="logo-mask" clipPathUnits="objectBoundingBox">
        <path
          d="M0.5 0 C0.31 0 0.16 0.15 0.16 0.34 C0.16 0.57 0.5 1 0.5 1 C0.5 1 0.84 0.57 0.84 0.34 C0.84 0.15 0.69 0 0.5 0 Z M0.5 0.46 C0.434 0.46 0.38 0.406 0.38 0.34 C0.38 0.274 0.434 0.22 0.5 0.22 C0.566 0.22 0.62 0.274 0.62 0.34 C0.62 0.406 0.566 0.46 0.5 0.46 Z"
        />
      </clipPath>
    </defs>
  </svg>
);

const MapSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Animate the initial static layout (text + logo) fading out
  const initialLayoutOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]);

  // Animate the zooming logo container fading in and then out
  const zoomContainerOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.6, 0.7], [0, 1, 1, 0]);
  const zoomContainerY = useTransform(scrollYProgress, [0.2, 0.3], ['140px', '0px']); // Move logo up to center as text fades
  const zoomContainerScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 15]);
  const imageScale = useTransform(scrollYProgress, [0.3, 0.6], [1.5, 1]);

  // Animate the final content fading in
  const finalContentOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const finalContentY = useTransform(scrollYProgress, [0.7, 0.8], ['30px', '0px']);
  const stickyHeight = useTransform(scrollYProgress, [0.8, 1], ['90vh', '50vh']);

  return (
    <section ref={targetRef} className="relative bg-white sm:h-[230vh] mt-12 sm:mt-0">
      <SvgMask />
      <motion.div
        className="hidden sm:block sticky top-0 z-[60] pointer-events-none"
        style={{ height: stickyHeight }}
      >  
        {/* h-screen */}
        <div className="relative w-full h-full">
          {/* 1. Initial Layout (Text + Static Logo) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pt-4 gap-8"
            style={{ opacity: initialLayoutOpacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center px-4">
              How many states did <span className="text-emerald-600">Ketaki Adhar's</span> mission of farmer empowerment reach?
            </h2>
            <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]" style={{ clipPath: 'url(#logo-mask)' }}>
              <div
                className="w-full h-full"
                style={{ backgroundColor: '#006600' }}
              />
            </div>
          </motion.div>

          {/* 2. Zooming Logo Container */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: zoomContainerOpacity,
              scale: zoomContainerScale,
              y: zoomContainerY,
            }}
          >
            <motion.div
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
              style={{ clipPath: 'url(#logo-mask)' }}
            >
              <motion.div
                className="w-full h-full"
                style={{ backgroundColor: '#006600', scale: imageScale }}
              />
            </motion.div>
          </motion.div>

          {/* 3. Final Scene (Green Background + Image + Content) */}
          <motion.div
            className="absolute inset-0 animated-gradient-bg flex items-center justify-center"
            style={{ opacity: finalContentOpacity }}
          >
            <motion.div
              className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 sm:px-0"
              style={{ y: finalContentY }}
            >
              <img
                src="/map-removebg-preview.png"
                alt="Map Illustration"
                className="w-full max-h-[600px] object-contain"
              />
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-center sm:text-left">
                  Empowering 
                  <span className="text-yellow-300"> Farmers Across India</span>
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl max-w-2xl text-center sm:text-left">
                  Ketaki Adhar has empowered over  
                  <span className="font-bold text-yellow-300"> 21,000 farmers</span>
                  <span className="relative inline-block mx-1">
                    <span className="relative z-10">across more than </span>
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-green-600/30 -rotate-1" />
                  </span>
                  <span className="font-bold text-yellow-300">10 Indian states</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile simplified content */}
      <div className="block sm:hidden w-full animated-gradient-bg py-16 px-6 text-center text-white">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold mb-6">
            Empowering <span className="text-yellow-300">Farmers Across India</span>
          </h2>
          <img 
            src="/map-removebg-preview.png" 
            alt="Map of India showing Ketaki Adhar's reach" 
            className="w-full max-w-md mx-auto" 
          />
          <p className="text-xl leading-relaxed">
            Ketaki Adhar has empowered over{' '}
            <span className="font-bold text-yellow-300">21,000 farmers</span> across{' '}
            <span className="font-bold text-yellow-300">10 Indian states</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MapSection;