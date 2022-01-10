import React, { useState } from "react";
import TextField from "../textFields";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  return (
    <form action="">
      <TextField name="email" value={data.email} onChange={handleChange} label="E-mail" />
      <TextField
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        label="Password"
      />
    </form>
  );
};
export default Login;
