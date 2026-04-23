import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const hasSkills = cvData.skills.length > 0;
  const hasPhoto = !!cvData.personalInfo.profileImage;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crea tu CV Profesional</Text>

        {/* --- Sección Foto de Perfil --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>
                <Ionicons name="person-circle-outline" size={18} color="#333333" /> Foto de Perfil
              </Text>
              <Text
                style={[
                  styles.status,
                  { marginBottom: 0 },
                  hasPhoto ? styles.statusComplete : styles.statusOptional,
                ]}
              >
                {hasPhoto ? (
                  <View style={styles.statusWithIcon}>
                    <Ionicons name="checkmark" size={14} color="#27ae60" />
                    <Text style={styles.statusText}> Agregada</Text>
                  </View>
                ) : (
                  "Opcional"
                )}
              </Text>
            </View>
            {hasPhoto && cvData.personalInfo.profileImage && (
              <Image
                source={{ uri: cvData.personalInfo.profileImage }}
                style={styles.thumbnail}
              />
            )}
          </View>
          <NavigationButton
            title={hasPhoto ? "Cambiar Foto" : "Subir Foto"}
            onPress={() => router.push("/photo" as any)}
            variant="secondary"
          />
        </View>

        {/* --- Sección Información Personal --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="person-outline" size={18} color="#333333" /> 1. Información Personal
          </Text>
          <Text
            style={[
              styles.status,
              isPersonalInfoComplete
                ? styles.statusComplete
                : styles.statusPending,
            ]}
          >
            {isPersonalInfoComplete ? (
              <View style={styles.statusWithIcon}>
                <Ionicons name="checkmark" size={14} color="#27ae60" />
                <Text style={styles.statusText}> Completado</Text>
              </View>
            ) : (
              "Pendiente"
            )}
          </Text>
          <NavigationButton
            title={isPersonalInfoComplete ? "Editar" : "Completar"}
            onPress={() => router.push("/personal-info")}
            variant="secondary"
          />
        </View>

        {/* --- Sección Experiencia --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="briefcase-outline" size={18} color="#333333" /> 2. Experiencia Laboral
          </Text>
          <Text
            style={[
              styles.status,
              hasExperience ? styles.statusComplete : styles.statusPending,
            ]}
          >
            {hasExperience ? (
              <View style={styles.statusWithIcon}>
                <Ionicons name="checkmark" size={14} color="#27ae60" />
                <Text style={styles.statusText}> {cvData.experiences.length} agregada(s)</Text>
              </View>
            ) : (
              "Pendiente"
            )}
          </Text>
          <NavigationButton
            title="Agregar/Editar"
            onPress={() => router.push("/experience")}
            variant="secondary"
          />
        </View>

        {/* --- Sección Educación --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="school-outline" size={18} color="#333333" /> 3. Educación
          </Text>
          <Text
            style={[
              styles.status,
              hasEducation ? styles.statusComplete : styles.statusPending,
            ]}
          >
            {hasEducation ? (
              <View style={styles.statusWithIcon}>
                <Ionicons name="checkmark" size={14} color="#27ae60" />
                <Text style={styles.statusText}> {cvData.education.length} agregada(s)</Text>
              </View>
            ) : (
              "Pendiente"
            )}
          </Text>
          <NavigationButton
            title="Agregar/Editar"
            onPress={() => router.push("/education")}
            variant="secondary"
          />
        </View>

        {/* --- Sección Habilidades --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="star-outline" size={18} color="#333333" /> 4. Habilidades
          </Text>
          <Text
            style={[
              styles.status,
              hasSkills ? styles.statusComplete : styles.statusPending,
            ]}
          >
            {hasSkills ? (
              <View style={styles.statusWithIcon}>
                <Ionicons name="checkmark" size={14} color="#27ae60" />
                <Text style={styles.statusText}> {cvData.skills.length} agregada(s)</Text>
              </View>
            ) : (
              "Pendiente"
            )}
          </Text>
          <NavigationButton
            title="Agregar/Editar"
            onPress={() => router.push("/skills" as any)}
            variant="secondary"
          />
        </View>

        {/* --- Botón de Vista Previa --- */}
        <NavigationButton
          title="Ver Vista Previa del CV"
          onPress={() => router.push("/preview")}
          icon={<Ionicons name="eye-outline" size={18} color="#FFFFFF" />}
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
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
  statusOptional: {
    color: "#7A7A7A",
  },
  statusWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: "#27ae60",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0033A0", // Azul Politécnico
  },
});
