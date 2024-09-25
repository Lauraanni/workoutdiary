import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff'
  },

  //Otsikot 

  header: {
    fontSize: 40,
    fontWeight: 'normal',
    marginTop: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#5b12a3',
    fontFamily: 'BebasNeue',
  },

  //kalenteri buttonin tekstit

  calendarText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'normal',
    fontFamily: 'BebasNeue',
  },

  //kalenteri button

  calendarButton: {
    height: 80,
    margin: 20
  },

  // "add workout" -buttonin teksti:

  addText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'normal',
    fontFamily: 'BebasNeue',
  },

  //error -teksti kalenterille

  errorMessage: {
    color: 'red',
    alignItems: 'center',
    marginLeft: 120
  },

  //error -tekstit input-kentille

  errorMessages: {
    color: 'red',
    marginLeft: 15,
    marginBottom: 4,
    marginTop: -10
  },

  //kaikki urheilulajien valinta buttonit

  sportButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginBottom: 20,
  },

  //yksittäinen urheilulaji button

  sportButton: {
    width: 100,
    height: 100,
    backgroundColor: '#7400e8f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  //valittuna olevan buttonin tyyli 

  selectedButton: {
    backgroundColor: 'rgba(77, 0, 153, 0.9)'
  },

  //urheilulajibuttoneiden tekstit

  sportButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'BebasNeue',
    letterSpacing: 1,
    marginTop: 3
  },

  //input kentät matkalle ja ajalle

  textInputs: {
    marginBottom: 10,
    backgroundColor: '#5100a138',
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16
  },

  //asetukset sivu 

  settingsContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },

  settings: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    padding: 60,
  },


  //radiobuttonit

  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#99949e',
    borderRadius: 10,
    width: 200
  },

  // valittu radiobutton

  selectedRadioButton: {
    borderColor: '#5b12a3',
    color: '#5b12a3',
    fontWeight: 'bold'
  },


  //workout added -teksti

  toastStyle: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    fontSize: 20
  },

  //"Workouts" sivun cardit joissa matkojen yhteismäärät

  sportCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },

  sportCards: {
    height: 140,
    width: 130,
  },

  sportCardText: {
    color: 'white',
    fontSize: 13,
    marginLeft: -13
  },

  //Flatlist

  flatlistStyle: {
    backgroundColor: '#7400e8f0',
    color: 'white',
    margin: 10,
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
  },

  flatlistText: {
    padding: 5,
    fontSize: 18,
    color: 'white',
    marginLeft: 3,
    marginTop: 5
  },

  flatlistDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },


});



export { styles }