import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { DOT_SIZE } from '../constants';

interface DotProps {
  index: number;
  activeIndex: SharedValue<number>;
}

export const Dot = ({ index, activeIndex }: DotProps) => {
  const animDotStyle = useAnimatedStyle(() => {
    const isDotActive = index <= activeIndex.value;
    return {
      opacity: withTiming(isDotActive ? 1 : 0.2, {
        duration: 150,
      }),
    };
  }, []);

  return (
    <Animated.View
      key={index}
      style={[
        {
          height: DOT_SIZE,
          width: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: 'white',
        },
        animDotStyle,
      ]}
    />
  );
};
