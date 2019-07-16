<template>
  <div class="main">
    <div class="shop-wrapper">
      <div class="shop-book_wrap shop-book_top">
        <div class="mask-block"></div>
        <div class="logo-bg"></div>
        <div class="header-wrapper">
          <div class="f-block-1">
            <div class="u-avator u-avator-noshow">
              <img :src="headList.image" />
            </div>
            <div class="u-block-1">
              <div class="u-shopname text-overflow">{{headList.shopname}}</div>
              <div class="gonggao">
                <span class="iconfont icon-weibiaoti1"></span>
                <div class="text text-overflow">{{headList.shop_notice}}</div>
              </div>
            </div>
            <div class="u-collect">
              <p class="icon-wrapper">
                <span class="iconfont icon-aixin"></span>
              </p>
              <p class="text">收藏</p>
            </div>
          </div>
          <div class="f-block-2"></div>
        </div>
        <tableHead></tableHead>
         <shouye v-if="tabNum==0"></shouye>
         <pingjia v-if="tabNum==1"></pingjia>
         <shop  v-if="tabNum==2"></shop>
      </div>
      <div></div>
    </div>
     <!-- <cart></cart> -->
  </div>
</template>

<script>
import tableHead from "@/components/tableHead";
import shop from "@/components/shop";
import pingjia from "@/components/pingjia";
import shouye from "@/components/shouye";
// import cart from "@/components/cart"
import "../../../static/iconfont/iconfont.css";
export default {
  data() {
    return {
      headList: {},
      goodsList: [],
      tabNum:0
    };
  },
  components: {
    tableHead,
    shouye,
    shop,
    pingjia,
    // cart
  },

  methods: {
    getHead() {
      this.$apis.getHead().then(res => {
        this.headList = res.data;
      });
    },
    getFood() {
      let goodsList = [];
      this.$apis.getFood().then(res => {
        for (var i = 0; i < res.data.foodtype.length; i++) {
          goodsList.push({
            typeName: res.data.foodtype[i].name,
            type_id: res.data.foodtype[i].id,
            foodList: []
          });
          for (var n = 0; n < res.data.foodlist.length; n++) {
            if (res.data.foodtype[i].id == res.data.foodlist[n].type_id) {
              goodsList[i].foodList.push(res.data.foodlist[n]);
            }
          }
        }
        this.goodsList = goodsList;
        console.log(this.goodsList);
      });
    }
  },
  mounted() {
    this.getHead();
    this.getFood();
      this.$eventHub.$on("setTab",(res)=>{
      this.tabNum=res;
      console.log(this.tabNum);
      })
}
}
</script>

<style lang="scss" scoped>
.main{
  height: 100%;
}
.shop-wrapper {
  z-index: 10;
  background-color: #fff;
  overflow: hidden;
  .mask-block {
    background-image: url(http://img.zhipuzi.com/upload_files/image/20190525/cae29Soa7761JuMGuhL1GRrIKg1gN44g.jpg);
    filter: blur(50px);
    background-repeat: no-repeat;
    background-size: cover;
    height: r(100);
  }
  .logo-bg {
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 0;
    height: r(100);
    width: 100%;
    background-image: url(../../assets/bg.png);
  }
  .header-wrapper {
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 100px;
    width: 100%;
    .f-block-1 {
      padding: 10px 10px 18px 10px;
      height: 43px;
      clear: both;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      .u-avator-noshow {
        float: left;
        height: 51px;
        width: 51px;
        border-radius: 50%;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .u-block-1 {
        flex: 1;
        height: 52px;
        padding-left: 12px;
        padding-top: 8px;
        overflow: hidden;
        .u-shopname {
          color: #fff;
          font-size: 16px;
          line-height: 16px;
          margin-bottom: 6px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .gonggao {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #fff;
          line-height: 20px;
          .icon-weibiaoti1 {
            float: left;
            margin-top: 2.5px;
            width: 15.5px;
            height: 14px;
            font-size: 14px;
            /* display: inline-block; */
          }
          .text {
            margin-left: 22.5px;
            font-size: 14px;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .u-collect {
        float: right;
        margin-top: 9px;
        position: relative;
        width: 60px;
        border-left: 0.5px solid #fff;
        height: 42px;
        .icon-wrapper {
          text-align: center;
          margin: 0;
          .icon-aixin {
            width: 19px;
            height: 17.5px;
            font-size: 16px;
            color: #fff;
          }
        }
        .text {
          margin-top: 6px;
          color: #fff;
          font-size: 16px;
          text-align: center;
          margin: 0;
        }
      }
    }
    .f-block-2 {
      height: 30px;
      margin: 0 10px;
      padding-top: 2px;
      border-top: 1px dashed #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
}
</style>


