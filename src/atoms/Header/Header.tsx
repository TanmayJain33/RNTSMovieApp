import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import Box, {boxType} from '../Box/Box';
import {Icon} from '../Icon/Icon';
import Text from '../Text/Text';

type HeaderProps = React.ComponentProps<boxType> & {
  title?: string;
  iconLeft?: boolean;
  icon?: boolean;
  iconName: string;
  iconColor: string;
  iconSize: number;
};

export const Header: FC<HeaderProps> = ({
  title,
  iconLeft,
  icon,
  iconName,
  iconColor,
  iconSize,
  ...props
}) => {
  const navigation = useNavigation();

  return (
    <Box {...props}>
      {iconLeft && (
        <Box mr="l">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon title={iconName} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </Box>
      )}
      <Text variant="mainHeading" mr="l">
        {title}
      </Text>
      {icon && <Icon title={iconName} size={iconSize} color={iconColor} />}
    </Box>
  );
};
