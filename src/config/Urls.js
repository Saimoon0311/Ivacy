// export const API_BASED_URL = 'https://test-urls.com/ivacay/api/';
// export const IMAGE_BASED_URL = 'ht tps://test-urls.com/ivacay/packages/';
// export const User_Image_Url = 'https://test-urls.com/ivacay/users/';
export const API_BASED_URL = 'https://ivacay.co/api/';
export const API_About_Us_URL = 'https://ivacay.co/';
export const IMAGE_BASED_URL = 'https://ivacay.co/packages/';
export const User_Image_Url = 'https://ivacay.co/users/';

export const getApi = endpoint => API_BASED_URL + endpoint;
export const Google_Map_Key = 'AIzaSyCu5v9OrHrhf55iPRd8JIgB_QGAlZpmlj0';
export const LoginUrl = getApi('login');
export const SignUpUrl = getApi('register');
export const UserUrl = getApi('user');
export const LogoutUrl = getApi('logout');
export const CountryNameUrl = getApi('country');
export const LatestPackageUrl = getApi('package');
export const SearchrUrl = getApi('search/');
export const StripePayIntentUrl = getApi('stripe-form/submit');
export const AfterStripeUrl = getApi('stripe-form/after-submit');
export const ReviewUrl = getApi('reviews');
export const SubReviewUrl = getApi('submit-review');
export const StripePayIntent = getApi('payment-intend');
export const FavoredSceneriesUrl = getApi('favored-sceneries');
export const CryptoPayUrl = getApi('pay-with/');
export const StripePublishKey =
  'pk_test_51LI9HwEE1bl5YY9CXbeFOKtVHFcnF3Vr6cNpK50WFsAHQFU9pcenE3iSddJ2pzdx7IIPwzXG6plCCxXwet33HpIG00nyziJs1r';
// export const StripePublishKey =
// 'pk_live_51KrsPlAW13cLb6g2yU8lDbLpzJHXstCdhGmtEeRQbo8njWZjfQ75wgVHonWldxTtDHQVHrw4L9sVcc3FWvFoGZpO00n2xJX1fJ';
export const AboutTheApp = API_About_Us_URL + 'about-us';
export const OrderDetailUrl = getApi('journey-order-details/');
export const GuiderBookPackageUrl = getApi('guider-booked-packages');
export const DeleteAccountUrl = getApi('delete-account/');
export const CheckEthValue =
  'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD';
export const ChangeEthValueUrl = getApi('eth-conversion/');
export const AfterMetaMaskUrl = getApi('meta-mask/after-submit');
export const MetaMaskWallet = '0x3BC00A01a868a6104ec181269381094777C2A59a';
