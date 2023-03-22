import Input from "../../components/Input";
import api from "../../services/api";
import * as C from "./styles";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const CustomerUpdate = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  
  const [customerName, setCustomerName] = useState("");
  const [birth, setBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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

  async function handleUpdateCustomer() {
    try {
      await api.post('/customers/updateCustomer.php', {
        id,
        customerName,
        birth,
        cpf,
        rg,
        phone,
        address
      });
      alert("Cliente atualizado com sucesso !");
    } catch (error) {
      alert("Cliente não foi atualizado");
    }
  }

  const getCustomer = async () => {
     await api.get("/customers/getOneCustomer.php?id="+id)
    .then(( response ) => {
      setCustomerName(response.data.customer.customerName)
      setBirth(response.data.customer.birth)
      setCpf(response.data.customer.cpf)
      setRg(response.data.customer.rg)
      setPhone(response.data.customer.phone)
      setAddress(response.data.customer.address)
    })
  }
  
  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);

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
      
    <C.Container data-testid="customer-update-page">
      <C.ContentForm>
        <C.HeaderContent>
          <C.Label>Editar Clientes</C.Label>
          <Link className="link-router" to="/home"><C.OutButton>CANCELAR</C.OutButton></Link>
        </C.HeaderContent>
        
        <Input
            type="text"
            placeholder="Nome do(a) cliente"
            value={customerName}
            onChange={(e) => [setCustomerName(e.target.value)]}
        />
        <Input
            type="date"
            placeholder="Data de nascimento do(a) cliente"
            value={birth}
            onChange={(e) => [setBirth(e.target.value)]}
        />
        <Input
            type="text"
            placeholder="CPF do(a) cliente"
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
            placeholder="Telefone do(a) cliente"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
        <Input
            type="text"
            placeholder='Endereço ( separar por " / " )'
            value={address}
            onChange={(e) => [setAddress(e.target.value)]}
        />
        <C.NewButton onClick={handleUpdateCustomer} >EDITAR CLIENTE</C.NewButton>
      </C.ContentForm>
    </C.Container>
  )
}

export default CustomerUpdate