import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Icon} from '../../atoms/Icon/Icon';
import {Loader} from '../../atoms/Loader/Loader';
import Text from '../../atoms/Text/Text';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {screenWidth} from '../../utilities/Constants';
import {useSelector} from 'react-redux';

export default function DiscoverMovies(props: any) {
  const [discoverMovies, setDiscoverMovies] = useState<any>([]);
  const [imageList, setImageList] = useState<any>([]);
  const [active, setActive] = useState(0);
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);

  const navigation = useNavigation();

  useEffect(() => {
    const getDiscoverMovies = async () => {
      const imageData = await GET(props.url);
      setDiscoverMovies(imageData.results);
      const images = imageData.results.map(
        (data: {backdrop_path: any}) =>
          `${IMAGE_POSTER_URL}${data.backdrop_path}`,
      );
      let backImages: any[] | ((prevState: never[]) => never[]) = [];
      for (let i = 0; i < 10; ++i) {
        backImages = [...backImages, images[i]];
      }
      setImageList(backImages);
    };
    getDiscoverMovies();
  }, [props.url]);

  const onChange = ({nativeEvent}: any) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <Box mb="m" {...props}>
      {imageList.length > 0 ? (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={10}
            onScroll={onChange}
            showsHorizontalScrollIndicator={false}>
            {imageList.map((item: any, index: React.Key) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.tv
                    ? navigation.navigate(
                        'TVDetails' as never,
                        {
                          TVId: discoverMovies[index].id,
                        } as never,
                      )
                    : navigation.navigate(
                        'MovieDetails' as never,
                        {
                          movieId: discoverMovies[index].id,
                        } as never,
                      );
                }}>
                <Image
                  resizeMode="cover"
                  key={index}
                  source={{uri: item}}
                  style={styles.poster}
                />
                <Box
                  pt="xs"
                  bg="whiteColor"
                  borderBottomLeftRadius={10}
                  borderBottomRightRadius={10}>
                  <Text
                    variant="headingSmall"
                    color="primary"
                    textAlign="center">
                    {discoverMovies[index].title || discoverMovies[index].name}
                  </Text>
                  <Box
                    my="xs"
                    flexDirection="row"
                    justifyContent="space-evenly">
                    <Box flexDirection="row" alignItems="center">
                      <Icon
                        title="calendar"
                        size={theme.spacing.m}
                        color={
                          ThemeReducer.theme === true
                            ? theme.colors.primary
                            : theme.colors.whiteColor
                        }
                      />
                      <Text variant="text_normal" color="primary" ml="xs">
                        {discoverMovies[index].release_date ||
                          discoverMovies[index].first_air_date}
                      </Text>
                    </Box>
                    <Box flexDirection="row" alignItems="center">
                      <Icon
                        title="star"
                        size={theme.spacing.m}
                        color={theme.colors.secondary}
                      />
                      <Text variant="text_normal_special" ml="xs">
                        {discoverMovies[index].vote_average}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Box
            bottom={theme.spacing.xxl}
            position="absolute"
            alignSelf="center"
            flexDirection="row">
            {imageList.map((i: any, k: number) => (
              <Box
                mx="sm"
                mb="s"
                key={k}
                bg={k === active ? 'secondary' : 'whiteColor'}
                width={theme.spacing.s}
                height={theme.spacing.s}
                borderRadius={theme.spacing.s}
              />
            ))}
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {width: screenWidth, height: 250},
});
