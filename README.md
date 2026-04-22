🌐 Product Dashboard App

Product Dashboard App adalah aplikasi web fullstack yang menampilkan data produk dalam bentuk tabel interaktif dan visualisasi chart. Aplikasi ini mengintegrasikan data dari API eksternal, menyimpannya ke database, dan menyajikannya dalam dashboard yang mudah dipahami.

✨ Key Features
- Dashboard visualization (charts & stats)
- Product data management (view & update)
- Sync data dari API eksternal
- Statistik produk (average & max price)
- Error handling & fallback UI
- Modular & reusable component structure

💻 Tech Stack

Frontend
- React.js 
- Tailwind CSS 
- Recharts
  
Backend
- Node.js & Express.js 
- MySQL 
- Axios
  
Deployment
- Vercel
- Railway

⚙️ Getting Started
1. Clone Project
   git clone <your-repo-url>
   cd product-dashboard
2. Backend Setup
   cd backend
   npm install
   node app.js
3. Database Setup (MySQL)
   CREATE DATABASE product_dashboard;
   USE product_dashboard;
   CREATE TABLE products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      price FLOAT,
      rating FLOAT
    );
4. Frontend Setup
   cd frontend
   npm create vite@latest

🔗 API Endpoints
GET	/fetch	
GET	/products	
GET	/product/:id	
PUT	/product/:id	
GET	/stats

<img width="2528" height="1181" alt="image" src="https://github.com/user-attachments/assets/a19d0612-86d2-4b52-88d6-7b9a7b04d877" />
