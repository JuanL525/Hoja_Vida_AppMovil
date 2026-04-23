import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";


export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();

  // --- Configuración de TanStack Form ---
  const form = useForm({
    defaultValues: cvData.personalInfo,
    onSubmit: async ({ value }) => {
      updatePersonalInfo(value as PersonalInfo);
      Alert.alert("Éxito", "Información personal guardada.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onSubmitInvalid: () => {
      Alert.alert(
        "Error",
        "No se puede guardar. Por favor, revisa los errores en el formulario.",
      );
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* --- Campo Nombre Completo --- */}
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "El nombre completo es obligatorio.";
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
                  return "El nombre solo debe contener letras y espacios.";
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Nombre Completo *"
                placeholder="Juan Pérez"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
              />
            )}
          </form.Field>

          {/* --- Campo Email --- */}
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "El email es obligatorio.";
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                  return "Formato de email inválido.";
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Email *"
                placeholder="juan@email.com"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          </form.Field>

          {/* --- Campo Teléfono --- */}
          <form.Field name="phone">
            {(field) => (
              <InputField
                label="Teléfono"
                placeholder="+593 00 000 000"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                keyboardType="phone-pad"
              />
            )}
          </form.Field>

          {/* --- Campo Ubicación --- */}
          <form.Field
            name="location"
            validators={{
              onChange: ({ value }) => {
                if (value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,-]+$/.test(value))
                  return "La ubicación contiene caracteres no válidos.";
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Ubicación"
                placeholder="Quito, Ecuador"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
              />
            )}
          </form.Field>

          {/* --- Campo Resumen Profesional --- */}
          <form.Field name="summary">
            {(field) => (
              <InputField
                label="Resumen Profesional"
                placeholder="Describe brevemente tu perfil profesional y tus objetivos."
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                multiline
                numberOfLines={4}
                style={{ height: 100, textAlignVertical: "top" }}
              />
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <NavigationButton
                title="Guardar Información"
                onPress={form.handleSubmit}
              />
            )}
          </form.Subscribe>

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
