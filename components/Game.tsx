import { useState, useEffect } from 'react'
import { Text, Platform, View, TextInput, Button,
         KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native'

interface GameProps {
    counter: number,
    delay: number,
    setPlaying: Function,
    setCounter: Function,
}

export default function Game(props: GameProps) {
    const [op, setOp] = useState<string>("*");
    const [num1, setNum1] = useState<number>(Math.floor(Math.random() * (12 - 2) + 2));
    const [num2, setNum2] = useState<number>(Math.floor(Math.random() * (100 - 2) + 2));

    var curSolution: number = eval(num1 + op + num2);

    // internal timer for 30s
    // can add an option for 30->60->120 etc by adding a delay prop
    useEffect(() => {
        let timer = setTimeout(() => {props.setPlaying(false)}, 1000 * props.delay);
        return () => clearTimeout(timer)
    }, [])

    const endPlaying = () => { props.setPlaying(false); }

    const generateProblem = () => {
        var x: number = Math.floor(Math.random() * (12 - 2) + 2);
        var y: number = Math.floor(Math.random() * (100 - 2) + 2);
        var z: number = Math.floor(Math.random() * (100 - 2) + 2);

        // choose random op
        let a: number = Math.floor(Math.random() * 4);
        switch(a) {
        case 0:
            setOp('+');
            setNum1(y); setNum2(z);
            break;
        case 1:
            setOp('-');
            if (z - y < 0) {
                while (z - y < 0) {
                    z = Math.floor(Math.random() * (100 - 2) + 2)
                    y = Math.floor(Math.random() * (100 - 2) + 2);
                }
            }
            setNum1(z); setNum2(y);
            break;
        case 2:
            setOp('*');
            setNum1(x); setNum2(y);
            break;
        case 3:
            setOp('/');
            // case needs to be checked
            if (y % x > 0) {
                while (y % x > 0) {
                    x = Math.floor(Math.random() * (12 - 2) + 2)
                    y = Math.floor(Math.random() * (100 - 2) + 2);
                }
            }
            setNum1(y); setNum2(x);
            break;
        }
        curSolution = eval(num1 + op + num2);
    }


    const handleChange = (e: string) => {
        let y = parseInt(e);
        if (y == curSolution) {
            generateProblem();
            props.setCounter(props.counter+1);
        }
    }
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Zetamac: {props.counter}</Text>
            <Text style={styles.eq}>{num1} {op} {num2}</Text>
            <TextInput
              onChangeText={handleChange}
              placeholder='enter number'
              style={styles.input}
              keyboardType='numeric'
            />
            <View style={styles.button}>
                <Button title="Reset" onPress={endPlaying}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
  },
  input: {
    marginTop: 30,
    fontSize:24, 
  },
  eq: {
    fontSize: 24,
    marginTop: 15,
  },
  button: {
    marginTop: 15,
  }
});