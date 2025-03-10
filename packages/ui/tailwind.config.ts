import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import tailwindcssTypography from "@tailwindcss/typography"
import { fontFamily } from "tailwindcss/defaultTheme.js"
// Cannot find module 'tailwindcss/plugin' or its corresponding type declarations.
// https://github.com/tailwindlabs/tailwindcss-forms/issues/31
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import plugin from "tailwindcss/plugin"

const config = {
  darkMode: ["class"],
  content: [
    "src/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "../../packages/ui/src/components/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      accent: ["var(--font-zodiak-italic)", ...fontFamily.serif],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)", ...fontFamily.sans],
        serif: ["var(--font-zodiak)", ...fontFamily.serif],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
          input: "hsl(var(--background-input))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          heading: "hsl(var(--foreground-heading))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  corePlugins: { container: false },
  plugins: [
    tailwindcssAnimate,
    tailwindcssTypography,
    // custom `container` utility
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugin(({ addComponents, theme }: any) => {
      addComponents({
        ".container": {
          marginInline: "auto",
          paddingInline: theme("spacing.5"),
          maxWidth: "84.375rem",
          width: "100%",

          "@screen sm": {
            paddingInline: theme("spacing.12"),
          },
        },
      })
    }),
  ],
} satisfies Config

export default config
