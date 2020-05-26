<template>
  <q-layout>
    <q-header elevated class="text-white" style="background: #24292e" height-hint="61.59">
      <q-toolbar class="items-stretch q-py-sm q-px-md">
        <!-- <q-btn
          v-if="$q.screen.lt.md"
          flat
          @click="drawerLeft = !drawerLeft"
          round
          dense
          icon="menu"
          class="q-mr-md"
        />-->
        <router-link class="title text-center" to="/">
          <div class="flex items-center justify-center">
            <q-icon name="img:statics/isolated_trimed.svg" color="red" />Status Covid
          </div>
        </router-link>

        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold flex items-center no-wrap"
        >
          <router-link
            v-for="menu in menus"
            v-bind:key="menu.label"
            :to="menu.route"
          >{{$t(menu.label)}}</router-link>
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm flex items-center">
          <ApplauseBtn />

          <Ko-fi-btn />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      :width="200"
      :breakpoint="500"
      overlay
      bordered
      v-if="$q.screen.lt.md"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menu, index) in menus" :key="index">
          <q-item clickable :to="menu.route" v-ripple @click="closeDrawer()">
            <q-item-section avatar>
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>{{ $t(menu.label) }}</q-item-section>
          </q-item>

          <q-separator v-if="menu.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ApplauseBtn from "src/components/ApplauseBtn";
import KoFiBtn from "src/components/KoFiBtn";

export default {
  name: "MyLayout",
  data() {
    return {
      menus: [
        // {
        //   icon: "fas fa-chart-line",
        //   label: "Tracker",
        //   route: "/",
        //   separator: false
        // }
        // { icon: "inbox", label: "Test", route: "/test", separator: false }
      ],
      drawerLeft: false
    };
  },
  methods: {
    closeDrawer() {
      this.drawerLeft = false;
    }
  },
  components: {
    ApplauseBtn,
    KoFiBtn
  }
};
</script>

<style lang="scss" scoped>
.GL__toolbar-link {
  font-size: 19px;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }

    &.router-link-active {
      color: $primary;
    }
  }
}

.q-drawer-container {
  .q-item {
    .q-item__section--main {
      color: white;
    }
    &.q-router-link--active {
      background-color: #424242;
    }
  }
}

.title {
  font-size: 3em;
  text-decoration: none;
  color: white;

  // &:active {
  //   color: lightgray;
  // }

  // img {
  //   display: none;
  // }
}

@media (min-width: 680px) {
  .title img {
    display: block;

    margin-right: 0.25em;
  }
}
</style>