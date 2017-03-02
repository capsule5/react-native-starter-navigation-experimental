import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import shallowequal from 'shallowequal';

import Header from './items/Header';
import Button from '../shared/Button';

import { connect } from 'react-redux';
import { navigateJumpToKey, swipeLeft, swipeRight } from '../../navigation/navigationActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.blue',
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
          action={() => { this.props.swipeLeft(); }}
        />
        <Button
          label={'Go to Profile'}
          action={() => { this.props.swipeRight(); }}
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
    swipeLeft: () => {
      dispatch(swipeLeft());
    },
    swipeRight: () => {
      dispatch(swipeRight());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
