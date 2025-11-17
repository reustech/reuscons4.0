# Database Schemas - Trello Clone

## 1. USER (User)

```
{
  _id: ObjectId,
  username: String (unique, required, lowercase, indexed),
  password: String (hashed, required, select: false),
  profile: {
    firstName: String (required),
    lastName: String (optional),
    email: String (unique, required, indexed),
    address: String (optional),
    city: String (optional),
    country: String (optional),
    zipCode: String (optional),
    phone: String (optional),
    mobile: String (optional),
    company: String (optional),
    position: String (optional),
    website: String (URL, optional)
  },
  active: Boolean (default: true),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Indexes:**
- username (1)
- email (1)

**Relations:**
- Owner of Workspaces
- Member of Workspaces
- Owner of Boards
- Member of Boards
- Creator of Cards
- Assigned to Cards
- Watching Cards
- Uploader of Files

---

## 2. WORKSPACE (Workspace)

```
{
  _id: ObjectId,
  name: String (required),
  description: String (optional),
  owner: ObjectId (ref: User, required),
  members: [
    {
      userId: ObjectId (ref: User),
      role: String (enum: ['admin', 'member'], default: 'member'),
      addedAt: Date (default: Date.now)
    }
  ],
  boards: [ObjectId] (ref: Board),
  config: {
    color: String (default: '#0079BF'),
    icon: String (optional)
  },
  active: Boolean (default: true),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Indexes:**
- owner (1)
- members.userId (1)
- boards (1)

**Relations:**
- owner → User (1:1)
- members[] → User (1:N)
- boards[] → Board (1:N)

**Hierarchy:**
```
Workspace
  ├── Owner: User
  ├── Members: [User]
  └── Boards: [Board]
```

---

## 3. BOARD (Board)

```
{
  _id: ObjectId,
  title: String (required),
  description: String (optional),
  workspace: ObjectId (ref: Workspace, required),
  owner: ObjectId (ref: User, required),
  members: [
    {
      userId: ObjectId (ref: User),
      role: String (enum: ['admin', 'editor', 'viewer'], default: 'editor'),
      addedAt: Date (default: Date.now)
    }
  ],
  config: {
    background: String (default: '#0079BF'),
    icon: String (optional)
  },
  public: Boolean (default: false),
  archived: Boolean (default: false),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Indexes:**
- workspace (1)
- owner (1)
- members.userId (1)

**Relations:**
- workspace → Workspace (N:1)
- owner → User (1:1)
- members[] → User (1:N)
- lists[] → List (1:N, not stored here)

**Hierarchy:**
```
Board
  ├── Workspace: Workspace
  ├── Owner: User
  ├── Members: [User]
  └── Lists: [List] (inverse relation)
```

---

## 4. LIST (List)

```
{
  _id: ObjectId,
  title: String (required),
  board: ObjectId (ref: Board, required),
  position: Number (default: 0),
  config: {
    color: String (default: '#0079BF')
  },
  archived: Boolean (default: false),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Indexes:**
- board (1)
- position (1)

**Relations:**
- board → Board (N:1)
- cards[] → Card (1:N, not stored here)

**Hierarchy:**
```
List
  ├── Board: Board
  └── Cards: [Card] (inverse relation)
```

---

## 5. CARD (Card)

```
{
  _id: ObjectId,
  title: String (required),
  description: String (optional),
  list: ObjectId (ref: List, required),
  creator: ObjectId (ref: User, required),
  assignees: [ObjectId] (ref: User, optional),
  watchers: [ObjectId] (ref: User, optional),
  labels: [
    {
      name: String,
      color: String
    }
  ],
  status: String (enum: ['open', 'in_progress', 'blocked', 'completed', 'archived'], default: 'open'),
  priority: String (enum: ['low', 'medium', 'high', 'urgent'], default: 'medium'),
  startDate: Date (optional),
  position: Number (default: 0),
  files: [ObjectId] (ref: File),
  subtasks: [
    {
      title: String (required),
      description: String (optional),
      completed: Boolean (default: false),
      order: Number (default: 0),
      assigned: ObjectId (ref: User),
      priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
      dueDate: Date (optional),
      createdAt: Date (default: Date.now),
      updatedAt: Date (default: Date.now)
    }
  ],
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Indexes:**
- list (1)
- creator (1)
- assignees (1)
- status (1)
- position (1)

**Relations:**
- list → List (N:1)
- creator → User (N:1)
- assignees[] → User (1:N)
- watchers[] → User (1:N)
- files[] → File (1:N)
- subtasks[].assigned → User (1:N)

**Hierarchy:**
```
Card
  ├── List: List
  ├── Creator: User
  ├── Assignees: [User]
  ├── Watchers: [User]
  ├── Labels: [{ name, color }]
  ├── Subtasks: [
  │   ├── title, description, completed
  │   └── assigned: User
  └── Files: [File]
```

---

## 6. FILE (File)

```
{
  _id: ObjectId,
  name: String (required),
  originalName: String (required),
  mimetype: String (required),
  size: Number (in bytes, required),
  path: String (local path or S3, required),
  url: String (public URL, required),
  uploadedBy: ObjectId (ref: User, required),
  resourceType: String (enum: ['card', 'board', 'user', 'other'], default: 'other'),
  resourceId: ObjectId (dynamic reference, optional),
  extension: String (e.g.: 'pdf', 'jpg', 'png'),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Indexes:**
- uploadedBy (1)
- resourceType (1)
- resourceId (1)

**Relations:**
- uploadedBy → User (N:1)
- resourceId → (Card | Board | User) (N:1, polymorphic)

**Features:**
- Polymorphism: Can be associated with Card, Board, User or other resources
- Public access via URL
- Basic metadata: name, MIME type, size, extension
- Audit: createdAt, updatedAt, uploadedBy

---

## Relationship Diagram

```
                              ┌─────────┐
                              │  USER   │
                              └────┬────┘
                                   │
                    ┌──────────────┬┴┬──────────────┐
                    │              │               │
                    ▼              ▼               ▼
            ┌──────────────┐  ┌──────────────┐  ┌──────────┐
            │  WORKSPACE   │  │    BOARD     │  │   FILE   │
            │              │  │              │  │          │
            │ - owner ────┐│  │ - workspace ◄┼──┤ - uploadedBy
            │ - members[]┐││  │ - owner      │  │ - resourceId
            │ - boards[]◄┘└┴──┤ - members[]  │  └──────────┘
            │ - config   │  │ - config      │
            │           └┼──┤ - public      │
            └────────────┘  └──────┬────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │    LIST      │
                            │              │
                            │ - board      │
                            │ - position   │
                            │ - config     │
                            └──────┬───────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │    CARD      │
                            │              │
                            │ - list       │
                            │ - creator    │
                            │ - assignees[]│
                            │ - watchers[] │
                            │ - status     │
                            │ - priority   │
                            │ - labels[]   │
                            │ - subtasks[] │
                            │ - files[]    │
                            └──────────────┘
```

---

## Relations Table

| Model | Field | Reference | Type | Description |
|-------|-------|-----------|------|------------|
| User | - | - | Base | System user |
| Workspace | owner | User | 1:N | Workspace owner |
| Workspace | members[] | User | 1:N | Workspace members |
| Workspace | boards[] | Board | 1:N | Workspace boards |
| Board | workspace | Workspace | N:1 | Workspace it belongs to |
| Board | owner | User | 1:N | Board owner |
| Board | members[] | User | 1:N | Board members |
| List | board | Board | N:1 | Board it belongs to |
| Card | list | List | N:1 | List it belongs to |
| Card | creator | User | N:1 | User who created the card |
| Card | assignees[] | User | 1:N | Assigned users |
| Card | watchers[] | User | 1:N | Users watching |
| Card | subtasks[] | - | Embedded | Embedded subtasks |
| Card | files[] | File | 1:N | Attached files |
| File | uploadedBy | User | N:1 | User who uploaded |
| File | resourceId | (Card\|Board\|User) | N:1 | Associated resource (polymorphic) |

---

## Complete Hierarchy

```
User (Root)
│
├── WORKSPACES (1:N)
│   │
│   ├── Workspace 1
│   │   ├── Owner: User
│   │   ├── Members: [User]
│   │   ├── Config: {color, icon}
│   │   │
│   │   └── BOARDS (1:N)
│   │       │
│   │       ├── Board 1
│   │       │   ├── Owner: User
│   │       │   ├── Members: [User]
│   │       │   ├── Config: {background, icon}
│   │       │   │
│   │       │   └── LISTS (1:N)
│   │       │       │
│   │       │       ├── List 1 (Ex: "TODO")
│   │       │       │   ├── Position: 0
│   │       │       │   ├── Config: {color}
│   │       │       │   │
│   │       │       │   └── CARDS (1:N)
│   │       │       │       │
│   │       │       │       ├── Card 1
│   │       │       │       │   ├── Creator: User
│   │       │       │       │   ├── Assignees: [User]
│   │       │       │       │   ├── Watchers: [User]
│   │       │       │       │   ├── Status: 'in_progress'
│   │       │       │       │   ├── Subtasks: [{title, completed, assigned}]
│   │       │       │       │   ├── Labels: [{name, color}]
│   │       │       │       │   └── Files: [File]
│   │       │       │       │
│   │       │       │       ├── Card 2
│   │       │       │       └── Card N
│   │       │       │
│   │       │       ├── List 2 (Ex: "IN PROGRESS")
│   │       │       └── List N
│   │       │
│   │       └── Board N
│   │
│   └── Workspace N
│
└── FILES (1:N)
    ├── File 1
    │   ├── uploadedBy: User
    │   ├── resourceType: 'card'
    │   ├── resourceId: Card
    │   └── extension: '.pdf'
    ├── File 2
    └── File N
```

---

## Important Notes

### Workspace Roles
- **admin**: Full control of workspace
- **member**: Access to all boards

### Board Roles
- **admin**: Can add/remove members, edit board
- **editor**: Can create/edit lists and cards
- **viewer**: Read-only access

### Card Status
- **open**: Open card
- **in_progress**: Card in progress
- **blocked**: Card is blocked
- **completed**: Card completed
- **archived**: Card archived

### Card Priority
- **low**: Low priority
- **medium**: Medium priority
- **high**: High priority
- **urgent**: Urgent priority

### Files (Polymorphic)
- Can be associated with any resource (card, board, user)
- `resourceType` field indicates the type
- `resourceId` field contains the reference

### Visual Configuration
- Workspace and Board have customizable colors and icons
- List has customizable background color
- Enables visual differentiation between workspaces

---

## Summary of Implemented Features

✅ **Column renamed to List** - Clearer naming
✅ **Scalable configuration** - Board and List with config fields
✅ **Subtasks/Checklist** - Embedded in Card with assignment and priority
✅ **Granular status** - Card with enum statuses (open, in_progress, blocked, completed, archived)
✅ **Improved audit** - Creator, startDate, automatic timestamps
✅ **Watchers** - Field for users watching without being assigned
✅ **Simplified File** - File storage with polymorphic references
✅ **Optimized indexing** - Indexes for frequent queries
✅ **Granular permissions** - RBAC system in Board and Workspace
✅ **Simplified Card** - Removed comments, activity, related cards, dueDate, completed

## Fields to Consider for Future Improvements

- [ ] Comments on Cards (application level, not in schema)
- [ ] Activity/Change history (separate audit log)
- [ ] Related cards (links between cards)
- [ ] Notifications in User (preferences)
- [ ] Full-text indexed search
- [ ] Reusable Board templates
- [ ] Sprint/Iterations for Scrum
- [ ] Automatic priority buckets
- [ ] External webhook integration
- [ ] Rate limiting and user quotas
- [ ] Emoji reactions
- [ ] @user mentions
