import React from 'react';
import Box from '../../atoms/Box/Box';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useRoute} from '@react-navigation/native';
import {Header} from '../../atoms/Header/Header';
import theme from '../../styles/theme';

export default function VideoPlayer() {
  const route = useRoute();
  const {videoId}: any = route.params;

  return (
    <>
      <Box bg="primary">
        <Header
          alignItems="center"
          flexDirection="row"
          mb="sm"
          mx="ml"
          iconLeft={true}
          iconName="arrow-back"
          iconColor={theme.colors.secondary}
          iconSize={theme.spacing.ml}
        />
      </Box>
      <Box flex={1} alignItems="center" justifyContent="center" bg="darkColor">
        <Box width="100%">
          <YoutubePlayer height={270} play={false} videoId={videoId} />
        </Box>
      </Box>
    </>
  );
}
