import { Ionicons } from "@expo/vector-icons";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
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
import { SkillLevel } from "../types/cv.types";

export default function SkillsScreen() {
  const router = useRouter();
  const { cvData, addSkill, deleteSkill } = useCVContext();

  const form = useForm({
    defaultValues: {
      name: "",
      level: "Básico" as SkillLevel,
    },
    onSubmit: async ({ value }) => {
      addSkill({ id: Date.now().toString(), ...value });
      form.reset();
      Alert.alert("Éxito", "Habilidad agregada correctamente");
    },
    onSubmitInvalid: () => {
      Alert.alert(
        "Error",
        "No se puede agregar. Por favor, revisa los errores en el formulario.",
      );
    },
  });

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta habilidad?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteSkill(id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Agregar Nueva Habilidad</Text>

          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value ? "La habilidad es requerida" : undefined,
            }}
          >
            {(field) => (
              <InputField
                label="Habilidad (Ej. React Native) *"
                placeholder="Nombre de la habilidad"
                onBlur={field.handleBlur}
                onChangeText={(text) => field.handleChange(text)}
                value={field.state.value}
                error={field.state.meta.errors?.[0]?.toString()}
              />
            )}
          </form.Field>

          <form.Field name="level">
            {(field) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nivel de Dominio</Text>
                <View style={styles.levelContainer}>
                  {(
                    [
                      "Básico",
                      "Intermedio",
                      "Avanzado",
                      "Experto",
                    ] as SkillLevel[]
                  ).map((lvl) => (
                    <TouchableOpacity
                      key={lvl}
                      style={[
                        styles.levelPill,
                        field.state.value === lvl && styles.levelPillActive,
                      ]}
                      onPress={() => field.handleChange(lvl)}
                    >
                      <Text
                        style={[
                          styles.levelText,
                          field.state.value === lvl && styles.levelTextActive,
                        ]}
                      >
                        {lvl}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <NavigationButton
                title="Agregar Habilidad"
                onPress={form.handleSubmit}
              />
            )}
          </form.Subscribe>

          {cvData.skills.length > 0 && (
            <>
              <Text style={styles.listTitle}>Habilidades Agregadas</Text>
              {cvData.skills.map((skill) => (
                <View key={skill.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{skill.name}</Text>
                    <Text style={styles.cardSubtitle}>{skill.level}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(skill.id)}
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
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  levelPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E0E5EC",
    borderWidth: 1,
    borderColor: "transparent",
  },
  levelPillActive: {
    backgroundColor: "#0033A0",
  },
  levelText: {
    fontSize: 14,
    color: "#333333",
  },
  levelTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
});
