<template>
  <div class="about">
    <h1>This is your poop bank</h1>
    <PoopCollection />
    <!-- <v-btn @click="alert('meow')">meow</v-btn> -->
  </div>
</template>

<script lang="ts">
// import Vue from "vue";
import PoopCollection from "../components/PoopCollection.vue";

export default {
  name: "Bank",
  components: { PoopCollection }
};
</script>
