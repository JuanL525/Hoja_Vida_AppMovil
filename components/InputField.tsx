import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const InputField= ({ label, error, ...props }: InputFieldProps) => {
    return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={[styles.input, !!error && styles.inputError]}
        placeholderTextColor='#7A7A7A' // Color de placeholder institucional
        {...props}
        />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginBottom: 16, // Espaciado institucional (múltiplo de 8)
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#7A7A7A', // Texto Secundario (Labels)
      marginBottom: 8, // Espaciado institucional
    },
    input: {
      backgroundColor: '#FFFFFF', // Superficies
      borderWidth: 1,
      borderColor: '#DDDDDD', // Borde neutral y sutil
      borderRadius: 6, // Borde redondeado para inputs
      padding: 12,
      fontSize: 16,
      color: '#333333', // Texto Principal
    },
    inputError:{
        borderColor: '#C41230', // Rojo Politécnico para errores
    },
    errorText: {
      color: '#C41230', // Rojo Politécnico
      fontSize: 12,
      marginTop: 4,
    }
})