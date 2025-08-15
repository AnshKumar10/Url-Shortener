SnipURL is a modern, feature-rich URL shortener built for performance and usability. It enables users to quickly shorten links, analyze engagement, and manage branded URLs. With a sleek ShadCN UI interface and Supabase-powered backend, it offers a polished and scalable experience.

## Tech Stack
- React 18
- Tailwind CSS + ShadCN UI
- Vite
- Supabase (Auth, Database, API)
- Vercel Analytics
- UA-Parser-JS
- TypeScript
- Formik + Yup
- ESLint + Types
- Recharts

## Key Features
- **Instant URL Shortening** — Paste a link and get a clean, trackable short URL instantly.
- **Analytics Dashboard** — View total clicks, device types, and user geolocation.
- **User Accounts & History** — Registered users can view link history, track analytics, and manage links.

## Challenges & Solutions

### 1. Real-Time Analytics Without Performance Lag
**Challenge:**  
Implementing live tracking for clicks, devices, and geolocation while ensuring the app remained fast and responsive.  

**Solution:**  
Leveraged **Supabase** for optimized queries and live data sync, combined with **UA-Parser-JS** for efficient device detection. This minimized payload sizes and ensured analytics updated instantly without affecting UI performance.

---

### 2. Consistent & Scalable UI Design
**Challenge:**  
Maintaining a cohesive look and feel across multiple components while allowing for future scalability.  

**Solution:**  
Adopted **ShadCN UI** with **Tailwind CSS** utility classes to build reusable, theme-consistent components. This approach streamlined development and ensured visual consistency.

---

### 3. Reliable Link Management
**Challenge:**  
Providing users with the ability to view, edit, and delete links without risking data conflicts.  

**Solution:**  
Implemented structured database relationships in **Supabase** with validation via **Formik + Yup**, ensuring data integrity and a smooth user experience.


## What I Learned
- Integrating Supabase for authentication, database, and API handling.
- Building a scalable analytics dashboard with real-time data.

## Screenshots
  ![image](https://github.com/user-attachments/assets/ae2acc0b-2d31-423a-8fc6-1381cdd2a0cf)  
  ![image](https://github.com/user-attachments/assets/0ae03ae9-ef2d-4a6c-a7e2-5aad5bb88c46)  
  ![image](https://github.com/user-attachments/assets/8102a519-7d91-47f7-a4f0-38f776b2fe3a)

