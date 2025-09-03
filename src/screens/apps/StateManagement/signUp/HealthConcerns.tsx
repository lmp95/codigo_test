import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '../../../../components/Typography';
import SignUpFooter from '../../../../components/SignUpFooter';
import {
  HealthConcernsSchema,
  HealthConcernsValues,
} from '../../../../validations/OnBoarding.schema';
import {
  clearSignUp,
  setHealthConcerns,
  useHealthConcernsSelector,
} from '../../../../redux/signUpSlice.ts';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import HealthConcernsSelection from '../../../../components/HealthConcernsSelection';
import HealthConcernsPrioritize from '../../../../components/HealthConcernsPrioritize';

export default function HealthConcerns() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const defaultValues = useHealthConcernsSelector();

  const hookFormProps = useForm<HealthConcernsValues>({
    defaultValues: {
      health_concerns: defaultValues || [],
    },
    resolver: zodResolver(HealthConcernsSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = hookFormProps;

  console.log(errors);

  const onSaveHealthConcerns = (formData: HealthConcernsValues) => {
    dispatch(setHealthConcerns(formData));
    navigation.navigate('Diets');
  };

  const showAlert = () => {
    Alert.alert('Warning', 'All data will be erased and cannot be recovered', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearSignUp());
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...hookFormProps}>
        <Typography size="lg">Select the top health concerns. *</Typography>
        <Typography size="lg">(up to 5)</Typography>

        <Controller
          name="health_concerns"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <View style={styles.main}>
              <HealthConcernsSelection field={field} error={error} />
              <HealthConcernsPrioritize field={field} />
            </View>
          )}
        />

        <SignUpFooter
          currentStep={1}
          onPressBack={showAlert}
          onPressNext={handleSubmit(onSaveHealthConcerns)}
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
  },
});
