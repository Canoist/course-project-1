import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const handleChange = ({ target }) => {
    setEmail(target.value);
  };
  return (
    <form action="">
      <div>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" value={email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
    </form>
  );
};
export default Login;
