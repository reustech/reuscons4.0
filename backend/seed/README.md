# Seed Data for Trello Clone Database

Este directorio contiene archivos JSON con datos de prueba para poblar la base de datos.

## Estructura de los Archivos Seed

Los archivos JSON usan referencias por nombre de usuario/título en lugar de ObjectIds. Esto permite que sean legibles y mantenibles. Un script de seed necesitaría procesar estos archivos y convertir los nombres en IDs reales.

### users.json
- 50 usuarios con perfiles completos
- Campos requeridos: `username`, `password`, `profile.firstName`, `profile.email`
- Estado: `active` (true/false) para representar usuarios activos e inactivos

### workspaces.json
- 50 espacios de trabajo
- Referencia a owner por `owner_username`
- Referencia a miembros por array `members` (usernames)
- Todas las opciones de roles representadas: admin, member

### boards.json
- 50 tableros
- Referencia a workspace por `workspace_name`
- Referencia a owner por `owner_username`
- Miembros con roles: admin, editor, viewer
- Estados: `public` (true/false) y `archived` (true/false)

### lists.json
- 50+ listas (columnas)
- Referencia a board por `board_title`
- Posiciones numeradas para ordenamiento
- Colores en formato hexadecimal

### cards.json
- 50+ tarjetas
- Referencia a list por `list_title`
- Referencia a creator por `creator_username`
- Referencia a assignees y watchers por array de usernames
- Estados: open, in_progress, blocked, completed, archived
- Prioridades: low, medium, high, urgent
- Subtareas con completitud y asignación

### files.json
- 50+ archivos
- Referencia a uploadedBy por `uploadedBy_username`
- Tipo de recurso: card, board, user, other
- Referencias a recursos relacionados

## Uso

Para poblar la base de datos, necesitas crear un script que:

1. Lea los archivos JSON
2. Procese las referencias por nombre y conviértalas en ObjectIds
3. Hash las contraseñas
4. Inserte los documentos en la base de datos

Ejemplo de estructura esperada:

```javascript
// users.json -> insertar directamente (excepto contraseñas hasheadas)
// workspaces.json -> mapear owner_username -> owner (ObjectId)
// boards.json -> mapear workspace_name -> workspace (ObjectId), owner_username -> owner (ObjectId)
// lists.json -> mapear board_title -> board (ObjectId)
// cards.json -> mapear list_title -> list (ObjectId), creator_username -> creator (ObjectId)
// files.json -> mapear uploadedBy_username -> uploadedBy (ObjectId)
```

## Características Representadas

### Users (50)
- Perfiles completos con información personal
- Estados activos e inactivos (5 inactivos)

### Workspaces (50)
- Múltiples espacios de trabajo por usuario
- Mix de roles (admin, member)
- Configuraciones personalizadas

### Boards (50)
- Tableros públicos y privados
- Tableros archivados
- Múltiples miembros con diferentes roles

### Lists (50+)
- Múltiples listas por tablero
- Diferentes colores

### Cards (50+)
- Múltiples estados (open, in_progress, blocked, completed, archived)
- Múltiples prioridades
- Asignatarios y observadores
- Subtareas con completitud variable
- Labels/etiquetas

### Files (50+)
- Múltiples tipos de recursos (card, board, user, other)
- Diferentes tipos de archivo (pdf, json, xlsx, etc.)
- Relaciones con usuarios y recursos

## Notas

- Los emails y usernames son únicos
- Las contraseñas en los JSONs son placeholders y deben ser hasheadas
- Los datos están estructurados para representar casos de uso reales
