export const API_BASED_URL = 'https://test-urls.com/ivacay/api/';
export const IMAGE_BASED_URL =
  'https://res.cloudinary.com/dd6tdswt5/image/upload/v1644503344/';
export const POST_IMAGE_URL =
  'https://api.cloudinary.com/v1_1/dd6tdswt5/upload';

export const getApi = endpoint => API_BASED_URL + endpoint;

export const LoginUrl = getApi('login');
export const SignUpUrl = getApi('register');
export const UserUrl = getApi('user');
export const LogoutUrl = getApi('logout');
export const CountryNameUrl = getApi('country');
