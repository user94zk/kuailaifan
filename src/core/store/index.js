import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      foodList:[],
      count:0,

  },
  mutations: {
      add(state,data){
          var bool=true
        if(state.foodList.length!=0){
             state.foodList.forEach(item=>{
               if(data.id==item.id){
                 item.num++;
                 bool=false
               }
             })
        }
        if(bool){
          data.num=1
          state.foodList.push(data)
        }
        
      }
  }
})

export default store