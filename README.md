# Online Store – Backend API

API REST desarrollada con Node.js y Express para una tienda en línea.
Este backend se encarga de la lógica de negocio, autenticación de usuarios y
gestión de productos.

El frontend consume esta API de forma independiente.

---

## 🚀 Funcionalidades

- Registro de usuarios
- Inicio de sesión
- Autenticación mediante JSON Web Tokens (JWT)
- CRUD de productos
- Búsqueda de productos
- Gestión de múltiples imágenes por producto
- Protección de endpoints sensibles

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MySQL
- JWT
- express-jwt
- Multer
- dotenv

---

## 🔐 Autenticación y autorización

- Autenticación basada en JWT
- Los tokens se generan al iniciar sesión
- Los endpoints protegidos utilizan middleware (`express-jwt`)
- El backend valida el token antes de permitir el acceso a recursos protegidos

> ℹ️ En este proyecto el token es consumido por un frontend que lo almacena en localStorage
> debido a que es un proyecto demostrativo y no productivo.

---

## 🗂️ Base de datos

- MySQL como sistema de base de datos
- Tablas principales:
  - users
  - products
- Las consultas se realizan únicamente desde el backend
- El backend actúa como fuente única de verdad

---

## 🖼️ Manejo de imágenes

- Las imágenes de los productos se almacenan en el servidor
- En la base de datos se guarda únicamente la URL de cada imagen
- Un producto puede tener múltiples imágenes asociadas

---

## 📡 Arquitectura

- Arquitectura REST
- Separación clara entre frontend y backend
- API desacoplada y reutilizable

---

## ⚠️ Limitaciones conocidas

- No incluye pasarela de pagos
- El carrito de compras se maneja en el frontend
- No implementa refresh tokens
- No maneja roles de usuario

---

## 📌 Objetivo del proyecto

Este backend fue desarrollado con fines educativos para practicar:

- Desarrollo de APIs REST
- Autenticación con JWT
- Manejo de archivos con Multer
- Conexión con bases de datos relacionales
- Protección de endpoints

---

## ▶️ Instalación y uso

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
