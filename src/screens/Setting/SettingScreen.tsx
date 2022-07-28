import React from 'react';
import {StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';

export default function SettingScreen() {
  return (
    <Box flex={1} bg="mainBackground" style={styles.mainContainer}>
      <Text variant="body">SettingScreen</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
