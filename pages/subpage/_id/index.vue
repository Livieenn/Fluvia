<template>
<div>
  <div class="p-8 subpage">
    <div class="lighter-bg p-8 links-colored prose max-w-none" v-html="$store.state.subpage.content"></div>
  </div>
</div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: {Divider},
  mounted () {
    this.$store.dispatch('loadSubpage', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
