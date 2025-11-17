# 🌱 Guía Rápida: Ejecutar Seeding

## ⚠️ IMPORTANTE: Prerequisitos

### 1️⃣ Verificar que MongoDB está corriendo

En una **terminal separada**, ejecuta:

```bash
mongod
```

Deberías ver algo como:
```
[initandlisten] waiting for connections on port 27017
```

### 2️⃣ Verificar archivo .env

Confirma que existe `.env` en la raíz del proyecto:

```bash
ls -la .env
```

El archivo debe tener:
```
MONGODB_URI=mongodb://localhost:27017/trello-clone
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

Si no existe, se creó automáticamente. Si necesitas modificarlo:

```bash
cat .env
```

### 3️⃣ Instalar dependencias (si no lo has hecho)

```bash
npm install
```

---

## 🚀 EJECUTAR SEEDING

En la terminal del proyecto, ejecuta:

```bash
npm run seed
```

---

## ✅ Esperado

Deberías ver:

```
🌱 Iniciando seeding de base de datos...
✅ Conectado a MongoDB
🗑️ Limpiando colecciones existentes...
✅ Colecciones limpiadas
📂 Cargando datos desde archivos JSON...
✅ Datos cargados correctamente

👥 Seeding Users...
✅ 50 usuarios creados

🏢 Seeding Workspaces...
✅ 10 workspaces creados

📋 Seeding Boards...
✅ 50 tableros creados

📝 Seeding Lists...
✅ 20 listas creadas

🎴 Seeding Cards...
✅ 30 tarjetas creadas

📁 Seeding Files...
✅ 35 archivos creados

🔗 Actualizando referencias en Workspaces...
✅ Referencias de Workspaces actualizadas

============================================================
✅ SEEDING COMPLETADO EXITOSAMENTE
============================================================

📊 RESUMEN:
  👥 Usuarios:        50
  🏢 Workspaces:      10
  📋 Tableros:        50
  📝 Listas:          20
  🎴 Tarjetas:        30
  📁 Archivos:        35
  ──────────────────────
  📦 Total:           195 registros

💾 Base de datos populada correctamente
✨ ¡Listo para usar!
```

---

## ❌ Errores Comunes

### Error: "Cannot find module 'mongoose'"
**Solución:**
```bash
npm install
```

### Error: "MONGODB_URI is not defined" / "got undefined"
**Solución:**
1. Verifica que existe `.env` en la raíz
2. Reinicia la terminal después de crear `.env`
3. Ejecuta: `cat .env` para confirmar el contenido

### Error: "ECONNREFUSED connection refused"
**Solución:**
MongoDB no está corriendo. En otra terminal, ejecuta:
```bash
mongod
```

### Error: "ENOENT: no such file or directory"
**Solución:**
Verifica que estás en el directorio correcto:
```bash
pwd  # Debe mostrar: .../reuscons4.0_BE
ls seed.js  # Debe existir
```

---

## 🔍 Verificar Seeding

Después de completar, verifica en MongoDB Shell:

```bash
mongo
> use trello-clone
> db.users.count()
50
> db.workspaces.count()
10
> db.boards.count()
50
> db.lists.count()
20
> db.cards.count()
30
> db.files.count()
35
```

---

## 🎯 Siguiente paso

Una vez seeded, inicia el servidor:

```bash
npm run dev
```

Accede a: http://localhost:5000/api/health

---

**¡Listo! 🎉**
