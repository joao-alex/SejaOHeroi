import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';
import Incident from '../../components/Incident';

import api from '../../services/api';

export default function Incidents() {
  const [incidents,setIncidents] = useState([]);
  const [total,setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(false);

  async function loadIncidents(){
    if(loading)
      return;

    if(total>0 && incidents.length===total)
      return;

    setLoading(true);

    
    const {data,headers} = await api.get('/incidents',{
      params:{page}
    });

    setIncidents([...incidents,...data]);
    setTotal(headers['x-total-count']);
    setLoading(false);
    setPage(page+1);
  }

  useEffect(()=>{

    loadIncidents()
  },[])
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logo}/>
            <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{total} casos</Text>
            </Text>
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
            style={styles.incidentList}
            data={incidents}
            keyExtractor={incident=>String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={.2}
            renderItem={({item:incident})=><Incident incident={incident}/>}
        />

    </View>
  );
}
