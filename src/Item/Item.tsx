import React, { memo, useContext } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ArtistContext } from '../state-mgmt/user/ArtistState';

export interface Props {
  navigation: StackNavigationProp<any>;
  route: any; // RouteProp<{ id: string; }, any>; /** @todo find out how to use this type */
}

const Item = ({ navigation, route }: Props) => {
  const { state } = useContext(ArtistContext);
  const artist = state.artistMap[route?.params?.id];
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
