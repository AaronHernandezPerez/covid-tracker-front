<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      polling: null
    };
  },
  name: "App",
  methods: {
    ...mapActions("novelCOVID", ["fetchReport"])
  },
  created() {
    this.fetchReport();
  },
  mounted: function() {
    this.polling = setInterval(() => {
      this.fetchReport();
    }, 15 * 60 * 1000); // 15 min
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
};
</script>
