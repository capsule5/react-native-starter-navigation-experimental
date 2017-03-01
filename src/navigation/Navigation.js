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

  animateCard(props) {
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

    // const rotateZ = position.interpolate({
    //   inputRange: [index - 1, index, index + 1],
    //   outputRange: ['20deg', '0deg', '-20deg']
    // });

    return {
      opacity: 1,
      transform: [
        { scale: 1 },
        { translateX }
        // { rotateZ }
      ]
    };
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
            easing: Easing.out(Easing.exp),
            timing: Animated.timing
          };
        }}
        navigationState={navigationState}
        style={styles.container}
        render={(props) => {
          const panHandlers = NavigationPagerPanResponder.forHorizontal({
            ...props,
            onNavigateBack: () => { return this.props.swipeRight(); },
            onNavigateForward: () => { return this.props.swipeLeft(); }
          });

          return (
            // This mimics the same type of work done in a NavigationCardStack component
            <View style={styles.container}>
              <NavigationCard
                // <NavigationTransitioner>'s render method passes `navigationState` as a
                // prop to here, so we expand it plus other props out in <NavigationCard>.
                {...props}
                // Transition animations are determined by the StyleInterpolators. Here we manually
                // override the default horizontal style interpolator that gets applied inside of
                // NavigationCard for a vertical direction animation if we are showing a modal.
                // (Passing undefined causes the default interpolator to be used in NavigationCard.)
                style={props.scene.route.key === 'Modal' ?
                  NavigationCard.CardStackStyleInterpolator.forVertical(props) :
                  this.animateCard(props)
                }
                // onNavigateBack={backAction}
                // By default a user can swipe back to pop from the stack. Disable this for modals.
                // Just like for style interpolators, returning undefined lets NavigationCard override it.
                panHandlers={props.scene.route.key === 'Modal' ? null : panHandlers}
                renderScene={this._renderScene}
                key={props.scene.route.key}
              />

            </View>
          );
        }}
      />
    );
  }

  _renderScene({ scene }) {

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
