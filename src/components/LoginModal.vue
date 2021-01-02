<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="headline">
          Please log in
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Username"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="yellow darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    dialog: false,
    username: ""
  }),
  methods: {
    submit() {
      this.dialog = false;
      localStorage.setItem("poopAccount", this.username);
    }
  },
  created() {
    this.dialog = localStorage.getItem("poopAccount") ? false : true;
  }
});
</script>
