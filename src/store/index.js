import Vue from 'vue'
import Vuex from 'vuex'
import mainIndex from './main/main'
import homeIndex from './home/home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main: mainIndex,
    home: homeIndex
  }
})
