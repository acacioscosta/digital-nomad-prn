import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import theme from '../theme/theme'
import { useAppTheme } from '../theme/useAppTheme'
import { Box } from './Box'
import { Text } from './Text'

type AccordionProps = {
  title: string
  description: string
}

export const Accordion = ({ title, description }: AccordionProps) => {
  const isOpen = useSharedValue(false)
  const progress = useSharedValue(0)

  const handleOpenPress = () => {
    isOpen.value = !isOpen.value

    progress.value = withTiming(isOpen.value ? 0 : 1, { duration: 200 })
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader title={title} progress={progress} />

        <AccordionBody
          description={description}
          isOpen={isOpen}
          progress={progress}
        />
      </View>
    </Pressable>
  )
}

const AccordionHeader = ({
  title,
  progress,
}: {
  title: string
  progress: SharedValue<number>
}) => {
  const { colors, borderRadii } = useAppTheme()

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray2, colors.primary]
    ),
    transform: [
      {
        rotate: interpolate(progress.value, [0, 1], [0, -180]) + 'deg',
      },
    ],
  }))

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.transparent, colors.gray1]
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.default, 0]
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.default, 0]
    ),
    // borderWidth: interpolate(progress.value, [0, 1], [0, 2]),
  }))

  return (
    <Animated.View style={[styles.header, headerAnimatedStyle]}>
      <Box flexShrink={1}>
        <Text variant='title16'>{title}</Text>
      </Box>

      <Animated.Image
        source={require('@/assets/images/chevron-down.png')}
        style={[{ width: 24, height: 24 }, iconAnimatedStyle]}
      />
    </Animated.View>
  )
}

const AccordionBody = ({
  description,
  isOpen,
  progress
}: {
  description: string
  isOpen: SharedValue<boolean>
  progress: SharedValue<number>
}) => {
  const { borderRadii } = useAppTheme()
  const height = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
      height: interpolate(progress.value, [0, 1], [0, height.value]),
      borderTopLeftRadius: interpolate(progress.value, [0, 1], [borderRadii.default, 0]),
      borderTopRightRadius: interpolate(progress.value, [0, 1], [borderRadii.default, 0])
    }
  })

  return (
    <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
      <View
        style={styles.body}
        onLayout={e => (height.value = e.nativeEvent.layout.height)}
      >
        <Text>{description}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: theme.borderRadii.default,
    borderColor: theme.colors.gray1,
  },
  body: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default,
  },
})
