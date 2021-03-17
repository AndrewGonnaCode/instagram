module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fill:(theme)=>({
        red:theme('colors.red.primary')
    }),
    colors:{
        white:'#ffffff',
        blue:{
            medium:'#27a4f7'
        },
        black:{
            light:'#262626',
            faded:'#00000059'
        },
        gray:{
            base:'#616161',
            background:'#fafafa',
            primary:'dbdbdb'
        },
        red:{
            primary:'#ed4956'
        }
    }
    },
  },
  variants: {
    display:['group-hover'],
  },
  plugins: [],
}
