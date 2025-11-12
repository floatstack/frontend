# FloatStack

Agent Liquidity, Compliance & Risk Intelligence Platform for Banks and Financial Institutions.

## About

FloatStack is a comprehensive B2B SaaS platform designed to help banks, super agents, and MFBs manage their POS agent networks with real-time visibility across agent onboarding, risk scoring, liquidity monitoring, and regulatory compliance.

## Features

- **Agent Onboarding & KYC**: Automated BVN/NIN verification and document collection
- **Risk Scoring Engine**: Credit bureau integration and CBN watchlist screening
- **Real-time Liquidity Monitor**: Track agent float levels and prevent transaction failures
- **Predictive Analytics**: Forecast regional liquidity needs and optimize treasury operations
- **ATM Network Management**: Monitor float centers and regional performance
- **Compliance & Reporting**: Automated CBN reporting and audit trail management

## Technologies Used

This project is built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui components
- Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd floatstack
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```sh
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Application pages/routes
├── lib/             # Utility functions
└── hooks/           # Custom React hooks
```

## Available Routes

- `/login` - Authentication page
- `/` - Main dashboard with overview metrics
- `/agents` - Agent management and monitoring
- `/liquidity` - Real-time liquidity tracking
- `/atm` - ATM performance and regional analytics
- `/compliance` - Compliance reporting (coming soon)

## Contributing

This is a private project. For access or contribution inquiries, please contact the development team.

## License

Proprietary - All rights reserved
