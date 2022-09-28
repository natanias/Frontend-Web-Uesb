import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import api from '../../services/api.js';
import './style.css';

export default function Profile(){
    const {id} = useParams();
    const initUser ={
        name: '',
        email: '',
        idade: 0,
        empresa: ''
    };
    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if(id){
            api.get(`/users/${id}`)
                .then((response) => {
                    setUser(...response.data);
                })
                .catch(err => console.log(err));
            
        }
    }, [id]);

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const submit = (e) => {
        e.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/users/${id}` : '/users'; 

        api[method](url, user)
            .then((response) => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }
    return(
        <div id="profile-container">
            <h1>Cadastro</h1>

            <form onSubmit={submit}>
                <strong>Nome:</strong>
                <input type="text" name="name" onChange={changeHandler} value={user.name}/>
                <strong>Email:</strong>
                <input type="text" name="email" onChange={changeHandler} value={user.email}/>
                <strong>Idade:</strong>
                <input type="text" name="idade" onChange={changeHandler} value={user.idade}/>
                <strong>Empresa:</strong>
                <input type="text" name="empresa" onChange={changeHandler} value={user.empresa}/>

                <div className="actions">
                    <Link to="/"><button className="button">Voltar</button></Link>
                    <button type="submit" className="button" >Salvar</button>
                </div>

                
            </form>
        </div>//Final div

    );
}