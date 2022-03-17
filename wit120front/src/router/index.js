import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView2 from '../views/HomeView2.vue'
import DepartmentView from "@/views/DepartmentView";
import ModifyView from "@/views/ModifyView";
import PasswordView from "@/views/PasswordView";
import ClinicView from "@/views/ClinicView";
import DoctorManage from "@/views/DoctorManage";
import DrugManage from "@/views/DrugManage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DoctorManage
  },
  {
    path: '/Department',
    name: 'department',
    component: DepartmentView
  },
  {
    path: '/UserInfo',
    name: 'information',
    component: ModifyView
  },
  {
    path: '/Password',
    name: 'password',
    component: PasswordView
  },
  {
    path: '/Clinic',
    name: 'clinic',
    component: ClinicView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
