<template>
  <div ref="divContainer">
    <q-btn
      outline
      :ripple="false"
      :label="formatedApplauses"
      @click="clap()"
      icon="fas fa-hands-wash"
      color="cyan"
      class="q-mr-sm clap"
      no-caps
      style="min-width: 150px;"
    >
      <q-tooltip
        anchor="bottom middle"
        self="center middle"
        content-style="font-size: 16px"
        content-class="bg-black text-weight-bold"
        :offset="[0, 25]"
      >{{$t('applauseTooltip')}}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import PlusOneFade from "src/components/PlusOnefade";

export default {
  data() {
    return {
      polling: null
    };
  },
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
        return this.$options.filters
          .numeral(this.claps, "0.00a")
          .replace(".", ",");
      } else {
        return "...";
      }
    }
  },
  created() {
    this.fetchClaps();
  },
  mounted: function() {
    this.polling = setInterval(() => {
      this.fetchClaps();
    }, 1 * 60 * 1000); // 1 min
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
};
</script>

<style lang="scss" scoped>
.clap {
  &:active {
    transform: scale(0.9);
  }
  transition: transform 0.1s;
  transition-property: transform;
  transition-duration: 0.1s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
</style>

<style lang="scss">
#q-app
  > div
  > header
  > div.q-toolbar.row.no-wrap.items-center.items-stretch.q-py-sm.q-px-md
  > div.q-pl-sm.q-gutter-sm.flex.items-center
  > div
  > button.clap
  > span.q-focus-helper {
  z-index: 2;
  display: none;
}
</style>