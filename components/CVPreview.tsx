import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { CVData } from "../types/cv.types";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header con foto */}
      <View style={styles.header}>
        {personalInfo.profileImage && (
          <Image
            source={{ uri: personalInfo.profileImage }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.headerText}>
          <Text style={styles.name}>{personalInfo.fullName || "Nombre"}</Text>
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={14} color="#7A7A7A" />
                <Text style={styles.contactText}> {personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Ionicons name="call" size={14} color="#7A7A7A" />
                <Text style={styles.contactText}> {personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Ionicons name="location" size={14} color="#7A7A7A" />
                <Text style={styles.contactText}> {personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Resumen profesional */}
      {personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="document-text-outline" size={18} color="#0033A0" />
            {' '}RESUMEN PROFESIONAL
          </Text>
          <Text style={styles.summaryText}>{personalInfo.summary}</Text>
        </View>
      )}

      {/* Experiencia laboral */}
      {experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="briefcase-outline" size={18} color="#0033A0" />
            {' '}EXPERIENCIA LABORAL
          </Text>
          {experiences.map((exp) => (
            <View key={exp.id} style={styles.item}>
              <Text style={styles.itemTitle}>{exp.position}</Text>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <Text style={styles.itemDate}>
                {exp.startDate} - {exp.endDate || "Actual"}
              </Text>
              {exp.description && (
                <Text style={styles.itemDescription}>{exp.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Educación */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="school-outline" size={18} color="#0033A0" />
            {' '}EDUCACIÓN
          </Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              {edu.field && (
                <Text style={styles.itemSubtitle}>{edu.field}</Text>
              )}
              <Text style={styles.itemInstitution}>{edu.institution}</Text>
              {edu.graduationYear && (
                <Text style={styles.itemDate}>{edu.graduationYear}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Habilidades */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="star-outline" size={18} color="#0033A0" />
            {' '}HABILIDADES
          </Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillBadge}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{skill.level}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Mensaje si no hay datos */}
      {!personalInfo.fullName &&
        experiences.length === 0 &&
        education.length === 0 &&
        skills.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No hay información para mostrar.{"\n"}
              Completa las secciones para ver tu CV.
            </Text>
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Superficies
    borderRadius: 8,
    // Sombra institucional
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 24, // Espaciado institucional
  },
  header: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0033A0", // Azul Politécnico
    paddingBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 3,
    borderColor: "#0033A0", // Azul Politécnico
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333", // Texto Principal
    marginBottom: 12,
  },
  contactInfo: {
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: "#7A7A7A", // Texto Secundario
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0033A0", // Azul Politécnico
    marginBottom: 16,
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#0033A0",
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    color: "#333333", // Texto Principal
    lineHeight: 22,
  },
  item: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE", // Gris muy claro para separación
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333", // Texto Principal
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#7A7A7A", // Texto Secundario
    marginBottom: 4,
  },
  itemInstitution: {
    fontSize: 14,
    color: "#7A7A7A", // Texto Secundario
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#7A7A7A", // Texto Secundario
    fontStyle: "italic",
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: "#333333", // Texto Principal
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadge: {
    backgroundColor: "#F4F6F9", // Fondo General
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0033A0", // Azul Politécnico
  },
  skillLevel: {
    fontSize: 12,
    color: "#7A7A7A", // Texto Secundario
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#7A7A7A", // Texto Secundario
    textAlign: "center",
    lineHeight: 24,
  },
});
