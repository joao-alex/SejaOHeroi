import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'; 

import logo from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {
	const [incidents,setIncidents] = useState([]);

	const name = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');

	const history = useHistory();

	useEffect(()=>{
		api.get('/profiles',{
			headers:{
				Authorization:ongId
			}
		}).then(res=>{
			setIncidents(res.data)
		})
	},[ongId])

	function handleLogout(){
		localStorage.clear();
		history.push('/');
	}

	function handleDelete(id){
		try{
			api.delete(`/incidents/${id}`,{
				headers:{
					Authorization:ongId
				}
			});
			setIncidents(incidents.filter(incident=>incident.id!==id));

		}catch(err){
			alert('Erro ao deletar o caso, tente novamente')
		}
	}

  return (
    <div className="profile-container">
        <header>
            <img src={logo} alt="Logo"/>
						<span>Bem vinda, {name}</span> 
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button onClick={handleLogout}>
                <FiPower size={18} color="#e02041"/>
            </button>
        </header>

        <h1>Casos cadastrados</h1>

        <ul>
            {incidents.map(incident =>(
							<li key={incident.id}>
								<strong>CASO:</strong>
								<p>{incident.title}</p>

								<strong>DESCRIÇÃO:</strong>
								<p>{incident.description}</p>

								<strong>VALOR:</strong>
								<p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>

								<button onClick={()=>handleDelete(incident.id)}>
										<FiTrash2 size={20} color="#a8a8b3"/>
								</button>
							</li>	
			))}
        </ul>

    </div>
  );
}
