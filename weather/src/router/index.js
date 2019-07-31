import Vue from 'vue'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/index.css';
import Index from '../views/index';

Vue.use(Router)
Vue.use(Vant);

import { Button } from 'vant';
Vue.use(Button);
import { NavBar } from 'vant';
Vue.use(NavBar);
import { Popup } from 'vant';
Vue.use(Popup);
import { Picker } from 'vant';
Vue.use(Picker);
import { Area } from 'vant';
Vue.use(Area);
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
import { List } from 'vant';
Vue.use(List);
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);


export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    }]
})