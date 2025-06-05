import { ScrollView } from 'react-native'
import { Box } from '../components/Box'
import { CategoryPill } from '../components/CategoryPill'
import { SearchInput } from '../components/SearchInput'
import { Category } from '../types'

type CityFilterProps = {
  categories: Category[]
  cityName: string
  onChangeCityName: (cityName: string) => void
  selectedCategory: string | null
  onChangeSelectedCategory: (selectedCategory: string | null) => void
}

export const CityFilter = ({
  categories,
  cityName,
  onChangeCityName,
  selectedCategory,
  onChangeSelectedCategory,
}: CityFilterProps) => {
  const onPressCategory = (id: string) => {
    const categoryId = id === selectedCategory ? null : id

    onChangeSelectedCategory(categoryId)
  }

  return (
    <Box>
      <Box paddingHorizontal='padding'>
        <SearchInput
          value={cityName}
          onChangeText={onChangeCityName}
          placeholder='Qual seu próximo destino?'
        />
      </Box>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box flexDirection='row' mt='s16' gap='s8' paddingHorizontal='padding'>
          {categories.map(category => (
            <CategoryPill
              key={category.id}
              category={category}
              active={category.id === selectedCategory}
              onPress={() => onPressCategory(category.id)}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  )
}
