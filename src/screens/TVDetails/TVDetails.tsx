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
import {Header} from '../../atoms/Header/Header';
import Videos from '../../molecules/Videos/Videos';
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';
import {Divider} from '../../atoms/Divider/Divider';
import PeopleList from '../../molecules/PeopleList/PeopleList';
import MoviesList from '../../molecules/MoviesList/MoviesList';
import ReviewList from '../../molecules/ReviewList/ReviewList';
import MoreAbout from '../../molecules/MoreAbout/MoreAbout';

export default function TVDetails() {
  const route = useRoute();
  const {TVId}: any = route.params;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>([]);

  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/tv/${TVId}`);
      setDetails(data);
      setLoading(false);
    };
    getDetails();
  }, [TVId]);

  const getGenre = () => {
    return details.genres.map((genre: {name: string}) => (
      <Box
        borderWidth={1}
        borderRadius={5}
        borderColor="whiteColor"
        height={32}
        px="sm"
        mr="s"
        py="xs">
        <Text variant="genre">{genre.name}</Text>
      </Box>
    ));
  };

  return (
    <Box flex={1} bg="primary">
      <Header
        title={details.name}
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
            <ImageSlider url="/tv/" movieId={TVId} />
            {details.homepage ? (
              <Box
                bg="secondary"
                borderRadius={100}
                p="sm"
                ml="m"
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
            <Box m="m">
              <Box flexDirection="row">
                <Image
                  source={{uri: `${IMAGE_POSTER_URL}${details.poster_path}`}}
                  style={styles.posterImage}
                />
                <Box flex={1} ml="m" my="s">
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {getGenre()}
                  </ScrollView>
                  <Box flex={1} my="s">
                    <Text variant="text_normal" fontSize={13}>
                      {details.overview}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Divider color="whiteColor" height={1} my="m" />
              <Box flexDirection="row" justifyContent="space-evenly">
                <Box alignItems="center">
                  <Icon
                    title="star"
                    size={theme.spacing.l}
                    color={theme.colors.secondary}
                  />
                  <Box mt="xxs" flexDirection="row" alignItems="center">
                    <Text variant="subHeading">
                      {details.vote_average.toFixed(1)}
                    </Text>
                    <Text variant="text_normal">/10</Text>
                  </Box>
                  <Text variant="title_sm">{details.vote_count}</Text>
                </Box>
                <Box alignItems="center">
                  <Icon
                    title="people"
                    size={theme.spacing.l}
                    color={theme.colors.secondary}
                  />
                  <Text mt="xxs" variant="subHeading">
                    {details.popularity.toFixed(0)}
                  </Text>
                </Box>
                <Box alignItems="center">
                  <Icon
                    title="timer"
                    size={theme.spacing.l}
                    color={theme.colors.secondary}
                  />
                  <Text mt="xxs" variant="subHeading">
                    {details.episode_run_time} mins/episode
                  </Text>
                </Box>
              </Box>
              <Divider color="whiteColor" height={1} my="m" />
              <PeopleList title="Cast" url={`/tv/${TVId}/credits`} />
              <Divider color="whiteColor" height={1} my="m" />
              <MoviesList title="More like this" url={`/tv/${TVId}/similar`} />
              <Divider color="whiteColor" height={1} my="m" />
              <Videos
                title="Teasers | Trailers"
                url={`/tv/${TVId}/videos`}
                imageSource={`${IMAGE_POSTER_URL}${details.backdrop_path}`}
              />
              <Divider color="whiteColor" height={1} my="m" />
              <ReviewList title="User reviews" url={`/tv/${TVId}/reviews`} />
              <Divider color="whiteColor" height={1} my="m" />
              <MoreAbout
                title={`More about "${details.name}"`}
                url={`/tv/${TVId}/external_ids`}
              />
            </Box>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  posterImage: {width: 100, height: 170},
});
