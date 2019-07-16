<template>
  <div class="content">
    <div class="small-goods-wrapper">
      <div class="goods-content">
        <scroll-view scroll-y class="menu-wrapper">
          <ul class="menu-list">
            <li class="item">
              <i class="iconfont icon-search"></i>
            </li>
            <li
              class="item all-goods"
              v-for="(item,index) in  goodsList"
              :key="index"
              @click="sel(index)"
              :class="{actived:currentNum==index}"
            >
              <span class="name">{{item.typeName}}</span>
            </li>
          </ul>
        </scroll-view>
        <scroll-view
          scroll-y
          class="goods-wapper"
          :scroll-into-view="scrollId"
          scroll-with-animation
          @scroll="scroll"
          @scrolltolower="scrolltolower"
        >
          <ul class="goods-list">
            <li class="goods-item" v-for="(item,index) in goodsList" :key="index">
              <p class="title-text" :id="'po'+index">{{item.typeName}}</p>
              <ul class="foodlist-wrapper">
                <li class="food-item" v-for="(it,dex) in item.foodList" :key="dex">
                  <div class="food-info">
                    <div class="img-wrapper">
                      <img :src="it.img" />
                    </div>
                    <div class="goods-wrapper">
                      <div class="name">{{it.name}}</div>
                      <div class="desc">{{it.descript}}</div>
                      <div class="ordered_count"></div>
                      <div class="food-block clear">
                        <div class="price">
                          ¥{{it.price}}
                          <span class="class">/{{it.unit}}</span>
                          <span class="oldprice">¥{{it.formerprice}}</span>
                        </div>

                        <div class="cart">
                          <button class="add" @click="add(it)">+</button>
                          <span class="num" v-if="it.number!=0">{{it.number}}</span>
                          <button class="del" @click="del(it)" v-if="it.number!=0">-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </scroll-view>
      </div>
    </div>
      <cart></cart>
  </div>
</template>



<script>
import "../../static/iconfont/iconfont.css";
import cart from "@/components/cart"
export default {
  data() {
    return {
      headList: {},
      goodsList: [],
      scrollId: "",
      listHeight: [],
      scrollTop: 0,
      currentNum: 0,
  
    };
  },
  components:{
      cart
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
              res.data.foodlist[n].number = 0;
              goodsList[i].foodList.push(res.data.foodlist[n]);
            }
          }
        }
        this.goodsList = goodsList;
        wx.hideLoading();
        setTimeout(() => {
          this.getNodes();
        }, 80);
      });
    },
    sel(index) {
      this.scrollId = "po" + index;
    },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    getNodes() {
      var query = wx.createSelectorQuery();
      query
        .selectAll(".goods-item")
        .boundingClientRect(nodes => {
          console.log(nodes);
          nodes.map(item => {
            this.listHeight.push(item.top);
          });
        })
        .exec();
    },
    scrolltolower() {
      setTimeout(() => {
        this.currentNum = this.listHeight.length - 1;
      }, 80);
    },
    add(item) {
      item.number++;
      // console.log(item.number)
    },
    del(item) {
      if (item.number <= 0) {
        return;
      }
      item.number--;
    },

  },
  computed: {
    currentIndex() {
      for (var i = 0; i < this.listHeight.length; i++) {
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        // console.log(height1,height2);
        if (
          this.scrollTop + this.listHeight[0] >= height1 &&
          this.scrollTop + this.listHeight[0] < height2
        ) {
          this.currentNum = i;
          return i;
        }
      }
      return 0;
    }
  },
  mounted() {
    wx.showLoading({
      title: "加载中"
    });

    this.getHead();
    this.getFood();
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  left: 0;
  top: 140px;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #e7e7e7;
  .small-goods-wrapper {
    height: 100%;
    overflow: hidden;
    .goods-content {
      position: absolute;
      left: 0;
      top: 40px;
      right: 0;
      bottom: 0;
      .menu-wrapper {
        position: absolute;
        left: 0;
        top: -40px;
        bottom: 295px;
        width: 80px;
        background-color: #f2f2f2;
        height: 100%;
        height: 462px;
        .menu-list {
          padding: 0 !important;
          list-style: none;
          height: 302.5px;
          .item:first-child {
            height: 52.5px;
            width: 80.5px;
            .icon-search {
              font-size: 25px;
              color: #707070;
            }
          }
          .item {
            position: relative;
            display: flex;
            width: 80.5px;
            color: #676767;
            height: 50px;
            box-sizing: border-box;
            vertical-align: middle;
            text-align: center;
            font-size: 13px;
            justify-content: center;
            align-items: center;
            padding: 0 5px;
            border-left: 2.5px solid transparent;
            .name {
              line-height: 15px;
            }
          }
          .actived {
            width: 80px;
            color: #f87a7c;
            background-color: #fff;
            border-left: 2.5px solid #f87a7c;
          }
        }
      }
      .goods-wapper {
        position: absolute;
        left: 90px;
        top: -40px;
        right: 10px;
        bottom: 1.962666666666667rem;
        width: 275px;
        height: 462px;
        .goods-item {
          min-height: 5rem;
          position: relative;
          .title-text {
            padding-left: 11.7px;
            margin-top: 11.7px;
            min-height: 16px;
            line-height: 16px;
            font-size: 16px;
            border-left: 2.5px solid #f87a7c;
          }
          .foodlist-wrapper {
            .food-item {
              position: relative;
              padding: 13px 0;
              border-bottom: 1px solid #e7e7e7;
              .food-info {
                .img-wrapper {
                  float: left;
                  position: relative;
                  width: 62px;
                  height: 62px;
                  background-color: #ebebeb;
                  img {
                    position: absolute;
                    width: 62px;
                    height: 62px;
                  }
                }
                .goods-wrapper {
                  margin-left: 71px;

                  font-size: 0;
                  .name {
                    line-height: 22px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size: 16px;
                    color: #2f2f2f;
                    margin-bottom: 5px;
                  }
                  .desc {
                    font-size: 12px;
                    color: #a9a9a9;
                    margin-bottom: 2.5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    width: 204px;
                  }
                  .ordered_count {
                    display: inline-block;
                    margin-right: 15px;
                    vertical-align: middle;
                    color: #999;
                    height: 15.5px;
                  }
                  .food-block {
                    position: relative;
                    overflow: hidden;
                    font-size: 0;
                    .price {
                      float: left;
                      margin-right: 5px;
                      color: #f87a7c;
                      font-size: 17px;
                      line-height: 27px;
                      vertical-align: middle;
                      .class {
                        font-size: 12px;
                        color: #a9a9a9;
                        margin-right: 1px;
                      }
                      .oldprice {
                        font-size: 10px;
                        color: #a9a9a9;
                        text-decoration: line-through;
                      }
                    }
                    .cart {
                      float: right;
                      overflow: hidden;
                      .del {
                        width: 25px;
                        height: 25px;
                        float: left;
                        line-height: 25px;
                        text-align: center;
                        padding: 0;
                        border-radius: 50%;
                        background: green;
                      }
                      .num {
                        display: block;
                        width: 25px;
                        height: 25px;
                        float: left;
                        font-size: 16px;
                        text-align: center;
                      }
                      .add {
                        width: 25px;
                        height: 25px;
                        float: left;
                        line-height: 25px;
                        text-align: center;
                        padding: 0;
                        border-radius: 50%;
                        background: green;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 
}
</style>
