# Realtime Task Board (Trello Clone)

A collaborative Trello-style board where multiple users can create, edit, delete, and move cards between columns, with real-time synchronization via WebSockets.


## 🚀 Features

-  Real-time updates via **Socket.io**
-  Drag & drop **cards between columns**
-  Add, Edit, Delete cards
-  Optimistic UI updates with rollback on failure
-  File-based persistent storage (`board.json`)
-  Clean and responsive **Tailwind CSS v4** design


## Tech Stack


- [Next.js 15.3.4 (App Router)](https://nextjs.org/) — framework for SSR and routing
- [React 19](https://react.dev/) — UI library
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS styling
- [Socket.IO](https://socket.io/) — real-time bidirectional communication
- [react-beautiful-dnd (v13.1.1)](https://github.com/atlassian/react-beautiful-dnd) — drag-and-drop functionality


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/IramBashir/realtime-task-board.git
cd realtime-task-board
```
### 2. Install dependencies

npm install


### 3. Create the data folder and a sample board.json file:
On macOS/Linux:
mkdir -p data && cat > data/board.json <<EOL
{
  "columns": [
    {
      "id": "todo",
      "title": "To Do",
      "cards": [
        { "id": "1", "text": "Set up project" },
        { "id": "2", "text": "Add socket connection" }
      ]
    },
    {
      "id": "in-progress",
      "title": "In Progress",
      "cards": [
        { "id": "3", "text": "Design column layout" }
      ]
    },
    {
      "id": "done",
      "title": "Done",
      "cards": [
        { "id": "4", "text": "Install dependencies" }
      ]
    }
  ]
}
EOL
On Windows (PowerShell):
mkdir data
@'
{
  "columns": [
    {
      "id": "todo",
      "title": "To Do",
      "cards": [
        { "id": "1", "text": "Set up project" },
        { "id": "2", "text": "Add socket connection" }
      ]
    },
    {
      "id": "in-progress",
      "title": "In Progress",
      "cards": [
        { "id": "3", "text": "Design column layout" }
      ]
    },
    {
      "id": "done",
      "title": "Done",
      "cards": [
        { "id": "4", "text": "Install dependencies" }
      ]
    }
  ]
}
'@ | Out-File -Encoding UTF8 -FilePath data/board.json



### 4. Start the dev server

npm run dev

Open http://localhost:3000 in two browser tabs to test real-time sync.


## Architecture

- Uses Socket.IO via a custom Next.js API route for real-time communication
- Board state is stored in data/board.json using the Node fs module
- SocketWrapper is dynamically imported to avoid SSR/DOM hydration issues
- Global board state is managed via React Context
- UI is updated optimistically and rolled back if socket sync fails