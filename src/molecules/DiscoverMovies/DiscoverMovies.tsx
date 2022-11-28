import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Icon} from '../../atoms/Icon/Icon';
import {Loader} from '../../atoms/Loader/Loader';
import Text from '../../atoms/Text/Text';
import theme from '../../styles/theme';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {screenWidth} from '../../utilities/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {getDiscoverMovies} from '../../redux/actions/movies.action';
import {getDiscoverTV} from '../../redux/actions/tv.action';

export default function DiscoverMovies(props: any) {
  const [active, setActive] = useState(0);
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);
  const {discoverMovies} = useSelector((state: any) => state.moviesReducer);
  const {discoverTV} = useSelector((state: any) => state.tvReducer);

  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const fetchDiscoverMovies = () => dispatch(getDiscoverMovies(props.language));
  const fetchDiscoverTV = () => dispatch(getDiscoverTV(props.language));

  useEffect(() => {
    props.tv ? fetchDiscoverTV() : fetchDiscoverMovies();
  }, []);

  const discoverList = props.tv
    ? discoverTV.slice(0, 10)
    : discoverMovies.slice(0, 10);

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
      {discoverList.length > 0 ? (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={10}
            onScroll={onChange}
            showsHorizontalScrollIndicator={false}>
            {discoverList.map((item: any, index: React.Key) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.tv
                    ? navigation.navigate(
                        'TVDetails' as never,
                        {
                          TVId: discoverList[index]?.id,
                        } as never,
                      )
                    : navigation.navigate(
                        'MovieDetails' as never,
                        {
                          movieId: discoverList[index]?.id,
                        } as never,
                      );
                }}>
                <Image
                  resizeMode="cover"
                  key={index}
                  source={{
                    uri: IMAGE_POSTER_URL + discoverList[index]?.backdrop_path,
                  }}
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
                    {discoverList[index]?.title || discoverList[index]?.name}
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
                        {discoverList[index]?.release_date ||
                          discoverList[index]?.first_air_date}
                      </Text>
                    </Box>
                    <Box flexDirection="row" alignItems="center">
                      <Icon
                        title="star"
                        size={theme.spacing.m}
                        color={theme.colors.secondary}
                      />
                      <Text variant="text_normal_special" ml="xs">
                        {discoverList[index]?.vote_average}
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
            {discoverList.slice(0, 10).map((i: any, k: number) => (
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
