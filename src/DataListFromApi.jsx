import axios from 'axios';
import React, { useEffect, useState } from 'react';

const api = axios.create({ baseURL: "http://localhost:8080/api/v1/" });

function DataListFromApi() {

    const [item, setItem] = useState({cidade: '', pais: ''});
    const [lista, setLista] = useState([]);

    const handleInputChange = (event) => {
        setItem({...item, [event.target.name]: event.target.value});
    }

    async function fetchData() {
        const response = await api.get('cidades')
        setLista(response.data)
    }

    useEffect(() => {
        fetchData();
    },[]);

    const handleFormSubmit = async event => {
        event.preventDefault();
        if(!item) {
            return
        }
        await api.post('cidades', item).then(
            setItem({cidade: '', pais: ''}),
        )
        await fetchData();     
    }

    const handleDelete = async (id) => {
        await api.delete(`cidades/${id}`);
        await fetchData();
    }

    /* const handleEdit = async (id, index) => {
        var copy = [...lista]
        var item = copy.splice(index,1)
        setLista(copy)
        setItem({cidade: item[0].cidade, pais:  item[0].pais });
        setEdit(true)
        await api.put(`cidades/${id}`, item);
        //await fetchData();
    } */

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input 
                    data-testid = "form-field-cidade"
                    type="text"
                    value={item.cidade}
                    placeholder="Cidade"
                    name="cidade"
                    onChange={handleInputChange}
                ></input>
                <input 
                    data-testid = "form-field-pais"
                    type="text"
                    value={item.pais}
                    placeholder="País"
                    name="pais"
                    onChange={handleInputChange}
                ></input>
                <button data-testid = "btn-form" type="submit">Adicionar Cidade</button>
            </form>
            <div data-testid = "lista">
                {lista.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.id} - {item.cidade} - {item.pais}</p>
                            <button type="button" onClick={() => handleDelete(item.id, index)} >Excluir</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DataListFromApi;