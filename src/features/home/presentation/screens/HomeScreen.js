import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AppColors } from '../../../../shared/theme/colors';
import { useUserStore } from '../../../../core/store/useUserStore';

export default function HomeScreen() {
    // Accessing values and actions from the store
    const { user, logout, login } = useUserStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>

            {user ? (
                <>
                    <Text style={styles.subtitle}>Hello, {user.name}!</Text>
                    <Button title="Logout" onPress={logout} color={AppColors.primary} />
                </>
            ) : (
                <>
                    <Text style={styles.subtitle}>Guest User</Text>
                    <Button
                        title="Simulate Login"
                        onPress={() => login({ name: 'Omar', role: 'Driver' })}
                        color={AppColors.secondary}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: AppColors.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: AppColors.secondary,
        marginBottom: 20,
    }
});
