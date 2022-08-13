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
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate(
            'MovieDetails' as never,
            {
              movieId: moviesList[index].id,
            } as never,
          )
        }>
        <Image
          source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
          style={styles.poster}
        />
        {item.vote_average > 0 && (
          <Box
            width={75}
            height={30}
            bg="secondary"
            borderTopRightRadius={10}
            borderBottomLeftRadius={10}
            position="absolute"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            right={0}>
            <Text variant="title_imdb" mr="xs">
              IMDb
            </Text>
            <Text variant="title_sm" fontWeight="700" color="ratingColor">
              {item.vote_average.toFixed(2)}
            </Text>
          </Box>
        )}
        <Box width={theme.spacing.CL}>
          <Text variant="title_normal" mt="sm">
            {item.title}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box mb="m">
      {loading ? (
        <Loader size="large" color={theme.colors.whiteColor} />
      ) : (
        <Box>
          <Text variant="subHeading" m="sm" mb="m">
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
  container: {marginHorizontal: 10},
  poster: {width: 150, height: 250, borderRadius: 10},
});
