import {createBox} from '@shopify/restyle';
import {Theme} from '../../styles/theme';

const Box = createBox<Theme>();

export type boxType = typeof Box;
export default Box;
