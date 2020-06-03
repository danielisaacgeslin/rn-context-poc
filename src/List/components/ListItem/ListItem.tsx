import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { TouchableOpacity } from 'react-native';
import { IArtist } from '../../../state-mgmt/artist/state';

export interface Props {
  artist: IArtist;
  onPress: () => void;
}

const ListItem = ({ artist, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} testID="list-item">
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Image
            style={styles.image as any}
            source={{
              uri:
                artist.strArtistThumb ||
                'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'
            }}
          />
          <Text>{artist.strArtist}</Text>
        </View>
        <Text style={styles.link}>view details</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
