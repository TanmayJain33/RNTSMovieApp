import React, {FC} from 'react';
import {ActivityIndicator} from 'react-native';
import {boxType} from '../Box/Box';

type LoaderProps = React.ComponentProps<boxType> & {
  size: any;
  color: string | undefined;
};

export const Loader: FC<LoaderProps> = ({size, color}) => {
  return <ActivityIndicator size={size} color={color} />;
};
