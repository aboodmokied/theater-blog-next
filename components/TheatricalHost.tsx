import { motion } from "framer-motion";

function TheatricalHost() {
  // إضافة as const هنا تجعل TypeScript يتعرف على منحنى Bezier بشكل صحيح
  const hostHeadVariants = {
    hostHidden: { opacity: 0, rotate: -8, y: 15 },
    hostVisible: {
      opacity: 1,
      rotate: [0, 8, -2, 0],
      y: [0, 8, -1, 0],
      transition: {
        duration: 2,
        ease: [0.25, 1, 0.5, 1] as const, // تم الإصلاح هنا
        delay: 0.5,
      },
    },
  };

  return (
    <div className="relative bottom-0 h-full w-[280px] sm:w-[340px] lg:w-[400px] origin-bottom select-none z-10">
      {/* هالة ضوء ذهبية خلفية قوية لإبراز الشخصية */}
      <div
        className="absolute left-1/2 top-[20%] h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] -translate-x-1/2 rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(240,185,64,0.3) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* أ) الرأس واللحية الحادة */}
      <motion.div
        variants={hostHeadVariants}
        initial="hostHidden"
        animate="hostVisible"
        className="absolute left-1/2 top-[10%] h-[42%] w-[55%] -translate-x-1/2 origin-bottom z-20"
      >
        <svg
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
        >
          <path
            d="M100 20C72 20 52 35 46 60C43 75 45 90 48 100C50 108 43 125 48 135C52 143 55 145 60 152C68 162 82 175 102 175C122 175 135 158 138 145C142 130 140 105 138 95C135 80 138 55 125 35C115 25 108 20 100 20Z"
            fill="#16161a"
          />
          <path
            d="M48 115C46 128 50 142 58 152C68 165 85 172 102 172C118 172 128 162 132 150C130 135 128 125 125 115C100 120 75 120 48 115Z"
            fill="#0f0f12"
          />
          <motion.path
            d="M96 42C86 52 79 72 81 92C82 107 76 117 79 127C81 132 86 137 93 140"
            stroke="#F0B940"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </svg>

        {/* بريق العين الدرامي */}
        <div className="absolute left-[47%] top-[41%] h-[3px] w-[3px] rounded-full bg-[#F0B940] shadow-[0_0_8px_#F0B940]" />
      </motion.div>

      {/* ب) الجسد والكتفين */}
      <div className="absolute bottom-0 left-0 h-[65%] w-full z-10">
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-95"
        >
          <path
            d="M60 300C60 235 95 180 145 165C160 160 172 162 188 170C194 173 206 173 212 170C228 162 240 160 255 165C305 180 340 235 340 300H60Z"
            fill="#1a1a22"
          />
          <path
            d="M172 165C188 185 202 185 228 165C218 195 182 195 172 165Z"
            fill="#121216"
          />
        </svg>
      </div>
    </div>
  );
}
