import { Pressable, PressableProps } from 'react-native'
import { Box, BoxProps } from './Box'
import { Icon, IconName } from './Icon'
import { Text } from './Text'

export type PillProps = {
  iconName: IconName
  label: string
  active: boolean
  onPress?: PressableProps['onPress']
}

export const Pill = ({ iconName, label, active, onPress }: PillProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box {...boxStyle} backgroundColor={active ? 'gray1' : 'transparent'}>
        <Icon name={iconName} size={16} color={active ? 'primary' : 'gray2'} />

        <Text ml='s4' variant='text12'>
          {label}
        </Text>
      </Box>
    </Pressable>
  )
}

const boxStyle: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 2,
  borderRadius: 'rounded',
  paddingVertical: 's8',
  paddingHorizontal: 's12',
  borderColor: 'gray1',
}
