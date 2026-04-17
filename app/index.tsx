import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  const isPersonalInfoComplete =
    cvData.personalInfo.fullName && cvData.personalInfo.email;
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crea tu CV Profesional</Text>

        {/* --- Sección Información Personal --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. Información Personal</Text>
          <Text
            style={[
              styles.status,
              isPersonalInfoComplete
                ? styles.statusComplete
                : styles.statusPending,
            ]}
          >
            {isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
          </Text>
          <NavigationButton
            title={isPersonalInfoComplete ? "Editar" : "Completar"}
            onPress={() => router.push("/personal-info")}
            variant="secondary"
          />
        </View>

        {/* --- Sección Experiencia --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. Experiencia Laboral</Text>
          <Text
            style={[
              styles.status,
              hasExperience ? styles.statusComplete : styles.statusPending,
            ]}
          >
            {hasExperience
              ? `✓ ${cvData.experiences.length} agregada(s)`
              : "Pendiente"}
          </Text>
          <NavigationButton
            title="Agregar/Editar"
            onPress={() => router.push("/experience")}
            variant="secondary"
          />
        </View>

        {/* --- Sección Educación --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Educación</Text>
          <Text
            style={[
              styles.status,
              hasEducation ? styles.statusComplete : styles.statusPending,
            ]}
          >
            {hasEducation
              ? `✓ ${cvData.education.length} agregada(s)`
              : "Pendiente"}
          </Text>
          <NavigationButton
            title="Agregar/Editar"
            onPress={() => router.push("/education")}
            variant="secondary"
          />
        </View>

        {/* --- Botón de Vista Previa --- */}
        <NavigationButton
          title="Ver Vista Previa del CV"
          onPress={() => router.push("/preview")}
          style={{ marginTop: 24 }}
        />
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0033A0", // Azul Politécnico
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF", // Superficies
    borderRadius: 8, // Borde redondeado para tarjetas
    padding: 16,
    marginBottom: 16,
    // Sombra institucional
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333", // Texto Principal
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 12,
  },
  statusComplete: {
    color: "#27ae60", // Se mantiene verde para 'completado' por buena UX
  },
  statusPending: {
    color: "#7A7A7A", // Texto Secundario para 'pendiente'
  },
});
