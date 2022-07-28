import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState([{}]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=ba64d711e906d95f9ab4c758c5a7186f',
      );
      const responseJson = await response.json();
      const data: any[] = [];
      responseJson.results.forEach((movie: any) => {
        data.push(movie);
      });
      setPopularMovies(data);
      setLoading(false);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <Box>
        <Text key={item.id} variant="body">
          {item.title}
        </Text>
      </Box>
    );
  };

  return (
    <Box flex={1} bg="mainBackground" style={styles.mainContainer}>
      {loading && <Text variant="body">HomeScreen</Text>}
      {popularMovies && (
        <FlatList data={popularMovies} renderItem={renderItem} />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
