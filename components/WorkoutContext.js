import { createContext, useState } from "react";

//harjoitustietojen ja valitun yksikön (km tai mailit) jakaminen eri komponenttien välillä

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([
    { id: 100, workout: 'running', distance: '5', duration: '30', date: '01.09.2024' },
    { id: 101, workout: 'swimming', distance: '2', duration: '45', date: '15.09.2024' },
    { id: 102, workout: 'skiing', distance: '3', duration: '60', date: '19.09.2024' },
  ]);
  const [unit, setUnit] = useState('km');

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, unit, setUnit }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;