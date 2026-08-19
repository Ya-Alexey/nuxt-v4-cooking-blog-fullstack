<template>
  <svg class="svg-icon" v-bind="$attrs">
    <use :href.attr="`#${props.name}`" />
  </svg>
</template>

<script setup>
// NOTE в оригинальном компоненте SvgIcon был косяк с варнингом :href.attr
// заплатка до фикса
// import * as App from '#app'
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

// Подтягиваем дефолтный класс 
// const config = App.useRuntimeConfig()
// const elementClass = config.public?.svgSprite?.elementClass || 'svg-icon'
</script>