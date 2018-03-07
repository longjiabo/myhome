import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/home/home'
import login from '@/components/login'
import album from '@/components/photo/album'
import photo from '@/components/photo/photo'
import note from '@/components/note/index'
import cloud from '@/components/cloud/index'
import code from '@/components/code/index'
import admin from '@/components/admin/index'
import adminAlbum from '@/components/admin/photo/album'
import adminPhoto from '@/components/admin/photo/photo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '',
          component: home
        },
        {
          path: 'albums',
          component: album
        },
        {
          path: 'albums/:id',
          props: true,
          component: photo
        },
        {
          path: 'cloud',
          component: cloud
        },
        {
          path: 'code',
          component: code
        },
        {
          path: 'note',
          component: note
        }
      ]
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: "/admin",
      component: admin,
      children: [
        {
          path: "album",
          component: adminAlbum

        },
        {
          path: "photo",
          component: adminPhoto
        }
      ]
    },
  ]
})
