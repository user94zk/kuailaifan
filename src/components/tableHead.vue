<template>
  <div class="tab-wrapper">
      <div class="tab-item" v-for="(item,index) in table" :key="index" @click="setTab(index)"> 
          <a href="" :class="{active:num==index}">{{item}}</a>
      </div>
  
  </div>
</template>

<script>
export default {
  data(){
    return {
      table:["选购","评论","商家"],
      num:0
    }
  },
   computed:{
     index () {
       this.$eventHub.$on("setTab", res => {
         this.num = res;
       })
       
     }
  },
  methods: {
      setTab(index){
        this.$eventHub.$emit("setTab",index);
        this.num=index;
      }
  }
}


</script>

<style lang="scss" scoped>
.tab-wrapper{
        position: relative;
    z-index: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #fff;
    height: 40.5px;
    .tab-item{
    -ms-flex: 1;
    flex: 1;
    height: 40.5px;
    text-align: center;
    a{
    display: inline-block;
    padding: 0 11.719px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
        color: #676767;
    }
    .active{
        color: #373737;
    font-weight: 900;
    border-bottom: 2px solid #f87a7c;
    }
    }
}


</style>
