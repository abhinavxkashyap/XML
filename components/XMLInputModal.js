// components/XMLInputModal.js
import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

const XMLInputModal = ({ visible, onClose, onSubmit }) => {
  const [xmlInput, setXmlInput] = useState('');

  const handleSubmit = () => {
    onSubmit(xmlInput);
    setXmlInput('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.input}
            multiline
            value={xmlInput}
            onChangeText={setXmlInput}
            placeholder="Enter XML here..."
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <View style={styles.buttonSpacing} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 200,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacing: {
    height: 10,
  },
});

export default XMLInputModal;