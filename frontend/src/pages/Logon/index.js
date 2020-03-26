import React, { useState } from 'react';
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import heroes from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import './styles.css';


export default function Logon(){

    const [id,setId] = useState('');

    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();
        try{
            const {data} = await api.post('/sessions',{id});
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',data.name);
            history.push('/profile');
        }catch(err){
            alert('ONG não encontrada no sistema.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Logo"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e=>setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="link">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroes} alt="Heróis"/>
        </div>
    );
}