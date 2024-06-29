import {useState, useEffect} from 'react';
import {Dimensions, PixelRatio} from 'react-native';

const ORIENTATION_AXIS = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

// useResponsive: A hook that can be used for Screen Responsive
const useResponsive = () => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('screen').width > Dimensions.get('screen').height
      ? 'landscape'
      : 'portrait',
  );

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const IS_PORTRAIT = orientation === ORIENTATION_AXIS.PORTRAIT;
  const IS_LANDSCAPE = orientation === ORIENTATION_AXIS.LANDSCAPE;

  useEffect(() => {
    const onChange = ({screen}) => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions?.addEventListener('change', onChange);

    return () => {
      try {
        Dimensions?.removeEventListener('change', onChange);
      } catch (error) {}
    };
  }, []);

  const wp = widthPercent => {
    const elemWidth =
      typeof widthPercent === 'number'
        ? widthPercent
        : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  };

  const hp = heightPercent => {
    const elemHeight =
      typeof heightPercent === 'number'
        ? heightPercent
        : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  };

  return {wp, hp, IS_PORTRAIT, IS_LANDSCAPE};
};

export default useResponsive;
