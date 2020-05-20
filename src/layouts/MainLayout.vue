<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: #24292e" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn round dense flat :ripple="false" :icon="fabGithub" size="19px" color="white" class="q-mr-sm" no-caps />

        <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
          <a href="javascript:void(0)" class="text-white">
            {{$t('tracker')}}
          </a>
          <a href="javascript:void(0)" class="text-white">
            
          </a>
          <a href="javascript:void(0)" class="text-white">
            Marketplace
          </a>
          <a href="javascript:void(0)" class="text-white">
            Explore
          </a>
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.xs" dense flat round size="sm" icon="notifications" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabGithub } from '@quasar/extras/fontawesome-v5'
const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
]
export default {
  name: 'MyLayout',
  data () {
    return {
      text: '',
      options: null,
      filteredOptions: []
    }
  },
  methods: {
    filter (val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = stringOptions
          this.$refs.search.filter('')
        }, 2000)
        update()
        return
      }
      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map(op => ({ label: op }))
        })
        return
      }
      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...this.options
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ]
      })
    }
  },
  created () {
    this.fabGithub = fabGithub
  }
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>