import { StyleSheet, View } from 'react-native';
import Typography from '../../../../components/Typography';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '../../../../components/Select';
import { AllergiesData } from '../../../../data/Allergies';
import { SelectItem } from '../../../../types/common';
import { useDispatch } from 'react-redux';
import { AllergiesValues } from '../../../../validations/OnBoarding.schema.ts';

export default function Allergies() {
  const dispatch = useDispatch();
  const { control, watch } = useFormContext<AllergiesValues>();
  const { allergies } = watch();

  const onSelectAllergy = (
    selectedItem: SelectItem,
    onChange: (...event: any[]) => void,
  ) => {
    const newValue = [...(allergies || []), selectedItem];
    onChange(newValue);
  };

  return (
    <View style={styles.main}>
      <Controller
        name="allergies"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Typography size="lg">
              Write any specific allergies or sensitivity towards specific
              things. (optional)
            </Typography>
            <Select
              value={value}
              items={AllergiesData}
              onChange={selectedItem => onSelectAllergy(selectedItem, onChange)}
            />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: 16,
  },
});
