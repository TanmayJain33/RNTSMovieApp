import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {GET} from '../../services/API';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import VideoItem from '../VideoItem/VideoItem';
import {useNavigation} from '@react-navigation/core';

export default function Videos(props: any) {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getVideos = async () => {
      const videosData = await GET(props.url);
      setVideos(videosData.results);
      setLoading(false);
    };
    getVideos();
  }, [props.url]);

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
      {loading ? (
        <Loader size="large" color={theme.colors.whiteColor} />
      ) : (
        <Box>
          <Text variant="subHeading" mb="m">
            {props.title}
          </Text>
          <FlatList
            keyExtractor={item => item.id}
            style={styles.container}
            data={videos}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={v => displayVideos(v)}
          />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {marginHorizontal: 5},
  textStyles: {width: 171},
});
