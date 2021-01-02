import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);
import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  theme: { dark: true }
  // theme: {
  //   dark: true,
  //   themes: {
  //     light: {
  //       primary: colors.purple,
  //       secondary: colors.grey.darken1,
  //       accent: colors.shades.black,
  //       error: colors.red.accent3,
  //     },
  //     dark: {
  //       primary: colors.blue.lighten3,
  //     },
  //   },
  // },
});
