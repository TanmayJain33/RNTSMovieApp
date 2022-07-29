import React from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Image, StyleSheet} from 'react-native';

export default function MovieItem({item}: any) {
  return (
    <Box flexDirection="column">
      <Image
        style={styles.poster}
        source={{uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path}}
      />
      <Text style={styles.text} key={item.id} variant="body">
        {item.title}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  poster: {width: 171, height: 255.5, borderRadius: 10, marginBottom: 10},
  text: {width: 171},
});
