import React, {useEffect, useState} from 'react';
import {Image, FlatList, StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import capitalizeName from '../../utilities/Capitalization';

export default function TrendingPeople(props: any) {
  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<any>([]);

  useEffect(() => {
    const getTrendingPeople = async () => {
      const peopleData = await GET(props.url);
      setPeopleList(peopleData.results || peopleData.cast);
      setLoading(false);
    };
    getTrendingPeople();
  }, [props.url]);

  const displayTrendingPeople = ({item}: any) => {
    return (
      item.profile_path &&
      item.name && (
        <Box mx="sm" my="xs">
          <Image
            style={styles.trendingPeopleImage}
            source={{uri: `${IMAGE_POSTER_URL}${item.profile_path}`}}
          />
          <Box width={theme.spacing.lxx}>
            <Text variant="title_sm" mt="sm">
              {capitalizeName(item.name)}
            </Text>
          </Box>
        </Box>
      )
    );
  };

  return (
    <Box>
      {loading ? (
        <Loader size="large" color={theme.colors.whiteColor} />
      ) : (
        <Box mt="sm">
          <Text variant="subHeading" m="sm">
            {props.title}
          </Text>
          <FlatList
            keyExtractor={item => item.id}
            data={peopleList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={displayTrendingPeople}
          />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  trendingPeopleImage: {
    height: theme.spacing.lxx,
    width: theme.spacing.lxx,
    borderRadius: theme.spacing.lxx,
  },
});
