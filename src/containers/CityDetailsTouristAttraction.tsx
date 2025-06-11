import { Accordion } from '../components/Accordion'
import { Box } from '../components/Box'
import { Text } from '../components/Text'
import { City } from '../types'

type Props = Pick<City, 'touristAttractions'>

export const CityDetailsTouristAttraction = ({ touristAttractions }: Props) => {
  return (
    <Box padding='padding'>
      <Text variant='title22' mb='s8'>
        Pontos turísticos
      </Text>

      <Box gap='s8'>
        {touristAttractions.map(touristAttraction => (
          <Accordion
            key={touristAttraction.id}
            title={touristAttraction.name}
            description={touristAttraction.description}
          />
        ))}
      </Box>
    </Box>
  )
}
