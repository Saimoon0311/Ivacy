export const API_BASED_URL = 'https://test-urls.com/ivacay/api/';
export const IMAGE_BASED_URL = 'https://test-urls.com/ivacay/packages/';

export const getApi = endpoint => API_BASED_URL + endpoint;

export const LoginUrl = getApi('login');
export const SignUpUrl = getApi('register');
export const UserUrl = getApi('user');
export const LogoutUrl = getApi('logout');
export const CountryNameUrl = getApi('country');
export const LatestPackageUrl = getApi('package');
export const SearchrUrl = getApi('search/');
export const StripePayIntentUrl = getApi('stripe-form/submit');
export const AfterStripeUrl = getApi('stripe-form/aftersubmit');
export const StripePublishKey =
  'pk_test_51LI9HwEE1bl5YY9CXbeFOKtVHFcnF3Vr6cNpK50WFsAHQFU9pcenE3iSddJ2pzdx7IIPwzXG6plCCxXwet33HpIG00nyziJs1r';
