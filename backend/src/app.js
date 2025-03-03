const express = require('express');
const cors = require('cors');
const app = express();
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes')
const studentAuthRoutes = require('./routes/studentAuthRoutes');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/student/auth', studentAuthRoutes);

module.exports = app;
