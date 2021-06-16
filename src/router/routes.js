import MainLayout from "../layouts/MainLayout";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Secure from "../pages/Secure";
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component:Index },
      { path: '/login', component:Login },
      { path: '/secure', component:Secure ,meta: {requiresAuth: true}}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
