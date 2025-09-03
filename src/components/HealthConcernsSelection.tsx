import React from 'react';
import { View } from 'react-native';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { HealthConcernsData } from '../data/Healthconcern';
import Badge from './Badge';
import Typography from './Typography';
import ErrorMessage from './ErrorMessage';
import { HealthConcernsValues } from '../validations/OnBoarding.schema';

type Props = {
  field: ControllerRenderProps<HealthConcernsValues, 'health_concerns'>;
  error?: any;
};

const HealthConcernsSelection: React.FC<Props> = ({ field, error }) => {
  const { value, onChange } = field;

  const toggleSelection = (
    item: { id: number; name: string },
    index: number,
  ) => {
    const exists = value?.some((v: { id: number }) => v.id === item.id);
    const newValue = exists
      ? value.filter((v: { id: number }) => v.id !== item.id)
      : [...(value || []), { ...item, priority: value?.length + 1 || 1 }];
    onChange(newValue);
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          paddingVertical: 16,
        }}
      >
        {HealthConcernsData.map((healthConcern, index) => {
          const isSelected = value?.some(
            (v: { id: number }) => v.id === healthConcern.id,
          );
          return (
            <Badge
              key={healthConcern.id}
              onPress={() => toggleSelection(healthConcern, index)}
              disabled={!isSelected && value.length === 5}
              active={isSelected}
            >
              <Typography
                weight="semiBold"
                style={{ color: isSelected ? '#FFFFFF' : '#2F435D' }}
              >
                {healthConcern.name}
              </Typography>
            </Badge>
          );
        })}
      </View>
      {error?.message && <ErrorMessage message={error?.message} />}
    </>
  );
};

export default HealthConcernsSelection;
