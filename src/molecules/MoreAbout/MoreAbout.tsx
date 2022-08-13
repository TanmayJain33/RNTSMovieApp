import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import {Linking, TouchableOpacity} from 'react-native';

export default function MoreAboutList(props: any) {
  const [loading, setLoading] = useState(true);
  const [linksList, setLinksList] = useState<any>({});

  useEffect(() => {
    const getLinksList = async () => {
      const linkData = await GET(props.url);
      setLinksList(linkData);
      setLoading(false);
    };
    getLinksList();
  }, [props.url]);

  return (
    <Box>
      {loading ? (
        <Loader size="large" color={theme.colors.whiteColor} />
      ) : (
        <Box>
          <Text variant="subHeading" mb="m">
            {props.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/' + linksList.facebook_id + '/',
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                View on Facebook
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
                'https://www.imdb.com/title/' + linksList.imdb_id + '/',
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                View on IMDb
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
                'https://www.instagram.com/' + linksList.instagram_id + '/',
              );
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                View on Instagram
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
              Linking.openURL('https://twitter.com/' + linksList.twitter_id);
            }}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text my="s" variant="text_normal" fontSize={16}>
                View on Twitter
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
