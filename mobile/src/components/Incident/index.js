import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import styles from './styles';


export default function Incident({incident}) {

  const navigation = useNavigation();

  function navigateToDetail(){
    navigation.navigate('Detail',{incident});
  }
  
  return (
    <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>

        <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#e02041"/>
        </TouchableOpacity>
    </View>
  );
}
