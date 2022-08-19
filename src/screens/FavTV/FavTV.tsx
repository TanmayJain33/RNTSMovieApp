import React from 'react';
import {ScrollView} from 'react-native';
import Box from '../../atoms/Box/Box';
import FavoriteList from '../../molecules/FavoriteList/FavoriteList';

export default function FavTV() {
  return (
    <Box flex={1} bg="primary">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mx="m" mt="m" mb="m">
          <FavoriteList tv={true} />
        </Box>
      </ScrollView>
    </Box>
  );
}
