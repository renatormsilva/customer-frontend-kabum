import React from "react";
import * as C from "./styles";

const Button = ({ Text, onClick, Type = "button", style }) => {
  return (
    <C.Button style={style} type={Type} onClick={onClick}>
      {Text}
    </C.Button>
  );
};

export default Button;
