import React, { memo, useContext } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';

import { GlobalContext } from '../state-mgmt/GlobalState';

export interface Props {
  route: any; // RouteProp<{ id: string; }, any>; /** @todo find out how to use this type */
}

const Item = ({ route }: Props) => {
  const { state } = useContext(GlobalContext);
  const artist = state.artist.artistMap[route?.params?.id];
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Image style={{ width: '100%', height: 100 }} source={{ uri: artist.strArtistBanner }} />
      <View style={{ padding: 15 }}>
        <Text>{artist.strArtist}</Text>
        <Text ellipsizeMode="head" numberOfLines={30}>
          {artist.strBiographyEN}
        </Text>
      </View>
    </ScrollView>
  );
};

export default memo(Item);
