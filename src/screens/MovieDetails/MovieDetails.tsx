import React, {useState, useEffect} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {GET} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import {Icon} from '../../atoms/Icon/Icon';
import {useRoute} from '@react-navigation/native';
import theme from '../../styles/theme';
import {screenWidth} from '../../utilities/Constants';
import TrendingPeople from '../../molecules/TrendingPeople/TrendingPeople';
import TrendingMovies from '../../molecules/TrendingMovies/TrendingMovies';

export default function MovieDetails() {
  const route = useRoute();
  const {movieId}: any = route.params;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>([]);

  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/movie/${movieId}`);
      setDetails(data);
      setLoading(false);
    };
    getDetails();
  }, [movieId]);

  const getGenre = () => {
    return details.genres.map((genre: {name: string}) => (
      <Box
        borderWidth={1}
        borderRadius={5}
        borderColor="whiteText"
        px="sm"
        py="xs"
        mx="sm">
        <Text variant="genre">{genre.name}</Text>
      </Box>
    ));
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      {loading ? (
        <Loader size="large" color={theme.colors.mainBackground} />
      ) : (
        <Box>
          <Box>
            <Image
              source={{uri: `${IMAGE_POSTER_URL}${details.backdrop_path}`}}
              style={styles.posterImage}
            />
          </Box>
          <Text variant="detailsMovieTitle" mt="-xl">
            {details.original_title}
          </Text>
          {details.homepage ? (
            <Box
              bg="secondary"
              borderRadius={100}
              p="sm"
              width={45}
              ml="ml"
              mt="-ml">
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(details.homepage);
                }}>
                <Icon
                  title="link-outline"
                  color={theme.colors.mainBackground}
                  size={22}
                />
              </TouchableOpacity>
            </Box>
          ) : null}
          <Text variant="subHeading">OVERVIEW</Text>
          <Text variant="overview" mx="sm">
            {details.overview}
          </Text>
          <Box flexDirection="row" justifyContent="space-between" my="ml">
            <Box>
              <Text variant="subHeading">BUDGET</Text>
              <Text variant="details" ml="sm">
                $ {details.budget}
              </Text>
            </Box>
            <Box>
              <Text variant="subHeading">DURATION</Text>
              <Text variant="details" ml="sm">
                {details.runtime} min.
              </Text>
            </Box>
            <Box>
              <Text variant="subHeading">RELEASE DATE</Text>
              <Text variant="details" ml="sm">
                {details.release_date}
              </Text>
            </Box>
          </Box>
          <Text variant="subHeading">GENRE</Text>
          <Box flexDirection="row">{getGenre()}</Box>
          <TrendingPeople title="CAST" url={`/movie/${movieId}/credits`} />
          <TrendingMovies
            title="SIMILAR MOVIES"
            url={`/movie/${movieId}/similar`}
          />
        </Box>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: theme.colors.primary},
  posterImage: {width: screenWidth, height: 250},
});
