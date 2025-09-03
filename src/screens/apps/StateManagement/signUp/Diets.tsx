import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../../../../components/Typography';
import { DietsData } from '../../../../data/Diets';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  DietsSchema,
  DietsValues,
} from '../../../../validations/OnBoarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setDiets, useDietsSelector } from '../../../../redux/signUpSlice';
import TextButton from '../../../../components/TextButton';
import SignUpFooter from '../../../../components/SignUpFooter';

export default function Diets() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const defaultValues = useDietsSelector();
  const hookFormProps = useForm<DietsValues>({
    defaultValues: {
      diets: defaultValues || [],
    },
    resolver: zodResolver(DietsSchema),
  });
  const { handleSubmit, watch, setValue } = hookFormProps;
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

  const onSaveDiets = (formData: DietsValues) => {
    dispatch(setDiets(formData));
    navigation.navigate('Allergies');
  };

  return (
    <View style={styles.container}>
      <FormProvider {...hookFormProps}>
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    {DietsData.map(diet => {
                      const isSelected = value?.some(
                        (v: { id: number }) => v.id === diet.id,
                      );

                      return (
                        <TouchableOpacity
                          key={diet.id}
                          style={styles.dietItem}
                          onPress={() => {
                            onSelectDiets(diet, onChange);
                          }}
                        >
                          <View style={styles.checkbox}>
                            {isSelected && <View style={styles.active} />}
                          </View>
                          <Typography weight="semiBold">{diet.name}</Typography>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                );
              }}
            />
          </View>
        </View>

        <SignUpFooter
          onPressBack={() => navigation.goBack()}
          onPressNext={handleSubmit(onSaveDiets)}
        />
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3F3E6',
    flex: 1,
    padding: 20,
  },
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
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
