/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}', './template.html'],
  darkMode: 'class',
  important: 'body',
  theme: {
    colors: {
      current: 'currentColor',
      accent: 'hsl(var(--accent-color) / <alpha-value>)',
      primary: 'hsl(var(--primary-color) / <alpha-value>)',
      red: 'hsl(var(--red-color) / <alpha-value>)',
      green: 'hsl(var(--green-color) / <alpha-value>)',
      white: 'hsl(var(--white-color) / <alpha-value>)',
      'black-1': 'hsl(var(--black-1-color) / <alpha-value>)',
      'black-2': 'hsl(var(--black-2-color) / <alpha-value>)',
      'gray-1': 'hsl(var(--gray-1-color) / <alpha-value>)',
      'gray-2': 'hsl(var(--gray-2-color) / <alpha-value>)',
      'gray-3': 'hsl(var(--gray-3-color) / <alpha-value>)',
      'gray-5': 'hsl(var(--gray-5-color) / <alpha-value>)',
      'gray-6': 'hsl(var(--gray-6-color) / <alpha-value>)',
      'gray-7': 'hsl(var(--gray-7-color) / <alpha-value>)',
    },
    fontSize: {
      h1: [
        'var(--h1-font-size)',
        {
          lineHeight: 'var(--h1-line-height)',
          fontWeight: 700,
        },
      ],
      h2: [
        'var(--h2-font-size)',
        {
          lineHeight: 'var(--h2-line-height)',
          fontWeight: 700,
        },
      ],
      h3: [
        'var(--h3-font-size)',
        {
          lineHeight: 'var(--h3-line-height)',
          fontWeight: 700,
        },
      ],
      h4: [
        'var(--h4-font-size)',
        {
          lineHeight: 'var(--h4-line-height)',
          fontWeight: 700,
        },
      ],
      p1: [
        'var(--p1-font-size)',
        {
          lineHeight: 'var(--p1-line-height)',
        },
      ],
      p2: [
        'var(--p2-font-size)',
        {
          lineHeight: 'var(--p2-line-height)',
        },
      ],
      p3: [
        'var(--p3-font-size)',
        {
          lineHeight: 'var(--p3-line-height)',
        },
      ],
      p4: [
        'var(--p4-font-size)',
        {
          lineHeight: 'var(--p4-line-height)',
        },
      ],
      c1: [
        'var(--c1-font-size)',
        {
          lineHeight: 'var(--c1-line-height)',
        },
      ],
      c2: [
        'var(--c2-font-size)',
        {
          lineHeight: 'var(--c2-line-height)',
        },
      ],
    },
    boxShadow: {
      1: '0px 8px 20px rgba(205, 205, 205, 0.1)',
      2: '0px 4px 4px rgba(176, 176, 176, 0.1)',
      3: '0px -4px 20px rgba(199, 199, 199, 0.1)',
      4: '0px 4px 17px rgba(6, 6, 11, 0.06)',
    },
  },
  plugins: [],
};
