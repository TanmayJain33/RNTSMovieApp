import React, {FC} from 'react';
import Box, {boxType} from '../Box/Box';

type DividerProps = React.ComponentProps<boxType> & {
  color: any;
  height: number;
};

export const Divider: FC<DividerProps> = ({color, height, ...props}) => {
  return <Box height={height} bg={color} {...props} />;
};
