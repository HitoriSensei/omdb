export const itemList = (index = 0) => {
  const falloff = Math.min(index, 30) * 0.01 + Math.pow(1 / 10, Math.min(index, 30) / 19) * 0.04
  return {
    initial: { scale: 0.96, y: 20, opacity: 0 },
    enter: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.48, 0.15, 0.25, 0.96],
        delay: falloff,
      },
    },
    exit: {
      scale: 0.96,
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.48, 0.15, 0.25, 0.96],
        delay: falloff,
      },
    },
  }
}

export const figureVariant = {
  initial: {
    y: -40,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

export const fromRightVariant = {
  initial: {
    x: 50,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

export const staggerVariant = {
  exit: { transition: { staggerChildren: 0.02 } },
  enter: { transition: { staggerChildren: 0.1 } },
}

export const mainVariant = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96], staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96], staggerChildren: 0.1 },
  },
}
export const sectionVariant = {
  initial: { opacity: 0, y: -20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}
