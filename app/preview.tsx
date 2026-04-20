import { CVPreview } from "@/components/CVPreview";
import { useCVContext } from "@/context/CVContext";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { generatePDFHtml } from '../utils/pdfGenerator'; // Importamos la función

export default function PreviewScreen() {
    const { cvData } = useCVContext();

    const exportAndSharePDF = async () => {
        // Usamos solo nuestra función utilitaria para generar el HTML
        const htmlContent = generatePDFHtml(cvData);

        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(uri, {
                mimeType: 'application/pdf',
                dialogTitle: 'Compartir mi CV',
            });
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };

    return(
        <View style={styles.container}>
            <CVPreview cvData={cvData} />
            
            <TouchableOpacity style={styles.exportButton} onPress={exportAndSharePDF}>
                <Text style={styles.exportButtonText}>Exportar y Compartir PDF</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F9",
        padding: 16,
    },
    exportButton: {
        backgroundColor: '#C41230', 
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    exportButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});