import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();

  // --- Configuración de React Hook Form ---
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: cvData.personalInfo,
    mode: "onChange", // Validar al cambiar el valor del campo
  });

  // --- Manejador para guardar ---
  const handleSave = (data: PersonalInfo) => {
    updatePersonalInfo(data);
    Alert.alert("Éxito", "Información personal guardada.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleSaveError = () => {
    Alert.alert("Error", "No se puede guardar. Por favor, revisa los errores en el formulario.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* --- Campo Nombre Completo --- */}
          <Controller
            control={control}
            rules={{
              required: "El nombre completo es obligatorio.",
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "El nombre solo debe contener letras y espacios.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Nombre Completo *"
                placeholder="Juan Pérez"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.fullName?.message}
              />
            )}
            name="fullName"
          />

          {/* --- Campo Email --- */}
          <Controller
            control={control}
            rules={{
              required: "El email es obligatorio.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Formato de email inválido.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email *"
                placeholder="juan@email.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
          />

          {/* --- Campo Teléfono --- */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Teléfono"
                placeholder="+593 00 000 000"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            )}
            name="phone"
          />

          {/* --- Campo Ubicación --- */}
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,-]+$/,
                message: "La ubicación contiene caracteres no válidos.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Ubicación"
                placeholder="Quito, Ecuador"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.location?.message}
              />
            )}
            name="location"
          />

          {/* --- Campo Resumen Profesional --- */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Resumen Profesional"
                placeholder="Describe brevemente tu perfil profesional y tus objetivos."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={4}
                style={{ height: 100, textAlignVertical: "top" }}
              />
            )}
            name="summary"
          />

          <NavigationButton
            title="Guardar Información"
            onPress={handleSubmit(handleSave, handleSaveError)}
          />

          <NavigationButton
            title="Volver al Inicio"
            onPress={() => router.back()}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9", // Fondo General
  },
  content: {
    padding: 16, // Espaciado institucional
  },
});