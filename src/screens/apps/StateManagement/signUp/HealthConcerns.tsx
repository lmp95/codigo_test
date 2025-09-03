import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../../../../components/Typography';
import { HealthConcernsData } from '../../../../data/Healthconcern';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  HealthConcernsSchema,
  HealthConcernsValues,
} from '../../../../validations/OnBoarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../../components/Button';
import Badge from '../../../../components/Badge';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  clearSignUp,
  setHealthConcerns,
  useHealthConcernsSelector,
} from '../../../../redux/signUpSlice';
import TextButton from '../../../../components/TextButton';
import ErrorMessage from '../../../../components/ErrorMessage';
import SignUpFooter from '../../../../components/SignUpFooter';
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
  const { handleSubmit, control, watch } = hookFormProps;
  const { health_concerns } = watch();

  const onSaveHealthConcerns = (formData: HealthConcernsValues) => {
    dispatch(setHealthConcerns(formData));
    navigation.navigate('Diets');
  };

  const showAlert = () => {
    Alert.alert('Warning', 'All data will be erased and cannot be recovered', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
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
        <View style={styles.main}>
          <Typography size="lg">Select the top health concerns. *</Typography>
          <Typography size="lg">(up to 5)</Typography>
          <Controller
            name="health_concerns"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const toggleSelection = (
                item: { id: number; name: string },
                index: number,
              ) => {
                const exists = value?.some(
                  (v: { id: number }) => v.id === item.id,
                );
                const newValue = exists
                  ? value.filter((v: { id: number }) => v.id !== item.id)
                  : [...(value || []), { ...item, priotity: index }];
                onChange(newValue);
              };

              return (
                <>
                  <View style={styles.healthConcernItems}>
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
                            style={{
                              color: isSelected ? '#FFFFFF' : '#2F435D',
                            }}
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
            }}
          />

          {/* Prioritize */}
          <View style={styles.prioritizeContainer}>
            <Typography size="lg">Prioritize</Typography>
            {health_concerns?.map(selectedHealthConcern => {
              return (
                <View
                  key={selectedHealthConcern.id}
                  style={styles.prioritizeItem}
                >
                  <Badge disabled active>
                    <Typography style={styles.prioritizeItemText}>
                      {selectedHealthConcern.name}
                    </Typography>
                  </Badge>
                </View>
              );
            })}
          </View>
        </View>

        <SignUpFooter
          onPressBack={() => showAlert()}
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
  healthConcernItems: {
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  prioritizeContainer: {
    gap: 12,
    paddingVertical: 12,
  },
  prioritizeItem: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2F435D',
    backgroundColor: '#e7e7e7',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  prioritizeItemText: {
    color: '#FFFFFF',
  },
  main: {
    flex: 1,
  },
});
