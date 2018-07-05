import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import GoodsList from '@/views/GoodsList'
// import Cart from '@/views/Cart'

const GoodsList = () => import('@/views/GoodsList');
const Cart = () => import('@/views/Cart');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: GoodsList
    },
    {
      path: '/GoodsList',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
