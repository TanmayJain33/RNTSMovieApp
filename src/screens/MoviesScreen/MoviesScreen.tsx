import React from 'react';
import {ScrollView} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Divider} from '../../atoms/Divider/Divider';
import {Header} from '../../atoms/Header/Header';
import DiscoverMovies from '../../molecules/DiscoverMovies/DiscoverMovies';
import MoviesList from '../../molecules/MoviesList/MoviesList';
import theme from '../../styles/theme';

export default function MoviesScreen() {
  return (
    <Box flex={1} bg="primary">
      <Header
        testID="moviesHeader"
        title="Movie Catch"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
        icon={true}
        iconName="search-outline"
        iconColor={theme.colors.secondary}
        iconSize={theme.spacing.ml}
      />
      <ScrollView testID="movies" showsVerticalScrollIndicator={false}>
        <Box mb="m">
          <DiscoverMovies testID="discoverMovies" />
          <Box mx="m" mt="m">
            <MoviesList
              trending={true}
              title="Trending Movies"
              testID="trendingMovies"
            />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList
              nowPlaying={true}
              title="Now Playing In India"
              region="IN"
              testID="nowPlayingMovies"
            />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList
              title="Top Rated"
              rated={true}
              testID="topRatedMovies"
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
