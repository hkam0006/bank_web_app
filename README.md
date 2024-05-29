# Banking App with Finance Management Dashboard
This project is a comprehensive banking application featuring a finance management dashboard. It allows users to connect multiple bank accounts, view real-time transactions, and transfer money to other users securely.
## Features
- **Real-Time Transactions:** Fetch and display real-time transaction data from multiple bank accounts.
- **Money Transfers:** Securely transfer money to other users on the platform.
- **Responsive UI:** User-friendly and responsive interface using Tailwind CSS and shadcn-ui.
- **Error Tracking:** Monitor and track errors using Sentry.
## Technologies Used
- **Frontend:** Next.js 14 with TypeScript, Tailwind CSS, shadcn-ui
- **Backend:** Appwrite for database management
- **APIs:** Plaid for transaction data, Dwolla for money transfers
- **Error Tracking:** Sentry
- **Deployment:** Vercel
## Getting Started
### Prerequisites
- Node.js
- Appwrite instance
- Plaid and Dwolla accounts
### Installation
1. Clone the repository:
```sh
git clone https://github.com/hkam0006/bank_web_app.git
cd bank_web_app
```
2. Set up environment variables. 
	Create a `.env` file in the root directory and add your Plaid, Dwolla and Appwrite credentials. A template of environment variables can be found at `.env.example`.
3. Run the development server
```sh
npm run dev
```
4. Open http://localhost:3000 to view it in the browser.

