import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "../middleware/axios";
import * as ImagePicker from 'expo-image-picker';

const NewPostScreen = () => {
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería');
        }
    };

    useEffect(() => {
        requestPermissions();
    }, []);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setImages(result.assets);
            setCurrentImageIndex(0);
        }
    };

    const nextImage = () => {
        if (images.length > 1) {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (images.length > 1) {
            setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
        }
    };

    const getLocationAndAddress = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        try {
            const response = await axios.get(`/geo/coordinates`, {
                params: { lat: latitude, lng: longitude },
            });

            const data = response.data;
            if (data) {
                setLocation(data);
            } else {
                setLocation('No se pudo obtener la dirección');
            }
        } catch (error) {
            setErrorMsg('Error al obtener la dirección');
            console.error(error);
        }
    };

    const handlePublish = async () => {
        try {
            const idResponse = await axios.get('/users/getId');
            const userId = idResponse.data;

            const formData = new FormData();
            formData.append("descripcion", description);
            formData.append("direc", location);

            images.forEach((image) => {
                formData.append("imagesPost", {
                    uri: image.uri,
                    type: image.mimeType || "image/jpeg",
                    name: image.fileName || "photo.jpg"
                });
            });

            const response = await axios.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            if (response.status === 201) {
                setShowSuccessModal(true);

                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigation.navigate('MainTabs', {
                        screen: 'Home',
                        params: { reload: true },
                    });
                }, 2000);
            }
        } catch (error) {
            console.error("Error al publicar:", error);
            alert("Error al publicar");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} color="#3B3F58" />
                </TouchableOpacity>
                <Text style={styles.header}>Nueva Publicación</Text>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={pickImages}>
                {images.length > 0 ? (
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: images[currentImageIndex].uri }}
                            style={styles.image}
                        />
                        {images.length > 1 && (
                            <>
                                <TouchableOpacity
                                    style={[styles.arrowContainer, { left: -25 }]}
                                    onPress={prevImage}
                                >
                                    <Text style={styles.arrow}>{"<"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.arrowContainer, { right: -25 }]}
                                    onPress={nextImage}
                                >
                                    <Text style={styles.arrow}>{">"}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                ) : (
                    <View style={styles.placeholder}>
                        <Text>Elige imágenes</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe el título de tu publicación"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={120}
            />
            <Text style={styles.charLimitText}>Máximo 120 Caracteres</Text>

            <Text style={styles.label}>Agregar Ubicación</Text>
            <View style={styles.locationContainer}>
                <TextInput
                    style={[styles.input, styles.locationInput]}
                    placeholder="Agregar Ubicación"
                    value={location}
                    onChangeText={setLocation}
                />
                <TouchableOpacity onPress={getLocationAndAddress} style={styles.locationButton}>
                    <Ionicons name="location-outline" size={24} color="#3B3F58" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={showSuccessModal}
                animationType="fade"
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>¡Publicación creada con éxito!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3B3F58',
        textAlign: 'center',
        flex: 1,
    },
    imageContainer: {
        width: 160,
        height: 152,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
        alignSelf: 'center',
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowContainer: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -7 }],
        padding: 5,
    },
    arrow: {
        fontSize: 14,
        color: '#3B3F58',
    },
    label: {
        fontSize: 11,
        color: '#3B3F58',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4F5269',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    charLimitText: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationInput: {
        flex: 1,
    },
    locationButton: {
        padding: 10,
    },
    publishButton: {
        width: 330,
        height: 34,
        backgroundColor: '#3B3F58',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderColor: '#4F5269',
        borderWidth: 1,
    },
    publishButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 200,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#3B3F58',
        textAlign: 'center',
    },
});

export default NewPostScreen;

