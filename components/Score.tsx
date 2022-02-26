import { View, Text, Button, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';

interface ScoreType {
    counter: number,
    delay: number,
    setPlaying: Function,
    setCounter: Function,
    setDelay: Function,
}

export default function Score(props: ScoreType) {
    const startPlaying = () => { 
        props.setPlaying(true); 
        props.setCounter(0); 
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Score: {props.counter}</Text>
        <View style={styles.button}>
          <Button 
            title="Start"
            onPress={startPlaying}
          />
          <Picker
            selectedValue={props.delay}
            onValueChange={(x, _) => props.setDelay(x)}
            style={styles.picker}
          >
            <Picker.Item label="30s" value={30}/>
            <Picker.Item label="60s" value={60}/>
            <Picker.Item label="120s" value={120}/>
          </Picker>
        </View>
      </View>
    )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
  },
  button: {
    marginTop: 30,
  },
  picker: {
    width: 200
  }
});