import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../../components/Typography';
import { DietsData } from '../../data/Diets';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  DietsSchema,
  DietsValues,
  QuestionsSchema,
  QuestionsValues,
} from '../../validations/OnBoarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch } from 'react-redux';
import { useSignUpSelector } from '../../redux/signUpSlice';
import Radio from '../../components/Radio';

export default function Questions() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const signUpData = useSignUpSelector();
  const hookFormProps = useForm<QuestionsValues>({
    defaultValues: {
      is_daily_exposure: null,
      is_smoke: null,
      alcohol: null,
    },
    resolver: zodResolver(QuestionsSchema),
  });
  const { handleSubmit } = hookFormProps;

  const onSaveQuestions = (formData: QuestionsValues) => {
    const data = { ...signUpData, ...formData };
    console.log('FORM ', JSON.stringify(data, null, 4));
    Alert.alert('Data', JSON.stringify(data, null, 3));
  };

  return (
    <View style={styles.container}>
      <FormProvider {...hookFormProps}>
        <View style={styles.main}>
          <Controller
            name="is_daily_exposure"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <Typography weight="semiBold">
                    Is your daily exposure to sun is limited? *
                  </Typography>

                  <Radio
                    items={[
                      { label: 'Yes', value: true },
                      { label: 'No', value: false },
                    ]}
                    value={value}
                    onChange={selectedItem => onChange(selectedItem.value)}
                  />
                  {error?.message && <ErrorMessage message={error.message} />}
                </>
              );
            }}
          />

          <Controller
            name="is_smoke"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <Typography weight="semiBold">
                    Do you current smoke (tobacco or marijuana)? *
                  </Typography>

                  <Radio
                    items={[
                      { label: 'Yes', value: true },
                      { label: 'No', value: false },
                    ]}
                    value={value}
                    onChange={selectedItem => onChange(selectedItem.value)}
                  />
                  {error?.message && <ErrorMessage message={error.message} />}
                </>
              );
            }}
          />

          <Controller
            name="alcohol"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <Typography weight="semiBold">
                    On average, how many alcoholic beverages do you have in a
                    week? *
                  </Typography>

                  <Radio
                    items={[
                      { label: '0 - 1', value: '0 - 1' },
                      { label: '2 - 5 ', value: '2 - 5' },
                      { label: '5 +', value: '5 +' },
                    ]}
                    value={value}
                    onChange={selectedItem => onChange(selectedItem.value)}
                  />
                  {error?.message && <ErrorMessage message={error.message} />}
                </>
              );
            }}
          />
        </View>

        <View style={styles.footer}>
          <Button
            label="Get my personalized vitamin"
            onPress={handleSubmit(onSaveQuestions)}
          />
        </View>
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
  footer: {
    flex: 0.2,
  },
});
