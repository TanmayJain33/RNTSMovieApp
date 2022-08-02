import React from 'react';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import DiscoverMovies from '../../molecules/DiscoverMovies/DiscoverMovies';
import TrendingPeople from '../../molecules/TrendingPeople/TrendingPeople';
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
      <TrendingPeople title="Trending People" url="/trending/person/week" />
    </Box>
  );
}
