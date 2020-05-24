<template>
  <router-link class="router-link" :to="`/country/${country}`" target="_blank">
    <q-btn
      dense
      round
      flat
      color="accent"
      :icon="(hovered) ? 'add_circle' :'add_circle_outline'"
      @mouseenter="hovered=true"
      @mouseleave="hovered=false"
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
  }
};
</script>


<style lang="scss" scoped>
.router-link {
  text-decoration: none;
}
</style>
