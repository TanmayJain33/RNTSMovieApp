import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Loader} from '../../atoms/Loader/Loader';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {screenWidth} from '../../utilities/Constants';
import Swiper from 'react-native-swiper';

export default function ImageSlider(props: any) {
  const [imageList, setImageList] = useState<any>([]);

  useEffect(() => {
    const getImages = async () => {
      const imageData = await GET(props.url + props.movieId + '/images');
      const images = imageData.backdrops.map(
        (data: {file_path: any}) => `${IMAGE_POSTER_URL}${data.file_path}`,
      );
      let backImages: any[] | ((prevState: never[]) => never[]) = [];
      for (let i = 0; i < images.length; ++i) {
        backImages = [...backImages, images[i]];
      }
      setImageList(backImages);
    };
    getImages();
  }, [props.url, props.movieId]);

  return (
    <Box height={250}>
      {imageList.length > 0 ? (
        <Swiper
          autoplay={true}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.dotStyle}
          index={1}>
          {imageList.map((item: any, index: React.Key) => (
            <Image
              resizeMode="cover"
              key={index}
              source={{uri: item}}
              style={styles.poster}
            />
          ))}
        </Swiper>
      ) : (
        <Loader size="large" color={theme.colors.whiteColor} />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {width: screenWidth, height: 250},
  dotStyle: {width: 0, height: 0},
});
