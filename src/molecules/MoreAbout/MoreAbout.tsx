import React, {useEffect} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import {Linking, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getMovieLinks, getTVLinks} from '../../redux/actions/links.action';
import {useTranslation} from 'react-i18next';

export default function MoreAboutList(props: any) {
  const {t} = useTranslation();
  const {movieLinks, tvLinks} = useSelector((state: any) => state.linksReducer);
  const dispatch: any = useDispatch();

  const fetchMovieLinks = async () => {
    await dispatch(getMovieLinks(props.movieId));
  };

  const fetchTVLinks = async () => {
    await dispatch(getTVLinks(props.TVId));
  };

  useEffect(() => {
    props.movieId ? fetchMovieLinks() : fetchTVLinks();
  }, []);

  return (
    <Box>
      {movieLinks.length <= 0 && tvLinks.length <= 0 ? (
        <Loader />
      ) : (
        <Box>
          <Text variant="subHeading" mb="m">
            {props.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/' +
                  (props.movieId
                    ? movieLinks.facebook_id
                    : tvLinks.facebook_id) +
                  '/',
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                {t('common:facebook_text')}
              </Text>
              <Icon
                title="open-outline"
                size={theme.spacing.m}
                color={theme.colors.secondary}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.imdb.com/title/' +
                  (props.movieId ? movieLinks.imdb_id : tvLinks.imdb_id) +
                  '/',
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                {t('common:imdb_text')}
              </Text>
              <Icon
                title="open-outline"
                size={theme.spacing.m}
                color={theme.colors.secondary}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.instagram.com/' +
                  (props.movieId
                    ? movieLinks.instagram_id
                    : tvLinks.instagram_id) +
                  '/',
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                {t('common:instagram_text')}
              </Text>
              <Icon
                title="open-outline"
                size={theme.spacing.m}
                color={theme.colors.secondary}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://twitter.com/' +
                  (props.movieId ? movieLinks.twitter_id : tvLinks.twitter_id),
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                {t('common:twitter_text')}
              </Text>
              <Icon
                title="open-outline"
                size={theme.spacing.m}
                color={theme.colors.secondary}
              />
            </Box>
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
}
