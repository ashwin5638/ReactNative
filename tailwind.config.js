module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // Include directories/components where you use Tailwind classes
  ],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
