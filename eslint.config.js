const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Configuración del servidor
const app = express();
const PORT = 5000;
const SECRET_KEY = 'mi_clave_secreta'; // Cambia esto por una clave más segura en producción

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos de usuarios (en producción usa una base de datos real)
const users = [
  {
    email: 'jane.doe@example.com',
    password: bcrypt.hashSync('123456', 10), // Contraseña encriptada
  },
];

// Endpoint para autenticación
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Correo no registrado' });
  }

  // Verificar la contraseña
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }

  // Generar un token JWT
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ success: true, message: 'Inicio de sesión exitoso', token });
});

// Endpoint protegido (requiere token)
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ success: true, message: 'Acceso concedido', user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token inválido' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
