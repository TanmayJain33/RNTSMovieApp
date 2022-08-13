import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {POSTER_IMAGE} from '../../utilities/Config';
import {GET} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';

export default function MoviesList(props: any) {
  const [loading, setLoading] = useState(true);
  const [moviesList, setMoviesList] = useState<any>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await GET(props.url, props.region);
      setMoviesList(moviesData.results);
      setLoading(false);
    };
    getMovies();
  }, [props.url, props.region]);

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
          <Box width={140}>
            <Text variant="text_normal" textAlign="left" my="s">
              {item.title || item.name}
            </Text>
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
