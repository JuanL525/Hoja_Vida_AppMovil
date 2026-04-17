import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface NavigationButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    style?: ViewStyle;
}

export const NavigationButton = ({
  title,
  onPress,
  variant = "primary",
  style,
}: NavigationButtonProps) => {
  // Determina el estilo del texto basado en la variante
  const textStyle = [
    styles.text,
    variant === "secondary" ? styles.textSecondary : styles.textPrimary,
  ];

    return (
        <TouchableOpacity 
            style={[styles.button, styles[variant], style]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
      <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    },

  // Variante Principal (Azul Politécnico)
    primary: {
    backgroundColor: "#0033A0", // Azul Politécnico
    // Sombra institucional
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    },

  // Variante Secundaria (Borde Rojo Politécnico)
    secondary: {
    backgroundColor: "#FFFFFF", // Fondo blanco para contraste
    borderColor: "#C41230", // Borde Rojo Politécnico
        borderWidth: 2,
    },

  // Variante Peligro (Rojo Politécnico)
    danger: {
    backgroundColor: "#C41230", // Rojo Politécnico
    },

  // Estilo base para el texto
    text: {
        fontSize: 16,
        fontWeight: "600",
    },

  // Color de texto para variantes primary y danger
  textPrimary: {
    color: "#FFFFFF",
  },

  // Color de texto para la variante secondary
    textSecondary: {
    color: "#C41230", // Texto Rojo Politécnico
    },

})