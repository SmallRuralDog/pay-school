const Index = resolve => require(['../components/Index'], resolve)
const Home = resolve => require(['../components/Home/Home'], resolve)
const Member = resolve => require(['../components/Member/Member'], resolve)
const Courses = resolve => require(['../components/Courses/Courses'], resolve)
const Circle = resolve => require(['../components/Circle/Circle'], resolve)
const Vip = resolve => require(['../components/Vip/Vip'], resolve)
const FollowOfficial = resolve => require(['../components/Member/FollowOfficial'], resolve)
const CoursesInfo = resolve => require(['../components/Courses/Info'], resolve)
const CoursesDetail = resolve => require(['../components/Courses/Detail'], resolve)
const MyOrder = resolve => require(['../components/Member/MyOrder'], resolve)
const MyCourses = resolve => require(['../components/Member/MyCourses'], resolve)
const MyMsg = resolve => require(['../components/Member/MyMsg'], resolve)
const QrLogin = resolve => require(['../components/Member/QrLogin'], resolve)
const InviteQrCode = resolve => require(['../components/Member/InviteQrCode'], resolve)
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
  }},
{
  path: '/r/qr-login',
  name: 'QrLogin',
  component: QrLogin,
  meta: {
    title: '扫码登录',
    keepAlive: false
  }},
{
  path: '/r/invite-qr-code',
  name: 'InviteQrCode',
  component: InviteQrCode,
  meta: {
    title: '推广二维码',
    keepAlive: false
  }}
]

export default routes
