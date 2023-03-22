import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderRoutes } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom'
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';
import Register from "../../Pages/Register"
import CustomerRegister from '../../Pages/CustomerRegister';
import CustomerUpdate from '../../Pages/CustomerUpdate';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CustomerRegister />} />
      <Route path="/customer/update/:id" element={<CustomerUpdate />} />
    </Routes>
  );
};

describe('RoutesApp', () => {
  test('renders Home component on /home route', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <AppRoutes />
      </MemoryRouter>
    );
    const homeElement = screen.getByTestId('home-page');
    expect(homeElement).toBeInTheDocument();
  });

  test('renders Login component on / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    const loginElement = screen.getByTestId('login-page');
    expect(loginElement).toBeInTheDocument();
  });

  test('renders Register component on /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AppRoutes />
      </MemoryRouter>
    );
    const registerElement = screen.getByTestId('register-page');
    expect(registerElement).toBeInTheDocument();
  });

  test('renders CustomerRegister component on /create route', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <AppRoutes />
      </MemoryRouter>
    );
    const customerRegisterElement = screen.getByTestId('customer-register-page');
    expect(customerRegisterElement).toBeInTheDocument();
  });

  test('renders CustomerUpdate component on /customer/update/:id route', () => {
    const route = '/customer/update/1';
    render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const customerUpdateElement = screen.getByTestId('customer-update-page');
    expect(customerUpdateElement).toBeInTheDocument();
  });
});
