#  Random Quote Generator | Internship Assignment (Nexium)

This project is a **Random Quote Generator Web App** built as part of the Nexium internship assignment using  **ShadCN UI**, and **Next.js (+its  App Router)**,**Tailwind CSS**... The project fetches quotes by topic and displays a **"Quote of the Day"** feature with a polished user interface.

##  Live Demo

Hosted on **Vercel**:  
 [nexium-farhan-asign1.vercel.app](https://nexium-farhan-asign1-esb9d0y15-farhan-ahmeds-projects-fe312249.vercel.app)

---

##  Features Implemented

### 1.  Quote Generator Page
- Displays a curated list of motivational/inspirational quotes.
- Allows filtering quotes by topic using a search field.
- If no matching topic is found, shows:  
  _“Please Enter quotes from suggested topics only!”_

### 2. Quote of the Day Page
- Displays a single quote based on the current date.
- Each day shows a different quote deterministically.
- Includes:
  - White quote card
  - Author name
  - Back to Home button
- Full background of the page set to **black** with only the card in **white** for contrast and focus.

### 3.  UI Design
- Tailwind CSS used for clean, responsive design.
- ShadCN UI components like `Card` and `Separator` used for consistent styling.
- Google Fonts integrated for typography.
- Custom hover effects and gradient buttons implemented.

### 4.  Topics Data
- Quotes are stored as objects with `text`, `topic`, and `author`.
- Topic-wise filtering implemented using `.filter()` and `toLowerCase()` matching logic.

### 5.  Project Structure
- Created with `create-next-app` using **App Router**.
- Tailwind CSS configured properly in `tailwind.config.js`.
- Components organized under `/components/ui/` and `/app/` folders.
- Pages:
  - `/` → Main Quotes page
  - `/quote-of-day` → Daily quote

### 6.  Deployment
- Project is deployed on **Vercel** successfully.
- Public URL:  
  [https://nexium-farhan-asign1.vercel.app](https://nexium-farhan-asign1.vercel.app/)

---

##  How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/nexium-farhan-asign1.git
cd nexium-farhan-asign1

# 2. Install dependencies

npm install
cd internship
# 3. Start the development server
npm run dev

# 4. Visit in browser
http://localhost:3000
