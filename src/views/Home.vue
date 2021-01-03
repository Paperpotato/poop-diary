<template>
  <div class="home">
    <AddEntry />
  </div>
</template>

<script>
// @ is an alias to /src
import AddEntry from "@/components/AddEntry.vue";

export default {
  name: "Home",
  components: {
    AddEntry
  }
};
</script>
