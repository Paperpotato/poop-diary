<template>
  <v-container>
    <v-row class="text-center">
      <AddEntry />
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AddEntry from "./AddEntry.vue";

export default Vue.extend({
  name: "HelloWorld",
  components: { AddEntry },

  data: () => ({})
});
</script>
