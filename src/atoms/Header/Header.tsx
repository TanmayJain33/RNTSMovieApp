import React, {FC} from 'react';
import Box, {boxType} from '../Box/Box';
import {Icon} from '../Icon/Icon';
import Text from '../Text/Text';

type HeaderProps = React.ComponentProps<boxType> & {
  title: string;
  icon?: boolean;
  iconName: string;
  iconColor: string;
  iconSize: number;
};

export const Header: FC<HeaderProps> = ({
  title,
  icon,
  iconName,
  iconColor,
  iconSize,
  ...props
}) => {
  return (
    <Box {...props}>
      <Text variant="header">{title}</Text>
      {icon && <Icon title={iconName} size={iconSize} color={iconColor} />}
    </Box>
  );
};
