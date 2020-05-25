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

    // Specific language changes for meta
    switch (this.$language) {
      case "en":
        // console.log("The page is in English");
        break;
      case "es":
        // console.log("La página está en Español");
        break;

      default:
        break;
    }
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
