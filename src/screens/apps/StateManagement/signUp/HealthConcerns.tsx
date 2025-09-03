import { useFormContext, Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../../components/Typography';
import HealthConcernsSelection from '../../../../components/HealthConcernsSelection';
import HealthConcernsPrioritize from '../../../../components/HealthConcernsPrioritize';
import { HealthConcernsValues } from '../../../../validations/OnBoarding.schema.ts';

export default function HealthConcern() {
  const { control } = useFormContext<HealthConcernsValues>();

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
});
