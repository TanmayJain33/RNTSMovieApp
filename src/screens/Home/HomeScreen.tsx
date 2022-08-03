import React from 'react';
import {ScrollView} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import DiscoverMovies from '../../molecules/DiscoverMovies/DiscoverMovies';
import TrendingMovies from '../../molecules/TrendingMovies/TrendingMovies';
import TrendingPeople from '../../molecules/TrendingPeople/TrendingPeople';
import theme from '../../styles/theme';

export default function HomeScreen() {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="m">
          <DiscoverMovies url="/discover/movie" />
          <TrendingPeople title="Trending People" url="/trending/person/week" />
          <TrendingMovies title="Trending Movies" url="/trending/movie/week" />
        </Box>
      </ScrollView>
    </Box>
  );
}
