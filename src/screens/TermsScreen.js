import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TermsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back-icon.png')} style={styles.backIcon} /> 
      </TouchableOpacity>

      {/* Título de la pantalla */}
      <Text style={styles.title}>Términos y Condiciones</Text>

      {/* Contenido de los términos y condiciones */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}>
          Los presentes términos de venta crean un contrato entre usted y Apple (el “Contrato”). Sírvase leer con atención el Contrato. Para confirmar que comprende y acepta el Contrato, haga clic en “Acepto”.
          {"\n\n"}
          Apple Services LATAM LLC (“Apple”) es el proveedor del Servicio de contenido por volumen, que (a) para App Store, permite a entidades empresariales y educativas aprobadas comprar Contenido de App Store a granel, exclusivamente para su distribución a personas contratadas por la institución o afiliadas con esta y para uso exclusivo por parte de estas, tales como contratistas, empleados, agentes y, en el caso de las entidades educativas, estudiantes matriculados autorizados por usted, de conformidad con los Términos y Condiciones de Apple Media Services o (b) para Apple Books, permite a (i) entidades educativas aprobadas que sean escuelas o administraciones escolares (excluidas, entre otras, las bibliotecas) comprar contenido de Apple Books a granel, exclusivamente para su distribución a empleados, profesores y asistentes educativos (independientemente de si son empleados directamente por la institución) en la institución o registrados como estudiantes de la institución y para uso exclusivo por parte de estos, o a (ii) instituciones aprobadas exclusivamente para su distribución a empleados, y para uso exclusivo por parte de estos, de la institución o afiliados a esta, como contratistas, empleados y agentes, de conformidad con los Términos y Condiciones de Apple Media Services, como corresponda. Dicho Contenido de App Store y el Contenido de Apple Books comprado a granel se denominan conjuntamente “Contenido por volumen”. Los usuarios finales afiliados a su institución a los que distribuye el Contenido por volumen, incluidas, entre otras, las cuentas creadas como Apple ID administrados (“MAID”), se denominan conjuntamente “Usuarios finales autorizados”. Usted acepta que su uso tanto del Servicio de contenido por volumen como del Contenido por volumen estará sujeto a estos términos (los “Términos de Contenido por volumen”, conocidos anteriormente como “Términos del Programa de Compras por Volumen” o los “Términos PCV”), así como a los Términos y Condiciones de Apple Media Services (http://www.apple.com/legal/internet-services/itunes/), que se incorporan aquí como referencia (conjuntamente, “Términos”). En caso de conflicto o incoherencia, prevalecerán los Términos del Contenido por volumen.
          {"\n\n"}
          APPLE ID PARA EL SERVICIO DE CONTENIDO POR VOLUMEN
          {"\n\n"}
          Usted acepta utilizar únicamente el Apple ID específico correspondiente al Servicio de contenido por volumen (el “Apple ID para el Contenido por volumen”) o los MAID con los privilegios correspondientes con el propósito de comprar, administrar y distribuir Contenido por volumen a través del Servicio de contenido por volumen. Usted se obliga a proporcionar información precisa para poder configurar su MAID o Apple ID para el Contenido por volumen, como el nombre de la compañía, domicilio físico, número D-U-N-S, la información empresarial de pago, el número de identificación fiscal (si corresponde) u otra información según se solicite. Su Apple ID para Contenido por volumen (al contrario de su contraseña, que no debe revelarse a nadie) será utilizado por los proveedores de contenido para verificar su cuenta para la distribución de contenido a través del Servicio de contenido por volumen.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6F61",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  scrollContainer: {
    marginBottom: 40,
  },
  text: {
    fontSize: 12,
    paddingRight: 8,
    fontFamily: "Roboto_400Regular",
    color: "#FFFFFF",
    textAlign: "justify",
  },
});
