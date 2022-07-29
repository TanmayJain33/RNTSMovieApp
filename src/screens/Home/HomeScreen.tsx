import React from 'react';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import MovieItem from '../../molecules/MovieItem/MovieItem';
import theme from '../../styles/theme';

export default function HomeScreen() {
  return (
    <Box flex={1} bg="mainBackground" pt="m" px="ml">
      <Header
        title="Movie Catch"
        justifyContent="space-between"
        flexDirection="row"
        mb="sm"
        icon={true}
        iconName="search-outline"
        iconColor={theme.colors.activeIconColor}
        iconSize={theme.iconSize.normal}
      />
      <MovieItem url="/movie/popular" />
    </Box>
  );
}
