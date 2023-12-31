import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { Text, View } from '../../components/Themed'
import { Participant } from '../../components/Participant'
import { useState } from 'react'

export default function TabOneScreen() {
  const [participants, setParticipants] = useState(['Gustavo'])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd(name: string) {
    if (participants.includes(name)) {
      return Alert.alert(`O participante com o nome ${name} já existe`)
    }
    setParticipants([...participants, name])
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Você deseja mesmo remover ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name),
          )
          Alert.alert('Deletado !!')
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
    console.log('participant remove ' + name)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(text) => setParticipantName(text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleParticipantAdd(participantName)
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => {
              handleParticipantRemove(item)
            }}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131016',
    padding: 24,
  },
  eventName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48,
  },
  eventDate: {
    color: '#6B6B6B',
    fontSize: 16,
  },
  input: {
    height: 56,
    backgroundColor: '#1F1E25',
    borderRadius: 5,
    color: '#FFFF',
    padding: 16,
    fontSize: 16,
    flex: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#31CF67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: '#131016',
    width: '100%',
    flexDirection: 'row',
    marginTop: 36,
    marginBottom: 42,
  },
})
