<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row justify="center" align="center">
        <v-col>
          <div class="align-center">
            <h1>Poopr. Log your Logs!</h1>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
});
</script>
