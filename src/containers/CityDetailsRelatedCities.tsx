import { ScrollView, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../components/Box'
import { CityCard } from '../components/CityCard'
import { Text } from '../components/Text'
import { useRelatedCities } from '../data/useRelatedCities'
import { useAppTheme } from '../theme/useAppTheme'
import { City } from '../types'

type Props = Pick<City, 'relatedCitiesIds'>

export const CityDetailsRelatedCities = ({ relatedCitiesIds }: Props) => {
  const relatedCities = useRelatedCities(relatedCitiesIds)
  const { spacing } = useAppTheme()
  const { bottom } = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()

  const cardWidth = width * 0.7
  const cardHeight = cardWidth * 0.9

  return (
    <Box>
      <Text variant='title22' mb='s16' paddingHorizontal='s16'>
        Veja Também
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingHorizontal: spacing.padding,
        }}
        style={{ paddingBottom: bottom }}
      >
        {relatedCities.map(city => (
          <CityCard
            key={city.id}
            cityPreview={city}
            style={{ width: cardWidth, height: cardHeight }}
          />
        ))}
      </ScrollView>
    </Box>
  )
}
