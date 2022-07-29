import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Loader} from '../../atoms/Loader/Loader';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {screenWidth} from '../../utilities/Constants';

export default function DiscoverMovies(props: any) {
  const [discoverMovies, setDiscoverMovies] = useState();
  const [imageList, setImageList] = useState<any>([]);
  const [active, setActive] = useState(0);

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

  console.log(imageList);

  return (
    <Box>
      {imageList.length > 0 ? (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={onChange}
            showsHorizontalScrollIndicator={false}>
            {imageList.map((item: any, index: React.Key | null | undefined) => (
              <TouchableOpacity key={index}>
                <Image
                  resizeMode="cover"
                  key={index}
                  source={{uri: item}}
                  style={styles.poster}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Box
            bottom={theme.spacing.xxs}
            position="absolute"
            alignSelf="center"
            flexDirection="row">
            {imageList.map((i: any, k: number) => (
              <Box
                mx="sm"
                mb="s"
                key={k}
                bg={k === active ? 'secondary' : 'mainBackground'}
                width={theme.spacing.s}
                height={theme.spacing.s}
                borderRadius={theme.spacing.s}
              />
            ))}
          </Box>
        </>
      ) : (
        <Loader size="large" color={theme.colors.mainBackground} />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {width: screenWidth, height: 250},
});
