import React, {useEffect, useState} from "react"  
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import * as C from "./styles";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [customersData, setCustomersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [trashOpen, setTrashOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cusId, setCusId] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      let response;
      try {
        response = await api.get('/users/loggedVerify.php', { withCredentials: true });
        setIsLoggedIn(response.data.authenticated);
      } catch (error) {
        console.error(error);
      }
      if (response.data.authenticated === false) {
        navigate("/login");
      }
    };
    checkLogin();
  }, [isLoggedIn, navigate]);
  

  const getCustomers = async () => {
    api.get("/customers/readCustomers.php")
    .then(( response ) => {
      response.data &&
      setUsername(response.data.message.username)   

      setCustomersData(response.data.customers.records)
      
      
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }
  useEffect(() => {
    getCustomers()
  }, []);

  const deleteCustomer = async(customerId) => {
    try {
      await api.post('/customers/deleteCustomer.php?id='+customerId, {
      });
      getCustomers()
      handleTrashClose()
    } catch (error) {
      alert("Cliente não foi deletado");
    }
  }

  const handleLogOut = async () => {
    try {
      await api.get('/users/logout.php');
      navigate("/login")
    } catch (error) {
      alert("Houve um erro, sessão não finalizada !")
      console.error(error);
    }
  };


  const handleOpen = (info) => {
    info != null || undefined || false ? setAddressList(info.split("/")) : setAddressList(null)
    return setOpen(true);
    
  }

  const handleDeleteOpen = () => {
    return setDeleteOpen(true);
    
  }
  const handleTrashOpen = () => {
    return setTrashOpen(true);
  }

  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false)
  const handleTrashClose = () => setTrashOpen(false)
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black, 
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "theme.palette.action.hover,"
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function formatDate(formatDate) {
    let dateParts = formatDate.split("-");
    let formattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    let dateFormat = formattedDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return dateFormat;
  }
  return (
      <C.Container data-testid="home-page" >
        <C.HeaderContent>
          <C.LabelTitle>Bem vindo, {username}</C.LabelTitle>
          <C.RightContent>
            <C.OutButton onClick={() => (handleDeleteOpen())}>
              <LogoutIcon/>
              Encerrar Sessão
            </C.OutButton>
            <Link className="link-router" to="/create">
              <C.NewButton >
                <AddIcon/>
                Novo Cliente
              </C.NewButton>
            </Link>
          </C.RightContent>
        </C.HeaderContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
                <StyledTableCell >Nome do cliente</StyledTableCell>
                <StyledTableCell align="center">DATA DE NASCIMENTO</StyledTableCell>
                <StyledTableCell align="center">CPF</StyledTableCell>
                <StyledTableCell align="center">RG</StyledTableCell>
                <StyledTableCell align="center">PHONE</StyledTableCell>
                <StyledTableCell align="center">AÇÕES</StyledTableCell>
              </TableRow>
            </TableHead>
            {customersData !== undefined && Object.values(customersData).map((row) => (
            <TableBody key={row.id}>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {row.customer_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{formatDate(row.birth_date)}</StyledTableCell>
                  <StyledTableCell align="center">{row.cpf}</StyledTableCell>
                  <StyledTableCell align="center">{row.rg}</StyledTableCell>
                  <StyledTableCell align="center">{row.phone}</StyledTableCell>
                  <StyledTableCell align="center">
  
                      <C.ActionFlex>
                        <Link to={`/customer/update/${row.id}`}><EditIcon sx={{fontSize: "21px", cursor: "pointer", color: "#4040ff"}}/></Link>
                        <DeleteIcon onClick={() => {
                          setCusId(row.id)
                          return handleTrashOpen()
                        }} sx={{fontSize: "21px", cursor: "pointer", color: "#ff0000"}}/>
                        
                        <VisibilityIcon onClick={() => {
                          return handleOpen(row.address)
                        
                        }} sx={{fontSize: "21px", cursor: "pointer"}}/>
                      </C.ActionFlex>
                    
                  </StyledTableCell>
                </StyledTableRow>
              
            </TableBody>
            ))}
          </Table>
        </TableContainer>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Endereços do cliente:
              </Typography>
              
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {addressList == null || undefined || false ? 
                  <Box>
                    Endereço não cadastrado!
                  </Box> : <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"}}
                  >
                    {addressList.map((item) => (
                      
                      <Box sx={{border: "2px solid #d8cceb", padding: "13px 10px", borderRadius: "8px"}} key={item}>{item}</Box>
                    
                      ))}
                  </Box>}
              </Typography> 
              
                
              
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
               <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "32px",
                alignItems: "center"
               }}>
                  <Box>
                    Você tem certeza que quer sair ?
                  </Box>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    gap: "32px",
                  }}>
                    <C.NewButton onClick={() => (handleDeleteClose())}>CANCELAR</C.NewButton>
                    <C.OutButton onClick={() => (handleLogOut())}>CONTINUAR</C.OutButton>
                  </Box>
               </Box>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={trashOpen}
            onClose={handleTrashClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
               <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "32px",
                alignItems: "center"
               }}>
                  <Box>
                    Você tem certeza que quer Excluir ? 
                  </Box>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "32px",
                  }}>
                    <C.NewButton onClick={() => (handleTrashClose())}>CANCELAR</C.NewButton>
                    <C.OutButton onClick={() => (deleteCustomer(cusId))}>EXCLUIR CLIENTE</C.OutButton>
                  </Box>
               </Box>
            </Box>
          </Modal>
        </div>     
      </C.Container>
      
  )
}

export default Home;