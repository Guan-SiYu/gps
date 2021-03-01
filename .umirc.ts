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
          component: '@/pages/trace/page_trace',
          exact: true,
        },
        {
          path: '/register',
          component: '@/pages/register/page_register',
          exact: true,
        },
        {
          path: '/logger',
          component: '@/pages/logger/page_logger',
          exact: true,
        },
      ],
    },
  ],
});
