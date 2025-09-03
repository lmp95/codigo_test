import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, StyleSheet, View } from 'react-native';
import {
  AllergiesSchema,
  DietsSchema,
  HealthConcernsSchema,
  QuestionsSchema,
  SignUpFormValues,
} from '../../../../validations/OnBoarding.schema';
import HealthConcern from './HealthConcerns';
import SignUpFooter from '../../../../components/SignUpFooter';
import { useDispatch } from 'react-redux';
import {
  clearSignUp,
  setAllergies,
  setDiets,
  setHealthConcerns,
  setQuestions,
  useSignUpSelector,
} from '../../../../redux/signUpSlice';
import Diets from './Diets';
import Allergies from './Allergies';
import Questions from './Questions';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const schemas = [
  HealthConcernsSchema,
  DietsSchema,
  AllergiesSchema,
  QuestionsSchema,
];

export default function SignUp() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const currentSchema = schemas[step - 1];
  const dispatch = useDispatch();
  const signUpForm = useSignUpSelector();
  const animatedProgress = useSharedValue(0);

  const hookFormProps = useForm<SignUpFormValues>({
    defaultValues: {
      health_concerns: [],
      diets: [],
      allergies: [],
      is_daily_exposure: null,
      is_smoke: null,
      alcohol: '',
    },
    resolver: zodResolver(currentSchema as any),
    mode: 'onBlur',
  });
  const { handleSubmit } = hookFormProps;

  useEffect(() => {
    animatedProgress.value = withTiming(step / 4, {
      duration: 500,
    });
  }, [step]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  const onBack = () => {
    if (step > 1) setStep(step - 1);
    else {
      Alert.alert(
        'Warning',
        'All data will be erased and cannot be recovered',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearSignUp());
              navigation.goBack();
            },
          },
        ],
      );
    }
  };

  const onSubmit = (data: SignUpFormValues) => {
    switch (step) {
      case 1:
        dispatch(setHealthConcerns({ health_concerns: data.health_concerns }));
        setStep(step + 1);
        break;
      case 2:
        dispatch(setDiets({ diets: data.diets }));
        setStep(step + 1);
        break;
      case 3:
        dispatch(setAllergies({ allergies: data.allergies || [] }));
        setStep(step + 1);
        break;
      case 4:
        dispatch(
          setQuestions({
            is_daily_exposure: data.is_daily_exposure,
            is_smoke: data.is_smoke,
            alcohol: data.alcohol,
          }),
        );
        const formValues = { ...signUpForm, ...data };
        console.log('FINAL FORM DATA', JSON.stringify(formValues, null, 4));
        Alert.alert('Data', JSON.stringify(formValues, null, 3));
        break;
      default:
        break;
    }
  };

  return (
    <FormProvider {...hookFormProps}>
      <View style={styles.container}>
        {step === 1 && <HealthConcern />}
        {step === 2 && <Diets />}
        {step === 3 && <Allergies />}
        {step === 4 && <Questions />}

        <SignUpFooter
          onPressBack={onBack}
          onPressNext={handleSubmit(onSubmit)}
        />
      </View>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3F3E6',
    padding: 20,
  },
  progressContainer: {
    height: 25,
    width: '100%',
    backgroundColor: '#D3F3E6',
  },
  progressBar: {
    height: 25,
    width: '100%',
    backgroundColor: '#2F435D',
  },
});
