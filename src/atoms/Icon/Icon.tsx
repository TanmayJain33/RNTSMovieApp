import React, {FC} from 'react';
import {ViewProps} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface iconProps extends ViewProps {
  title: string;
  color?: any;
  size?: number;
}

Ionicons.loadFont().then();

export const Icon: FC<iconProps> = ({title, color, size}) => {
  return <Ionicons name={title} color={color} size={size} />;
};
