import React, { useState } from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import { Link,useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

export default function Register() {

	const [name,setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsApp] = useState('')
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	const history = useHistory();


	async function handleRegister(e){
		e.preventDefault();

		try{
			const {data} = await api.post('/ongs',{
				name,
				email,
				whatsapp,
				city,
				uf
			});
            alert(`Seu ID de logon é: ${data.id}\nGuarde esse ID para acessar o sistema!`)
			history.push('/');
		}catch(err){
			alert('Erro no cadastro da ONG')
		}
		


	}

  return (
    <div className="register-container">
        <div className="content">
            <section>
                <img src={logo} alt="Seja o Herói"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encotrarem  os casos da sua ONG</p>
                <Link to="/" className="link">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar para o logon
                </Link>
            </section>
            <form onSubmit={handleRegister}>
                <input placeholder="Nome da ONG" value={name} onChange={e=>setName(e.target.value)}/>
                <input type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input placeholder="WhatsApp" value={whatsapp} onChange={e=>setWhatsApp(e.target.value)}/>
                <div className="input-group" >
                    <input placeholder="Cidade" value={city} onChange={e=>setCity(e.target.value)}/>
                    <input placeholder="UF" style={{width:80}} value={uf} onChange={e=>setUf(e.target.value)}/>
                </div>
                <button type="submit" className="button">Cadastrar</button>
            </form>
        </div>
    </div>
  );
}
