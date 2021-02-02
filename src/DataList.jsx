import React, { useState } from 'react';

function DataList() {

    const [item, setItem] = useState('');
    const [lista, setLista] = useState([]);

    const handleInputChange = (event) => {
        setItem(event.target.value);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        if(!item) {
            return
        }
        setLista([...lista, item]);
        setItem('');
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input 
                    data-testid = "form-field"
                    type="text"
                    value={item}
                    onChange={handleInputChange}
                ></input>
                <button data-testid = "btn-form" type="submit">ADD item</button>
            </form>
            <ul data-testid='list'>
                {lista.map((item, index) => {
                    return (
                        <li key={index} ><p>{item}</p></li>
                    )
                })}
            </ul>
        
        </>
  )
}

export default DataList;