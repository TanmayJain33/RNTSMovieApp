import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import {Loader} from '../../atoms/Loader/Loader';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import {screenWidth} from '../../utilities/Constants';
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import {getMovieImages} from '../../redux/actions/movies.action';
import {getTVImages} from '../../redux/actions/tv.action';

export default function ImageSlider(props: any) {
  const [imageList, setImageList] = useState<any>([]);
  const {movieImages} = useSelector((state: any) => state.moviesReducer);
  const {tvImages} = useSelector((state: any) => state.tvReducer);
  const dispatch: any = useDispatch();

  const fetchMovieImages = async () => {
    await dispatch(getMovieImages(props.movieId));
  };

  const fetchTVImages = async () => {
    await dispatch(getTVImages(props.TVId));
  };

  useEffect(() => {
    props.movieId ? fetchMovieImages() : fetchTVImages();
  }, []);

  const getImages = async () => {
    const images = props.movieId
      ? movieImages?.backdrops.map(
          (data: {file_path: any}) => `${IMAGE_POSTER_URL}${data.file_path}`,
        )
      : tvImages?.backdrops.map(
          (data: {file_path: any}) => `${IMAGE_POSTER_URL}${data.file_path}`,
        );
    let backImages: any[] | ((prevState: never[]) => never[]) = [];
    for (let i = 0; i < images.length; ++i) {
      backImages = [...backImages, images[i]];
    }
    setImageList(backImages);
  };

  useEffect(() => {
    getImages();
  }, [movieImages, tvImages]);

  return (
    <Box height={imageList.length > 0 ? 250 : 0}>
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
        <Loader />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {width: screenWidth, height: 250},
  dotStyle: {width: 0, height: 0},
});
