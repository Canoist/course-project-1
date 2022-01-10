import React, { useState } from "react";
import TextField from "../textFields";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" value={data.email} onChange={handleChange} label="E-mail" />
      <TextField
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        label="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default Login;
