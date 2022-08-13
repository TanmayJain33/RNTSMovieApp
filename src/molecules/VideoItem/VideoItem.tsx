import React from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Image, StyleSheet} from 'react-native';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import {screenWidth, screenHeight} from '../../utilities/Constants';

const posterWidth = screenWidth / 2.35;
const posterHeight = screenHeight / 9;
const leftPosition = (posterWidth - 24) / 2;
const topPosition = (posterHeight - 24) / 2;

export default function VideoItem(props: any) {
  return (
    <Box mr="m" flex={1} flexWrap="wrap">
      <Image
        resizeMode="cover"
        source={{uri: props.imageSource}}
        style={styles.posterImage}
      />
      <Box position="absolute" top={topPosition} left={leftPosition} zIndex={1}>
        <Icon title="play-circle" color={theme.colors.whiteColor} size={24} />
      </Box>
      <Text variant="title_normal" my="s" style={styles.textStyles}>
        {props.name}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {marginHorizontal: 5},
  posterImage: {
    height: posterHeight,
    width: posterWidth,
    borderRadius: 10,
  },
  textStyles: {width: posterWidth},
});
