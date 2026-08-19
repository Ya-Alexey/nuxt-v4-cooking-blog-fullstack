<!-- eslint-disable vue/no-v-html -->
<template>
  <section 
    class="article-content"
    v-html="contentHTML"
  ></section>
</template>

<script lang="ts" setup>
const { contentHTML } = defineProps<{
  contentHTML: string
}>();

// NOTE примерная блочная структура, если дойдет до создания блоков
// const contentList = [
//   {
//     id: 1,
//     type: 'title',
//     attributes: {
//       mode: 'h-2'
//     },
//     content: 'Mise en Place', 
//   },
//   {
//     id: 2,
//     type: 'text',
//     content: "Picture succulent chicken infused with the bright notes of lemon and the aromatic richness of garlic. It's a symphony of flavors that will have your taste buds dancing. Join us as we delve into the art of roasting and uncover the secrets behind creating a masterpiece that's not just a meal but a celebration of culinary craftsmanship.",
//   },
//   {
//     id: 3,
//     type: 'text',
//     content: "As you preheat your oven, envision the kitchen filling with the tantalizing aroma of herbs and citrus, setting the stage for a delightful meal that transcends the ordinary. The anticipation builds as the chicken roasts to golden perfection, promising a dining experience that marries simplicity with sophistication. Whether you're a seasoned chef or a kitchen novice, this recipe invites you to become a culinary artist, creating a masterpiece that will leave a lasting impression on your guests and loved ones.",
//   },
//   {
//     id: 4,
//     type: 'title',
//     attributes: {
//       mode: 'h-3'
//     },
//     content: 'Let’s go over the basics– the do’s, and the don’ts– for How to Cook a chicken',
//   },
//   {
//     id: 5,
//     type: 'title',
//     attributes: {
//       mode: 'h-4'
//     },
//     content: 'Do’s:', 
//   },
//   {
//     id: 6,
//     type: 'list',
//     attributes: {
//       mode: 'ul',
//       items: [
//         {
//           type: 'list-item',
//           items: [
//             {
//               type: 'strong',
//               content: 'Thoroughly Clean Hands and Surfaces:'
//             },
//             {
//               type: 'text',
//               content: 'Before and after handling raw chicken, ensure your hands, utensils, and surfaces are clean to prevent cross-contamination.'
//             },
//           ],
//         },
//       ]
//     },
//     content: '', 
//   },
// ];
</script>

<style lang="scss" scoped>

</style>