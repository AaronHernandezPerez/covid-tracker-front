<template>
  <div id="plus-one-container" ref="plusOne">
    <span id="plus-one" class="text-bold text-cyan">+1</span>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$destroy();
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
@keyframes float-up {
  0% {
    top: 0;
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  100% {
    top: -40px;
    opacity: 0;
    display: block;
  }
}

#plus-one-container {
  position: fixed;
  pointer-events: none;
  user-select: none;

  #plus-one {
    opacity: 0;
    position: relative;
    animation: float-up 1s;
  }
}
</style>