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
import {Header} from '../../atoms/Header/Header';
import Videos from '../../molecules/Videos/Videos';
import TrendingMovies from '../../molecules/MoviesList/MoviesList';

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
        borderColor="whiteColor"
        px="sm"
        py="xs"
        mx="sm">
        <Text variant="genre">{genre.name}</Text>
      </Box>
    ));
  };

  return (
    <Box flex={1} bg="primary">
      <Header
        title={details.original_title}
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
        iconLeft={true}
        iconName="arrow-back"
        iconColor={theme.colors.secondary}
        iconSize={theme.spacing.ml}
      />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <Loader size="large" color={theme.colors.whiteColor} />
        ) : (
          <Box>
            <Box>
              <Image
                source={{uri: `${IMAGE_POSTER_URL}${details.backdrop_path}`}}
                style={styles.posterImage}
              />
            </Box>
            {details.homepage ? (
              <Box
                bg="secondary"
                borderRadius={100}
                p="sm"
                ml="s"
                mt="-ml"
                alignItems="center"
                width={45}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(details.homepage);
                  }}>
                  <Icon
                    title="md-link-sharp"
                    color={theme.colors.whiteColor}
                    size={22}
                  />
                </TouchableOpacity>
              </Box>
            ) : null}
            <Box
              bg="secondary"
              borderRadius={100}
              p="sm"
              mr="s"
              mt="-xxl"
              alignSelf="flex-end"
              alignItems="center"
              width={50}
              height={45}>
              <Text variant="title_imdb">IMDb</Text>
              <Text variant="title_sm" fontWeight="700" color="ratingColor">
                {details.vote_average.toFixed(2)}
              </Text>
            </Box>
            <Box>
              <Text ml="s" variant="subHeading" mt="xs">
                Overview
              </Text>
              <Text variant="text_normal" mx="ml" mb="sm" mt="xxs">
                {details.overview}
              </Text>
              <Box flexDirection="row" justifyContent="space-between" m="sm">
                <Box>
                  <Text variant="headingSmall">Budget</Text>
                  <Text variant="text_normal_special" mt="xxs">
                    $ {details.budget}
                  </Text>
                </Box>
                <Box>
                  <Text variant="headingSmall">Duration</Text>
                  <Text variant="text_normal_special" mt="xxs">
                    {details.runtime} min.
                  </Text>
                </Box>
                <Box>
                  <Text variant="headingSmall">Release Date</Text>
                  <Text variant="text_normal_special" mt="xxs">
                    {details.release_date}
                  </Text>
                </Box>
              </Box>
              <Text variant="subHeading" mt="xxs" ml="sm">
                Genre
              </Text>
              <Box mt="s" flexDirection="row">
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                  {getGenre()}
                </ScrollView>
              </Box>
              <TrendingPeople title="Cast" url={`/movie/${movieId}/credits`} />
              <Videos
                title="Teasers | Trailers"
                url={`/movie/${movieId}/videos`}
                imageSource={`${IMAGE_POSTER_URL}${details.backdrop_path}`}
              />
              <TrendingMovies
                title="Similar Movies"
                url={`/movie/${movieId}/similar`}
              />
            </Box>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: theme.colors.primary},
  posterImage: {width: screenWidth, height: 250},
});
