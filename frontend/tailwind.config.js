/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'gray-bg': '#1a1c23',
                'black-behind': '#121317',
                'light-behind': '#f9fafb',
                'gray-text': '#9e9e9e'
            },
            keyframes: {
                wave: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                }
            },
            animation: {
                'waving-hand': 'wave 1s linear infinite'
            },
            boxShadow: {
                form: 'rgb(38, 57, 88) 0px 7px 30px -10px;',
                header: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
                search: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
                icon: '0 10px 20px -8px rgb(0 111 255 / 53%);',
                footer: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
                badge: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                raise: '0 8px 8px -6px currentcolor',
                scrollTop:
                    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
            },
            container: {
                'max-width': {
                    '2xl': '1400px'
                },
                center: true
            },
            fontFamily: {
                nikeFutura: 'Nike Futura'
            }
        }
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
};
