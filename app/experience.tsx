import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";

// Tipo para los datos del formulario
type ExperienceFormData = Omit<Experience, "id">;

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  // --- Configuración de React Hook Form ---
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    mode: "onChange",
  });

  // --- Estado para el DatePicker ---
  const [datePickerTarget, setDatePickerTarget] = useState<
    "startDate" | "endDate" | null
  >(null);

  const handleShowDatePicker = (target: "startDate" | "endDate") => {
    setDatePickerTarget(target);
  };

  // --- Manejadores de eventos ---
  const handleAdd = (data: ExperienceFormData) => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      ...data,
    };
    addExperience(newExperience);
    reset();
    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setDatePickerTarget(null); // Ocultar el picker en cualquier acción
    if (event.type === "set" && selectedDate && datePickerTarget) {
      const formattedDate = selectedDate
        .toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        })
        .replace(" de ", " "); // Formato "Enero 2023"

      const finalDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      setValue(datePickerTarget, finalDate, { shouldValidate: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

          {/* --- Campo Empresa --- */}
          <Controller
            control={control}
            rules={{ required: "El nombre de la empresa es obligatorio." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Empresa *"
                placeholder="Nombre de la empresa"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.company?.message}
              />
            )}
            name="company"
          />

          {/* --- Campo Cargo --- */}
          <Controller
            control={control}
            rules={{ required: "El cargo es obligatorio." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Cargo *"
                placeholder="Tu posición"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.position?.message}
              />
            )}
            name="position"
          />

          {/* --- Campo Fecha de Inicio --- */}
          <Controller
            control={control}
            rules={{ required: "La fecha de inicio es obligatoria." }}
            name="startDate"
            render={({ field: { value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de Inicio *</Text>
                <TouchableOpacity
                  style={[
                    styles.datePickerInput,
                    !!errors.startDate && styles.inputError,
                  ]}
                  onPress={() => handleShowDatePicker("startDate")}
                >
                  <Text
                    style={
                      value
                        ? styles.datePickerText
                        : styles.datePickerPlaceholder
                    }
                  >
                    {value || "Seleccionar fecha"}
                  </Text>
                </TouchableOpacity>
                {errors.startDate && (
                  <Text style={styles.errorText}>
                    {errors.startDate.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* --- Campo Fecha de Fin --- */}
          <Controller
            control={control}
            name="endDate"
            render={({ field: { value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de Fin</Text>
                <TouchableOpacity
                  style={styles.datePickerInput}
                  onPress={() => handleShowDatePicker("endDate")}
                >
                  <Text
                    style={
                      value
                        ? styles.datePickerText
                        : styles.datePickerPlaceholder
                    }
                  >
                    {value || "Seleccionar fecha o dejar en blanco"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* --- DatePicker Modal --- */}
          {datePickerTarget && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {/* --- Campo Descripción --- */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Descripción"
                placeholder="Describe tus responsabilidades y logros..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={4}
                style={{ height: 100, textAlignVertical: "top" }}
              />
            )}
          />

          <NavigationButton
            title="Agregar Experiencia"
            onPress={handleSubmit(handleAdd)}
          />

          {/* --- Lista de Experiencias --- */}
          {cvData.experiences.length > 0 && (
            <>
              <Text style={styles.listTitle}>Experiencias Agregadas</Text>
              {cvData.experiences.map((exp) => (
                <View key={exp.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{exp.position}</Text>
                    <Text style={styles.cardSubtitle}>{exp.company}</Text>
                    <Text style={styles.cardDate}>
                      {exp.startDate} - {exp.endDate || "Actual"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(exp.id)}
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
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
  },
  datePickerText: {
    fontSize: 16,
    color: "#333333",
  },
  datePickerPlaceholder: {
    fontSize: 16,
    color: "#7A7A7A",
  },
  inputError: {
    borderColor: "#C41230",
  },
  errorText: {
    color: "#C41230",
    fontSize: 12,
    marginTop: 4,
  },
});
