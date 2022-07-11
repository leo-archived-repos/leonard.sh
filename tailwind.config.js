const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
				karla: ['Karla', ...defaultTheme.fontFamily.sans],
				inconsolata: ['Inconsolata', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: []
};
