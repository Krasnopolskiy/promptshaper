/**
 * Tailwind Animation Configuration
 *
 * Defines keyframes and animations for the Tailwind configuration.
 * Extracted to a separate file to keep the main config under 200 lines.
 *
 * @module config/tailwind/animations
 */

/**
 * Animation configuration with keyframes and animations
 */
export const animationConfig = {
  keyframes: {
    'accordion-down': {
      from: {height: '0'},
      to: {height: 'var(--radix-accordion-content-height)'},
    },
    'accordion-up': {
      from: {height: 'var(--radix-accordion-content-height)'},
      to: {height: '0'},
    },
    'fade-in': {
      '0%': {opacity: '0', transform: 'translateY(10px)'},
      '100%': {opacity: '1', transform: 'translateY(0)'},
    },
    'fade-out': {
      '0%': {opacity: '1', transform: 'translateY(0)'},
      '100%': {opacity: '0', transform: 'translateY(10px)'},
    },
    'slide-in': {
      '0%': {transform: 'translateX(-20px)', opacity: '0'},
      '100%': {transform: 'translateX(0)', opacity: '1'},
    },
    'slide-out': {
      '0%': {transform: 'translateX(0)', opacity: '1'},
      '100%': {transform: 'translateX(20px)', opacity: '0'},
    },
    scale: {
      '0%': {transform: 'scale(0.95)', opacity: '0'},
      '100%': {transform: 'scale(1)', opacity: '1'},
    },
    'pulse-light': {
      '0%, 100%': {opacity: '1'},
      '50%': {opacity: '0.5'},
    },
    float: {
      '0%, 100%': {transform: 'translateY(0)'},
      '50%': {transform: 'translateY(-10px)'},
    },
    glow: {
      '0%, 100%': {boxShadow: '0 0 10px rgba(155, 135, 245, 0.2)'},
      '50%': {boxShadow: '0 0 20px rgba(155, 135, 245, 0.5)'},
    },
  },
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'fade-in': 'fade-in 0.3s ease-out forwards',
    'fade-out': 'fade-out 0.3s ease-out forwards',
    'slide-in': 'slide-in 0.3s ease-out forwards',
    'slide-out': 'slide-out 0.3s ease-out forwards',
    scale: 'scale 0.2s ease-out forwards',
    'pulse-light': 'pulse-light 1.5s ease-in-out infinite',
    float: 'float 4s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite',
  },
};
