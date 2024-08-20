import { AnimatePresence, motion } from "framer-motion";

type LikeButtonProps = {
  isClicked: boolean;
  size?: number;
};

export default function LikeButton({ isClicked, size = 28 }: LikeButtonProps) {
  return (
    <div className="flex items-center justify-center overflow-visible">
      <AnimatePresence>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`relative flex cursor-pointer items-center justify-center overflow-visible rounded-full border p-2 outline-none transition-all duration-150 ease-out ${isClicked ? "border-pink-500 bg-pink-100 text-pink-500" : "border-gray-200 bg-transparent text-gray-500"}`}
          style={{ height: size, width: size }}
        >
          <svg
            className="absolute inset-0 z-[-1] overflow-visible"
            width={size}
            height={size}
            viewBox="0 0 26 26"
            fill="inherit"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              key="circle"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: isClicked ? [0, 2] : 0,
                opacity: isClicked ? [1, 0] : 0,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
              cx="13"
              cy="13"
              r="13"
              fill={isClicked ? "red" : "inherit"} // fill color set based on isClicked
            />
          </svg>
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 26 26"
            fill={isClicked ? "red" : "#94a3b8"} // fill color set based on isClicked
            xmlns="http://www.w3.org/2000/svg"
            className="text-text overflow-visible"
          >
            <motion.path
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isClicked ? [1, 0, 1] : 1,
                opacity: isClicked ? 1 : 1,
              }}
              transition={{ duration: 0.3 }}
              d="M6.42789 8.40196C7.25325 7.59676 8.34749 7.10721 9.51164 7.02233C10.6758 6.93745 11.8325 7.26289 12.7714 7.93946C13.7605 7.22193 14.9917 6.89657 16.2169 7.02889C17.4421 7.16122 18.5704 7.7414 19.3746 8.65261C20.1788 9.56381 20.5991 10.7384 20.551 11.9397C20.5028 13.1411 19.9897 14.28 19.115 15.1272L13.3234 20.7757C13.2511 20.8468 13.1651 20.9032 13.0704 20.9417C12.9757 20.9802 12.874 21 12.7714 21C12.6688 21 12.5672 20.9802 12.4725 20.9417C12.3777 20.9032 12.2917 20.8468 12.2195 20.7757L6.42789 15.1272C5.97494 14.6857 5.61562 14.1615 5.37047 13.5845C5.12531 13.0075 4.99913 12.3891 4.99913 11.7646C4.99913 11.14 5.12531 10.5216 5.37047 9.94461C5.61562 9.36764 5.97494 8.84344 6.42789 8.40196Z"
              fill={isClicked ? "red" : "inherit"} // fill color set based on isClicked
            />
          </motion.svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
