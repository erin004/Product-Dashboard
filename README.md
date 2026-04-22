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
1. Clone Project<br>
   git clone <your-repo-url><br>
   cd product-dashboard<br>
2. Backend Setup<br>
   cd backend<br>
   npm install<br>
   node app.js<br>
4. Database Setup (MySQL)<br>
   CREATE DATABASE product_dashboard;<br>
   USE product_dashboard;<br>
   CREATE TABLE products (<br>
      id INT AUTO_INCREMENT PRIMARY KEY,<br>
      title VARCHAR(255),<br>
      price FLOAT,<br>
      rating FLOAT<br>
    );<br>
5. Frontend Setup<br>
   cd frontend<br>
   npm create vite@latest<br>
<br>
🔗 API Endpoints<br>
GET	/fetch	<br>
GET	/products	<br>
GET	/product/:id	<br>
PUT	/product/:id	<br>
GET	/stats<br>
<br>
<img width="2528" height="1181" alt="image" src="https://github.com/user-attachments/assets/a19d0612-86d2-4b52-88d6-7b9a7b04d877" />
