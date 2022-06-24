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
