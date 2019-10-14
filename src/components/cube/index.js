import DatePicker from "./date-picker/index.js";
import { processComponentName } from './common/helpers/util';
import createAPI from "./common/helpers/createApi.js";
import BetterScroll from "./better-scroll";

const components = [
    DatePicker
]

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  components.forEach((Component) => {
    // ignore radio
    // if (Component === Radio) {
    //   return
    // }
    Component.install(Vue)
  })
}

const Cubepro = {
  /* eslint-disable no-undef */
//   version: '1.12.20',
  install,
  BScroll: BetterScroll,
  createAPI
}
// console.log(install, "installs");

components.forEach((Component) => {
  const name = processComponentName(Component, {
    firstUpperCase: true
  })
    Cubepro[name] = Component
})

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default Cubepro;
