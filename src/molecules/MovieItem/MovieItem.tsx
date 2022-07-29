import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {POSTER_IMAGE} from '../../utilities/Config';
import {GET} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';

export default function MovieItem(props: any) {
  const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState();

  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await GET(props.url);
      setPopularMovies(data.results);
      setLoading(false);
    };
    getPopularMovies();
  }, [props.url]);

  const displayPopularMovies = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.container}>
        <Image
          source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
          style={styles.poster}
        />
        <Text variant="movieTitle">{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Box>
      {loading ? (
        <Loader size="large" color={theme.colors.darkColor} />
      ) : (
        <Box>
          <FlatList
            keyExtractor={item => item.id}
            data={popularMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => displayPopularMovies(item)}
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
