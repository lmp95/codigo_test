import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

const sizeMap = {
  xs: 12,
  sm: 14,
  normal: 16,
  md: 18,
  lg: 22,
  xl: 28,
};

const weightMap = {
  thin: '300',
  normal: '400',
  semiBold: '600',
  bold: '700',
  black: '900',
};

type SizeKey = keyof typeof sizeMap;
type WeightKey = keyof typeof weightMap;

type TypographyProps = {
  size?: SizeKey;
  weight?: WeightKey;
  style?: StyleProp<TextStyle>;
} & PropsWithChildren;

export default function Typography({
  children,
  size = 'normal',
  weight = 'normal',
  style,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: sizeMap[size],
          lineHeight: sizeMap[size] + 6,
          fontWeight: weightMap[weight] as TextStyle['fontWeight'],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
