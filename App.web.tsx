import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyles}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151C26',
  },
  textStyles: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
