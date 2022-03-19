import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView2 from '../views/HomeView2.vue'
import DepartmentView from "@/views/DepartmentView";
import ModifyView from "@/views/ModifyView";
import PasswordView from "@/views/PasswordView";
import ClinicView from "@/views/ClinicView";
import DoctorManage from "@/views/DoctorManage";
import DrugManage from "@/views/DrugManage";
import DoctorAccountManage from "@/views/DoctorAccountManage";
import DepartmentManage from "@/views/DepartmentManage";

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
  },
  {
    path: '/DocAccountManage',
    name: 'docAccountManage',
    component: DoctorAccountManage
  },
  {
    path: '/DepartmentManage',
    name: 'departmentManage',
    component: DepartmentManage
  },
  {
    path: '/DrugManage',
    name: 'drugManage',
    component: DrugManage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
