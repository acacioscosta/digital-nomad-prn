import { Box } from '@/src/components/Box'
import { CityCard } from '@/src/components/CityCard'
import { Screen } from '@/src/components/Screen'
import { CityFilter } from '@/src/containers/CityFilter'
import { categories } from '@/src/data/categories'
import { useCities } from '@/src/data/useCities'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useAppTheme } from '@/src/theme/useAppTheme'
import { CityPreview } from '@/src/types'
import { useScrollToTop } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import Animated, { FadingTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { top } = useSafeAreaInsets()
  const { spacing } = useAppTheme()

  const [cityName, setCityName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const debouncedCityName = useDebounce(cityName)

  const { cityPreviewList } = useCities({
    name: debouncedCityName,
    categoryId: selectedCategory,
  })

  const flatListRef = useRef(null)
  useScrollToTop(flatListRef)

  const renderItem = ({ item }: ListRenderItemInfo<CityPreview>) => {
    return (
      <Box paddingHorizontal='padding'>
        <CityCard cityPreview={item} />
      </Box>
    )
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        data={cityPreviewList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            cityName={cityName}
            onChangeCityName={setCityName}
            selectedCategory={selectedCategory}
            onChangeSelectedCategory={setSelectedCategory}
          />
        }
      />
    </Screen>
  )
}
