<template>
  <div :style="cssVars" class="container-fluid mx-2 md:mx-32">
    <component :is="`style`">::-webkit-scrollbar-thumb {
    background-color: {{ this.$config.primaryColor }};
    outline: none;
    border-radius: 5px;
}</component>
    <Navbar/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar, Footer
  },
  computed: {
    cssVars() {
      return {
        '--primary-color': this.$config.primaryColor,
        '--gradient-color': this.$config.gradientColor
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: block !important;
  background: #252525;
  width: 5px;
}
.titillium  {
  font-family: "Titillium Web";
}
.products, .richest-players, .latest-payments, .monthly-goal, .subpage {
  border-radius: 30px;
  border: 2px solid #252525;
  background: url('~assets/bgblured.png') center;
  background-blend-mode: multiply;
}
</style>

