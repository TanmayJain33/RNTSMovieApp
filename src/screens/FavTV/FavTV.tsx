import React from 'react';
import {ScrollView} from 'react-native';
import Box from '../../atoms/Box/Box';
import MoviesList from '../../molecules/MoviesList/MoviesList';

export default function FavTV() {
  return (
    <Box flex={1} bg="primary">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mx="m" mt="m" mb="m">
          <MoviesList title="Trending Movies" url="/trending/movie/week" />
        </Box>
      </ScrollView>
    </Box>
  );
}
