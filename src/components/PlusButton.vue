<template>
  <router-link class="router-link" :to="`/country/${country}`">
    <q-btn
      dense
      round
      flat
      color="accent"
      :icon="(hovered) ? 'add_circle' :'add_circle_outline'"
      @mouseover="hovered=true"
      @mouseout="hovered=false"
    ></q-btn>
  </router-link>
</template>

<script>
export default {
  name: "PlusButton",
  props: ["country"],
  data() {
    return {
      hovered: false
    };
  },
  watch: {
    $route(to, from) {
      this.hovered = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.router-link {
  text-decoration: none;
}
</style>
