import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import codePush from 'react-native-code-push';
import { whyDidYouUpdate } from 'why-did-you-update';

import Navigation from '../../navigation/Navigation';

import configureStore from '../../store/configStore';
import theme from '../../styles/appStyles';

EStyleSheet.build(theme);

const store = configureStore();
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
};

class Root extends Component {
  constructor(props) {
    super(props);

    // if (process.env.NODE_ENV !== 'production') {
    //   whyDidYouUpdate(React, { exclude: /^AnimatedComponent|^NavigationCard|^Container|^NavigationComponent/ });
    //   whyDidYouUpdate(React);
    // }
  }

  codePushDownloadDidProgress(progress) {
    console.log(`${progress.receivedBytes} of ${progress.totalBytes} received.`); // eslint-disable-line no-console
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(Root);
