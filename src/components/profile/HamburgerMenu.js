import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Switch,
    Image,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const HamburgerMenu = ({ visible, onClose, onLogout }) => {
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleLogout = () => {
        setConfirmLogoutVisible(false);
        onLogout(); // Ejecuta la función de logout del padre (Profile.js)
    };

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity style={styles.overlay} onPress={onClose} />
            <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                <LinearGradient
                    colors={["#FF6F61", "#3B3F58"]}
                    style={styles.background}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image source={require('../../assets/logo-header.png')} style={styles.logo} />
                    <Text style={styles.menuItem}>INICIO</Text>
                    <Text style={styles.menuItem}>EDITAR PERFIL</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.menuItem}>MODO OSCURO</Text>
                        <Switch value={false} />
                    </View>
                    <TouchableOpacity onPress={() => setConfirmLogoutVisible(true)}>
                        <Text style={styles.menuItem}>CERRAR SESION</Text>
                    </TouchableOpacity>
                    <View style={styles.deleteButtonWrapper}>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>ELIMINAR USUARIO</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Animated.View>

            {/* Confirmación de Cerrar Sesión */}
            <Modal
                transparent
                visible={confirmLogoutVisible}
                animationType="fade"
                onRequestClose={() => setConfirmLogoutVisible(false)}
            >
                <View style={styles.confirmOverlay}>
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmText}>
                            ¿Estás seguro de que deseas cerrar sesión? Deberás iniciar sesión nuevamente para acceder a tu cuenta
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                                <Text style={styles.confirmButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmLogoutVisible(false)}>
                                <Text style={styles.cancelButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuContainer: {
        position: 'absolute',
        right: 0,
        width: '50%',
        height: '100%',
    },
    logo: {
        width: 125,
        height: 75,
        marginBottom: 20,
    },
    menuItem: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 10,
        fontFamily: "Roboto_400Regular",
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: '#ff4d4f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteButtonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Roboto_400Regular",
    },
    confirmOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: "Roboto_400Regular",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#2B2B2B',
        width: 91,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: "Roboto_300Light",
    },
    cancelButton: {
        backgroundColor: '#2B2B2B',
        width: 91,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: "Roboto_700Bold",
    },
});

export default HamburgerMenu;
