import { defineConfig } from 'umi';
export default defineConfig({
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/trace' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/trace',
          component: '@/pages/page_trace',
          exact: true,
        },
        {
          path: '/register',
          component: '@/pages/page_register',
          exact: true,
        },
        {
          path: '/logger',
          component: '@/pages/page_logger',
          exact: true,
        },
        {
          path: '/userlogin',
          routes: [
            {
              path: '/userlogin/login',
              component: '@/pages/Login/cpt_login',
              exact: true,
            },
            {
              path: '/userlogin/register',
              component: '@/pages/Login/cpt_register',
              exact: true,
            },
            {
              path: '/userlogin/findpwd',
              component: '@/pages/Login/cpt_findpwd',
              exact: true,
            },
          ],
        },
      ],
    },
  ],
});
