import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#8B4513",     // Café profundo
        secondary: "#D2B48C",   // Beige claro
        accent: "#A0522D",      // Café intermedio
        neutral: "#4E342E",     // Café oscuro
        base: "#4E342E",        // Fondo beige suave
        info: "#CD853F",        // Café claro para información
        success: "#8FBC8F",     // Verde natural apagado
        warning: "#D2691E",     // Naranja terroso
        error: "#B22222",       // Rojo oscuro
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config