import { motion } from 'framer-motion'
import React from 'react'



export function Appear1({ children, ...rest }) {
    return (
      <motion.div {...rest}>
        {children}
      </motion.div>
    );
  }