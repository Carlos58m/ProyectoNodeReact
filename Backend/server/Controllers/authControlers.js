const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users'); // Importa tu modelo de usuario

// Clave secreta para firmar los tokens
const JWT_SECRET = 'tu_clave_secreta';

const register = async (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña ingresada con la guardada en la BD
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

module.exports = { register, login };

