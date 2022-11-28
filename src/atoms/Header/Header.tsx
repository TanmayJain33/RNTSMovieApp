import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import Box, {boxType} from '../Box/Box';
import {Icon} from '../Icon/Icon';
import Text from '../Text/Text';

type HeaderProps = React.ComponentProps<boxType> & {
  title?: string | any;
  iconLeft?: boolean;
  icon?: boolean;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
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
      {iconLeft && iconName !== undefined && (
        <Box mr="l">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon title={iconName} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </Box>
      )}
      <Text variant="mainHeading" mr="l">
        {title}
      </Text>
      {icon && iconName !== undefined && (
        <Icon title={iconName} size={iconSize} color={iconColor} />
      )}
    </Box>
  );
};
