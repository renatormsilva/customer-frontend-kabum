import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await api.get('/users/loggedVerify.php', { withCredentials: true });
        setIsLoggedIn(response.data.authenticated);
      } catch (error) {
        console.error(error);
      }
    };
  
    checkLogin();
    
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);



  const handleLogin = async () => {
    try {
      const response = await api.post('/users/userLogin.php', {
        username,
        password
      });
      if (response.data.error === false) {
        alert("Logado com sucesso, bem vindo");
        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    handleLogin();
  };

  return (
    <C.Container data-testid="login-page" >
      <C.Label>SISTEMA DE CLIENTES</C.Label>
      <C.Content>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="username"
            placeholder="Digite seu Login"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            type="password"
            id="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <C.labelError>{error}</C.labelError>}
          <Button onClick={handleLogin} Text="Entrar" />
        </form>
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/register">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Login;
