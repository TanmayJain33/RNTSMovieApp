import React from 'react';
import {ScrollView} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import DiscoverMovies from '../../molecules/DiscoverMovies/DiscoverMovies';
import MoviesList from '../../molecules/MoviesList/MoviesList';
import theme from '../../styles/theme';

export default function MoviesScreen() {
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
        iconSize={theme.spacing.ml}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="m">
          <DiscoverMovies url="/discover/movie" />
          <MoviesList title="Trending Movies" url="/trending/movie/week" />
          <MoviesList
            title="Now Playing In India"
            url="/movie/now_playing"
            region="IN"
          />
          <MoviesList title="Top Rated" url="/movie/top_rated" />
        </Box>
      </ScrollView>
    </Box>
  );
}
