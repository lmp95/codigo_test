import { StyleSheet, View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '../../../../components/Typography';
import Radio from '../../../../components/Radio';
import ErrorMessage from '../../../../components/ErrorMessage';
import { QuestionsValues } from '../../../../validations/OnBoarding.schema.ts';

export default function Questions() {
  const { control } = useFormContext<QuestionsValues>();

  // const onSaveQuestions = (formData: any) => {
  //   dispatch(setQuestions(formData)); // optional: save in Redux
  //   const data = { ...signUpData, ...formData };
  //   console.log('FORM ', JSON.stringify(data, null, 4));
  //   Alert.alert('Data', JSON.stringify(data, null, 3));

  //   if (onNextStep) onNextStep(); // if you want to continue to next step
  // };

  return (
    <View style={styles.main}>
      <Controller
        name="is_daily_exposure"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Typography weight="semiBold">
              Is your daily exposure to sun limited? *
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
        )}
      />

      <Controller
        name="is_smoke"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Typography weight="semiBold">
              Do you currently smoke (tobacco or marijuana)? *
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
        )}
      />

      <Controller
        name="alcohol"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Typography weight="semiBold">
              On average, how many alcoholic beverages do you have in a week? *
            </Typography>

            <Radio
              items={[
                { label: '0 - 1', value: '0 - 1' },
                { label: '2 - 5', value: '2 - 5' },
                { label: '5 +', value: '5 +' },
              ]}
              value={value}
              onChange={selectedItem => onChange(selectedItem.value)}
            />
            {error?.message && <ErrorMessage message={error.message} />}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
