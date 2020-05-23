<template>
  <div ref="divContainer">
    <q-btn
      dense
      flat
      :ripple="false"
      :label="formatedApplauses"
      @click="clap()"
      icon="fas fa-hands-wash"
      size="19px"
      color="cyan"
      class="q-mr-sm clap"
      no-caps
      style="min-width: 150px;"
    >
      <q-tooltip
        anchor="bottom middle"
        self="center middle"
        content-style="font-size: 16px"
        content-class="bg-black text-weight-bold text-primary"
      >¡Aplaude a los trabajadores esenciales!</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import PlusOneFade from "src/components/PlusOnefade";

export default {
  methods: {
    ...mapActions("claps", ["fetchClaps", "add_clap"]),
    clap() {
      this.add_clap();

      // +1 animation
      var ComponentClass = Vue.extend(PlusOneFade);
      var instance = new ComponentClass();
      instance.$mount();
      instance.$el.style.top = `${event.clientY - 8}px`;
      instance.$el.style.left = `${event.clientX - 8}px`;
      this.$refs.divContainer.appendChild(instance.$el);

      setTimeout(() => {
        this.$refs.divContainer.removeChild(instance.$el);
      }, 1000);
    }
  },
  computed: {
    ...mapState("claps", ["claps"]),
    formatedApplauses() {
      if (this.claps) {
        return `${
          Math.abs(this.claps) > 999
            ? Math.sign(this.claps) * (Math.abs(this.claps) / 1000).toFixed(2) +
              "k"
            : Math.sign(this.claps) * Math.abs(this.claps)
        }`.replace(".", ",");
      } else {
        return "...";
      }
    }
  },
  created() {
    this.fetchClaps();
  },
  mounted: function() {
    window.setInterval(() => {
      this.fetchClaps();
    }, 1 * 60 * 1000); // 1 min
  }
};
</script>

<style lang="scss" scoped>
.clap {
  &:active {
    transform: scale(0.92);
  }
  transition: transform 0.1s;
  transition-property: transform;
  transition-duration: 0.1s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
</style>