import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#ff3b3b" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});
