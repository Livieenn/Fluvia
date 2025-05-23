import tailwindTypography from '@tailwindcss/typography';

module.exports = {
  /*
  ** Headers of the page
  */
  publicRuntimeConfig: {
    shop_id: 19160, // id sklepu na vishop
    description: "FluviaMC – Survival, OneBlock, SkyGen – trzy światy, jedna przygoda!", // opis serwera
    address: "fluviamc.pl",  // adres serwera
    primaryColor: "#72A763",  // nie warto zmieniać
    socialMedia: [  // social media serwera
      {
        "name": "Discord",
        "icon": "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg",
        "link": "dc.fluviamc.pl"
      },
      {
        "name": "TikTok",
        "icon": "https://i.imgur.com/w8CLcAH.png",
        "link": "https://www.tiktok.com/@fluviamc"
      }
    ]
  },
  head: {
    title: 'Fluviamc.pl',  // tytuł strony
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Jedyny serwer minecraft tworzony z pasjii!' }  // opis strony dla wyszukiwarek i discorda
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },  // ikona strony, podmień ją w folderze static
      { rel: 'stylesheet ', href: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap'},
      { rel: 'stylesheet ', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap'}
    ],
    script: [
      { src: "https://vishop.pl/pay.js" }
    ]
  },
  /*
  ** Poniższa konfiguracja jest dla bardziej zaawansowanych użytkowników, nie ma tam nic ciekawego
  */
  server: {
    host: '0.0.0.0'
  },
  css: [
    '@/assets/css/main.css'
  ],
  plugins: [
      { src: "~/plugins/price.js"}
  ],
  buildModules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    config: {
        plugins: [tailwindTypography],
        theme: {
          extend: {
            typography: {
              DEFAULT:  {
                css: {
                  color: '#ececec',
                  h1: {
                      color: '#ececec'
                  },
                  h2: {
                      color: '#ececec'
                  },
                  h3: {
                      color: '#ececec'
                  },
                  h4: {
                      color: '#ececec'
                  },
                  h5: {
                      color: '#ececec'
                  },
                  h6: {
                      color: '#ececec'
                  },
                  strong: {
                      color: '#ececec'
                  },
                  blockquote: {
                    color: '#ececec'
                  },
                  code: {
                      color: '#ececec'
                  },
                  figcaption: {
                      color: '#ececec'
                  }
                }
              }
            }
          }
        }
    }
  },
  modules: [
    "vue-toastification/nuxt"
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

