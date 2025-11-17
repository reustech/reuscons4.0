# Plan de Desarrollo - Clon de Trello Backend

## Descripción General
Desarrollo de un backend para un clon de Trello utilizando:
- **Framework API**: Express.js
- **Base de Datos**: MongoDB (local)
- **ODM**: Mongoose
- **Lenguaje**: Node.js

---

## Estructura del Proyecto (MVC por Recurso)

```
reuscons4.0_BE/
├── src/
│   ├── shared/
│   │   ├── config/
│   │   │   └── database.js              # Configuración de MongoDB
│   │   ├── middleware/
│   │   │   ├── auth.js                  # Middleware de autenticación
│   │   │   ├── permissions.js           # Middleware de permisos
│   │   │   ├── errorHandler.js          # Middleware de manejo de errores
│   │   │   └── security.js              # Middleware de seguridad
│   │   └── utils/
│   │       ├── responses.js             # Respuestas estandarizadas
│   │       ├── validators.js            # Validaciones reutilizables
│   │       ├── queries.js               # Queries optimizadas
│   │       └── logger.js                # Logging
│   ├── resources/
│   │   ├── users/
│   │   │   ├── model.js                 # Modelo de usuarios
│   │   │   ├── controller.js            # Lógica de usuarios
│   │   │   └── routes.js                # Rutas de usuarios
│   │   ├── workspaces/
│   │   │   ├── model.js                 # Modelo de workspaces
│   │   │   ├── controller.js            # Lógica de workspaces
│   │   │   └── routes.js                # Rutas de workspaces
│   │   ├── boards/
│   │   │   ├── model.js                 # Modelo de tableros
│   │   │   ├── controller.js            # Lógica de tableros
│   │   │   └── routes.js                # Rutas de tableros
│   │   ├── columns/
│   │   │   ├── model.js                 # Modelo de columnas
│   │   │   ├── controller.js            # Lógica de columnas
│   │   │   └── routes.js                # Rutas de columnas
│   │   ├── cards/
│   │   │   ├── model.js                 # Modelo de tarjetas
│   │   │   ├── controller.js            # Lógica de tarjetas
│   │   │   └── routes.js                # Rutas de tarjetas
│   │   └── files/
│   │       ├── model.js                 # Modelo de archivos
│   │       ├── controller.js            # Lógica de archivos
│   │       └── routes.js                # Rutas de archivos
│   └── app.js                           # Configuración de Express
├── .env                                 # Variables de entorno
├── .env.example                         # Variables de entorno ejemplo
├── .gitignore                           # Archivos a ignorar
├── server.js                            # Punto de entrada
├── package.json                         # Dependencias del proyecto
├── package-lock.json                    # Lock de dependencias
├── claude.md                            # Plan general
├── fases.md                             # Guía de implementación por fases
└── API.md                               # Documentación de la API
```

---

## Modelos de Base de Datos

### User
- **_id**: ObjectId (automático)
- **email**: String (único, requerido)
- **password**: String (hasheado, requerido)
- **nombre**: String (requerido)
- **createdAt**: Date (automático)
- **updatedAt**: Date (automático)

### Board
- **_id**: ObjectId (automático)
- **titulo**: String (requerido)
- **descripcion**: String (opcional)
- **owner**: ObjectId (referencia a User, requerido)
- **members**: Array[ObjectId] (referencias a Users)
- **createdAt**: Date (automático)
- **updatedAt**: Date (automático)

### Workspace
- **_id**: ObjectId (automático)
- **nombre**: String (requerido)
- **descripcion**: String (opcional)
- **owner**: ObjectId (referencia a User, requerido)
- **members**: Array[ObjectId] (referencias a Users)
- **boards**: Array[ObjectId] (referencias a Boards)
- **createdAt**: Date (automático)
- **updatedAt**: Date (automático)

### Column
- **_id**: ObjectId (automático)
- **titulo**: String (requerido)
- **board**: ObjectId (referencia a Board, requerido)
- **posicion**: Number (para ordenamiento)
- **createdAt**: Date (automático)
- **updatedAt**: Date (automático)

### Card
- **_id**: ObjectId (automático)
- **titulo**: String (requerido)
- **descripcion**: String (opcional)
- **column**: ObjectId (referencia a Column, requerido)
- **assignee**: ObjectId (referencia a User, opcional)
- **dueDate**: Date (opcional)
- **labels**: Array[String] (etiquetas)
- **posicion**: Number (para ordenamiento)
- **createdAt**: Date (automático)
- **updatedAt**: Date (automático)

### File
- **_id**: ObjectId (automático)
- **filename**: String (requerido)
- **originalName**: String (requerido)
- **mimetype**: String (requerido)
- **size**: Number (requerido)
- **path**: String (requerido)
- **uploadedBy**: ObjectId (referencia a User, requerido)
- **resourceType**: String (enum: 'card', 'board', 'user', 'other')
- **resourceId**: ObjectId (referencia al recurso, opcional)
- **createdAt**: Date (automático)
- **updatedAt**: Date (automático)

---

## Endpoints de la API

### Autenticación (Users)
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/me` - Obtener usuario actual

### Workspaces
- `GET /api/workspaces` - Listar workspaces del usuario
- `POST /api/workspaces` - Crear workspace
- `GET /api/workspaces/:id` - Obtener detalles del workspace
- `PUT /api/workspaces/:id` - Actualizar workspace
- `DELETE /api/workspaces/:id` - Eliminar workspace
- `POST /api/workspaces/:id/members` - Agregar miembro al workspace

### Tableros
- `GET /api/boards` - Listar tableros del usuario
- `POST /api/boards` - Crear tablero
- `GET /api/boards/:id` - Obtener detalles del tablero
- `PUT /api/boards/:id` - Actualizar tablero
- `DELETE /api/boards/:id` - Eliminar tablero
- `POST /api/boards/:id/members` - Agregar miembro al tablero

### Columnas
- `GET /api/columns/board/:boardId` - Listar columnas de un tablero
- `POST /api/columns` - Crear columna
- `PUT /api/columns/:id` - Actualizar columna
- `DELETE /api/columns/:id` - Eliminar columna
- `PUT /api/columns/:id/reorder` - Reordenar columnas

### Tarjetas
- `GET /api/cards/column/:columnId` - Listar tarjetas de una columna
- `POST /api/cards` - Crear tarjeta
- `GET /api/cards/:id` - Obtener detalles de la tarjeta
- `PUT /api/cards/:id` - Actualizar tarjeta
- `DELETE /api/cards/:id` - Eliminar tarjeta
- `PUT /api/cards/:id/move` - Mover tarjeta entre columnas
- `PUT /api/cards/:id/assign` - Asignar tarjeta a usuario
- `PUT /api/cards/:id/reorder` - Reordenar tarjetas

### Archivos
- `POST /api/files/upload` - Subir archivo
- `GET /api/files/:id` - Descargar archivo
- `DELETE /api/files/:id` - Eliminar archivo
- `GET /api/files/resource/:resourceType/:resourceId` - Listar archivos de un recurso

---

## Tecnologías y Dependencias

### Dependencias Principales
```json
{
  "express": "^4.18.0",
  "mongoose": "^8.0.0",
  "dotenv": "^16.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5"
}
```

### Dependencias de Desarrollo
```json
{
  "nodemon": "^3.0.0"
}
```

---

## Variables de Entorno (.env)

```
# Base de Datos
MONGODB_URI=mongodb://localhost:27017/trello-clone

# JWT
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRE=7d

# Puerto del Servidor
PORT=5000

# Entorno
NODE_ENV=development
```

---

## Flujo de Desarrollo

1. **Fase 1: Configuración Inicial**
   - Inicializar proyecto npm
   - Instalar dependencias
   - Configurar estructura de carpetas
   - Conectar a MongoDB con Mongoose

2. **Fase 2: Autenticación**
   - Modelo de User
   - Rutas de autenticación (register, login)
   - Middleware de autenticación
   - JWT tokens

3. **Fase 3: Tableros**
   - Modelo de Board
   - Crear, leer, actualizar, eliminar tableros
   - Gestión de miembros

4. **Fase 4: Listas**
   - Modelo de List
   - CRUD de listas
   - Reordenamiento

5. **Fase 5: Tarjetas**
   - Modelo de Card
   - CRUD de tarjetas
   - Mover tarjetas
   - Asignación de usuarios

6. **Fase 6: Validación y Manejo de Errores**
   - Validadores
   - Middleware de errores
   - Tests básicos

7. **Fase 7: Optimización**
   - Índices en BD
   - Mejora de queries
   - Seguridad

---

## Consideraciones Importantes

- **Autenticación**: Usar JWT para sesiones sin estado
- **Contraseñas**: Hashear con bcryptjs
- **Validación**: Validar entrada en todas las rutas
- **CORS**: Configurar para comunicarse con frontend
- **Manejo de Errores**: Centralizar con middleware
- **Seguridad**: Validar permisos en cada operación
- **Base de Datos**: Crear índices en campos frecuentemente consultados

---

## Proximos Pasos

1. Confirmar esta arquitectura
2. Inicializar proyecto npm
3. Instalar dependencias
4. Crear estructura de carpetas
5. Implementar fase por fase

