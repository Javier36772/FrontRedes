import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    try {
      const response = await fetch('https://redes-xsapi.parachico.xyz/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        setErrorMessage('');
        navigate("/productos")
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al iniciar sesión');
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('No se pudo conectar con el servidor');
    }
  };


  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Login</h2>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Correo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. jane.doe@example.com"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f4f4f4',
    margin: 0,
  },
  loginBox: {
    backgroundColor: '#d9d9d9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
};

export default Login;
