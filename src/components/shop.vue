<template>
  <!-- 商家组件 -->
  <div class="seller-wrapper">
    <scroll-view class="_v-container" scroll-y>
      <div class="banner-wrapper">
        <img
          src="https://img.zhipuzi.com/upload_files/image/20190525/cae29Soa7761JuMGuhL1GRrIKg1gN44g.jpg!width600"
        />
      </div>
      <div class="list-item" @click="toshop">
        <ul>
          <li>
            <div class="rating-star">
              <div class="star-wrapper">
                <ul class="star-list">
                  <li>
                    <div class="item-wrapper">
                      <div class="star-score">
                        <div class="star-inner"></div>
                      </div>
                      <div class="star-default"></div>
                    </div>
                  </li>
                  <li>
                    <div class="item-wrapper">
                      <div class="star-score">
                        <div class="star-inner"></div>
                      </div>
                      <div class="star-default"></div>
                    </div>
                  </li>
                  <li>
                    <div class="item-wrapper">
                      <div class="star-score">
                        <div class="star-inner"></div>
                      </div>
                      <div class="star-default"></div>
                    </div>
                  </li>
                  <li>
                    <div class="item-wrapper">
                      <div class="star-score">
                        <div class="star-inner"></div>
                      </div>
                      <div class="star-default"></div>
                    </div>
                  </li>
                  <li>
                    <div class="item-wrapper">
                      <div class="star-inner_last">
                        <div class="star-inner"></div>
                      </div>
                      <div class="star-default"></div>
                    </div>
                  </li>
                </ul>
                <div class="score-text active">{{commentgrade}}分</div>
              </div>
              <i>
                <img src="../assets/right.png" />
              </i>
              <span class="comment_num">{{shopList.comment_num}}人评价</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="b_t_20">
        <ul>
          <li>
            <div>
              <i>
                <img src="../assets/dingwei.png" />
              </i>
              <span class="shopaddress">{{shopList.shopaddress }}</span>
              <i class="it">
                <img src="../assets/right.png" />
              </i>
            </div>
          </li>
          <li>
            <div class="tel-phone">
              <i>
                <img src="../assets/tle.png" />
              </i>
              <span class="shopaddress">{{shopList.orderphone}}</span>
              <span class="it">
                <img src="../assets/dianhua.png" class="tel" :style="{width:'20px',height:'20px'}" />
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="b_t_20">
        <ul>
          <li>
            <div  @click="handleOpen4">
              <i>
                <img src="../assets/time.png" />
              </i>
              <span class="shopaddress">营业时间：</span>
              <p class="work-time">
                <span class="time">{{startList[0]}}-{{endList[0]}}</span>
                <span class="time">{{startList[1]}}-{{endList[1]}}</span>
              </p>
              <i class="it">
                <img src="../assets/right.png" />
              </i>
           
            </div>
                <i-modal :visible="visible4" @ok="handleClose4" @cancel="handleClose4">
                <view>营业时间：{{startList[0]}}-{{endList[0]}}{{startList[1]}}-{{endList[1]}}</view>
              </i-modal>
          </li>
          <li>
            <div>
              <i>
                <img src="../assets/dingwei.png" />
              </i>
              <span class="shopaddress">服务区域：点此查看区域</span>
              <i class="it">
                <img src="../assets/right.png" />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <div class="b_t_20">
        <ul>
          <li>
            <div @click="handleOpen2">
              <i>
                <img src="../assets/qi.png" />
              </i>       
              <span>起送价：{{shopList.basicprice}}元</span>
              <i class="it">
                <img src="../assets/right.png" />
              </i>
            </div>
               <i-modal :visible="visible2" @ok="handleClose2" @cancel="handleClose2">
                <view>起送价：{{shopList.basicprice}}元</view>
              </i-modal>
          </li>
          <li>
            <div @click="handleOpen3">
              <i>
                <img src="../assets/end.png" />
              </i>
              <span class="shopaddress">配送费：{{shopList.delivery_fee}}元</span>
              <i class="it">
                <img src="../assets/right.png" />
              </i>
            </div>
              <i-modal :visible="visible3" @ok="handleClose3" @cancel="handleClose3">
                <view>配送费：{{shopList.delivery_fee}}元</view>
              </i-modal>
          </li>
        </ul>
      </div>
      <div class="tec_block">
        <div class="tec-block-wapper">
          <div class="tec-block-logo-wrapper">
            <img
              src="http://img.zhipuzi.com/upload_files/image/20190524/lKun1onwHMGWmX323vqFCvxmPUXHprbq.jpg!/fwfh/162x44"
            />
          </div>
          <img src="../assets/zz.png" class="logos" :style="{height:'10.5px'}" />
        </div>
      </div>
    </scroll-view>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopList: "",
      startList: [],
      endList: [],
      commentgrade: "",
        visible2: false,
        visible3: false,
        visible4: false
    };
  },
  methods: {
      handleOpen2 () {
            this.visible2=true
    },
    handleClose2 () {
            this.visible2=false
            
    },
        handleOpen3 () {
            this.visible3=true
    },
    handleClose3 () {
            this.visible3=false
            
    },    handleOpen4 () {
            this.visible4=true
    },
    handleClose4 () {
            this.visible4=false
            
    },
    getShop() {
      this.$apis.getShop().then(res => {
        this.shopList = res.data.shop;
        this.commentgrade = res.data.commentgrade;
        res.data.shop.business_hours.map((item, index) => {
          this.startList.push(item.start);
          this.endList.push(item.stop);
        });
        console.log(this.shopList);
      });
    },
    toshop() {
      this.$eventHub.$emit("setTab", 1);
    }
  },
  mounted() {
    this.getShop();
  }
};
</script>

<style lang="scss" scoped>
.seller-wrapper {
  height: 463px;
  background-color: #fff;
  ._v-container {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      width: 100%;
      height: 265px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .list-item {
      ul {
        background-color: #fff;
        li {
          /* overflow: hidden; */
          div {
            position: relative;
            font-size: 0.597333333333333rem;
            line-height: 0.725333333333333rem;
            vertical-align: middle;
            /* margin-left: 7px; */
          }
          .rating-star {
            height: 38.5px;
          }
          .star-wrapper {
            display: inline-block;
            height: 14px;
            overflow: hidden;

            .star-list {
              float: left;
              overflow: hidden;
              width: 100px;
              height: 14px;
              li {
                float: left;
                margin-right: 6px;
                width: 14px;
                .item-wrapper {
                  width: 14px;
                  height: 14px;
                  margin-left: 6px;
                  .star-score {
                    position: absolute;
                    z-index: 2;
                    overflow: hidden;
                    width: 14px;
                    height: 14px;
                    background-size: cover;
                    .star-inner {
                      width: 14px;
                      height: 14px;
                      background: url(../assets/start2.png);
                      background-size: cover;
                    }
                  }
                  .star-default {
                    z-index: 1;
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    background-image: url(../assets/start.png);
                    background-size: cover;
                  }
                  .star-inner_last {
                    position: absolute;
                    z-index: 2;
                    width: 7px;
                    height: 14px;
                    overflow: hidden;
                    .star-inner {
                      width: 14px;
                      height: 14px;
                      background-image: url(../assets/start2.png);
                      background-size: cover;
                    }
                  }
                  .star-default {
                    z-index: 1;
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    background-image: url(../assets/start.png);
                    background-size: cover;
                  }
                }
              }
            }
            .score-text {
              float: left;
              font-size: 14px;
              line-height: 14px;
              height: 14px;
              color: #fcbb2b;
              margin-left: 15px;
            }
          }
          i {
            float: right;
            margin-right: 18px;
            img {
              width: 7px;
              height: 12px;
              vertical-align: middle;
            }
          }
          .comment_num {
            float: right;
            margin-right: 18px;
            color: #373737;
            line-height: 38px;
            font-size: 14px;
            height: 20px;
          }
        }
      }
    }
    .b_t_20 {
      border-top: 10px solid #f5f5f5;
      ul {
        li {
          div {
            font-size: 17px;
            line-height: 19.5px;
            vertical-align: middle;
            padding: 14px 0 12px;
            margin-left: 16.4px;
            border-bottom: 1.5px solid #f5f5f5;
            height: 19.5px;
            i:first-child {
              margin-right: 0.512rem;
              float: left;
              vertical-align: top;
              img {
                vertical-align: middle;
                width: 17px;
                height: 17px;
              }
            }

            .shopaddress {
              float: left;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              height: 17px;
              font-size: 15px;
              line-height: 17px;
            }
            .work-time {
              float: left;
              width: 210px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            span {
              font-size: 14px;
            }

            .it {
              float: right;
              margin-right: 18px;
              img {
                vertical-align: middle;
                width: 7px;
                height: 12px;
              }
            }
          }
          li:last-child div {
            border-bottom: none;
          }
        }
      }
    }
    .tec_block {
      .tec-block-wapper {
        background: #f5f5f5;
        background-size: cover;
        width: 100%;
        padding-top: 47px;
        padding-bottom: 94px;
        text-align: center;
        color: #b7b7b7;
        .tec-block-logo-wrapper {
          margin: 0 auto;
          img {
            width: 22px;
            height: 22px;
            display: block;
          }
        }
        img {
          display: block;
          margin: 0 auto;
          width: 103px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
