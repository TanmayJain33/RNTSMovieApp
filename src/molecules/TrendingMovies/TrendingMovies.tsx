import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {POSTER_IMAGE} from '../../utilities/Config';
import {GET} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';

export default function TrendingMovies(props: any) {
  const [loading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState<any>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getTrendingMovies = async () => {
      const moviesData = await GET(props.url);
      setTrendingMovies(moviesData.results);
      setLoading(false);
    };
    getTrendingMovies();
  }, [props.url]);

  const displayTrendingMovies = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate(
            'MovieDetails' as never,
            {
              movieId: trendingMovies[index].id,
            } as never,
          )
        }>
        <Image
          source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
          style={styles.poster}
        />
        <Box width={theme.spacing.CL}>
          <Text variant="title_normal" mt="sm">
            {item.title}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box>
      {loading ? (
        <Loader size="large" color={theme.colors.whiteColor} />
      ) : (
        <Box>
          <Text variant="subHeading" m="sm">
            {props.title}
          </Text>
          <FlatList
            keyExtractor={item => item.id}
            data={trendingMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={v => displayTrendingMovies(v)}
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
