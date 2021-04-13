import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/app.css'
import '@/permission'
import relativeTime from 'dayjs/plugin/relativeTime';

//e-icon-picker
import iconPicker from 'e-icon-picker';
import "e-icon-picker/dist/symbol.js";
import 'e-icon-picker/dist/index.css';
import 'font-awesome/css/font-awesome.min.css';

// 国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})

Vue.use(Buefy)
Vue.use(ElementUI);
Vue.use(iconPicker, {FontAwesome: true, ElementUI: true, eIcon: true, eIconSymbol: true});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
