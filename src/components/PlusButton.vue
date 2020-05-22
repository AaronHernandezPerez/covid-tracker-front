<template>
  <q-btn
    dense
    round
    flat
    color="purple-7"
    @click="openDetails(row)"
    :icon="(hovered) ? 'add_circle' :'add_circle_outline'"
    @mouseenter="hovered=true"
    @mouseleave="hovered=false"
  ></q-btn>
</template>

<script>
export default {
  name: "PlusButton",
  props: ["row"],
  data() {
    return {
      hovered: false
    };
  },
  methods: {
    openDetails(row) {
      console.log(row);
    }
  }
};
</script>
