# TheForom

A modern, feature-rich forum platform built with Next.js, TypeScript, and Prisma.

## Features

- 🔐 Authentication with NextAuth.js
- 📝 Rich text editor with Slate.js
- 🖼️ Image uploads with AWS S3
- 🌙 Dark mode support
- 📱 Responsive design
- 🔍 Advanced search capabilities
- 📊 Google Analytics integration
- 📧 Email notifications
- 🎨 Modern UI with Lucide icons

## Tech Stack

- **Framework:** Next.js 13
- **Language:** TypeScript
- **Database:** Prisma ORM
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Rich Text Editor:** Slate.js
- **File Storage:** AWS S3
- **Styling:** CSS Modules
- **Form Handling:** React Hook Form
- **Analytics:** Google Analytics

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- AWS account (for S3 storage)
- Database (configured through Prisma)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/theforom.git
cd theforom
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="your-aws-region"
AWS_BUCKET_NAME="your-bucket-name"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client

## Project Structure

```
theforom/
├── components/     # React components
├── lib/           # Utility functions and shared logic
├── pages/         # Next.js pages and API routes
├── prisma/        # Database schema and migrations
├── public/        # Static assets
└── styles/        # Global styles and CSS modules
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
