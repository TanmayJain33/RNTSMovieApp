import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Loader} from '../../atoms/Loader/Loader';
import VideoItem from '../VideoItem/VideoItem';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {getMovieVideos, getTVVideos} from '../../redux/actions/videos.action';
import {Divider} from '../../atoms/Divider/Divider';

export default function Videos(props: any) {
  const {movieVideos, tvVideos} = useSelector(
    (state: any) => state.videosReducer,
  );
  const dispatch: any = useDispatch();

  const navigation = useNavigation();

  const fetchMovieVideos = async () => {
    await dispatch(getMovieVideos(props.movieId, props.language));
  };

  const fetchTVVideos = async () => {
    await dispatch(getTVVideos(props.TVId));
  };

  useEffect(() => {
    props.movieId ? fetchMovieVideos() : fetchTVVideos();
  }, []);

  const displayVideos = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() =>
          navigation.navigate(
            'VideoPlayer' as never,
            {videoId: item.key, videoName: item.name} as never,
          )
        }>
        <VideoItem imageSource={props.imageSource} name={item.name} />
      </TouchableOpacity>
    );
  };

  return (
    <Box>
      {movieVideos.length <= 0 && tvVideos.length <= 0 ? null : (
        <>
          <Divider color="whiteColor" height={1} my="m" />
          <Box>
            <Text variant="subHeading" mb="m">
              {props.title}
            </Text>
            <FlatList
              keyExtractor={item => item.id}
              style={styles.container}
              data={props.movieId ? movieVideos : tvVideos}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              renderItem={v => displayVideos(v)}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {marginHorizontal: 5},
  textStyles: {width: 171},
});
