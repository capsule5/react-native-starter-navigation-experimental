import React, { PropTypes } from 'react';
import { NavigationExperimental, View, StyleSheet, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import Home from '../components/home/Home';
import History from '../components/history/History';
import Profile from '../components/profile/Profile';

import { navigatePop, swipeLeft, swipeRight } from '../navigation/navigationActions';

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard
} = NavigationExperimental;

const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator
} = NavigationCard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class Navigation extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._render = this._render.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._renderView = this._renderView.bind(this);
  }

  animateCard(props) {
    console.log('animateCard', props);
    const {
      layout,
      position,
      scene
    } = props;

    const index = scene.index;
    const width = layout.initWidth;

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, -width]
    });

    // const opacity = position.interpolate({
    //   inputRange: [index - 1, index, index + 1],
    //   outputRange: [-0.5, 1, -0.5]
    // });

    const rotateZ = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ['20deg', '0deg', '-20deg']
    });

    return {
      position: 'absolute',
      flex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 1,
      transform: [
        { scale: 1 },
        { translateX }
        // { rotateZ }
      ]
    };
  }


  _renderView({ scene }) {

    const { route } = scene;

    switch (route.key) {
      case 'Home':
        return <Home />;
      case 'History':
        return <History />;
      case 'Profile':
        return <Profile />;
      default:
        return <Home />;
    }
  }

  _renderScene(sceneProps) {
    const panHandlers = NavigationPagerPanResponder.forHorizontal({
      ...sceneProps,
      onNavigateBack: () => { return this.props.swipeRight(); },
      onNavigateForward: () => { return this.props.swipeLeft(); }
    });

    return (
      <Animated.View
        style={this.animateCard(sceneProps)}
        {...panHandlers}
        key={`${sceneProps.scene.key}scene`}
      >
        {this._renderView(sceneProps)}
      </Animated.View>
    );
  }

  _render(transitionProps) {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {
        ...transitionProps,
        scene
      };

      return this._renderScene(sceneProps);
    });

    return (
      <View style={{ flex: 1 }}>
        {scenes}
      </View>
    );
  }

  render() {
    const { navigationState, backAction } = this.props;

    return (

      // Redux is handling the reduction of our state for us. We grab the navigationState
      // we have in our Redux store and pass it directly to the <NavigationTransitioner />.
      <NavigationTransitioner
        configureTransition={() => {
          return {
            duration: 500,
            easing: Easing.out(Easing.back(2)),
            timing: Animated.timing
          };
        }}
        navigationState={navigationState}
        style={styles.container}
        render={this._render}
      />
    );
  }


}

Navigation.propTypes = {
  navigationState: PropTypes.object,
  backAction: PropTypes.func.isRequired
};

export default connect(
  (state) => {
    return ({
      navigationState: state.navigationState
    });
  },
  (dispatch) => {
    return ({
      backAction: () => {
        dispatch(navigatePop());
      },
      swipeLeft: () => {
        dispatch(swipeLeft());
      },
      swipeRight: () => {
        dispatch(swipeRight());
      }
    });
  }
)(Navigation);
