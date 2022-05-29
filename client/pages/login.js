import Axios from "axios";
import { useState } from "react";

export default function Login() {
  const [values, setValues] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    //envia dados para Servidor
    Axios.post("http://localhost:3000/auth/authenticate", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response);
        return response.data;
      })
      .catch((erro) => {
        return alert("Erro no Login");
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        id="email"
        name="email"
        className="form"
        onChange={handleChangeValues}
      />
      <input
        type="password"
        placeholder="Senha"
        id="password"
        name="password"
        className="form"
        onChange={handleChangeValues}
      />
      <button onClick={() => handleClickButton()}>Logar</button>
    </div>
  );
}
