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
          <Box mx="m" mt="m">
            <MoviesList title="Trending Movies" url="/trending/movie/week" />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList
              title="Now Playing In India"
              url="/movie/now_playing"
              region="IN"
            />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList title="Top Rated" url="/movie/top_rated" />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
