<template>
  <div>
  <div class="bg-abs"></div>
  <section class="intro flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start">
    <div class="mt-2 lg:mt-32 order-2 lg:order-1 relative">
      <div class="green-radial"></div>
      <h1 class="metropolis text-6xl">{{$store.state.shop.name}}</h1>
      <p class="max-w-lg light-text text-justify mt-8 titillium">
        {{$config.description}}
      </p>
      <div class="flex flex-col md:flex-row mt-8 items-center md:items-start mb-0 xl:mb-20">
        <button class="btn" @click="copy()">Skopiuj adres serwera!</button>
        <div class="online-btn ml-0 md:ml-8 mt-2 md:mt-0 flex justify-center items-center light-text"><div :class="{ 'blob green': status, 'blob blob-red': !status }"></div><span class="text-white">{{ players }}</span>&nbsp;graczy online</div>
      </div>
    </div>
    <div class="mt-8 order-1 lg:order-2">
      <img src="~assets/render.png" alt="render" class="object-fill">
    </div>
  </section>
  <Divider content="Sklep z produktami" :negativeMargin="true"/>
  <section class="mt-5">
    <div class="p-8 w-full products">
      <div v-if="announcements.length" class="flex flex-col gap-y-2 announcement mb-4">
        <div class="alert lighter-bg p-6 links-colored" role="alert" v-for="announcement in announcements" :key="announcement.id" v-html="announcement.content"></div>
      </div>
      <div class="servers-nav flex items-center mb-14 md:justify-start justify-center">
        <div class="items-center xl:flex hidden">
          <span class="mr-2 titillium">Wybierz tryb</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6L11 6M11 6L6.27778 1M11 6L6.27778 11" stroke="#ECECEC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="servers lg:ml-8 ml-0 flex gap-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          <button v-for="server in $store.state.servers" :key="server.id" class="server server-btn titillium lg:py-4 py-2 lg:px-8 px-4" :class="{ 'server-btn-active' : server.id === selectedServer}" @click="selectServer(server.id)">{{server.name}}</button>
        </div>
      </div>
      <div class="grid xl:grid-cols-3 grid-cols-1">
        <div class="products-list overflow-y-auto">
          <div class="product sm:px-8 px-4 sm:py-4 py-2 mb-4 flex justify-between" v-bind:class="{'product-active': product && product_el.id===product.id}" v-for="product_el in products" :key="product_el.id" @click="product=product_el">
            <div class="flex sm:w-4/5 xl:w-3/5 w-3/5">
              <img v-if="product_el.image" :src="product_el.image" alt="Zdjęcie produktu" width="48" height="48" class="h-12 sm:mr-8 mr-2">
              <div class="product-info flex flex-col max-w-full">
                <span class="inter-font text-base">{{product_el.name}}</span>
                <span class="light-text text-sm inter-font truncate w-72 hidden">{{product_el.short_description}}</span>
              </div>
            </div>
            <div class="flex flex-col justify-start items-end ml-4">
              <span>{{product_el.main_price}} zł</span>
              <span v-if="product_el.promo" class="text-sm green-text mt-1">-{{product_el.promo}}%</span>
            </div>
          </div>
        </div>
        <div v-if="product" class="product-card ml-8 inter-font overflow-y-auto col-span-2">
          <div class="flex items-center">
            <span class="text-2xl">{{ product.name }}</span>
            <div class="product-price text-lg ml-4 px-4 py-3">
              <span v-bind:class="{'line-through': product.promo}" class="gray-text">{{ product.main_price }} zł</span>
              <span v-if="product.promo" class="green-text ml-4">{{ $price.calcPrice(product.main_price, product.promo) }} zł</span>
            </div>
          </div>
          <button link @click="buyProduct(product.id)" class="btn-buy mt-2">Zakup</button>
          <p v-html="product.description" class="font-medium mt-2 links-colored prose"></p>
        </div>
      </div>
    </div>
  </section>
  <Divider content="Top 3 najbogatszych graczy" :negativeMargin="false" v-if="$store.state.shop.richest_player"/>
  <section v-if="$store.state.shop.richest_player">
    <div class="flex xl:px-40 xl:pt-0 pt-12 px-6 richest-players justify-between items-center lg:flex-row flex-col">
      <div class="relative xl:mb-0 mb-8">
        <img src="~assets/gold.webp" alt="sztabka złota" class="h-8 absolute gold-1">
        <img src="~assets/gold.webp" alt="sztabka złota" class="h-8 absolute gold-2">
        <span class="text-3xl">Topka 3 najbogatszych<br/> graczy na serwerze</span>
      </div>
      <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start">
        <div v-for="(player, index) in richestPlayer" :key="player.player" :class="`relative overflow-hidden px-20 py-32 flex flex-col justify-center items-start richest-player order-`+index+` gradient-`+index">
          <div class="absolute text-center flex flex-col richest-text text-center">
            <span class="mt-2 text-xl text-white">{{player.player}}</span>
            <span class="text-center light-text mb">{{Math.ceil(player.spend)}} zł</span>
          </div>
          <img :src='`https://mc-heads.net/body/`+player.player+`/right`' :alt="player.player" class="h-56 flex self-center absolute richest-player-skin">
        </div>
      </div>
    </div>
  </section>
  <Divider content="Ostatnie zakupy" :negativeMargin="false" v-if="$store.state.shop.latest_payments"/>
  <section v-if="$store.state.shop.latest_payments">
    <div class="flex p-4 ml-0 mt-4 xl:mt-0 flex-col latest-payments">
      <div class="flex gap-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
        <div v-for="player in $store.state.latestPayments" :key="player.player" class="lighter-bg p-4 flex">
          <img :src='`https://minotar.net/helm/`+player.player+`/48`' :alt="player.player" class="h-12 mr-4 rounded-xl">
          <div class="flex flex-col truncate">
            <span>{{player.player}}</span>
            <span class="text-sm light-text">{{player.product_name}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Divider content="Cel miesiąca" :negativeMargin="false" v-if="$store.state.shop.monthly_goal_public !== null"/>
  <section v-if="$store.state.shop.monthly_goal_public !== null">
    <div class="lighter-bg p-8 flex justify-between monthly-goal">
      <div class="monthly-goal-layer w-full">
        <div class="bg-monthly-goal" :style='`width: `+$store.state.shop.monthly_goal_public+`%;`' v-bind:class="{'p-4': $store.state.shop.monthly_goal_public > 0}">
        </div>
      </div>
      <span class="ml-8">{{Math.ceil($store.state.shop.monthly_goal_public)}}%</span>
    </div>
  </section>
  </div>
</template>

<script>
import Divider from '~/components/Divider.vue'

export default {
  name: "index",
  components: {Divider},
  data: function () {
    return {
      players: '?',
      products: [],
      announcements: [],
      product: null,
      selectedServer: this.$store.state.servers[0].id  || '',
      richestPlayer: [],
      status: true
    }
  },
  async created () {
    await this.loadStatus()
    await this.loadProducts()
    await this.loadAnnouncements()
    if (this.$store.state.shop.richest_player) {
      await this.loadRichestPlayer()
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$config.address);
      this.$toast.success('Skopiowano adres serwera')
    },
    async loadStatus(context) {
      return await fetch(`https://api.mcsrvstat.us/2/${this.$config.address}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.online) {
            this.players = 0
            this.status = false
            return
          }
          this.players = data.players.online
        })
        .catch((err) => console.log(err));
    },
    async loadRichestPlayer(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/richest_player/?amount=3`)
      .then((response) => response.json())
      .then((data) => {
        this.richestPlayer = data
      })
      .catch((err) => console.error(err));
    },
    async loadProducts(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/?server=${this.selectedServer}`)
      .then((response) => response.json())
      .then((data) => {
        this.products = data
        this.product = this.products[0]
      })
      .catch((err) => console.error(err));
    },
    async loadAnnouncements(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/announcements/`)
      .then((response) => response.json())
      .then((data) => {
        this.announcements = data
      })
      .catch((err) => console.error(err));
    },
    selectServer (serverId) {
      this.selectedServer = serverId
      this.loadProducts()
      this.product = null
    },
    buyProduct (id) {
      vishopPay(this.$store.state.shop.id, id)
    }
  }
}
</script>

<style>
.inter-font {
  font-family: 'Inter', sans-serif;
}
.bg-abs {
  position: absolute;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.75) 0%, #111 100%), url('~assets/bg.jpg') lightgray -0.339px 0px / 100.039% 100% no-repeat;
  filter: grayscale(100%);
  background-repeat: no-repeat !important;
  background-size: cover !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}
.products-list {
  max-height: 31rem;
}
.product-card {
  max-height: 31rem;
}
.green-radial {
  border-radius: 400px;
  background: rgba(99, 157, 82, 0.70);
  filter: blur(120px);
  width: 200px;
  height: 200px;
  left: 100px;
  bottom: 150px;
  position: absolute;
  z-index: -22;
}
.server-btn {
  border: 2px solid #252525;
  border-radius: 15px;
  color: #929292;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  transition: .3s;
}
.server-btn:hover {
  color: #fff;
  border: 2px solid #58585A;
}
.server-btn-active {
  border: 2px solid #1D4D13 !important;
  background: #3C8527;
  color: #fff;
}
.product {
  border-radius: 15px;
  border: 2px solid #252525;
  width: 95%;
  transition: .3s;
}
.product:hover {
  border: 2px solid #58585A;
  cursor: pointer;
}
.product-active {
  border: 2px solid #58585A;
}
.gray-text {
  color: #929292;
}
.product-price {
  background-color: #1E1E1F;
  border-radius: 5px;
}
.gold-1 {
  top: -11px;
  left: -15px;
  transform: rotate(-15deg);
}
.gold-2 {
  top: 55px;
  left: 240px;
  transform: rotate(30deg);
}
.gradient-2 {
background: linear-gradient(180deg, rgba(99, 157, 82, 0.00) 0%, #639D52 100%);
}
.gradient-0 {
background: linear-gradient(180deg, rgba(60, 133, 39, 0.00) 0%, #3C8527 100%);
}
.gradient-1 {
background: linear-gradient(180deg, rgba(79, 145, 60, 0.00) 0%, #4F913C 100%);
}
.richest-text {
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}
.richest-player-skin {
  top: 100px;
}
.monthly-goal-layer {
  border-radius: 15px;
  background: #212224;
}
.bg-monthly-goal {
  border-radius: 15px;
  background: linear-gradient(90deg, #639D52 0%, #4F913C 100%);
}
.announcement {
  border-radius: 15px;
  border: 2px solid #262626;
  background: rgba(18, 18, 18, 0.15);
}
@media (min-width: 1120px) {
  .richest-player:nth-child(1) {
    order: 2 !important;
  }
  .richest-player:nth-child(2) {
    order: 1 !important;
  }
  .richest-player:nth-child(3) {
    order: 3;
  }
}
</style>

