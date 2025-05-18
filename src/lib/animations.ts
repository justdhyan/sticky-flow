import { Variants } from "framer-motion";

// Shared animation variants
export const animations = {
  // Fade in from bottom with stagger for lists
  fadeInUp: (delay: number = 0): Variants => ({
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay
      }
    }
  }),

  // Container for staggered children
  staggerContainer: (staggerChildren: number = 0.05, delayChildren: number = 0): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  }),

  // Card hover animation
  cardHover: {
    rest: {
      scale: 1,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  },

  // Button hover animation
  buttonHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  },

  // Collapse/expand for subtasks and sections
  collapse: {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: "easeOut"
        },
        opacity: {
          duration: 0.2,
          ease: "easeOut"
        }
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: "easeIn"
        },
        opacity: {
          duration: 0.15,
          ease: "easeIn"
        }
      }
    }
  },

  // For task status changes (completing tasks)
  statusTransition: {
    uncompleted: {
      opacity: 1,
      textDecoration: "none",
      color: "var(--foreground)"
    },
    completed: {
      opacity: 0.6,
      textDecoration: "line-through",
      color: "var(--muted-foreground)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  },

  // For page transitions
  pageTransition: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }
};
