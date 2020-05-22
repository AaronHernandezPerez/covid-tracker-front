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
    >
      <q-tooltip
        anchor="bottom middle"
        self="center middle"
        content-style="font-size: 15px"
        content-class="bg-black text-weight-bold text-blue-7"
      >¡Aplaude a los trabajadores esenciales!</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import Vue from "vue";
import PlusOneFade from "src/components/PlusOnefade";

export default {
  data() {
    return {
      aplauses: null
    };
  },
  methods: {
    clap() {
      this.aplauses++;
      this.$q.localStorage.set("aplauses", this.aplauses);
      console.log(event);

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
    formatedApplauses() {
      console.log(`${this.aplauses}`.length % 10);
      return Math.abs(this.aplauses) > 999
        ? Math.sign(this.aplauses) *
            (Math.abs(this.aplauses) / 1000).toFixed(2) +
            "k"
        : Math.sign(this.aplauses) * Math.abs(this.aplauses);
    }
  },
  created() {
    this.aplauses = this.$q.localStorage.getItem("aplauses");
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