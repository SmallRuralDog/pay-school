import Index from '../components/Index'
import Home from '../components/Home/Home'
import Member from '../components/Member/Member'
import Courses from '../components/Courses/Courses'
import Circle from '../components/Circle/Circle'
import Vip from '../components/Vip/Vip'
import FollowOfficial from '../components/Member/FollowOfficial'
import CoursesInfo from '../components/Courses/Info'
import CoursesDetail from '../components/Courses/Detail'
import MyOrder from '../components/Member/MyOrder'
import MyCourses from '../components/Member/MyCourses'
import MyMsg from '../components/Member/MyMsg'
const routes = [{
  path: '/',
  name: 'index',
  redirect: '/r/home',
  component: Index,
  children: [
    {
      path: '/r/home',
      name: 'home',
      component: Home,
      meta: {
        title: 'home',
        keepAlive: true
      }
    },
    {
      path: '/r/vip',
      name: 'vip',
      component: Vip,
      meta: {
        title: 'home',
        keepAlive: true
      }
    },
    {
      path: '/r/member',
      name: 'member',
      component: Member,
      meta: {
        title: 'home',
        keepAlive: true
      }
    },
    {
      path: '/r/courses',
      name: 'courses',
      component: Courses,
      meta: {
        title: 'home',
        keepAlive: true
      }
    },
    {
      path: '/r/circle',
      name: 'circle',
      component: Circle,
      meta: {
        title: 'home',
        keepAlive: true
      }
    }
  ]
}, {
  path: '/r/follow-official',
  name: 'FollowOfficial',
  component: FollowOfficial,
  meta: {
    title: 'home',
    keepAlive: true
  }
}, {
  path: '/r/courses-info',
  name: 'CoursesInfo',
  component: CoursesInfo,
  meta: {
    title: 'home',
    keepAlive: false
  }
},
{
  path: '/r/courses-detail',
  name: 'CoursesDetail',
  component: CoursesDetail,
  meta: {
    title: 'home',
    keepAlive: false
  }},
{
  path: '/r/my-order',
  name: 'MyOrder',
  component: MyOrder,
  meta: {
    title: '我的订单',
    keepAlive: false
  }},
{
  path: '/r/my-courses',
  name: 'MyCourses',
  component: MyCourses,
  meta: {
    title: '我的课程',
    keepAlive: false
  }},
{
  path: '/r/my-msg',
  name: 'MyMsg',
  component: MyMsg,
  meta: {
    title: '我的消息',
    keepAlive: false
  }}
]

export default routes
