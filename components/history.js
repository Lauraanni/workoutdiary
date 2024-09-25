import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutContext from "./WorkoutContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { styles } from '../assets/Styles';
import { LinearGradient } from 'expo-linear-gradient';

// Muutetaan kilometrit maileiksi
const convertKmToMiles = (km) => km * 0.621371;

export default function History() {
  const { workouts, unit } = useContext(WorkoutContext);

  const convertDistance = (distance) => {
    if (unit === 'mi') {
      return convertKmToMiles(distance).toFixed(2);
    }
    return distance;
  };
  
  // Lasketaan matkojen yhteismäärä
  const walkTotal = workouts
    .filter(workout => workout.workout === 'running')
    .reduce((sum, workout) => sum + parseFloat(workout.distance), 0);

  const skiTotal = workouts
    .filter(workout => workout.workout === 'skiing')
    .reduce((sum, workout) => sum + parseFloat(workout.distance), 0);

  const swimTotal = workouts
    .filter(workout => workout.workout === 'swimming')
    .reduce((sum, workout) => sum + parseFloat(workout.distance), 0);

    
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.header}>Workouts</Text>
      {/* Matkojen yhteismäärän näyttäminen */}
      <View style={styles.sportCard}>
        <Card>
        <LinearGradient
            colors={['#8E2DE2', '#4A00E0']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.sportCard}>
          <Card.Title
            titleVariant="titleMedium"
            title={<Text style={styles.sportCardText}>{`${convertDistance(swimTotal)} ${unit}`}</Text>}
            left={() => <FontAwesome5 name="swimmer" size={34} color="white" />}
            style={styles.sportCards}/>
          </LinearGradient>
        </Card>
        <Card>
        <LinearGradient
            colors={['#8E2DE2', '#4A00E0']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.sportCard}>
          <Card.Title
            titleVariant="titleMedium"
            title={<Text style={styles.sportCardText}>{`${convertDistance(walkTotal)} ${unit}`}</Text>}
            left={() => <FontAwesome5 name="running" size={34} color="white" />}
            style={styles.sportCards}/>
           </LinearGradient>
        </Card>
        <Card>
        <LinearGradient
            colors={['#8E2DE2', '#4A00E0']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.sportCard}>
          <Card.Title
            titleVariant="titleMedium"
            title={<Text style={styles.sportCardText}>{`${convertDistance(skiTotal)} ${unit}`}</Text>}
            left={() => <FontAwesome5 name="skiing-nordic" size={34} color="white" />}
            style={styles.sportCards} />
          </LinearGradient>
        </Card>
      </View>

      {/* Näytetään harjoitukset flatlistina */}
      <FlatList
        data={[...workouts].reverse()}
        renderItem={({ item }) => <Item item={item} unit={unit} />}
        keyExtractor={item => item.id.toString()}
        style={{paddingBottom: 50, paddingTop: 10}}/>
    </SafeAreaView>
  );
}

const icons = {
  running: "running",
  swimming: "swimmer",
  skiing: "skiing-nordic",
};

function Item({ item, unit }) {
  const iconName = icons[item.workout];
  const convertDistance = (distance) => {
    if (unit === 'mi') {
      return convertKmToMiles(distance).toFixed(2);
    }
    return distance;
  };

  return (

    <Card style={styles.flatlistStyle}>
      <Card.Title
        titleVariant="titleMedium"
        title={item.date}
        left={() => <FontAwesome5 name={iconName} size={40} color="white" />}
        titleStyle={styles.flatlistDateText} />
      <Card.Content>
        
        <View>
          <Text style={[styles.flatlistText, { marginBottom: -5 }]}>
            {`Distance: ${convertDistance(item.distance)} ${unit}`}
          </Text>
          <Text style={[styles.flatlistText, { marginTop: 0 }]}>
            {`Duration: ${item.duration} min`}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}