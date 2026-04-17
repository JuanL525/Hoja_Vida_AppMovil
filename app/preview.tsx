import { CVPreview } from "@/components/CVPreview";
import { useCVContext } from "@/context/CVContext";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PreviewScreen() {
    const { cvData } = useCVContext();

    return(
        <View style={styles.container}>
            <CVPreview cvData={cvData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F9", // Fondo General
        padding: 16, // Espaciado para enmarcar el CV
    },
});