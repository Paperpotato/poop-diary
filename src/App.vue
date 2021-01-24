<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row justify="center" align="center">
        <v-col>
          <div class="align-center">
            <h3>Poopr. Log your Logs!</h3>
          </div>
        </v-col>
        <!-- <v-btn @click='addPoop' color='green'>Add Poop!</v-btn> -->
        <v-btn @click="goToBank" color="green">Poop Bank</v-btn>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({}),
  methods: {
    goToBank() {
      this.$store.dispatch("clearFilters");
      this.$router.push("/bank");
    }
  }
});
</script>
