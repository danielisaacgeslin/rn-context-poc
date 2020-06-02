import React, { memo, useContext, useMemo, useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

import { Input } from '../shared/Input/Input';
import { ListItem } from './components/ListItem';
import { useArtistEffect } from '../state-mgmt/artist/useArtistEffect';
import { IArtist } from '../state-mgmt/artist/state';
import { GlobalContext } from '../state-mgmt/GlobalState';

export interface Props {
  navigation: StackNavigationProp<any>;
}

const List = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const { state } = useContext(GlobalContext);
  const { searchArtist } = useArtistEffect();
  const list = useMemo(() => Object.values(state.artist.artistMap), [state.artist.artistMap]);
  const keyExtractor = useCallback((item: IArtist) => item.idArtist, []);
  const onSubmitEditing = useCallback(async () => {
    await searchArtist(search);
    setSearch('');
  }, [search, setSearch]);

  const renderItem = useCallback(
    ({ item }: { item: IArtist }) => <ListItem artist={item} onPress={() => navigation.navigate('Artist', { id: item.idArtist })} />,
    []
  );

  return (
    <View>
      <Text>Search your Artist</Text>
      <Input onChangeText={setSearch} value={search} onSubmitEditing={onSubmitEditing} />
      <FlatList data={list} keyExtractor={keyExtractor} renderItem={renderItem} />
    </View>
  );
};

export default memo(List);
