# Comandos Principales de Git

## 📋 Comandos Más Utilizados

### 🔍 Ver Estado
```bash
git status                          # Ver estado actual del repositorio
git branch -a                       # Ver todas las ramas (locales y remotas)
git branch -r                       # Ver solo ramas remotas
git log --oneline -10               # Ver últimos 10 commits
git log --oneline main..development # Ver commits que no están en development
```

### 📝 Cambios y Commits
```bash
git add .                           # Añadir todos los cambios al staging
git add <archivo>                   # Añadir archivo específico
git commit -m "mensaje"             # Crear commit con mensaje
git push                            # Enviar commits a la rama actual
git push origin <rama>              # Enviar a rama específica
git pull                            # Traer cambios de la rama actual
git fetch                           # Descargar cambios sin aplicarlos
```

### 🌿 Trabajo con Ramas
```bash
git branch <rama>                   # Crear rama local
git checkout <rama>                 # Cambiar a rama
git checkout -b <rama>              # Crear y cambiar a nueva rama
git branch -d <rama>                # Eliminar rama local
git branch -D <rama>                # Forzar eliminación de rama local
git push origin <rama>              # Enviar rama a remoto
git push origin :<rama>             # Eliminar rama remota
git push origin main:development    # Empujar main a development
```

### 🔄 Sincronizar Ramas
```bash
git fetch origin                    # Descargar referencias remotas
git remote prune origin             # Limpiar referencias de ramas eliminadas
git pull origin <rama>              # Traer cambios de rama remota
git merge <rama>                    # Fusionar rama en la actual
```

### 🏷️ Tags y Versiones
```bash
git tag <nombre>                    # Crear tag local
git tag -d <nombre>                 # Eliminar tag local
git push origin <nombre>            # Enviar tag a remoto
git push origin --tags              # Enviar todos los tags
```

### ⚙️ Configuración
```bash
git config --list                   # Ver todas las configuraciones
git config --global user.name "nombre"
git config --global user.email "email@example.com"
```

### 🧹 Limpiar Repositorio
```bash
git clean -fd                       # Eliminar archivos no rastreados
git reset --hard HEAD               # Descartar todos los cambios
git reset --soft HEAD~1             # Deshacer último commit sin perder cambios
git revert <commit>                 # Crear nuevo commit revertiendo otro
```

## 🎯 Flujos de Trabajo Comunes

### Crear y enviar una nueva rama
```bash
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: descripción"
git push origin feature/nueva-funcionalidad
```

### Sincronizar con main antes de hacer cambios
```bash
git fetch origin
git pull origin main
```

### Actualizar una rama con cambios de main
```bash
git fetch origin
git merge origin/main
# o hacer rebase (más limpio)
git rebase origin/main
```

### Sincronizar dos ramas (como main y development)
```bash
git push origin main:development
```

### Ver diferencias
```bash
git diff                            # Cambios no committeados
git diff --staged                   # Cambios en staging
git diff main..development          # Diferencia entre ramas
git diff <commit1> <commit2>        # Diferencia entre commits
```

## 💡 Tips Útiles

### Alias útiles (opcional)
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline -10"
```

Uso: `git st`, `git co main`, `git cm "mensaje"`, etc.

### Deshacer cambios
```bash
git checkout -- <archivo>          # Deshacer cambios en archivo
git restore <archivo>              # Alternativa moderna
git restore --staged <archivo>     # Quitar del staging
```

### Información de commits
```bash
git show <commit>                  # Ver detalles de un commit
git blame <archivo>                # Ver quién cambió cada línea
git log --author="nombre"          # Commits de un autor específico
```
