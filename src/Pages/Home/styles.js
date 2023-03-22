import styled from "styled-components";

export const Container = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 36px;
  margin: 0px 36px;

`

export const ActionFlex = styled.div`
  display: flex;
  justify-Content: center;
  gap: 8px;
  > svg {
    &:hover {
    transform: scale(1.3);
  }
  }
  
`

export const ModelBox = styled.div`
  position: 'absolute';
    top: '50%';
    left: '50%';
    transform: 'translate(-50%, -50%)';
    width: 400;
    background-color: 'background.paper';
    border: '2px solid #000';
    box-shadow: 24;
    padding: 4;
`
export const LabelTitle = styled.label`
  font-size: 42px;
  font-weight: 900;
  color: #676767;
 
`

export const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  > .link-router {
    text-decoration: none;
  }
`


export const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 24px;
`

export const OutButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border: 1px solid #676767;
  border-radius: 4px;
  padding: 12px 6px;
  &:hover {
    border: 1px solid red;
    color: red;
    transform: scale(1.1);
    
  }
`

export const NewButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: black;
  background-color: green;
  color: white;
  cursor: pointer;
  border: 1px solid #676767;
  border-radius: 4px;
  padding: 12px 14px;
  &:hover {
    border: 1px solid green;
    color: white;
    transform: scale(1.1);
    
  }
`

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`;

export const Settings = styled.button`
  background-color: white;
  border: none;
  display: flex;
  gap: 8px;
`





