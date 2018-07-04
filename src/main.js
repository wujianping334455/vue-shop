// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload  from 'vue-lazyload';
import infiniteScroll from  'vue-infinite-scroll';

Vue.config.productionTip = false;
 // try  默认： 1 ， 后来升级为 attempt
Vue.use(VueLazyload, {loading: 'static/img/loading-svg/loading-bars.svg',try: 3});
Vue.use(infiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
