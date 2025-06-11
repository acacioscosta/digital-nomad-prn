import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import theme from '../theme/theme'
import { Box } from './Box'
import { Icon } from './Icon'
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

    progress.value = withTiming(isOpen.value ? 0 : 1, { duration: 500 })
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader title={title} progress={progress} />

        <AccordionBody description={description} isOpen={isOpen} />
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
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: interpolate(progress.value, [0, 1], [0, -180]) + 'deg',
      },
    ],
  }))

  return (
    <View style={styles.header}>
      <Box flexShrink={1}>
        <Text variant='title16'>{title}</Text>
      </Box>

      <Animated.View style={iconAnimatedStyle}>
        <Icon name='Chevron-down' color='gray2' />
      </Animated.View>
    </View>
  )
}

const AccordionBody = ({
  description,
  isOpen,
}: {
  description: string
  isOpen: SharedValue<boolean>
}) => {
  const height = useSharedValue(0)

  // const derivedHeight = useDerivedValue(() =>
  //   withTiming(height.value * Number(isOpen.value), {
  //     duration: 500,
  //   })
  // )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value * Number(isOpen.value), {
        duration: 500,
      }),
      // height: isOpen.value
      //   ? withTiming(height.value, { duration: 500 })
      //   : withTiming(0, { duration: 500 }),
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
