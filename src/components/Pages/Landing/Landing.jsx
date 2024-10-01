

import { motion } from "framer-motion"

export default function Landing(props){
  return(
    <div
    className="flex flex-col items-center justify-center h-screen bg-black"
    >
      <motion.button
      onClick={props.onStart}
      className="px-6 py-3 bg-transparent text-5xl"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.98 }}
      >
        <span className="text-white">S</span>
        <span className="text-red-600">t</span>
        <span className="text-white">a</span>
        <span className="text-purple-600">r</span>
        <span className="text-white">t</span>
      </motion.button>
    </div>
  )
}