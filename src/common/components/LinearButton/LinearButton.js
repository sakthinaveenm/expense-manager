/* eslint-disable react/self-closing-comp */
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import GlobalStyleSheet from '../../Styles';
import useResponsive from '../../hooks/useResponsive';

const LinearButton = ({
  title = '',
  linearColor = ['#fff', '#f4f4f4'],
  titleColor = '#000',
  containerStyle = null,
  lGStyle = null,
  isAnimated = false,
  onPress,
  loading = false,
}) => {
  const {wp, hp} = useResponsive();
  const GlobalStyle = GlobalStyleSheet({wp, hp});
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return isAnimated ? (
    <AnimatedTouchable style={[containerStyle]} onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={linearColor}
        style={[GlobalStyle.AICenter, {padding: hp(3)}, lGStyle]}>
        <View></View>
        <View>
          {loading ? (
            <ActivityIndicator color={titleColor} size={20} />
          ) : (
            <Text style={[{color: titleColor}]}>{title}</Text>
          )}
        </View>
        <View></View>
      </LinearGradient>
    </AnimatedTouchable>
  ) : (
    <TouchableOpacity onPress={onPress} style={[containerStyle]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={linearColor}
        style={[GlobalStyle.AICenter, {padding: hp(3)}, lGStyle]}>
        <View></View>
        <View>
          {loading ? (
            <ActivityIndicator color={titleColor} size={20} />
          ) : (
            <Text style={[{color: titleColor}]}>{title}</Text>
          )}
        </View>
        <View></View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

LinearButton.defaultProps = {
  onPress: () => {},
};

export default LinearButton;
