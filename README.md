# 🏕️ FCI Rover Certificate Verification System

A modern MERN Stack based certificate verification system developed for **Feni Government Computer Institute Rover Scout Group**. The system allows the public to verify training certificates using a unique certificate ID, while administrators can securely manage certificate records.

## 🌐 Live Demo

- **Live Link:** https://fci-rover-verification.vercel.app

## 📌 Features

### 🌍 Public Verification
- Verify certificates using a unique Certificate ID
- Instant verification result
- Displays certificate details if found
- Shows error message for invalid certificate IDs

### 🔐 Admin Panel
- Admin login
- View all certificates
- Add new certificates
- Logout functionality

### 📄 Certificate Information
- Certificate ID
- Full Name
- Training Name
- Issue Date
- Status (Valid / Revoked)

---

## 🖥️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
rover-certificate-verification/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/meheraz1100/FCI-ROVER-Certificate-Verification-System.git
```

```bash
cd fci-rover-certificate-verification
```

---

## 🚀 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

Run the server

```bash
npm run dev
```

---

## 🚀 Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

---

## 📌 API Endpoints

### Get All Certificates

```
GET /api/certificates
```

### Verify Certificate

```
GET /api/certificates/:certificateId
```

Example

```
GET /api/certificates/FCIRSG-42-001
```

### Create Certificate

```
POST /api/certificates
```

### Delete Certificate

```
DELETE /api/certificates/:id
```

---

## 📸 Screenshots

### Certificate Verification

https://github.com/user-attachments/assets/3ffaa8b3-91f7-4675-a6cf-fe4f056298ce

### Admin Panel

https://github.com/user-attachments/assets/9cddce19-b2ce-4f57-b1a9-3229eb2224d7

---

## 🔒 Certificate ID Format

Every certificate uses a unique format.

```
FCIRSG-42-001
FCIRSG-42-002
FCIRSG-42-003
...
```

---

## 🎯 Future Improvements

- Edit Certificate
- Delete Confirmation Modal
- Search & Filter
- Auto-generated Certificate ID
- Admin Authentication with JWT
- Certificate QR Code Verification
- Export Certificate Data
- Dashboard Statistics

---

## 👨‍💻 Developer

**Mosaiyeb Meheraz**

- GitHub: https://github.com/meheraz1100
- LinkedIn: https://linkedin.com/in/dev-mosaiyebmeheraz

---

## 🏕️ Organization

Developed for

**Feni Government Computer Institute Rover Scout Group**

---

## 📜 License

This project is developed for educational and organizational use by **Feni Government Computer Institute Rover Scout Group**.