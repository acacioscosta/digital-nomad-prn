import MapView from 'react-native-maps'
import { Box } from '../components/Box'
import { Text } from '../components/Text'
import { useAppTheme } from '../theme/useAppTheme'
import { City } from '../types'

type CityDetailsMapProps = Pick<City, 'location'>

export const CityDetailsMap = ({ location }: CityDetailsMapProps) => {
  const { borderRadii } = useAppTheme()

  return (
    <Box padding='padding'>
      <Text variant='title22' mb='s16'>
        Mapa
      </Text>

      <Box
        style={{
          width: '100%',
          height: 200,
          borderRadius: borderRadii.default,
          overflow: 'hidden'
        }}
      >
        <MapView
          style={{
            width: '100%',
            height: '100%',
          }}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </Box>
    </Box>
  )
}
