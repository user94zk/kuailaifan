<template>
  <!-- 评价组件 -->
  <scroll-view scroll-y>
    <div class="_v-container">
      <div class="comment-top">
        <div class="content-left">
          <div class="box">
            <div class="content-l-grade">
              <p class="number">{{commentgrade}}</p>
            </div>
            <div class="content-s size">
              <p class="total">平均得分</p>
            </div>
            <div class="content-t size">
              <div class="evalute-number">
                <p>
                  （评论数
                  <span class="num">{{numList}}</span>
                  条)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="comment_list">
            <div class="star-components-wrapper">
              <i-cell-group>
                <i-rate :count="5" :value="grade5"></i-rate>
              </i-cell-group>
            </div>
            <div class="total-star">{{commentgradePeople.grade_5}}</div>
          </div>
          <div class="comment_list-s">
            <div class="star-components-wrapper">
              <i-cell-group>
                <i-rate :count="5" :value="grade4"></i-rate>
              </i-cell-group>
            </div>
            <div class="total-star">{{commentgradePeople.grade_4}}</div>
          </div>
          <div class="comment_list-s">
            <div class="star-components-wrapper">
              <i-cell-group>
                <i-rate :count="5" :value="grade3"></i-rate>
              </i-cell-group>
            </div>
            <div class="total-star">{{commentgradePeople.grade_3}}</div>
          </div>
          <div class="comment_list-s">
            <div class="star-components-wrapper">
              <i-cell-group>
                <i-rate :count="5" :value="grade2"></i-rate>
              </i-cell-group>
            </div>
            <div class="total-star">{{commentgradePeople.grade_2}}</div>
          </div>
          <div class="comment_list-s">
            <div class="star-components-wrapper">
              <i-cell-group>
                <i-rate :count="5" :value="grade1"></i-rate>
              </i-cell-group>
            </div>
            <div class="total-star">{{commentgradePeople.grade_1}}</div>
          </div>
        </div>
      </div>
      <div class="comment-middle">
        <div class="comment-middle-wrap">
          <span
            class="comment-item"
            @click="sel(index)"
            v-for="(item,index) in tabList"
            :key="index"
            :class="{active:actived==index}"
          >{{item.name}}({{item.num}})</span>
        </div>
      </div>
      <div class="comment-bottom">
        <ul class="comment-list">
          <li v-for="(item,index) in infoList" :key="index">
            <div class="customer-name">
              {{item.lewaimai_customer_id}}
              <div class="star-wrapper">
                <i-cell-group>
                  <i-rate :count="5" :value="item.grade"></i-rate>
                </i-cell-group>
              </div>
            </div>
            <div class="customer-rating">{{item.content}}</div>
            <div class="comment-mark"></div>
            <div class="only-one">
              <img v-for="(el,ind) in item.imgurl" :key="ind" :src="'https://img.zhipuzi.com'+el" />
            </div>
            <p class="date">{{item.time}}</p>
          </li>
        </ul>
      </div>
    </div>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      grade1: 1,
      grade2: 2,
      grade3: 3,
      grade4: 4,
      grade5: 5,
      tabList: [],
      actived: 0,
      numList: [],
      commentgrade: [],
      commentgradePeople: [],
      infoList: []
    };
  },
  methods: {
    // 评论打分接口
    getShops() {
      this.$apis.getShop().then(res => {
        wx.hideLoading();
        this.tabList = res.data.tag_num;
        this.commentgradePeople = res.data.commentgradePeople;
      });
    },
    // 评价详情接口
    getList(actived) {
      wx.showLoading({});
      this.$apis.getList(actived).then(res => {
        wx.hideLoading();
        this.numList = res.data.commentPeople;
        this.commentgrade = res.data.commentgrade;
        this.infoList = res.data.comments;
      });
    },
    sel(index) {
      this.actived = index;
    }
  },
  mounted() {
    this.getShops();
    this.getList();
  },
  watch: {
    actived: function(ac) {
      this.getList(ac);
    }
  }
};
</script>

<style lang="scss" scoped>
._v-container {
  width: 100%;
  height: 463px;
  .comment-top {
    height: 145px;
    background-color: #fff;
    .content-left {
      float: left;
      padding-bottom: 21.5px;
      width: 158.5px;
      .box {
        border-right: 1.5px solid #ebebeb;
        .content-l-grade {
          text-align: center;
          margin-top: 25px;
          padding-bottom: 15px;
          .number {
            text-align: center;
            font-size: 30px;
            color: #df5458;
          }
        }
        .content-s {
          font-size: 14px;
          color: #676767;
          text-align: center;
          margin-bottom: 6px;
        }
        .content-t {
          font-size: 14px;
          color: #676767;
          text-align: center;
          .num {
            color: #df5458;
          }
        }
      }
    }
    .content-right {
      float: right;
      width: 213px;
      .comment_list {
        height: 18px;
        margin-left: 34.5px;
        margin-top: 18px;
        .star-components-wrapper {
          height: 18px;
          display: inline-block;
          float: left;
          margin-right: 14px;
        }
        .total-star {
          display: inline-block;
          color: #fdbc3f;
          font-size: 14px;
          font-weight: 700;
          margin-top: 6.5px;
        }
      }
      .comment_list-s {
        border: none;
        height: 18px;
        margin-left: 34.5px;
        margin-top: 5px;
        .star-components-wrapper {
          height: 18px;
          display: inline-block;
          float: left;
          margin-right: 14px;
        }
        .total-star {
          display: inline-block;
          color: #fdbc3f;
          font-size: 14px;
          font-weight: 700;
          margin-top: 6.5px;
        }
      }
    }
  }
  .comment-middle {
    border-top: 10px solid #ebebeb;
    border-bottom: 10px solid #ebebeb;
    padding-bottom: 10px;
    .comment-middle-wrap {
      margin-left: 9px;
      margin-right: 15px;
      margin-top: 6px;
      .comment-item {
        padding: 0 14px;
        text-align: center;
        color: #c2c2c2;
        height: 29px;
        display: inline-block;
        line-height: 29px;
        font-size: 12px;
        border-radius: 15px;
        border: 2px solid #c2c2c2;
        margin-left: 9px;
        margin-top: 9px;
      }
      .active {
        border-color: #f87a7c !important;
        color: #f87a7c !important;
        background-color: #ffe7e7;
      }
    }
  }
  .comment-bottom {
    background: #fff;
    .comment-list {
      margin-left: 18px;
      li {
        .customer-name {
          height: 18.5px;
          line-height: 18.5px;
          font-size: 16px;
          font-weight: 700;
          color: #373737;
          margin-top: 12.5px;
          vertical-align: middle;
          .star-wrapper {
            float: right;
            display: inline-block;
            height: 14px;
            margin-right: 14px;
          }
        }
        .customer-rating {
          font-size: 12px;
          color: #373737;
          margin-top: 12px;
          margin-right: 18px;
        }
        .comment-mark {
          color: #999;
          font-size: 0.512rem;
          margin-top: 10px;
          line-height: 0.810666666666667rem;
        }
        .only-one {
          margin-top: 8px;
          img {
            width: 175px;
            height: 175px;
          }
        }
        .date {
          text-align: right;
          font-size: 12px;
          color: #676767;
          height: 20px;
          line-height: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
