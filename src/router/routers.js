export default [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () =>
      import('@/views/home/index')
  }
];