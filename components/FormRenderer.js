// components/FormRenderer.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { parseString } from 'react-native-xml2js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import DrawingField from './DrawingField';

const FormRenderer = ({ xmlData }) => {
  const [formFields, setFormFields] = useState([]);

  React.useEffect(() => {
    parseString(xmlData, (err, result) => {
      if (err) {
        console.error('XML parsing error:', err);
        return;
      }
      setFormFields(result.form.field);
    });
  }, [xmlData]);

  const renderField = (field) => {
    switch (field.$.type) {
      case 'text':
        return (
          <TextInput
            style={styles.input}
            placeholder={field.$.label}
            required={field.$.required === 'true'}
          />
        );

      case 'date':
        return (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {}}
          />
        );

      case 'radio':
        return (
          <RadioButton.Group onValueChange={() => {}} value="">
            {field.option.map((option, index) => (
              <View key={index} style={styles.radioOption}>
                <RadioButton value={option.$.value} />
                <Text>{option.$.value}</Text>
              </View>
            ))}
          </RadioButton.Group>
        );

      case 'drawing':
        return <DrawingField />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {formFields.map((field, index) => (
        <View key={index} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.$.label}</Text>
          {renderField(field)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FormRenderer;