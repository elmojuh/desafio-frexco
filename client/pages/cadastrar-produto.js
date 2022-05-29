import { useState, useEffect } from "react";
import Axios from "axios";
import Cards from "../src/components/Cards/cards";

export default function cadastrarProduto() {
  const [values, setValues] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () =>{
    Axios.post("http://localhost:3000/products/register",{
      name: values.name,
      price: values.price,
      description: values.description,
      type: values.type,
    }).then((response)=>{
      console.log(response)
    });
  };

//  useEffect(() => {
//    Axios.get("http://localhost:3000/products/list").then((response)=>{
//      console.log(response);
//    });
// })

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <Style>
          <input
            type="text"
            placeholder="Tipo"
            id="type"
            name="type"
            className="form"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            placeholder="Nome"
            id="name"
            name="name"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            placeholder="Preço"
            id="price"
            name="price"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            placeholder="Quantidade"
            id="amount"
            name="amount"
            onChange={handleChangeValues}
          />
          <textarea
            name="comment"
            form="form"
            placeholder="Descrição"
            onChange={handleChangeValues}
          ></textarea>
          <button onClick={() => handleClickButton()}>Cadastrar</button>
      </Style>
      <Cards/>
    </div>
  );
}

function Style({ children }) {
  return (
    <div>
      <div>{children}</div>
      <style jsx>{`
        <form > {
          padding: 1000px;
          color: red;
          margin: 40px;
        }
      `}</style>
    </div>
  );
}
