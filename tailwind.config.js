/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        pantone_gunpowder: '#18181A',
        pantone: '#FFC700'
      },
      fontFamily: {
        Futura: 'Futura LT'
      },
      backgroundImage: {
        'tableWithIngredients': "url('./img/tabla-de-cocina-con-ingredientes.jpg')"
      },
      plugins: [],
    }
  }
}
