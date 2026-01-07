import React from 'react'
import { motion } from 'framer-motion'

function AnimationButton({
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}) {
  return (
    <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    whileHover={!disabled ? { scale: 1.03 } : {}}
    whileTap={!disabled ? { scale: 0.97} : {}}
    transition={{ duration: 0.10 }}
    className={className}>
       {children}
    </motion.button>
  );
}

export default AnimationButton