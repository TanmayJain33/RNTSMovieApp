import React, {useEffect, useState} from 'react';
import {Image, FlatList, StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import capitalizeName from '../../utilities/Capitalization';

export default function PeopleList(props: any) {
  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<any>([]);
  const [crewList, setCrewList] = useState<any>([]);

  useEffect(() => {
    const getPeopleList = async () => {
      const peopleData = await GET(props.url);
      setPeopleList(peopleData.results || peopleData.cast);
      setCrewList(peopleData.crew);
      setLoading(false);
    };
    getPeopleList();
  }, [props.url]);

  const displayPeopleList = ({item}: any) => {
    return (
      item.profile_path &&
      item.name && (
        <Box mr="m">
          <Image
            style={styles.peopleImage}
            source={{uri: `${IMAGE_POSTER_URL}${item.profile_path}`}}
          />
          <Box width={140}>
            <Text variant="text_normal" textAlign="left" my="s">
              {capitalizeName(item.name)}
            </Text>
            <Text variant="title_sm" textAlign="left">
              {capitalizeName(item.character)}
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
        <Box>
          <Text variant="subHeading" mb="m">
            {props.title}
          </Text>
          <FlatList
            keyExtractor={item => item.id}
            data={peopleList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={displayPeopleList}
          />
          <Text variant="headingSmall" mb="xs">
            Director
          </Text>
          {crewList.map((item: {job: string; name: string}) => {
            if (item.job === 'Director') {
              return (
                <Text variant="text_normal" mb="m">
                  {item.name}
                </Text>
              );
            }
          })}
          <Text variant="headingSmall" mb="xs">
            Writer
          </Text>
          {crewList.map((item: {job: string; name: string}) => {
            if (item.job === 'Screenplay') {
              return <Text variant="text_normal">{item.name}</Text>;
            }
          })}
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  peopleImage: {
    height: 200,
    width: 140,
    borderRadius: 10,
  },
});
