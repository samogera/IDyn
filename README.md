🛡️ IDyn – Secure Digital Identity Verification on the XRP Ledger
Live Demo: identitydynamics.vercel.app

IDyn is a decentralized, AI-powered identity verification system built on the XRP Ledger. It allows users to securely onboard with personal documents, generate blockchain-anchored identity proofs, and protect access with intelligent anomaly detection.

🚀 Key Features
🔐 Secure Onboarding
Upload identity documents or selfies. Generate SHA-256 hashes of identity data and anchor proofs on the XRPL.

🧾 Decentralized Identity Verification
Verify identities using XRP wallet addresses or unique tokens. Match records against XRPL-stored hashes.

🧠 AI Behavior Monitoring
Uses anomaly detection models (e.g., Isolation Forest) to analyze user IP, device, and geolocation during login to flag suspicious behavior.

🌐 Wallet Integration (Xumm)
Login and sign verification requests directly using the Xumm wallet for XRPL interaction.

📊 Admin/Verifier Portal
Role-based access to verify users, export logs, and track identity status.

🎨 Intuitive & Responsive UI
Built with Next.js, Tailwind CSS, and modern UX principles for a smooth and accessible experience.

🧱 Tech Stack
Frontend: Next.js (App Router), Tailwind CSS

Backend: Firebase Functions (planned)

Blockchain: XRP Ledger via xrpl.js

AI Layer: Python (FastAPI microservice, planned)

Wallet: Xumm Wallet SDK

Deployment: Vercel (frontend), Firebase (backend)

📁 Project Structure
bash
Copy
Edit
src/
├── app/              # Page routes (Next.js)
├── components/       # Reusable UI components
├── lib/              # XRPL & AI utility logic (TBD)
├── styles/           # Tailwind/global styles
📦 Installation
bash
Copy
Edit
git clone https://github.com/samogera/IDyn.git
cd IDyn
npm install
npm run dev
⚠️ Ensure Node.js 18+ and access to XRPL Testnet or Devnet.

✅ Coming Soon (Roadmap)
 Live identity hash signing on XRPL

 Behavior AI model integration

 Admin portal for identity review

 Firebase Auth + Firestore integration

 Dark mode & i18n support

📄 License
MIT License © 2025 @samogera

🤝 Contributing
Have ideas, designs, or features? Pull requests welcome! Let’s build secure identity verification together.

