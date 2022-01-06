import { DEVICE_HEIGHT, DEVICE_WIDTH } from './dimensions';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleSize = size => (DEVICE_WIDTH / guidelineBaseWidth) * size;
export const scaleHeight = size => (DEVICE_HEIGHT / guidelineBaseHeight) * size;

export const scaleFont = size => (DEVICE_WIDTH / guidelineBaseWidth) * size;

export const SCALE_0 = 0;
export const SCALE_1 = scaleSize(1);
export const SCALE_2 = scaleSize(2);
export const SCALE_3 = scaleSize(3);
export const SCALE_4 = scaleSize(4);
export const SCALE_5 = scaleSize(5);
export const SCALE_6 = scaleSize(6);
export const SCALE_8 = scaleSize(8);
export const SCALE_10 = scaleSize(10);
export const SCALE_11 = scaleSize(11);
export const SCALE_12 = scaleSize(12);
export const SCALE_14 = scaleSize(14);
export const SCALE_16 = scaleSize(16);
export const SCALE_18 = scaleSize(18);
export const SCALE_20 = scaleSize(20);
export const SCALE_24 = scaleSize(24);
export const SCALE_26 = scaleSize(26);
export const SCALE_28 = scaleSize(28);
export const SCALE_30 = scaleSize(30);
export const SCALE_38 = scaleSize(38);
export const SCALE_48 = scaleSize(48);
export const SCALE_50 = scaleSize(50);
export const SCALE_90 = scaleSize(90);
export const SCALE_100 = scaleSize(100);

export const FONT_6 = scaleFont(6);
export const FONT_8 = scaleFont(8);
export const FONT_10 = scaleFont(10);
export const FONT_12 = scaleFont(12);
export const FONT_14 = scaleFont(14);
export const FONT_16 = scaleFont(16);
export const FONT_18 = scaleFont(18);
export const FONT_20 = scaleFont(20);
export const FONT_22 = scaleFont(22);
export const FONT_24 = scaleFont(24);
export const FONT_30 = scaleFont(30);
export const FONT_40 = scaleFont(40);
export const FONT_48 = scaleFont(48);
