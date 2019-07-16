import fly from "./http"

class Apis {
    // test() {
    //     // 贝思客蛋糕
    //     return fly.get("/getjson.ashx", {
    //         v: "1562722622906",
    //         c: "Index",
    //         m: "GetBannerList",
    //         Type: "1",
    //         City: "上海",
    //         BrandType: "1"
    //     })
    // }
    getfood() {
        return fly.request("/customer/common/page/food/choose?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            food_type: 1,
            shop_id: 374933,
            from_type: 1
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    getHead(){
        return fly.request("/customer/common/page/food/choose?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            lwm_sess_token: 'sdnsujdlf3fbqov9mltnnktv16',
            food_type: '1',
            shop_id: '374933',
            from_type: '1',
            timestamp: '1562762360',
            nonce: '32953',
            sign: '317A98F62B3277FF5D6E10AE646A7236'
            
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    getFood(){
        return fly.request("/customer/common/page/food/choose?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            lwm_sess_token: 'sdnsujdlf3fbqov9mltnnktv16',
            food_type: '1',
            shop_id: '374933',
            from_type: '1',
            timestamp: '1562762360',
            nonce: '32953',
            sign: '317A98F62B3277FF5D6E10AE646A7236'
            
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    getShop(){
        return fly.request("/customer/common/shop/shop/info?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            lwm_sess_token: 'sdnsujdlf3fbqov9mltnnktv16',
            food_type: '1',
            shop_id: '374933',
            from_type: '1',
            timestamp: '1562902756',
            nonce: '13563',
            sign: '0A899D76A70D420B82F3D6139B8DA48A'
            
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    getList(tag){
        return fly.request("/customer/crm/communion/comment/list", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            lwm_sess_token: 'sdnsujdlf3fbqov9mltnnktv16',
            shop_id: '374933',
            timestamp: '1562923403',
            nonce: '27606',
            num:'20',
            page:'0',
            tag,
            sign: '5F8243CB780AC42F91B6F911A63C28B1'
            
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
}
export default new Apis();