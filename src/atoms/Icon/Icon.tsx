import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {boxType} from '../Box/Box';

Ionicons.loadFont().then();

type IconProps = React.ComponentProps<boxType> & {
  title: string;
  color: string | undefined;
  size: number | undefined;
};

export const Icon: FC<IconProps> = ({title, color, size}) => {
  return <Ionicons name={title} color={color} size={size} />;
};
