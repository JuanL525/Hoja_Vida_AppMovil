# Reglas de Diseño y Desarrollo - App Hoja de Vida (Estilo EPN)

Eres un asistente de programación experto en React Native (Expo) y TypeScript. Al generar o refactorizar código para este proyecto, debes apegarte estrictamente a las siguientes directrices de diseño (basadas en la imagen institucional de la Escuela Politécnica Nacional) y reglas de negocio.

## 1. Paleta de Colores Institucional
Debes utilizar estrictamente estos códigos HEX en los estilos de los componentes:

* **Azul Politécnico (Color Principal):** `#0033A0`
    * *Uso:* Headers, botones de acción principal (Submit/Siguiente), bordes de inputs cuando están enfocados (activos), títulos de sección.
* **Rojo Politécnico (Color Secundario):** `#C41230`
    * *Uso:* Botones secundarios, íconos de eliminación, mensajes de error en validaciones.
* **Fondo General (Background):** `#F4F6F9`
    * *Uso:* Color de fondo principal de las pantallas (`SafeAreaView` o contenedores principales) para dar contraste.
* **Superficies (Cards/Forms):** `#FFFFFF`
    * *Uso:* Fondo de los formularios, tarjetas de experiencia o educación.
* **Texto:**
    * *Principal (Títulos y valores):* `#333333`
    * *Secundario (Labels y placeholders):* `#7A7A7A`

## 2. Estilo de Componentes UI
* **Bordes Redondeados (Border Radius):** Usa un radio suave y profesional. `borderRadius: 8` para tarjetas y botones. `borderRadius: 6` para campos de texto (Inputs).
* **Sombras (Elevación):** Las tarjetas (Cards) y formularios principales deben tener una ligera sombra para despegarse del fondo.
    * *Android:* `elevation: 3`
    * *iOS:* `shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4`
* **Espaciado (Padding/Margin):** Usa múltiplos de 4 u 8 para mantener la proporción (ej. `8px`, `16px`, `24px`).

## 3. Reglas para Formularios (React Hook Form)
Cada vez que generes o modifiques un formulario, debes cumplir con esto:
* Usa siempre `useForm` de `react-hook-form`.
* Configura el modo de validación en tiempo de ejecución: `mode: 'onChange'` o `mode: 'onBlur'`.
* Todos los campos deben estar envueltos en el componente `<Controller />`.
* Los mensajes de error deben mostrarse debajo del input correspondiente en texto pequeño (`fontSize: 12`) y usar el **Rojo Politécnico**.

## 4. Reglas para Fechas (DatePicker)
* Utiliza exclusivamente `@react-native-community/datetimepicker` para el manejo de fechas.
* Visualmente, el campo de fecha debe lucir igual que un campo de texto normal (InputField), pero debe abrir el modal/calendario al ser presionado mediante un `TouchableOpacity`.
* Asegúrate de formatear la fecha a un string legible (ej. `DD/MM/YYYY`) antes de renderizarla en la pantalla.

## 5. Accesibilidad y Estructura
* Usa siempre `SafeAreaView` como contenedor raíz de cada pantalla.
* Separa la lógica de presentación de la lógica de estado. Los estilos (`StyleSheet.create`) siempre deben ir al final del archivo.