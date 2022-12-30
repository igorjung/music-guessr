export * from './auth.interceptor';

import { AuthInterceptor } from './auth.interceptor';

const interceptors = [
  AuthInterceptor
];

export default interceptors;
