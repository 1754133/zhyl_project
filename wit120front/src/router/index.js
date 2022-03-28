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
import DocDetail from "@/views/DocDetail";
import MedicalTechnicianManage from "@/views/MedicalTechnicianManage";
import ConfirmOrderView from "@/views/ConfirmOrderView";
import PatientInfoView from "@/views/PatientInfoView";
import DepartmentIntro from "@/views/DepartmentIntro";
import DepartmentDetail from "@/views/DepartmentDetail";
import OrderQuery from "@/views/OrderQuery";
import RecipeView from "@/views/RecipeView";
import TechOrder from "@/views/TechOrder";
import DocDetail1 from "@/views/DocDetail1";
import TechScheling from "@/views/TechScheling";
import TechConfirm from "@/views/TechConfirm";
import TechQuery from "@/views/TechQuery";
import DocDetail2 from "@/views/DocDetail2";
import DocTechQuery from "@/views/DocTechQuery"
import OrderQuery1 from "@/views/OrderQuery1";
import TechQuery1 from "@/views/TechQuery1";
import DepartmentShiftManage from "@/views/DepartmentShiftManage";
import DepartmentShiftDetail from "@/views/DepartmentShiftDetail";
import DocShiftManage from "@/views/DocShiftManage";
import WardQuery from "@/views/WardQuery";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView2
  },
  {
    path: '/DoctorManage',
    name: 'doctorManage',
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
  },
  {
    path: '/DocDetail',
    name: 'docDetail',
    component: DocDetail
  },
  {
    path: '/MedicalTechnicianManage',
    name: 'medicalTechnicianManage',
    component: MedicalTechnicianManage
  },
  {
    path: '/ConfirmOrderView',
    name: 'confirmOrderView',
    component: ConfirmOrderView
  },
  {
    path: '/PatientInfoView',
    name: 'patientInfoView',
    component: PatientInfoView
  },
  {
    path: '/DepartmentIntro',
    name: 'departmentIntro',
    component: DepartmentIntro
  },
  {
    path: '/DepartmentDetail',
    name: 'departmentDetail',
    component: DepartmentDetail
  },
  {
    path: '/OrderQuery',
    name: 'orderQuery',
    component: OrderQuery
  },
  {
    path: '/Recipe',
    name: 'recipeView',
    component: RecipeView
  },
  {
    path: '/TechOrder',
    name: 'TechOrder',
    component: TechOrder
  },
  {
    path: '/DocDetail1',
    name: 'docDetail1',
    component: DocDetail1
  },
  {
    path: '/TechScheduling',
    name: 'techScheduling',
    component: TechScheling
  },
  {
    path: '/TechConfirm',
    name: 'techConfirm',
    component: TechConfirm
  },
  {
    path: '/TechQuery',
    name: 'techQuery',
    component: TechQuery
  },
  {
    path: '/DocDetail2',
    name: 'docDetail2',
    component: DocDetail2
  },
  {
    path: '/DocTechQuery',
    name: 'docTechQuery',
    component: DocTechQuery
  },
  {
    path: '/OrderQuery1',
    name: 'orderQuery1',
    component: OrderQuery1
  },
  {
    path: '/TechQuery1',
    name: 'techQuery1',
    component: TechQuery1
  },
  {
    path: '/DepartmentShiftManage',
    name: 'departmentShiftManage',
    component: DepartmentShiftManage
  },
  {
    path: '/DepartmentShiftDetail',
    name: 'departmentShiftDetail',
    component: DepartmentShiftDetail
  },
  {
    path: '/DocShiftManage',
    name: 'docShiftManage',
    component: DocShiftManage
  },
  {
    path: '/WardQuery',
    name: 'wardQuery',
    component: WardQuery
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
