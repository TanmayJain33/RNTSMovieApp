import React, {useEffect} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {POSTER_IMAGE} from '../../utilities/Config';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../../atoms/Icon/Icon';
import {useSelector, useDispatch} from 'react-redux';
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getSimilarMovies,
} from '../../redux/actions/movies.action';
import {
  getTrendingTV,
  getNowPlayingTV,
  getTopRatedTV,
  getSimilarTV,
} from '../../redux/actions/tv.action';
import {
  getFavoriteMovies,
  getFavoriteTV,
  postMoviesAsFavorite,
  postMoviesAsUnFavorite,
  postTVAsFavorite,
  postTVAsUnFavorite,
} from '../../redux/actions/favorites.action';
import {useTranslation} from 'react-i18next';

export default function MoviesList(props: any) {
  const {t} = useTranslation();
  const {trendingMovies, nowPlayingMovies, topRatedMovies, similarMovies} =
    useSelector((state: any) => state.moviesReducer);
  const {trendingTV, nowPlayingTV, topRatedTV, similarTV} = useSelector(
    (state: any) => state.tvReducer,
  );
  const {favoriteMovies, favoriteTV} = useSelector(
    (state: any) => state.favoritesReducer,
  );

  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const fetchFavoriteMovies = async () => {
    await dispatch(getFavoriteMovies(props.language));
  };

  const fetchFavoriteTV = async () => {
    await dispatch(getFavoriteTV(props.language));
  };

  const fetchMovies = async () => {
    await dispatch(getTrendingMovies(props.language));
    await dispatch(getNowPlayingMovies(props.language));
    await dispatch(getTopRatedMovies(props.language));
    await dispatch(getSimilarMovies(props.movieId, props.language));
    await fetchFavoriteMovies();
  };

  const fetchTV = async () => {
    await dispatch(getTrendingTV(props.language));
    await dispatch(getNowPlayingTV(props.language));
    await dispatch(getTopRatedTV(props.language));
    await dispatch(getSimilarTV(props.TVId, props.language));
    await fetchFavoriteTV();
  };

  useEffect(() => {
    props.tv ? fetchTV() : fetchMovies();
  }, []);

  const moviesList =
    props.trending == true
      ? props.tv
        ? trendingTV
        : trendingMovies
      : props.nowPlaying == true
      ? props.region
        ? nowPlayingMovies
        : nowPlayingTV
      : props.rated == true
      ? props.tv
        ? topRatedTV
        : topRatedMovies
      : props.movieId
      ? similarMovies
      : props.TVId
      ? similarTV
      : '';

  const addFavoriteMovieItem = async (id: any) => {
    await dispatch(
      postMoviesAsFavorite(
        id,
        t('common:add_favorite_item_text'),
        t('common:ok_text'),
      ),
    );
    await dispatch(getFavoriteMovies(props.language));
    await dispatch(fetchMovies());
  };

  const addFavoriteTVItem = async (id: any) => {
    await dispatch(
      postTVAsFavorite(
        id,
        t('common:add_favorite_item_text'),
        t('common:ok_text'),
      ),
    );
    await dispatch(getFavoriteTV(props.language));
    await dispatch(fetchTV());
  };

  const removeFavoriteMovieItem = async (id: any) => {
    await dispatch(
      postMoviesAsUnFavorite(
        id,
        t('common:remove_favorite_item_text'),
        t('common:ok_text'),
      ),
    );
    await dispatch(getFavoriteMovies(props.language));
    await dispatch(fetchMovies());
  };

  const removeFavoriteTVItem = async (id: any) => {
    await dispatch(
      postTVAsUnFavorite(
        id,
        t('common:remove_favorite_item_text'),
        t('common:ok_text'),
      ),
    );
    await dispatch(getFavoriteTV(props.language));
    await dispatch(fetchTV());
  };

  const movieExists = (movie: any) => {
    if (favoriteMovies.filter((item: any) => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  const tvExists = (tv: any) => {
    if (favoriteTV.filter((item: any) => item.id === tv.id).length > 0) {
      return true;
    }
    return false;
  };

  const displayMovies = ({item, index}: any) => {
    return (
      <Box mr="m">
        <TouchableOpacity
          onPress={() => {
            props.tv
              ? navigation.navigate(
                  'TVDetails' as never,
                  {
                    TVId: moviesList[index].id,
                  } as never,
                )
              : navigation.navigate(
                  'MovieDetails' as never,
                  {
                    movieId: moviesList[index].id,
                  } as never,
                );
          }}>
          <Image
            source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
            style={styles.poster}
          />
          {item.vote_average > 0 && (
            <Box
              width={65}
              height={25}
              bg="secondary"
              borderTopRightRadius={10}
              borderBottomLeftRadius={10}
              position="absolute"
              alignItems="center"
              justifyContent="space-evenly"
              flexDirection="row"
              right={0}>
              <Text variant="title_imdb">IMDb</Text>
              <Text variant="title_sm" fontWeight="700" color="ratingColor">
                {item.vote_average.toFixed(1)}
              </Text>
            </Box>
          )}
          <Box
            width={140}
            my="s"
            flexDirection="row"
            justifyContent="space-between">
            <Box width={115}>
              <Text variant="text_normal" textAlign="left">
                {item.title || item.name}
              </Text>
            </Box>
            {props.tv ? (
              <TouchableOpacity
                testID="tvFavoriteIcon"
                onPress={() =>
                  tvExists(item)
                    ? removeFavoriteTVItem(moviesList[index].id)
                    : addFavoriteTVItem(moviesList[index].id)
                }>
                <Icon
                  title={tvExists(item) ? 'heart' : 'heart-outline'}
                  color={theme.colors.secondary}
                  size={20}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                testID={'movieFavoriteIcon' + moviesList[index].id}
                onPress={() =>
                  movieExists(item)
                    ? removeFavoriteMovieItem(moviesList[index].id)
                    : addFavoriteMovieItem(moviesList[index].id)
                }>
                <Icon
                  title={movieExists(item) ? 'heart' : 'heart-outline'}
                  color={theme.colors.secondary}
                  size={20}
                />
              </TouchableOpacity>
            )}
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <Box {...props}>
      {moviesList.length <= 0 ? (
        <Loader />
      ) : (
        <Box>
          <Text variant="subHeading" mb="m">
            {props.title}
          </Text>
          <FlatList
            keyExtractor={item => item.id}
            data={moviesList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={v => displayMovies(v)}
          />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {height: 200, width: 140, borderRadius: 10},
});
