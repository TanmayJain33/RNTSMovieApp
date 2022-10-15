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
        title="TV Catch"
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
          <DiscoverMovies tv="true" />
          <Box mx="m" mt="m">
            <MoviesList trending={true} title="Trending TV Shows" tv="true" />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList title="Now Playing" tv="true" nowPlaying={true} />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList rated={true} title="Top Rated" tv="true" />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
