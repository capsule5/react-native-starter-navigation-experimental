import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import shallowequal from 'shallowequal';

import Header from './items/Header';
import Button from '../shared/Button';

import { connect } from 'react-redux';
import { navigateJumpToKey } from '../../navigation/navigationActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '$textColors.red',
    fontSize: '1.5rem'
  }
});

class Home extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowequal(nextProps, this.props) && shallowequal(nextState, this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.text}>Home</Text>
        <Button
          label={'Go to History'}
          action={() => { this.props.navigateJumpToKey('History'); }}
        />
        <Button
          label={'Go to Profile'}
          action={() => { this.props.navigateJumpToKey('Profile'); }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigateJumpToKey: (key) => {
      dispatch(navigateJumpToKey(key));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
