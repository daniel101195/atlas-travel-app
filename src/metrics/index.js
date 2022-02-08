import { scaleSize } from '~/utils/spacing';

const Spacing = {
  XXS: scaleSize(2),
  XS: scaleSize(4),
  S: scaleSize(8),
  M: scaleSize(16),
  L: scaleSize(20),
  XL: scaleSize(24)
}

const Radius = {
  XXS: 2,
  XS: 4,
  S: 8,
  M: 16,
  L: 32,
  XL: 48
}

const FontSize = {
  H1: 48,
  H2: 32,
  H3: 20,
  H4: 18,
  H5: 16,
  M: 12, 
  S: 8,
  XS: 4,
  XXS: 2,
}

const ComponentSize = {
  buttonHeight: scaleSize(42),
}

export { Spacing, Radius, FontSize, ComponentSize, scaleSize } 