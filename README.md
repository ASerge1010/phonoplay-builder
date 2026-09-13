# PhonoPlay

PhonoPlay is a full-stack phoneme-based classroom activity builder developed for Speech Pathology teachers and students.

The application allows teachers to create, save and manage phoneme-based Wordle and Word Search activities using a database-driven workflow. Activity data can be stored, retrieved, updated and deleted through backend API routes, and saved data can be used to generate standalone HTML classroom activities.

## Features

- Phoneme-based Wordle activity builder
- Phoneme-based Word Search activity builder
- Save multiple activity configurations
- Store phoneme-based words and hints
- Difficulty settings for activities
- Create, read, update and delete activity data
- Create, read, update and delete word data
- Backend validation and error handling
- Database-driven activity generation
- Downloadable standalone HTML output
- Health API endpoint
- Docker support
- Responsive navigation and interface
- Light and dark theme support

## Technology

- Next.js
- React
- TypeScript
- CSS
- Prisma ORM
- SQLite
- REST-style API routes
- Docker
- Git and GitHub

## Database

PhonoPlay uses Prisma with SQLite for data persistence.

The main database models are:

### Activity

Stores activity-level information including:

- Activity name
- Activity type
- Difficulty
- Description
- Instructions
- Grid size
- Maximum attempts
- Hint settings
- Creation and update dates

Activity types include:

- Wordle
- Word Search

### Word

Stores the words linked to an activity, including:

- Word
- Phoneme representation
- Hint
- Associated activity
- Creation and update dates

Phoneme values are stored as strings so multi-character phoneme symbols can be supported.

## API Routes

### Activities

- `GET /api/activities` - retrieve saved activities
- `POST /api/activities` - create an activity
- `PUT /api/activities/[id]` - update an activity
- `DELETE /api/activities/[id]` - delete an activity

### Words

- `GET /api/words` - retrieve saved words
- `POST /api/words` - create a word
- `PUT /api/words/[id]` - update a word
- `DELETE /api/words/[id]` - delete a word

### Health Check

- `GET /health`

Example response:

```json
{
  "status": "ok",
  "service": "PhonoPlay API"
}