import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import MovieItem from '../../molecules/MovieItem/MovieItem';

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

  console.log(popularMovies);

  const renderItem = ({item}: any) => {
    return (
      <Box alignItems="center" flex={1}>
        <MovieItem item={item} />
      </Box>
    );
  };

  return (
    <Box
      flex={1}
      bg="mainBackground"
      justifyContent="center"
      alignItems="center">
      {loading && <Text variant="body">HomeScreen</Text>}
      {popularMovies && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={renderItem}
        />
      )}
    </Box>
  );
}
