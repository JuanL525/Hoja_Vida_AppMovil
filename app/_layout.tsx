import { CVProvider } from "@/context/CVContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CVProvider>
      <Stack 
        screenOptions={{
          headerStyle: { backgroundColor: '#0033A0' }, // Azul Politécnico
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="index"
          options={{ title: "Crear CV", headerShown:true }}
      />
        <Stack.Screen 
          name="personal-info"
          options={{ title: "Información Personal" }}
        />
        <Stack.Screen 
          name="experience"
          options={{ title: "Experiencia laboral" }}
        />
        <Stack.Screen 
          name="education"
          options={{ title: "Educación" }}
        />
        <Stack.Screen 
          name="preview"
          options={{ title: "Vista Previa", presentation: "modal",}}
        />
        <Stack.Screen 
          name="skills"
          options={{ title: "Habilidades" }}
        />
        <Stack.Screen
          name="photo"
          options={{ title: "Foto de Perfil" }}
        />
      </Stack>
    </CVProvider>
  )
}