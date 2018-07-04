<template>
  <div class="hello">
    <nav-header></nav-header>
    <nav-breader></nav-breader>
    <div class="accessory-result-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">排序:</span>
                <a href="javascript:void(0)" class="default cur" @click="defualtGoods">默认</a>
                <a href="javascript:void(0)" class="price" :class="{'sort-up':sortFlag}" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby" @click.stop="showFilterPop">筛选</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter" id="filter" v-bind:class="{'filterby-show':filterBy}">
                    <dl class="filter-price">
                        <dt>价格区间:</dt>
                        <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur':priceChecked=='all'}" >选择价格</a></dd>
                        <dd v-for="(item,index) in priceFilter" :key="index">
                          <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked==index}" >￥ {{item.startPrice}} - {{item.endPrice}} 元</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in goodsList" :key="index">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="view-more-normal"
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="busy"
                        infinite-scroll-distance="20">
                        <img src="./../../static/img/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <nav-footer> </nav-footer>
  </div>
</template>

<script>
import '../assets/css/base.css';
import '../assets/css/goods-list.css';

import NavHeader from '../components/NavHeader';
import NavFooter from '../components/NavFooter';
import NavBreader from '../components/NavBreader';

import axios from 'axios';
export default {
  data () {
    return {
      goodsList:[]
      ,priceFilter:[
        {
          startPrice:'0.00',
          endPrice:'1000.00'
        },
        {
          startPrice:'1000.00',
          endPrice:'2000.00'
        },
        {
          startPrice:'2000.00',
          endPrice:'3000.00'
        },
        {
          startPrice:'3000.00',
          endPrice:'4000.00'
        },
        {
          startPrice:'4000.00',
          endPrice:'5000.00'
        },
        {
          startPrice:'5000.00',
          endPrice:'6000.00'
        }
      ]
      ,priceChecked:'all'
      ,filterBy:false
      ,overLayFlag:false
      ,page : 1
      ,pageSize : 10
      ,sortFlag:true,
      busy:true,
      loading:false
    }
  }
  ,components:{NavHeader,NavFooter,NavBreader}
  ,mounted(){
    this.getGoodsList();
  }
  ,methods:{
    getGoodsList(flag){
      var param = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag?1:-1
      };
      this.loading = true;
      axios.get('http://localhost:3000/goods',{
        params : param
      }).then(res=>{
        const result = res.data;
        this.loading = false;
        if(result.status=="200"){
            if(flag){
                this.goodsList = this.goodsList.concat(result.data);
                if(result.length==0){
                    this.busy = true;
                }else{
                    this.busy = false;
                }
            }else{
                this.goodsList = result.data;
                this.busy = false;
            }
        }else {
            this.goodsList = [];
        }
      });
    },
    setPriceFilter(param){
      console.log(param);
      this.priceChecked = param;
    }
    ,showFilterPop(){
      this.filterBy = true;
      this.overLayFlag=true;
    },
    closePop(){
      this.filterBy=false;
      this.overLayFlag=false;
      this.mdShowCart = false;
    }
    ,defualtGoods(){
      this.sortFlag = true;
      this.page = 1;
      this.getGoodsList();
    }
    ,sortGoods(){
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    }
    ,loadMore(){
      this.busy = true;
      setTimeout(()=>{
        this.page++;
        this.getGoodsList(true);
      },500)
    }
  }
}
</script>
<style>
.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 10px;
}
</style>
