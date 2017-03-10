import { Platform } from 'react-native';
import _ from 'lodash';

import variable from '../../src/theme';

export default (variables = variable) => {
  const platformStyle = variables.platformStyle;
  const platform = variables.platform;

  const tabTheme = { 
  	flex: 1,
  	backgroundColor: '#FFF',
   };


  return tabTheme;
};
