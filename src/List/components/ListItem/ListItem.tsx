import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';

import { IArtist } from '../../../state-mgmt/user/ArtistState';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface Props {
  artist: IArtist;
  onPress: () => void;
}

const ListItem = ({ artist, onPress }: Props) => {
  console.log('list item', artist.strArtistThumb);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Image style={styles.image as any} source={{ uri: artist.strArtistThumb }} />
          <Text>{artist.strArtist}</Text>
        </View>
        <Text style={styles.link}>view details</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
