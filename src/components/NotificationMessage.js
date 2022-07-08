import {showMessage} from 'react-native-flash-message';
import {color} from './color';

export const errorMessage = description => {
  showMessage({
    type: 'danger',
    icon: 'auto',
    message: 'Warning',
    description: description,
    floating: true,
    backgroundColor: color.textThirdColor,
    style: {alignItems: 'center'},
  });
};

export const successMessage = description => {
  showMessage({
    type: 'success',
    icon: 'auto',
    message: 'Success',
    description: description,
    floating: true,
    backgroundColor: color.textThirdColor,
    style: {alignItems: 'center'},
  });
};
