# NFT Ijazah Dashboard

A Next.js-based frontend application for managing, issuing, and verifying educational certificates as NFTs on the blockchain. This application enables universities to issue verifiable academic certificates as NFTs, and allows students and companies to view and verify these certificates.

## Features

- **Wallet Authentication**: Secure login via blockchain wallets using RainbowKit and Wagmi
- **Role-Based Access Control**: Different interfaces for universities, students, and companies
- **University Onboarding**: Verification process to whitelist authorized institutions
- **Certificate Management**: Issue, view, and verify academic certificates as NFTs
- **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Blockchain Integration**: wagmi, viem, @rainbow-me/rainbowkit
- **State Management**: React Context API, React Query
- **UI Components**: Tailwind CSS, lucide-react
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 16.8+ and npm/yarn
- A WalletConnect Project ID (for wallet integration)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```

### Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Application Flow

1. **Start Page**: Landing page with options to login or sign-up
2. **Authentication**: Connect wallet for login or registration
3. **Address Verification**: Check if the connected wallet is registered
4. **Onboarding**: 
   - Universities: Upload verification letter and connect campus wallet
   - Students/Companies: Complete profile and connect wallet
5. **Dashboard**: Role-specific interface
   - Universities can issue new certificates
   - All users can view and verify certificates

## Project Structure

```
src/
├── app/
│   ├── auth/               # Authentication related pages
│   │   ├── login/          # Wallet login
│   │   ├── check-address/  # Address verification
│   │   └── sign-up/        # User registration 
│   ├── dashboard/          # Main application after login
│   │   └── certificate/    # Certificate viewing and creation
│   ├── onboarding/        # Role-specific onboarding flows
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── providers.tsx      # Global providers wrapper
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Start/landing page
└── public/                # Static assets
```

## Development Notes

- Blockchain interactions are currently mocked but designed to be replaced with real implementations
- Address verification uses simulated API calls that can be replaced with actual backend endpoints
- User authentication state is persisted in localStorage

## Deployment

The application can be deployed to Vercel or any other platform that supports Next.js:

```bash
# Build for production
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```
