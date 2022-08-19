import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {POSTER_IMAGE} from '../../utilities/Config';
import {GET, GETFAVMOVIES, GETFAVTV, POSTFAV} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../../atoms/Icon/Icon';

export default function MoviesList(props: any) {
  const [loading, setLoading] = useState(true);
  const [moviesList, setMoviesList] = useState<any>([]);
  const [favMoviesData, setFavMoviesData] = useState<any>([]);
  const [favTVData, setFavTVData] = useState<any>([]);

  const navigation = useNavigation();

  const getMovie = async () => {
    setLoading(true);
    const moviesData = await GET(props.url, props.region);
    setMoviesList(moviesData.results);
    setLoading(false);
  };

  const getFavMovies = async () => {
    const favMovieData = await GETFAVMOVIES();
    setFavMoviesData(favMovieData.results);
  };

  const getFavTV = async () => {
    const favTvData = await GETFAVTV();
    setFavTVData(favTvData.results);
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const moviesData = await GET(props.url, props.region);
      setMoviesList(moviesData.results);
      setLoading(false);
    };
    getMovies();
    getFavMovies();
    getFavTV();
  }, [props.region, props.url]);

  const postMovieAsFavorite = async (movieId: any) => {
    const data = await POSTFAV(
      '/account/{account_id}/favorite',
      'movie',
      movieId,
      true,
    );
    if (data.success === true) {
      Alert.alert('Added to Favorites');
      getMovie();
      getFavMovies();
      getFavTV();
    }
  };

  const postMovieAsUnFavorite = async (movieId: any) => {
    const data = await POSTFAV(
      '/account/{account_id}/favorite',
      'movie',
      movieId,
      false,
    );
    if (data.success === true) {
      Alert.alert('Removed from Favorites');
      getMovie();
      getFavMovies();
      getFavTV();
    }
  };

  const postTVAsFavorite = async (tvId: any) => {
    const data = await POSTFAV(
      '/account/{account_id}/favorite',
      'tv',
      tvId,
      true,
    );
    if (data.success === true) {
      Alert.alert('Added to Favorites');
      getFavMovies();
      getFavTV();
    }
  };

  const postTVAsUnFavorite = async (tvId: any) => {
    const data = await POSTFAV(
      '/account/{account_id}/favorite',
      'tv',
      tvId,
      false,
    );
    if (data.success === true) {
      Alert.alert('Removed from Favorites');
      getFavMovies();
      getFavTV();
    }
  };

  const movieExists = (movie: any) => {
    if (favMoviesData.filter((item: any) => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  const tvExists = (tv: any) => {
    if (favTVData.filter((item: any) => item.id === tv.id).length > 0) {
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
                onPress={() =>
                  tvExists(item)
                    ? postTVAsUnFavorite(moviesList[index].id)
                    : postTVAsFavorite(moviesList[index].id)
                }>
                <Icon
                  title={tvExists(item) ? 'heart' : 'heart-outline'}
                  color={theme.colors.secondary}
                  size={20}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  movieExists(item)
                    ? postMovieAsUnFavorite(moviesList[index].id)
                    : postMovieAsFavorite(moviesList[index].id)
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
    <Box>
      {loading ? (
        <Loader size="large" color={theme.colors.whiteColor} />
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
