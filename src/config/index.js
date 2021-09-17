/**
 * 配置文件
 */
const env = import.meta.env.MODE || 'prod';
const envConfig = {
  dev: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/fbc3b059dea5d4691a71d0caf314a638/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/fbc3b059dea5d4691a71d0caf314a638/api',
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: '',
  },
};
export default {
  env,
  mock: true,
  ...envConfig[env],
};
