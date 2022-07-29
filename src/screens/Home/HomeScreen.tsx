import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import Text from '../../atoms/Text/Text';
import MovieItem from '../../molecules/MovieItem/MovieItem';
import theme from '../../styles/theme';

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
      <Box alignItems="center" flex={1} pr="sm">
        <MovieItem item={item} />
      </Box>
    );
  };

  return (
    <Box flex={1} bg="mainBackground" pt="m" px="ml">
      <Header
        title="Movie Catch"
        justifyContent="space-between"
        flexDirection="row"
        mb="sm"
        icon={true}
        iconName="search-outline"
        iconColor={theme.colors.activeIconColor}
        iconSize={theme.iconSize.normal}
      />
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
