import styled from "styled-components";

export const Container = styled.div` 
  width: 100%;
  display: flex;
  justify-content: center;
`

export const ContentForm = styled.div`
    gap: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 1px 2px #0003;
    background-color: white;
    justify-content: center;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    margin-top: 40px;
`
export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const OutButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border: 1px solid #676767;
  border-radius: 4px;
  padding: 12px 6px;
  width: "100%";
  &:hover {
    border: 1px solid red;
    color: red;
    transform: scale(1.03);
    
  }
`
export const NewButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: green;
  cursor: pointer;
  border: 1px solid black;
  background-color: green;
  color: white;
  border-radius: 4px;
  padding: 16px 22px;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  &:hover {
    border: 1px solid #676767;
    transform: scale(1.03);
    
  }
`


export const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  > .link-router {
    text-decoration: none;
    color: #676767;
    font-weight: 500;
  }
`

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
 
`;