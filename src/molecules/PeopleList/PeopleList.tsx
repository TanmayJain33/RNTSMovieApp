import React, {useEffect} from 'react';
import {Image, FlatList, StyleSheet} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import {IMAGE_POSTER_URL} from '../../utilities/Config';
import capitalizeName from '../../utilities/Capitalization';
import {useSelector, useDispatch} from 'react-redux';
import {getMoviePeople, getTVPeople} from '../../redux/actions/people.action';

export default function PeopleList(props: any) {
  const {moviePeople, tvPeople} = useSelector(
    (state: any) => state.peopleReducer,
  );
  const dispatch: any = useDispatch();

  const fetchMoviePeople = async () => {
    await dispatch(getMoviePeople(props.movieId));
  };

  const fetchTVPeople = async () => {
    await dispatch(getTVPeople(props.TVId));
  };

  useEffect(() => {
    props.movieId ? fetchMoviePeople() : fetchTVPeople();
  }, []);

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
      {moviePeople.length <= 0 && tvPeople.length <= 0 ? (
        <Loader />
      ) : (
        <Box>
          <Text variant="subHeading" mb="m">
            {props.title}
          </Text>
          <FlatList
            keyExtractor={item => item.id}
            data={props.movieId ? moviePeople : tvPeople}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={displayPeopleList}
          />
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
