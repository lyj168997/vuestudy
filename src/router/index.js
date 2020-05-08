import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Edata from '@/views/Edata.vue'
import TakePhoto from '@/views/TakePhoto.vue'
import BtDate from '@/views/BtDate.vue'
import RemoveLog from '@/views/RemoveLog.vue'
import Cropper from '@/views/Cropper.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/edata',
		name: 'Edata',
		component: Edata
	},
	{
		path:'/takephoto',
		name:'TakePhoto',
		component:TakePhoto
	},
	{
		path:'/btdate',
		name:'btDate',
		component:BtDate
	},
	{
		path:'/removelog',
		name:'RemoveLog',
		component:RemoveLog
	},
	{
		path:'/cropper',
		name:Cropper,
		component:Cropper
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
