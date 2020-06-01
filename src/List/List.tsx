import React, { memo, useContext, useMemo, useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

import { ArtistContext, IArtist, useArtistEffect } from '../state-mgmt/user/ArtistState';
import { Input } from '../shared/Input/Input';
import { ListItem } from './components/ListItem';

export interface Props {
  navigation: StackNavigationProp<any>;
}

const List = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const { state } = useContext(ArtistContext);
  const { searchArtist } = useArtistEffect();
  const list = useMemo(() => Object.values(state.artistMap), [state.artistMap]);
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
