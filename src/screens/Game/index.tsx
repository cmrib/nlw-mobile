import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { FlatList, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';
import { Image, View, Text } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png'
import React, { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


export function Game() {

    const route = useRoute()
    const game = route.params as GameParams;
    const navigator = useNavigation()
    const [duos, setDuos] = useState<DuoCardProps[]>([])

    function handleGoBack() {
        navigator.navigate('home')
    }

    useEffect(() => {
        fetch(`http://192.168.1.71:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data))
    }, [])

    return (
        < Background>
            <SafeAreaView style={styles.container}>
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={handleGoBack}
                    >
                        <Entypo
                            name='chevron-thin-left'
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />

                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right}></View>

                </View>

                <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />


                <Heading
                    title={game.title}
                    subtitle='Conecte-se e começe a jogar!'
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    horizontal
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    style={styles.containerList}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => { }} />
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )}
                />

            </SafeAreaView>
        </Background>
    );
}