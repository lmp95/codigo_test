import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Badge from './Badge';
import Typography from './Typography';
import { SelectItem } from '../types/common';
import { useState, useMemo } from 'react';

type SelectProps = {
  items: SelectItem[];
  value?: SelectItem[];
  onChange?: (selectedItem: SelectItem) => void;
  onRemoveSelected?: (selectedItem: SelectItem) => void;
};

export default function Select({
  items,
  onChange,
  onRemoveSelected,
  value,
}: SelectProps) {
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const availableItems = items.filter(
    item => !value?.some(selected => selected.id === item.id),
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return availableItems;
    return availableItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, availableItems]);

  return (
    <View>
      <View style={styles.selectBox}>
        {value?.map(selectedValue => {
          return (
            <Badge
              key={selectedValue.id}
              active
              onPress={() =>
                onRemoveSelected && onRemoveSelected(selectedValue)
              }
            >
              <Typography style={styles.label}>{selectedValue.name}</Typography>
            </Badge>
          );
        })}
        <TextInput
          style={styles.inputBox}
          value={query}
          onChangeText={text => {
            setQuery(text);
            setShowOptions(true);
          }}
          placeholder="Type"
        />
      </View>

      {showOptions && filteredItems.length > 0 && (
        <View style={styles.itemsContainer}>
          {filteredItems.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.selectItem}
                onPress={() => {
                  onChange && onChange(item);
                  setQuery('');
                  setShowOptions(false);
                }}
              >
                <Typography>{item.name}</Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: '#b6b6b6',
    padding: 8,
    gap: 8,
    flexWrap: 'wrap',
  },
  inputBox: {
    height: 35,
    flex: 1,
  },
  itemsContainer: {
    backgroundColor: '#f3f3f3',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#b6b6b6',
  },
  selectItem: {
    paddingHorizontal: 12,
    height: 35,
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
  },
});
