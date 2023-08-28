import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { RouteNames } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: RouteNames.uiKit },
  },
  {
    path: '/ui-kit',
    name: RouteNames.uiKit,
    component: () => import('@/pages/UiKitPage.vue'),
  },
  {
    path: '/complex-form',
    name: RouteNames.complexForm,
    component: () => import('@/forms/ComplexForm.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRouter, useRoute }
