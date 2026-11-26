import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1050);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] select-none pointer-events-auto"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] flex items-center justify-center">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 2048 2012"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
              >
                <g transform="matrix(1,0,0,1,0,-2098)">
                  <g transform="matrix(1,0,0,0.982031,0,37.698437)">
                    <g transform="matrix(1.854414,0,0,1.9047,-696.291745,1126.885003)">
                      <motion.path
                        d="M1212.645,1318.054C1192.625,1336.974 1171.974,1341.825 1153.402,1331.806C1131.129,1321.905 1106.246,1256.155 1070.652,1226.029C1002.238,1168.128 938.869,1141.065 866.914,1145.121C832.528,1146.605 792.354,1161.081 761.256,1192.177C745.4,1208.032 734.879,1228.981 717.242,1245.049C690.055,1269.03 652.305,1261.142 638.184,1238.097C620.406,1209.084 620.599,1178.319 646.864,1161.384C661.692,1151.824 689.724,1151.422 726.091,1141.453C768.446,1129.841 816.688,1118.736 853.298,1114.381C904.661,1108.272 953.83,1123.22 994.935,1146.345C946.497,1101.166 908.997,1073.771 873.96,1055.459C848.508,1042.156 827.239,1045.44 794.728,1042.102C758.885,1038.422 751.505,1019.525 753.676,996.396C757.366,957.106 803.46,946.437 828.35,966.871C852.646,984.709 878.33,1014.482 892.09,1024.987C935.112,1065.733 981.419,1106.479 1030.545,1147.225C1004.839,1103.302 987.707,1056.66 980.305,1006.934C975.323,973.462 978.209,926.219 967.148,875.571C962.84,855.847 957.984,842.054 956.215,813.256C953.916,775.824 979.445,756.868 1014.806,758.122C1041.62,759.073 1065.961,780.325 1061.398,815.972C1058.112,841.647 1039.826,861.227 1021.21,905.784C1002.663,945.037 1001.456,1018.742 1024,1071.868C1049.312,1131.517 1075.378,1180.053 1124.354,1206.278C1153.143,1221.694 1179.674,1225.17 1211.028,1247.992C1236.127,1266.261 1234.673,1297.237 1212.645,1318.054Z"
                        stroke="#ffffff"
                        strokeWidth="14"
                        initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
                        animate={{ pathLength: 1, fill: 'rgba(255,255,255,1)' }}
                        transition={{
                          pathLength: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                          fill: { duration: 0.35, delay: 0.45, ease: 'easeOut' },
                        }}
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            {/* Precision 1px architectural progress hairline */}
            <div className="w-24 h-[1px] bg-[#1f1f1f] overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#ffffff]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
