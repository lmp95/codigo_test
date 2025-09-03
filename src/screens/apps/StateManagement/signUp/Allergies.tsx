import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../../../../components/Typography';
import { DietsData } from '../../../../data/Diets';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  AllergiesSchema,
  AllergiesValues,
  DietsSchema,
  DietsValues,
} from '../../../../validations/OnBoarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import SignUpFooter from '../../../../components/SignUpFooter';
import Select from '../../../../components/Select';
import { AllergiesData } from '../../../../data/Allergies';
import { SelectItem } from '../../../../types/common';
import { useDispatch } from 'react-redux';
import { setAllergies } from '../../../../redux/signUpSlice.ts';

export default function Allergies() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hookFormProps = useForm<AllergiesValues>({
    defaultValues: {
      allergies: [],
    },
    resolver: zodResolver(AllergiesSchema),
  });
  const { handleSubmit, watch } = hookFormProps;
  const { allergies } = watch();

  const onSelectAllergy = (
    selectItem: SelectItem,
    onChange: (...event: any[]) => void,
  ) => {
    const newValue = [...(allergies || []), selectItem];
    onChange(newValue);
  };

  const onSaveAllergies = (formData: AllergiesValues) => {
    dispatch(setAllergies({ allergies: formData.allergies || [] }));
    navigation.navigate('Questions');
  };

  return (
    <View style={styles.container}>
      <FormProvider {...hookFormProps}>
        <View style={styles.main}>
          <Controller
            name="allergies"
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <Typography size="lg">
                    Write any specific allergies or sensitivity towards specific
                    things. (optional)
                  </Typography>
                  <Select
                    value={value}
                    items={AllergiesData}
                    onChange={selectedItem =>
                      onSelectAllergy(selectedItem, onChange)
                    }
                  />
                </>
              );
            }}
          />
        </View>

        <SignUpFooter
          currentStep={3}
          onPressBack={() => navigation.goBack()}
          onPressNext={handleSubmit(onSaveAllergies)}
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
  main: {
    flex: 1,
    gap: 16,
  },
});
