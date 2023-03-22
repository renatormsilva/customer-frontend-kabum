import Input from "../../components/Input";
import api from "../../services/api";
import * as C from "./styles";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CustomerRegister= () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [birth, setBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

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
      if (!response.data.authenticated) {
        navigate("/login");
      }
    };
    checkLogin();
  }, [isLoggedIn, navigate]);

  

  
  async function handleNewCustomer() {
    try {
      await api.post('/customers/createCustomer.php', {
        customerName,
        birth,
        cpf,
        rg,
        phone,
        address
      }, {
        withCredentials: true 
      });

      alert("Cliente cadastrado com sucesso !")
      setCustomerName("")
      setBirth("")
      setCpf("")
      setRg("")
      setPhone("")
      setAddress("")
    } catch (erro) {
      alert("Cliente não foi cadastrado")
    }
  }

  const handleAddCustomer = () => {
    if (!customerName | !cpf | !phone) {
      setError("Preencha os campos obrigatórios");
      return;
    } 
    handleNewCustomer()
  }

  function formatCPF(value) {
    if (!value) return ''; 
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(?=\d)/g, '$1.');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value.slice(0, 14);
  }
  
  function formatRG(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.slice(0, 9);
    value = value.replace(/(\d{2})(?=\d)/g, '$1.');
    value = value.replace(/(\d{5})(\d{1,2})$/, '$1-$2');
  
    return value;
  }
  
  function formatPhone(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.slice(0, 11)
    if (value.length === 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length === 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length === 9) {
      value = value.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else if (value.length === 8) {
      value = value.replace(/(\d{4})(\d{4})/, '$1-$2');
    }
  
    return value;
  }
  
  return (
      
    <C.Container data-testid="customer-register-page">
      <C.ContentForm>
        <C.HeaderContent>
          <C.Label>Registro de clientes</C.Label>
          <Link className="link-router" to="/home"><C.OutButton>CANCELAR</C.OutButton></Link>
        </C.HeaderContent>
        
        <Input
            type="text"
            placeholder="Nome do(a) cliente *"
            value={customerName}
            onChange={(e) => [setCustomerName(e.target.value) ]}
        />
        <Input
            type="date"
            placeholder="Data de nascimento do(a) cliente "
            value={birth}
            onChange={(e) => [setBirth(e.target.value)]}
        />
        <Input
          type="text"
          placeholder="CPF do(a) cliente *"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
        />
        <Input
            type="text"
            placeholder="RG do(a) cliente"
            value={rg}
            onChange={(e) => setRg(formatRG(e.target.value))}
        />
        <Input
            type="text"
            placeholder="Telefone do(a) cliente *"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
        <Input
            type="text"
            placeholder='Endereço ( separar por " / " )'
            value={address}
            onChange={(e) => [setAddress(e.target.value)]}
        />
        <C.labelError>{error}</C.labelError>
        <C.NewButton onClick={handleAddCustomer} >CADASTRAR CLIENTE</C.NewButton>
      </C.ContentForm>
    </C.Container>
  )
}

export default CustomerRegister