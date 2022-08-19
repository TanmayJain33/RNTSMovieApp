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
import {GETFAVMOVIES, GETFAVTV, POSTFAV} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../../atoms/Icon/Icon';

export default function FavoriteList(props: any) {
  const [loading, setLoading] = useState(true);
  const [favMoviesList, setFavMoviesList] = useState<any>([]);
  const [favTVList, setFavTVList] = useState<any>([]);

  const navigation = useNavigation();
  console.log(favTVList);

  const getFavMovies = async () => {
    setLoading(true);
    const moviesData = await GETFAVMOVIES();
    setFavMoviesList(moviesData.results);
    setLoading(false);
  };

  const getFavTV = async () => {
    setLoading(true);
    const tvData = await GETFAVTV();
    setFavTVList(tvData.results);
    setLoading(false);
  };

  useEffect(() => {
    getFavMovies();
    getFavTV();
  }, []);

  const postMovieAsUnFavorite = async (movieId: any) => {
    const data = await POSTFAV(
      '/account/{account_id}/favorite',
      'movie',
      movieId,
      false,
    );
    if (data.success === true) {
      Alert.alert('Removed from Favorites');
      getFavMovies();
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
      getFavTV();
    }
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
                    TVId: favTVList[index].id,
                  } as never,
                )
              : navigation.navigate(
                  'MovieDetails' as never,
                  {
                    movieId: favMoviesList[index].id,
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
            width={170}
            mt="s"
            mb="m"
            flexDirection="row"
            justifyContent="space-between">
            <Box width={140}>
              <Text variant="text_normal" textAlign="left">
                {item.title || item.name}
              </Text>
            </Box>
            <TouchableOpacity
              onPress={() => {
                props.tv
                  ? postTVAsUnFavorite(favTVList[index].id)
                  : postMovieAsUnFavorite(favMoviesList[index].id);
              }}>
              <Icon title="heart" color={theme.colors.secondary} size={20} />
            </TouchableOpacity>
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
          <FlatList
            keyExtractor={item => item.id}
            data={props.tv !== true ? favMoviesList : favTVList}
            renderItem={v => displayMovies(v)}
            numColumns={2}
          />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {height: 250, width: 171, borderRadius: 10},
});
