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
  getFavoriteMovies,
  getFavoriteTV,
  postMoviesAsUnFavorite,
  postTVAsUnFavorite,
} from '../../redux/actions/favorites.action';

export default function FavoriteList(props: any) {
  const {favoriteMovies, favoriteTV} = useSelector(
    (state: any) => state.favoritesReducer,
  );

  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const fetchFavoriteMovies = async () => {
    await dispatch(getFavoriteMovies());
  };

  const fetchFavoriteTV = async () => {
    await dispatch(getFavoriteTV());
  };

  const removeFavoriteMovieItem = async (id: any) => {
    await dispatch(postMoviesAsUnFavorite(id));
    await dispatch(getFavoriteMovies());
  };

  const removeFavoriteTVItem = async (id: any) => {
    await dispatch(postTVAsUnFavorite(id));
    await dispatch(getFavoriteTV());
  };

  useEffect(() => {
    fetchFavoriteMovies();
    fetchFavoriteTV();
  }, []);

  const displayMovies = ({item, index}: any) => {
    return (
      <Box mr="m">
        <TouchableOpacity
          onPress={() => {
            props.tv
              ? navigation.navigate(
                  'TVDetails' as never,
                  {
                    TVId: favoriteTV[index].id,
                  } as never,
                )
              : navigation.navigate(
                  'MovieDetails' as never,
                  {
                    movieId: favoriteMovies[index].id,
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
                  ? removeFavoriteTVItem(favoriteTV[index].id)
                  : removeFavoriteMovieItem(favoriteMovies[index].id);
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
      {favoriteMovies.length <= 0 && favoriteTV.length <= 0 ? (
        <Box height="100%" alignSelf="center" justifyContent="center">
          <Text variant="text_normal">No record found</Text>
        </Box>
      ) : (
        <Box>
          <FlatList
            keyExtractor={item => item.id}
            data={props.tv === true ? favoriteTV : favoriteMovies}
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
