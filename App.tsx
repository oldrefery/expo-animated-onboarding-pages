import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { DOTS_COUNT } from './src/constants';
import { PageIndicator } from './src/components/PageIndicator';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from 'react-native-reanimated';

export default function App() {
  const { width, height } = useWindowDimensions();

  const scrollAnimatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollAnimatedRef);

  const activeIndex = useDerivedValue(() => {
    return Math.round(scrollOffset.value / width);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.ScrollView
        horizontal
        decelerationRate={'fast'}
        snapToInterval={width}
        disableIntervalMomentum
        ref={scrollAnimatedRef}
      >
        {new Array(DOTS_COUNT).fill(0).map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'white',
              width,
              height,
              opacity: index * 0.1,
            }}
          />
        ))}
      </Animated.ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <PageIndicator count={DOTS_COUNT} activeIndex={activeIndex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
