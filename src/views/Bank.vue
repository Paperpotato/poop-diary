<template>
  <div class="about">
    <h1>This is your poop bank</h1>
    <PoopCollection />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PoopCollection from "../components/PoopCollection.vue";

export default Vue.extend({
  name: "PoopCollection",
  components: { PoopCollection }
});
</script>
