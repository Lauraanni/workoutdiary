import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from '../assets/Styles';
import { useContext } from 'react';
import WorkoutContext from './WorkoutContext';

function Settings() {
  const { unit, setUnit } = useContext(WorkoutContext);

  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.header}>Select unit</Text>

      <View style={styles.settings}>
         {/* Radiobuttonit yksikön valitsemiseksi */}
        <RadioButton.Group onValueChange={value => setUnit(value)} value={unit}>
          <View
            style={[
              styles.radioButtons,
              unit === 'km' && styles.selectedRadioButton
            ]}>
            <RadioButton value="km" />
            <Text style={[unit === 'km' && styles.selectedRadioButton]}>Kilometers</Text>
          </View>

          <View
            style={[
              styles.radioButtons,
              unit === 'mi' && styles.selectedRadioButton
            ]}>
            <RadioButton value="mi" />
            <Text style={[unit === 'mi' && styles.selectedRadioButton]}>Miles</Text>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
}

export default Settings;
