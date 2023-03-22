import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      let response;
      try {
        response = await api.get('/users/loggedVerify.php', { withCredentials: true });
        setIsLoggedIn(response.data.authenticated);
      } catch (error) {
        console.error(error);
      }
      if (response.data.authenticated) {
        navigate("/home");
      }
    };
    checkLogin();
  }, [isLoggedIn, navigate]);

  
  async function handleNewUser() {
  
    try {
      await api.post('/users/createUser.php', {
        username,
        email,
        password
      }
         
      );
      alert("Usuário cadatrado com sucesso!");
      navigate("/");
    } catch (erro) {
      alert("usuário não foi cadastrado")
    }
  }

  const checkExistingUser = async (email, username) => {
    try {
      const response = await api.post('/users/checkUser.php', {
        email,
        username
      });
      return { exists: response.data.exists, message: response.data.message };
    } catch (error) {
      console.error(error);
      return { exists: false, message: 'Erro ao verificar usuário' };
    }
  };

  const handleSignup = async () => {
    if (!email || !emailConf || !password || !username) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    } else if (username.includes(" ")) {
      setError("O nome de usuário não pode conter espaços");
      return;
    }
    const existingUser = await checkExistingUser(email, username);
    if (existingUser.exists) {
      return setError(existingUser.message);
    } else {
      return handleNewUser();
    }

    
  };




  return (
    <C.Container data-testid="register-page" >
      <C.Label>SISTEMA DE CLIENTES - CRIE SUA CONTA</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite seu Login"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
