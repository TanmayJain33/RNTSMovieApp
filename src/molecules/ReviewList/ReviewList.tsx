import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import {Loader} from '../../atoms/Loader/Loader';
import {GET} from '../../services/API';
import theme from '../../styles/theme';
import capitalizeName from '../../utilities/Capitalization';
import {Icon} from '../../atoms/Icon/Icon';
import {Divider} from '../../atoms/Divider/Divider';

export default function ReviewList(props: any) {
  const [loading, setLoading] = useState(true);
  const [reviewList, setReviewList] = useState<any>([]);

  useEffect(() => {
    const getReviewList = async () => {
      const reviewData = await GET(props.url);
      setReviewList(reviewData.results);
      setLoading(false);
    };
    getReviewList();
  }, [props.url]);

  const displayReviewList = ({item}: any) => {
    return (
      item.author && (
        <Box width={300} height={200} mr="m">
          <Text variant="headingSmall" textAlign="left" my="s">
            {capitalizeName(item.author)}
          </Text>
          <Box flexDirection="row" alignItems="center" mb="s">
            <Icon
              title="star"
              size={theme.spacing.m}
              color={theme.colors.secondary}
            />
            <Text ml="xs" variant="text_normal">
              {item.author_details.rating ? item.author_details.rating : 0}
            </Text>
          </Box>
          <Text variant="text_normal">
            {item.content.length > 250
              ? `${item.content.replaceAll(/\s/g, ' ').slice(0, 250)}...`
              : item.content.length}
          </Text>
        </Box>
      )
    );
  };
  console.log(reviewList);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        reviewList.length !== 0 && (
          <>
            <Divider color="whiteColor" height={1} my="m" />
            <Box>
              <Text variant="subHeading" mb="m">
                {props.title}
              </Text>
              <FlatList
                keyExtractor={item => item.id}
                data={reviewList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={displayReviewList}
              />
            </Box>
          </>
        )
      )}
    </Box>
  );
}
