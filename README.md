# Contextual Workspace 🚀

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?style=for-the-badge&logo=prisma)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24-000000?style=for-the-badge&logo=auth0)
![Stripe](https://img.shields.io/badge/Stripe-14.19-008CDD?style=for-the-badge&logo=stripe)
![React Query](https://img.shields.io/badge/React_Query-5.18-FF4154?style=for-the-badge&logo=react-query)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, full-featured workspace application built with Next.js 14, featuring authentication, payments, database integration, and real-time capabilities.

## ✨ Features

### 🎯 Core Features
- **Modern Stack**: Next.js 14 with App Router & TypeScript
- **Authentication**: Secure auth with NextAuth.js & Prisma adapter
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe integration for subscriptions & one-time payments
- **UI/UX**: Beautiful Tailwind CSS design with Lucide icons
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Real-time**: WebSocket support for live updates

### 🛠️ Technical Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma, NextAuth
- **Database**: PostgreSQL (compatible with Supabase, Neon, etc.)
- **Payments**: Stripe API with webhooks
- **Deployment**: Vercel-ready with environment configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (or compatible)
- Stripe account for payments
- GitHub OAuth app for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yksanjo/contextual-workspace.git
   cd contextual-workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/contextual_workspace"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # GitHub OAuth
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

4. **Set up database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Optional: Seed database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
contextual-workspace/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database utilities
│   ├── stripe.ts         # Stripe utilities
│   └── utils.ts          # General utilities
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔧 Configuration

### Database
This project uses Prisma ORM with PostgreSQL. You can use:
- **Local PostgreSQL**: Install locally or use Docker
- **Supabase**: Free tier available
- **Neon**: Serverless PostgreSQL
- **Vercel Postgres**: Integrated with Vercel

### Authentication
Configure OAuth providers in NextAuth:
- GitHub (included)
- Google
- Email/password
- Custom providers

### Payments
Set up Stripe:
1. Create Stripe account
2. Get API keys from Dashboard
3. Configure webhooks for `checkout.session.completed`
4. Set up products and prices

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyksanjo%2Fcontextual-workspace)

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
GITHUB_ID="your-production-github-id"
GITHUB_SECRET="your-production-github-secret"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Sign out

### User Management
- `GET /api/users` - List users (admin)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Payment Endpoints
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler
- `GET /api/stripe/subscription` - Get user subscription

### Workspace Endpoints
- `GET /api/workspaces` - List user workspaces
- `POST /api/workspaces` - Create workspace
- `GET /api/workspaces/:id` - Get workspace
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check
```

### Test Structure
- `*.test.ts` or `*.test.tsx` - Test files
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Global test setup

### Testing Tools
- **Jest** - Test runner
- **Testing Library** - React component testing
- **ts-jest** - TypeScript support
- **Mocking** - Next.js router, NextAuth, React Query

## 📦 Scripts

### Development
- `npm run dev` - Start development server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Database
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Create and apply migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database (development)

### Testing
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

### Production
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🔒 Security

- **Authentication**: NextAuth.js with secure sessions
- **Database**: Prisma with type-safe queries
- **API**: Rate limiting & CORS configuration
- **Payments**: Stripe with webhook verification
- **Environment**: Secure environment variable handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Write tests for new features
- Update documentation as needed
- Follow commit message conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Stripe](https://stripe.com/) - Payments infrastructure
- [React Query](https://tanstack.com/query) - Data synchronization

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yksanjo/contextual-workspace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yksanjo/contextual-workspace/discussions)
- **Email**: Contact through GitHub profile

## 🚀 Roadmap

- [ ] Real-time collaboration
- [ ] File uploads with S3/R2
- [ ] Mobile app (React Native)
- [ ] AI-powered features
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Plugin system

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/yksanjo">yksanjo</a></p>
  <p>
    <a href="https://github.com/yksanjo/contextual-workspace/stargazers">⭐ Star on GitHub</a>
    · 
    <a href="https://github.com/yksanjo/contextual-workspace/issues">🐛 Report Bug</a>
    · 
    <a href="https://github.com/yksanjo/contextual-workspace/pulls">💡 Request Feature</a>
  </p>
</div>