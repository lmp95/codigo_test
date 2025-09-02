import { StyleSheet, TouchableOpacity } from 'react-native';
import Typography from './Typography';
import { PropsWithChildren } from 'react';

type BadgeProps = {
  active?: boolean;
  onPress?: () => void;
  disabled?: boolean;
} & PropsWithChildren;

export default function Badge({
  active = false,
  onPress,
  disabled = false,
  children,
}: BadgeProps) {
  return (
    <TouchableOpacity
      style={[styles.badge, active && styles.selectedBadge]}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderColor: '#2F435D',
    borderWidth: 1,
    borderRadius: 20,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  selectedBadge: {
    backgroundColor: '#2F435D',
  },
});
