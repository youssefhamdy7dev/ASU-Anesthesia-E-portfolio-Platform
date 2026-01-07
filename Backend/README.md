<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="350" alt="Laravel Logo">
  </a>
</p>

# ASU Anesthesia E-Portfolio Platform – Backend

A Laravel-based backend system for managing an **Anesthesia Residency E-Portfolio** at **Ain Shams University Faculty of Medicine**.  
This platform provides a secure RESTful API used by mobile and web applications to manage residents’ profiles, activities, evaluations, and reports.

🔗 **Live Platform:**  
https://asu-anesthesia-e-portfolio-platform.vercel.app/SignIn

---

## 📌 Project Overview

The **ASU Anesthesia E-Portfolio Platform** is a combined **dashboard and e-portfolio system** designed for anesthesia residents and supervisors.  
It centralizes academic progress, clinical activities, and reporting in a structured and secure system.

I worked as the **sole backend developer**, responsible for system architecture, API development, database design, and security.

---

## 🛠️ Tech Stack

- **Backend:** PHP 8+, Laravel  
- **API:** RESTful APIs  
- **Database:** MySQL  
- **Authentication:** Secure authentication with role-based access control (RBAC)  
- **ORM:** Eloquent ORM  
- **Integrations:**  
  - Flutter mobile application  
  - React / Next.js web dashboard  

---

## ✨ Key Features

- RESTful API serving mobile and web clients  
- Secure authentication and authorization (roles & permissions)  
- Resident profiles and academic portfolios  
- Activity tracking and structured data records  
- Supervisor access and evaluation workflows  
- Reporting and data aggregation features  
- Clean architecture using MVC and service classes  

---

## 🧠 Backend Responsibilities

- Designed and implemented the complete Laravel backend system  
- Built scalable REST APIs consumed by Flutter and React applications  
- Designed relational database schema with optimized queries  
- Applied clean code principles and Laravel best practices  
- Ensured secure access control and data integrity  

---

## 🚀 Getting Started (Local Setup)

```bash
git clone https://github.com/youssefhamdy7dev/ASU-Anesthesia-E-portfolio-Platform.git
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
