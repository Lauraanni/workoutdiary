import React, { useRef } from 'react';
import { Text, View, Modal, TouchableOpacity, Animated } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../assets/Styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import { useContext } from "react";
import WorkoutContext from './WorkoutContext';

// asetetaan id:n alkuarvoksi 0 & kasvatetaan arvoa aina kun uusi treeni lisätään, jotta jokaisella on oma id
let id = 0;

// urheilulajin valinta buttonit. Buttonin tyyli muuttuu kun laji valitaan
const SportButton = ({ label, onPress, sportIcon, isSelected }) => {
    return (
        <TouchableOpacity
            style={[
                styles.sportButton,
                isSelected ? styles.selectedButton : null,
            ]}
            onPress={onPress}>
            <FontAwesome5 name={sportIcon} size={28} color='white' />
            <Text style={styles.sportButtonText}>{label}</Text>
        </TouchableOpacity>
    );
};

// "workout added" -tekstin näyttäminen kun uusi treeni lisätään
const toastConfig = {
    success: () => (
        <View style={styles.toastStyle}>
            <Text style={styles.toastStyle}> Workout added ✅</Text>
        </View>
    ),
};

function Home() {
    const [workout, setWorkout] = React.useState('');
    const [distance, setDistance] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [date, setDate] = React.useState('Select a date');
    const [errors, setErrors] = React.useState({ distance: false, duration: false, date: false });
    const { unit } = React.useContext(WorkoutContext);
    const { workouts, setWorkouts } = useContext(WorkoutContext);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const distanceAnim = useRef(new Animated.Value(0)).current;
    const durationAnim = useRef(new Animated.Value(0)).current;



    // Päivitetään input-kenttiin syötetyt arvot & tarkistetaan virheet sitä mukaa kun käyttäjä syöttää tietoja
    const handleDistanceChange = (text) => {
        setDistance(text);
        setErrors(prevErrors => ({ ...prevErrors, distance: text === '' || parseFloat(text) <= 0 }));
    };

    const handleDurationChange = (text) => {
        setDuration(text);
        setErrors(prevErrors => ({ ...prevErrors, duration: text === '' || parseFloat(text) <= 0 }));
    };

    // Urheilulajin valinta, poistetaan virheilmoitus kun jokin laji valittuna
    const handleSportSelection = (selectedWorkout) => {
        setWorkout(selectedWorkout);
        setErrors(prevErrors => ({ ...prevErrors, workout: false }));
    };

    //animaatio jos distance tai duration kentät tyhjillään
    const shakeAnimation = (animatedValue) => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    };

    //Tarkistetaan vielä virheet kaikista kentistä kun käyttäjä painaa "add workout" painiketta
    const handleAddWorkout = () => {
        setIsSubmitted(true);
        const newErrors = {
            distance: distance === '' || parseFloat(distance) <= 0,
            duration: duration === '' || parseFloat(duration) <= 0,
            date: date === 'Select a date',
            workout: workout === ''
        };
        setErrors(newErrors);

        //Distance ja duration -kenttien animaatiot jos kentät tyhjillään
        if (newErrors.distance) shakeAnimation(distanceAnim);
        if (newErrors.duration) shakeAnimation(durationAnim);

        if (newErrors.distance || newErrors.duration || newErrors.date || newErrors.workout) {
            return;
        }



        //Luodaan uusi treeni ja lisätään listalle
        const workoutId = id++;
        const addedWorkout = { id: workoutId, workout, distance, duration, date };
        setWorkouts([...workouts, addedWorkout]);


        //kenttien tyhjennys 
        
        setDistance("");
        setDuration("");
        setWorkout("");
        setDate('Select a date');

        //Näytetään viesti kun treeni on onnistuneesti lisätty
        Toast.show({
            type: 'success',
            position: 'bottom',
            visibilityTime: 3000,
        });
        setIsSubmitted(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add workout</Text>
            {/*Buttonit joista käyttäjä voi valita lajin */}
            <View style={styles.sportButtonsContainer}>
                <SportButton
                    label="Running"
                    onPress={() => handleSportSelection('running')}
                    sportIcon="running"
                    isSelected={workout === 'running'}
                />
                <SportButton
                    label="Swimming"
                    onPress={() => handleSportSelection('swimming')}
                    sportIcon="swimmer"
                    isSelected={workout === 'swimming'}
                />
                <SportButton
                    label="Skiing"
                    onPress={() => handleSportSelection('skiing')}
                    sportIcon="skiing-nordic"
                    isSelected={workout === 'skiing'}
                />
            </View>
            {/* Error -viesti jos lajia ei valittu */}
            {isSubmitted && errors.workout && <Text style={styles.errorMessages}>Please select a workout type</Text>}

            {/* "Distance" -input kenttä*/}
            <Animated.View style={{ transform: [{ translateX: distanceAnim }] }}>
                <TextInput
                    label={`Distance (${unit})`}
                    value={distance}
                    onChangeText={handleDistanceChange}
                    keyboardType="numeric"
                    style={styles.textInputs}

                />

            </Animated.View>
            {/* Error -viesti jos distance -kenttä tyhjänä tai luku negatiivinen*/}
            {errors.distance && <Text style={styles.errorMessages}>Please enter a distance. Negative values are not allowed.</Text>}
            {/* "Duration" -input kenttä*/}
            <Animated.View style={{ transform: [{ translateX: durationAnim }] }}>
                <TextInput
                    label="Duration (min)"
                    value={duration}
                    keyboardType="numeric"
                    onChangeText={handleDurationChange}
                    style={styles.textInputs}
                />
            </Animated.View>
            {/* Error -viesti jos duration-kenttä tyhjänä tai luku negatiivinen*/}
            {errors.duration && <Text style={styles.errorMessages}>Please enter a duration. Negative values are not allowed.</Text>}

            {/* Button jolla kalenterin saa avattua, buttonille määritelty liukuväri -efekti*/}
            <TouchableOpacity
                onPress={() => {
                    setShowCalendar(true);
                    setErrors(prevErrors => ({ ...prevErrors, date: false }));
                }}
                activeOpacity={0.9}
                style={styles.calendarButton}>
                <LinearGradient
                    colors={['#7F00FF', '#E100FF']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <FontAwesome5 name="calendar-alt" size={24} color="white" style={{ marginRight: 10 }} />
                    <Text style={styles.calendarText}>{date}</Text>
                </LinearGradient>
            </TouchableOpacity>
            {/* Error -viesti jos päivämäärää ei valittu*/}
            {errors.date && <Text style={styles.errorMessage}>Date is required</Text>}
            {/*Modaali kalenterin näyttämiseksi*/}
            <Modal
                visible={showCalendar}
                transparent={false} >
                <Calendar
                    onDayPress={date => {
                        setShowCalendar(false);
                        const formattedDate = date.dateString.split('-').reverse().join('.');
                        setDate(formattedDate);
                    }}
                />
            </Modal>
            {/*"Add workout-button liukuväriefektillä"*/}
            <TouchableOpacity
                onPress={() => handleAddWorkout()}
                activeOpacity={0.9}
                style={{ height: 80, borderRadius: 10, margin: 20 }}>
                <LinearGradient
                    colors={['#7F00FF', '#E100FF']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Text style={styles.addText}>Add workout</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/*Viesti onnistuneesta treenin lisäämisestä näytetään tässä*/}
            <Toast config={toastConfig} />
        </View>

    );
}

export default Home;
