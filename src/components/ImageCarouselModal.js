import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

export default function ImageCarouselModal({ isVisible, images, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>

            {images.length > 0 && (
            <View style={styles.imageWrapper}>
                <Image source={{ uri: images[currentImageIndex] }} style={styles.image} />
                
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
            )}
        </View>
        </Modal>
    );
    }

    const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    arrowContainer: {
        position: 'absolute',
        top: '50%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
    },
    arrow: {
        color: '#fff',
        fontSize: 24,
    },
    });
