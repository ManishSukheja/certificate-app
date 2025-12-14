# Certificate Generation and Email Delivery System

## 📌 Overview

This project is a **Node.js backend service** that generates certificates dynamically based on user and business details, produces them in **JPG and PDF formats**, and delivers them via **email using SMTP**.

The system is designed with clean architecture, logging, configurability via environment variables, and extensibility in mind. It also includes several **enhancements** such as logging, file storage, multiple certificate themes, and retrieval APIs.

---

## 🚀 Features

### Core Features

* REST API to accept user & business details
* Dynamic certificate generation

  * JPG format
  * PDF format
* Automated email delivery with attachments
* SMTP-based email sending (Mailtrap supported)
* Input validation and error handling
* Environment-based configuration using `.env`

### Enhancements

* Winston-based logging (console + file)
* Local storage of generated certificates
* Unique certificate ID generation
* GET APIs to list and download certificates
* Multiple certificate themes (classic, modern)
* Professional certificate layout with digital signature

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **Nodemailer** (SMTP email)
* **Jimp** (image generation)
* **PDFKit** (PDF generation)
* **Winston** (logging)

---

## 📂 Project Structure

```
certificate-app/
│
├─ src/
│  ├─ app.js
│  ├─ routes/
│  │  └─ certificates.js
│  ├─ services/
│  │  ├─ certificateService.js
│  │  └─ emailService.js
│  ├─ config/
│  │  ├─ emailConfig.js
│  │  └─ logger.js
│
├─ certificates/        # Generated certificates (ignored in Git)
├─ logs/                # Application logs (ignored in Git)
├─ .env                 # Environment variables (ignored in Git)
├─ .gitignore
├─ package.json
└─ README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=3000

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password

FROM_EMAIL=no-reply@certificate-app.com
```
---

## ▶️ Running the Project Locally

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the server

```
node src/app.js
```

You should see:

```
Server running on port 3000
```

---

## 📮 API Documentation

### POST /api/certificates

Generates a certificate and emails it to the user.

**Request Body (JSON):**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "gstNumber": "27ABCDE1234F1Z5",
  "businessName": "Test Traders",
  "businessAddress": "Mumbai, India",
  "theme": "classic"
}
```

**Response (Success):**

```json
{
  "status": "success",
  "message": "Certificate generated and emailed successfully",
  "certificateId": "1736845539212"
}
```

---

### GET /api/certificates

Returns a list of generated certificates.

**Response:**

```json
{
  "certificates": [
    {
      "file": "1736845539212.pdf",
      "url": "/api/certificates/1736845539212.pdf"
    }
  ]
}
```

---

### GET /api/certificates/:filename

Downloads a specific certificate file (PDF or JPG).

---

## 🎨 Certificate Themes

The system supports multiple certificate layouts.

* **classic** (default)

  * White background
  * Formal layout
* **modern**

  * Light grey background
  * Accent border

Themes can be extended easily by updating the certificate service.

---

## 🧪 Testing

* Use **Postman** to test API endpoints
* Use **Mailtrap Inbox** to verify email delivery and attachments

---

## 🚀 Deployment

This application is deployed on platforms like **Render**.

---

## 👤 Author

**Manish Sukheja**

---
