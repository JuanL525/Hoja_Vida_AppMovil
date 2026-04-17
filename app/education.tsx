import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

  // --- Configuración de React Hook Form ---
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EducationFormData>({
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      graduationYear: "",
    },
    mode: "onChange", // Validación al cambiar el contenido del input
  });

  // --- Estado para el DatePicker ---
  const [showDatePicker, setShowDatePicker] = useState(false);
  const graduationYearValue = control._getWatch("graduationYear");

  // --- Manejadores de eventos ---
  const handleAdd = (data: EducationFormData) => {
    const newEducation: Education = {
      id: Date.now().toString(),
      ...data,
    };

    addEducation(newEducation);
    reset(); // Limpiar el formulario después de agregar
    Alert.alert("Éxito", "Educación agregada correctamente");
  };

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

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      // Formateamos la fecha para obtener solo el año y la establecemos en el formulario
      const year = selectedDate.getFullYear().toString();
      setValue("graduationYear", year, { shouldValidate: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Agregar Nueva Educación</Text>

          {/* --- Campo Institución --- */}
          <Controller
            control={control}
            rules={{ required: "La institución es obligatoria." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Institución *"
                placeholder="Nombre de la universidad/institución"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="institution"
          />
          {errors.institution && (
            <Text style={styles.errorText}>{errors.institution.message}</Text>
          )}

          {/* --- Campo Título/Grado --- */}
          <Controller
            control={control}
            rules={{ required: "El título/grado es obligatorio." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Título/Grado *"
                placeholder="Ej: Licenciatura, Maestría"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="degree"
          />
          {errors.degree && (
            <Text style={styles.errorText}>{errors.degree.message}</Text>
          )}

          {/* --- Campo Área de Estudio --- */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Área de Estudio"
                placeholder="Ej: Ingeniería en Sistemas"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="field"
          />

          {/* --- Campo Año de Graduación (con DatePicker) --- */}
          <Controller
            control={control}
            name="graduationYear"
            render={({ field: { value } }) => (
              <>
                <Text style={styles.label}>Año de Graduación</Text>
                <TouchableOpacity
                  style={styles.datePickerInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text
                    style={
                      value
                        ? styles.datePickerText
                        : styles.datePickerPlaceholder
                    }
                  >
                    {value || "Seleccionar año"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                graduationYearValue
                  ? new Date(parseInt(graduationYearValue, 10), 0, 1)
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <NavigationButton
            title="Agregar Educación"
            onPress={handleSubmit(handleAdd)}
          />

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
                    <Text style={styles.deleteButtonText}>✕</Text>
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
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
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
    color: "#333333", 
  },
  datePickerPlaceholder: {
    fontSize: 16,
    color: "#7A7A7A", 
  },
  errorText: {
    color: "#C41230", 
    fontSize: 12,
    marginTop: -12, 
    marginBottom: 8,
  },
});
