import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from './Typography';
import { RadioItem } from '../types/common';

type RadioProps = {
  items: RadioItem[];
  value?: string | boolean | null;
  onChange?: (selectedItem: RadioItem) => void;
};
export default function Radio({ items, value, onChange }: RadioProps) {
  return (
    <View style={styles.selectContainer}>
      {items.map(item => {
        return (
          <TouchableOpacity
            key={item.label}
            style={styles.radioItem}
            onPress={() => onChange && onChange(item)}
          >
            <View style={styles.indicator}>
              {value === item.value && <View style={styles.active} />}
            </View>
            <Typography weight="semiBold" style={styles.radioItemText}>
              {item.label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    paddingVertical: 12,
    gap: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  indicator: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2F435D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    width: 12,
    height: 12,
    borderRadius: 7,
    backgroundColor: '#2F435D',
  },
  radioItemText: {
    color: '#2F435D',
  },
});
