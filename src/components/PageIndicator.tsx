import { View } from 'react-native';
import { ACTIVE_COLOR, DOT_GAP, DOT_SIZE } from '../constants';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Dot } from './Dot';

interface PageIndicatorProps {
  count: number;
  activeIndex: SharedValue<number>;
}

export const PageIndicator = ({ count, activeIndex }: PageIndicatorProps) => {
  const animContainerStyle = useAnimatedStyle(() => {
    const width =
      DOT_SIZE * (activeIndex.value + 1) + DOT_GAP * (activeIndex.value + 1);

    return {
      width: withSpring(width, {
        mass: 0.6,
      }),
    };
  }, [count, activeIndex]);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: DOT_GAP,
      }}
    >
      {new Array(count).fill(0).map((_, index) => (
        <Dot index={index} activeIndex={activeIndex} key={index} />
      ))}
      <Animated.View
        style={[
          {
            left: -DOT_GAP / 2,
            height: DOT_SIZE * 3,
            top: -DOT_SIZE,
            borderRadius: DOT_SIZE * 2,
            borderCurve: 'continuous',
            backgroundColor: ACTIVE_COLOR,
            position: 'absolute',
            zIndex: -1,
          },
          animContainerStyle,
        ]}
      />
    </View>
  );
};
