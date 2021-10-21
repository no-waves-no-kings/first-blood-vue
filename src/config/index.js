/**
 * 配置文件
 */
const env = import.meta.env.MODE || 'prod';
const envConfig = {
  dev: {
    baseApi: '/api',
    // mockApi: 'https://www.fastmock.site/mock/fbc3b059dea5d4691a71d0caf314a638/api',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/fbc3b059dea5d4691a71d0caf314a638/api',
  },
  prod: {
    baseApi: '/api',
    mockApi: '',
  },
};
const namespace = 'FIRST_BLOOD';
export default {
  env,
  namespace,
  mock: true,
  ...envConfig[env],
};
