import React from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import theme from '../../styles/theme';

type listProps = {
  id: number;
  text: string;
};

const listData: Array<listProps> = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'How'},
  {id: 3, text: 'Are'},
  {id: 4, text: 'You'},
];

function renderItem(item: listProps) {
  return (
    <Box
      bg={item.id % 2 === 0 ? 'primary' : 'mainBackground'}
      mb="m"
      p="s"
      borderColor="blackBorder"
      borderWidth={theme.border.borderWidth}
      borderRadius={theme.border.borderRadius}>
      <Text variant="body">{item.text}</Text>
    </Box>
  );
}

export default function HomeScreen() {
  return (
    <Box flex={1} bg="mainBackground" mx="m">
      <FlatList
        data={listData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => renderItem(item)}
      />
    </Box>
  );
}
