import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import NP from 'number-precision'


import { Tag, Grid, GridItem, Divider, RadioGroup, Radio, DatetimePicker, Search, Popup, Progress, Uploader, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, GoodsAction, GoodsActionIcon, GoodsActionButton, SubmitBar, Toast } from 'vant'
Vue.use(Tag).use(Grid).use(GridItem).use(Divider).use(DatetimePicker).use(RadioGroup).use(Radio).use(Popup).use(Search).use(Progress).use(Uploader).use(Overlay).use(Loading).use(Dialog).use(Toast).use(ContactCard).use(Form).use(AddressEdit).use(AddressList).use(Field).use(CellGroup).use(Cell).use(SwipeCell).use(Icon).use(Stepper).use(Card).use(Button).use(Swipe).use(SwipeItem).use(PullRefresh).use(List).use(Tab).use(Tabs).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(SubmitBar).use(Checkbox).use(CheckboxGroup)


const moment = require("moment");
const tool = require('lodash');

Vue.use(ElementUI)


//重置data数据
Vue.prototype.resetData = (obj, that) => {
  // console.log('重置数据')
  that.$data[obj] = that.$options.data()[obj]
}

Vue.prototype.$moment = moment
Vue.prototype.$tool = tool
Vue.prototype.$sum = NP

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
