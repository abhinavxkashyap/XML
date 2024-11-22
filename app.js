// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import FormRenderer from './components/FormRenderer';
import XMLInputModal from './components/XMLInputModal';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  // Sample predefined XML
  const sampleXML = `
    <?xml version="1.0" encoding="UTF-8"?>
    <form>
      <field type="text" label="Full Name" required="true" />
      <field type="date" label="Birth Date" required="true" />
      <field type="radio" label="Gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </field>
      <field type="drawing" label="Signature" />
    </form>
  `;

  const handlePredefinedXML = () => {
    try {
      setFormData(sampleXML);
    } catch (error) {
      Alert.alert('Error', 'Failed to load predefined XML');
    }
  };

  const handleCustomXML = (xmlInput) => {
    try {
      setFormData(xmlInput);
      setShowModal(false);
    } catch (error) {
      Alert.alert('Error', 'Invalid XML format');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Render Form from XML File"
            onPress={handlePredefinedXML}
          />
          <View style={styles.buttonSpacing} />
          <Button
            title="Render Form from XML Input"
            onPress={() => setShowModal(true)}
          />
        </View>

        {formData && <FormRenderer xmlData={formData} />}

        <XMLInputModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCustomXML}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 20,
  },
  buttonSpacing: {
    height: 20,
  },
});

export default App;