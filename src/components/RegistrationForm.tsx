import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';

interface RegistrationFormProps {
  onSubmit: (data: { login: string; email: string; password: string }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validator] = useState(new SimpleReactValidator());
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const valid = validator.allValid();
    setIsFormValid(valid);
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    validator.showMessageFor('login');
    validateForm();
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validator.showMessageFor('email');
    validateForm();
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validator.showMessageFor('password');
    validateForm();
  };

  const handleBlur = (field: 'login' | 'email' | 'password') => {
    validator.showMessageFor(field);
    validateForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      onSubmit({ login, email, password });
      setSubmitted(true);
    } else {
      validator.showMessages();
      validateForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={handleChangeLogin}
          onBlur={() => handleBlur('login')}
        />
        {validator.message('login', login, 'required')}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          onBlur={() => handleBlur('email')}
        />
        {validator.message('email', email, 'required|email')}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          onBlur={() => handleBlur('password')}
        />
        {validator.message('password', password, 'required|min:8')}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Register
      </button>

      {submitted && <p>Registration Successful!</p>}
    </form>
  );
};

export default RegistrationForm;