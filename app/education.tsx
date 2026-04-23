import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Education } from "../types/cv.types";

// Tipo para los datos del formulario
type EducationFormData = Omit<Education, "id">;

export default function EducationScreen() {
  const router = useRouter();
  const { cvData, addEducation, deleteEducation } = useCVContext();

  // --- Configuración de TanStack Form ---
  const form = useForm({
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      graduationYear: "",
    },
    onSubmit: async ({ value }) => {
      const newEducation: Education = {
        id: Date.now().toString(),
        ...value,
      };
      addEducation(newEducation);
      form.reset();
      Alert.alert("Éxito", "Educación agregada correctamente");
    },
    onSubmitInvalid: () => {
      Alert.alert(
        "Error",
        "No se puede agregar. Por favor, revisa los errores en el formulario.",
      );
    },
  });

  // --- Estado para el DatePicker ---
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta educación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteEducation(id),
      },
    ]);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      // Formateamos la fecha para obtener solo el año y la establecemos en el formulario
      const year = selectedDate.getFullYear().toString();
      form.setFieldValue("graduationYear", year);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Agregar Nueva Educación</Text>

          {/* --- Campo Institución --- */}
          <form.Field
            name="institution"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "La institución es obligatoria.";
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,]+$/.test(value))
                  return "El nombre de la institución contiene caracteres no válidos.";
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Institución *"
                placeholder="Nombre de la universidad/institución"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
              />
            )}
          </form.Field>

          {/* --- Campo Título/Grado --- */}
          <form.Field
            name="degree"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "El título/grado es obligatorio.";
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,]+$/.test(value))
                  return "El título solo debe contener letras y caracteres válidos.";
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Título/Grado *"
                placeholder="Ej: Licenciatura, Maestría"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
              />
            )}
          </form.Field>

          {/* --- Campo Área de Estudio --- */}
          <form.Field
            name="field"
            validators={{
              onChange: ({ value }) => {
                if (value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
                  return "El área de estudio solo debe contener letras y espacios.";
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Área de Estudio"
                placeholder="Ej: Ingeniería en Sistemas"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
              />
            )}
          </form.Field>

          {/*Campo Año de Graduación*/}
          <form.Field name="graduationYear">
            {(field) => (
              <>
                <Text style={styles.label}>Año de Graduación</Text>
                <TouchableOpacity
                  style={styles.datePickerInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text
                    style={
                      field.state.value
                        ? styles.datePickerText
                        : styles.datePickerPlaceholder
                    }
                  >
                    {field.state.value || "Seleccionar año"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </form.Field>

          {showDatePicker && (
            <form.Subscribe selector={(state) => state.values.graduationYear}>
              {(graduationYear) => (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={
                    graduationYear
                      ? new Date(parseInt(graduationYear, 10), 0, 1)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </form.Subscribe>
          )}

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <NavigationButton
                title="Agregar Educación"
                onPress={form.handleSubmit}
              />
            )}
          </form.Subscribe>

          {cvData.education.length > 0 && (
            <>
              <Text style={styles.listTitle}>Educación Agregada</Text>
              {cvData.education.map((edu) => (
                <View key={edu.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{edu.degree}</Text>
                    <Text style={styles.cardSubtitle}>{edu.field}</Text>
                    <Text style={styles.cardInstitution}>
                      {edu.institution}
                    </Text>
                    <Text style={styles.cardDate}>{edu.graduationYear}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(edu.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}

          <NavigationButton
            title="Volver"
            onPress={() => router.back()}
            variant="secondary"
            style={{ marginTop: 16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0033A0",
    marginBottom: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0033A0",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#7A7A7A",
    marginBottom: 4,
  },
  cardInstitution: {
    fontSize: 14,
    color: "#7A7A7A",
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: "#7A7A7A",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#C41230",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
    color: "#7A7A7A",
    marginBottom: 8,
  },
  datePickerInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 16,
  },
  datePickerText: {
    fontSize: 16,
    color: "#333333", // Texto Principal
  },
  datePickerPlaceholder: {
    fontSize: 16,
    color: "#7A7A7A", // Texto Secundario
  },
});