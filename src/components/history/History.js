import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import shallowequal from 'shallowequal';

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

class History extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowequal(nextProps, this.props) && shallowequal(nextState, this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>History</Text>
        <Button
          label={'Go to home page'}
          action={() => { this.props.navigateJumpToKey('Home'); }}
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
    navigateJumpToKey: () => {
      dispatch(navigateJumpToKey('Home'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
