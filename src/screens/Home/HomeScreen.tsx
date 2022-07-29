import React from 'react';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import DiscoverMovies from '../../molecules/DiscoverMovies/DiscoverMovies';
import MovieItem from '../../molecules/MovieItem/MovieItem';
import theme from '../../styles/theme';

export default function HomeScreen({navigation}: any) {
  return (
    <Box flex={1} bg="primary">
      <Header
        title="Movie Catch"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
        icon={true}
        iconName="search-outline"
        iconColor={theme.colors.secondary}
        iconSize={theme.iconSize.normal}
      />
      <DiscoverMovies navigation={navigation} url="/discover/movie" />
      <MovieItem url="/movie/popular" />
    </Box>
  );
}
