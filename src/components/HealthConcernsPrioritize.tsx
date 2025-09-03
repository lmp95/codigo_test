import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Typography from './Typography';
import Badge from './Badge';
import { HealthConcernsValues } from '../validations/OnBoarding.schema';

type Props = {
  field: ControllerRenderProps<HealthConcernsValues, 'health_concerns'>;
  error?: any;
};

type HealthConcernItem = {
  id: number;
  name: string;
  priority?: number;
};

const HealthConcernsPrioritize: React.FC<Props> = ({ field }) => {
  const { value, onChange } = field;

  if (!value?.length) return null;

  return (
    <View style={styles.prioritizeContainer}>
      <Typography size="lg">Prioritize</Typography>
      <DraggableFlatList<HealthConcernItem>
        data={value}
        contentContainerStyle={styles.prioritizeList}
        keyExtractor={item => item.id.toString()}
        onDragEnd={({ data }) => {
          const reordered = data.map((item, idx) => ({
            ...item,
            priority: idx + 1,
          }));
          onChange(reordered);
        }}
        renderItem={({ item, drag, isActive }) => (
          <ScaleDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              delayLongPress={300}
              disabled={isActive}
              style={[
                styles.prioritizeItem,
                { backgroundColor: isActive ? '#ccc' : '#e7e7e7' },
              ]}
            >
              <Badge disabled active>
                <Typography style={styles.prioritizeItemText}>
                  {item.name}
                </Typography>
              </Badge>
            </TouchableOpacity>
          </ScaleDecorator>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  prioritizeContainer: {
    gap: 12,
    paddingVertical: 12,
  },
  prioritizeList: {
    gap: 4,
  },
  prioritizeItem: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2F435D',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  prioritizeItemText: {
    color: '#FFFFFF',
  },
});

export default HealthConcernsPrioritize;
