import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../../../../components/Typography';
import { DietsData } from '../../../../data/Diets';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DietsValues } from '../../../../validations/OnBoarding.schema.ts';

export default function Diets() {
  const dispatch = useDispatch();

  const { control, watch, setValue } = useFormContext<DietsValues>();
  const { diets } = watch();

  const onSelectDiets = (
    selectedDiet: { id: number; name: string },
    onChange: (...event: any[]) => void,
  ) => {
    const exists = diets?.some(diet => diet.id === selectedDiet.id);
    const newValue = exists
      ? diets.filter(diet => diet.id !== selectedDiet.id)
      : [...(diets || []), selectedDiet];
    onChange(newValue);
  };

  return (
    <View style={styles.main}>
      <Typography size="lg">Select the diets you follow. *</Typography>

      <View style={styles.dietList}>
        <TouchableOpacity
          style={styles.dietItem}
          onPress={() => setValue('diets', [])}
        >
          <View style={styles.checkbox}>
            {diets.length === 0 && <View style={styles.active} />}
          </View>
          <Typography weight="semiBold">None</Typography>
        </TouchableOpacity>

        <Controller
          name="diets"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              {DietsData.map(diet => {
                const isSelected = value?.some(
                  (v: { id: number }) => v.id === diet.id,
                );

                return (
                  <TouchableOpacity
                    key={diet.id}
                    style={styles.dietItem}
                    onPress={() => onSelectDiets(diet, onChange)}
                  >
                    <View style={styles.checkbox}>
                      {isSelected && <View style={styles.active} />}
                    </View>
                    <Typography weight="semiBold">{diet.name}</Typography>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dietList: {
    gap: 16,
    paddingVertical: 16,
  },
  dietItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2F435D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    width: 14,
    height: 14,
    backgroundColor: '#2F435D',
  },
  main: {
    flex: 1,
  },
});
