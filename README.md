# ASU Anesthesia E-Portfolio Platform

A full-stack **Anesthesia Residency E-Portfolio System** developed for  
**Ain Shams University – Faculty of Medicine**.

The platform provides a centralized system for anesthesia residents and supervisors to manage academic portfolios, clinical activities, evaluations, and reports through **web and mobile applications** powered by a **Laravel RESTful API**.

🔗 **Live Web Application:**  
https://asu-anesthesia-e-portfolio-platform.vercel.app/SignIn

---

## 📌 System Architecture Overview

The platform follows a **multi-client architecture**:

- **Backend:** Laravel RESTful API  
- **Web Frontend:** Next.js (React)  
- **Mobile App:** Flutter  
- **Database:** MySQL  

All clients communicate securely with the backend via REST APIs.

---

## 🧠 My Role

Sole backend developer responsible for system architecture and API design

Designed and implemented secure Laravel RESTful APIs

Built and optimized relational database schemas using Eloquent ORM

Implemented authentication, authorization, and core business logic

Integrated backend services with Next.js web frontend and Flutter mobile application

Applied clean architecture principles and Laravel best practices

---

## 🧩 Project Modules

### 🔹 Backend (Laravel API)
- Central business logic and data processing  
- Authentication and role-based access control (RBAC)  
- Portfolio, activities, evaluations, and reporting APIs  
- Secure and scalable RESTful architecture  

📁 **Location:** `/Backend`

---

### 🔹 Web Frontend (Next.js)
- Web dashboard for residents and supervisors  
- Secure login and protected routes  
- Portfolio visualization and management  
- Responsive UI for academic use  

📁 **Location:** `/Frontend`

---

### 🔹 Mobile Application (Flutter)
- Mobile access for residents  
- Consumes the same Laravel REST APIs  
- Optimized for usability and performance on mobile devices  

📁 **Location:** `/Mobile`

---

## 🛠️ Tech Stack

### Backend
- PHP 8+
- Laravel
- MySQL
- RESTful APIs
- Eloquent ORM

### Web Frontend
- Next.js
- React
- TypeScript
- REST API integration

### Mobile
- Flutter
- Dart
- REST API integration

### Deployment
- Backend: Local / Server-hosted
- Frontend: Vercel

---

## ✨ Key Features

- Secure authentication and authorization  
- Role-based access (Residents / Supervisors)  
- Academic portfolio management  
- Clinical activity tracking  
- Supervisor evaluations and reviews  
- Centralized reporting system  
- Multi-platform access (Web & Mobile)  

---

## 🚀 Local Development Setup

### 1️⃣ Backend (Laravel)
```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
---

## 📄 License

This project was developed for educational and institutional use at
Ain Shams University – Faculty of Medicine.

---

## 👨‍💻 Author

Youssef Hamdy
PHP Laravel Backend Developer

GitHub: https://github.com/youssefhamdy7dev

LinkedIn: https://www.linkedin.com/in/youssef-hamdy-a498b2366
