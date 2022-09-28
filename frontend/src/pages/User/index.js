import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import './style.css';

export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get('users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteUser = async (id) => {
        try{
            await api.delete(`/users/${id}`);
            api.get('users')
                .then(response => {
                    setUsers(response.data);
                })
                .catch(err => console.log(err));
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div id="userContainer">
            <h1>Lista de usuários</h1>
            <Link to="/create"><button className="button">Criar</button></Link>
            <ul className="userList">
                {
                    users.map((user) => {
                        
                        return(
                            <li key={user.id} >
                                <strong>Nome</strong>
                                <p>{user.name}</p>
                                <strong>Email</strong>
                                <p>{user.email}</p>
                                <strong>Idade</strong>
                                <p>{user.idade}</p>
                                <strong>Empresa</strong>
                                <p>{user.empresa}</p>

                                <div className="actions">
                                        <button onClick={() => {deleteUser(user.id)}} className="button">Deletar</button>
                                        <Link to={`/update/${user.id}`}><button className="button">Acessar</button></Link>
                                </div>
                            </li>
                        );
                        
                    })
                }
                
            </ul>

        </div>
    );
}