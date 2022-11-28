import React from 'react';
import {ScrollView} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Divider} from '../../atoms/Divider/Divider';
import {Header} from '../../atoms/Header/Header';
import DiscoverMovies from '../../molecules/DiscoverMovies/DiscoverMovies';
import MoviesList from '../../molecules/MoviesList/MoviesList';
import theme from '../../styles/theme';
import {useTranslation} from 'react-i18next';

export default function MoviesScreen() {
  const {t, i18n} = useTranslation();
  const selectedLanguage =
    i18n.language === 'hi'
      ? 'hi-IN'
      : i18n.language === 'fr'
      ? 'fr-FR'
      : 'en-US';

  return (
    <Box flex={1} bg="primary">
      <Header
        testID="moviesHeader"
        title={t('common:movie_title')}
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
          <DiscoverMovies testID="discoverMovies" language={selectedLanguage} />
          <Box mx="m" mt="m">
            <MoviesList
              trending={true}
              title={t('common:trending_movies_title')}
              testID="trendingMovies"
              language={selectedLanguage}
            />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList
              nowPlaying={true}
              title={t('common:now_playing_movies_title')}
              region="IN"
              testID="nowPlayingMovies"
              language={selectedLanguage}
            />
            <Divider color="whiteColor" height={1} my="m" />
            <MoviesList
              title={t('common:top_rated_movies_title')}
              rated={true}
              testID="topRatedMovies"
              language={selectedLanguage}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
