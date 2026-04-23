
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";

export default function PhotoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    cvData.personalInfo.profileImage
  );

  // --- Lógica Refactorizada para Selección de Imagen ---
  type ImagePickerMode = "camera" | "gallery";

  const handleImageSelection = async (mode: ImagePickerMode) => {
    try {
      let permissionResult: ImagePicker.PermissionResponse;
      let launchFunction: () => Promise<ImagePicker.ImagePickerResult>;

      const options: ImagePicker.ImagePickerOptions = {
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      };

      if (mode === "camera") {
        permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        launchFunction = () => ImagePicker.launchCameraAsync(options);
      } else {
        permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        launchFunction = () =>
          ImagePicker.launchImageLibraryAsync({
            ...options,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });
      }

      if (!permissionResult.granted) {
        Alert.alert(
          "Permiso Denegado",
          `Necesitamos acceso a tu ${
            mode === "camera" ? "cámara" : "galería"
          } para continuar.`
        );
        return;
      }

      const result = await launchFunction();

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        `No se pudo abrir la ${mode === "camera" ? "cámara" : "galería"}`
      );
      console.error(error);
    }
  };
  // Guardar la foto
  const handleSave = () => {
    updatePersonalInfo({
      ...cvData.personalInfo,
      profileImage: selectedImage,
    });
    Alert.alert("Éxito", "Foto guardada correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  // Eliminar foto
  const handleRemove = () => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar la foto de perfil?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setSelectedImage(undefined);
          updatePersonalInfo({
            ...cvData.personalInfo,
            profileImage: undefined,
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Foto de Perfil</Text>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Sin foto</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleImageSelection("camera")}
        >
          <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleImageSelection("gallery")}
        >
          <Ionicons name="images-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Seleccionar de Galería</Text>
        </TouchableOpacity>

        {selectedImage && (
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={handleRemove}
          >
            <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Eliminar Foto</Text>
          </TouchableOpacity>
        )}
      </View>

      <NavigationButton title="Guardar" onPress={handleSave} />

      <NavigationButton
        title="Cancelar"
        onPress={() => router.back()}
        variant="secondary"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6F9", // Fondo General
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0033A0", // Azul Politécnico
    marginBottom: 24,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#0033A0", // Azul Politécnico
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFFFFF", // Superficies
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#DDDDDD",
  },
  placeholderText: {
    color: "#7A7A7A", // Texto Secundario
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#0033A0", // Azul Politécnico
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  removeButton: {
    backgroundColor: "#C41230", // Rojo Politécnico
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
