<template>
  <a class="link" href="https://ko-fi.com/aaronhp" target="_blank">
    <q-btn color="primary" no-caps>
      <img class="donate-icon q-mr-sm" src="https://storage.ko-fi.com/cdn/cup-border.png" />
      {{$t('donateTxt')}}
    </q-btn>
  </a>
</template>
<script>
export default {
  name: "KoFiBtn"
};
</script>

<style lang="scss" scoped>
.donate-icon {
  height: 20px !important;
  width: 30px !important;
  // animation: kofi-wiggle 3s infinite;
}
.link {
  text-decoration: none;
}

@keyframes kofi-wiggle {
  0% {
    transform: rotate(0) scale(1);
  }
  60% {
    transform: rotate(0) scale(1);
  }
  75% {
    transform: rotate(0) scale(1.12);
  }
  80% {
    transform: rotate(0) scale(1.1);
  }
  84% {
    transform: rotate(-10deg) scale(1.1);
  }
  88% {
    transform: rotate(10deg) scale(1.1);
  }
  92% {
    transform: rotate(-10deg) scale(1.1);
  }
  96% {
    transform: rotate(10deg) scale(1.1);
  }
  100% {
    transform: rotate(0) scale(1);
  }
}
</style>
