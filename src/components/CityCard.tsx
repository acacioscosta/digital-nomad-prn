import { Link } from 'expo-router'
import { ImageBackground, Pressable } from 'react-native'
import { useAppTheme } from '../theme/useAppTheme'
import { CityPreview } from '../types'
import { BlackOpacity } from './BlackOpacity'
import { Box } from './Box'
import { Icon } from './Icon'
import { Text } from './Text'

type CityCardProps = {
  cityPreview: CityPreview
}

export const CityCard = ({ cityPreview }: CityCardProps) => {
  const { borderRadii } = useAppTheme()

  return (
    <Link href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={cityPreview.coverImage}
          style={{ width: '100%', height: 280 }}
          imageStyle={{ borderRadius: borderRadii.default }}
        >
          <BlackOpacity />

          <Box padding='s24' flex={1} justifyContent='space-between'>
            <Box alignSelf='flex-end'>
              <Icon name='Favorite-outline' color='text' />
            </Box>

            <Box>
              <Text variant='title22'>{cityPreview.name}</Text>
              <Text variant='title16'>{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  )
}
