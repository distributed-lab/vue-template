import { createRouter, createWebHistory, RouteRecordRaw, useRoute, useRouter } from 'vue-router'

import { RouteNames } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: RouteNames.App },
  },
  {
    path: '/',
    name: RouteNames.App,
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: { name: RouteNames.UiKit },
    children: [
      {
        path: '/ui-kit',
        name: RouteNames.UiKit,
        component: () => import('@/pages/UiKit'),
      },
      {
        path: '/complex-form',
        name: RouteNames.ComplexForm,
        component: () => import('@/forms/ComplexForm.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRoute, useRouter }
