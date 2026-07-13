# 🏨 Hostel Management System

A full-stack Hostel Management System built using React.js, Spring Boot, MySQL, and JWT Authentication. This project helps manage hostel operations efficiently by providing separate dashboards for Admin and Students, including room allocation, student management, and complaint handling.

---

## 🚀 Features

### 👨‍💼 Admin Features
✔️ Secure Admin Login  
✔️ Manage Student Records  
✔️ Add / Update / Delete Students  
✔️ Manage Hostel Rooms  
✔️ Allocate Rooms to Students  
✔️ View Student Information  
✔️ Monitor Complaints  

### 🎓 Student Features
✔️ Secure Student Login  
✔️ View Profile Information  
✔️ View Allocated Room Details  
✔️ Raise Complaints  
✔️ Track Complaint Status  
✔️ Responsive Dashboard  

### 🔒 Security
✔️ JWT-Based Authentication  
✔️ Role-Based Access Control (Admin / Student)  
✔️ Protected API Endpoints  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT Authentication
- REST APIs

### Database
- MySQL

---

## 📂 Project Structure

text hostel ├── hostel-ui └── hostel-backend 

---

## ⚙️ Frontend Setup

### Navigate to frontend

bash cd hostel-ui 

### Install dependencies

bash npm install 

### Run frontend

bash npm run dev 

Frontend runs on:

text http://localhost:5173 

---

## ⚙️ Backend Setup

### Navigate to backend

bash cd hostel-backend 

### Configure MySQL

Update application.properties:

properties spring.datasource.url=jdbc:mysql://localhost:3306/hostel_management spring.datasource.username=root spring.datasource.password=your_password  spring.jpa.hibernate.ddl-auto=update spring.jpa.show-sql=true  server.port=8081 

### Run Spring Boot Application

bash ./mvnw spring-boot:run 

or

bash mvn spring-boot:run 

Backend runs on:

text http://localhost:8081 

---

## 🔗 REST API Features

### Authentication
- Login
- JWT Token Generation

### Student Management
- Get All Students
- Add Student
- Update Student
- Delete Student

### Room Management
- Create Room
- Update Room
- Assign Room
- View Room Details

### Complaint Management
- Raise Complaint
- View Complaints
- Update Complaint Status

---

## 📸 Screenshots

### Admin Dashboard
<img width="1434" height="815" alt="Screenshot 2026-06-04 at 10 01 44 AM" src="https://github.com/user-attachments/assets/099bf83b-b9fb-4011-95cf-f2dd32ee154d" />


### Student Dashboard
<img width="1435" height="802" alt="Screenshot 2026-06-04 at 10 04 00 AM" src="https://github.com/user-attachments/assets/809c17d3-e238-408b-86d3-f089bf009ef0" />


### Room Management
<img width="1440" height="777" alt="Screenshot 2026-06-04 at 10 05 19 AM" src="https://github.com/user-attachments/assets/631a7164-1ade-411f-ba45-c5909ee489c9" />


### Complaint Management
<img width="1432" height="712" alt="Screenshot 2026-06-04 at 10 05 46 AM" src="https://github.com/user-attachments/assets/fb8f5dbf-ca09-4e15-9839-737e93856388" />


---

## 🎯 Future Enhancements

- Email Notifications
- Fee Management Module
- Attendance Tracking
- Hostel Analytics Dashboard
- Online Leave Request System
