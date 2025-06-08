# Cashback Rewards Application

A full-stack application that helps users maximize their credit card rewards by analyzing spending patterns and recommending optimal card combinations.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Chart.js for data visualization
- Axios for API requests
- CSS for styling

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- JWT for authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cashback-rewards
```

### 2. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Setup

#### Backend (.env)
Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/cashback-rewards
JWT_SECRET=your-super-secret-key-change-this-in-production
```

### 4. Start the Development Servers

#### Backend
```bash
cd backend
npm run dev
```
The backend server will start on http://localhost:5001

#### Frontend
```bash
# In a new terminal
npm run dev
```
The frontend server will start on http://localhost:5173

## Database Access

### Using MongoDB Compass
1. Install MongoDB Compass:
```bash
brew install --cask mongodb-compass
```
2. Open MongoDB Compass
3. Connect using: `mongodb://localhost:27017/cashback-rewards`

### Using MongoDB Shell
1. Install MongoDB Shell:
```bash
brew install mongosh
```
2. Connect to database:
```bash
mongosh "mongodb://localhost:27017/cashback-rewards"
```

### Useful Database Queries

```javascript
// View all users
db.users.find()

// Find user by email
db.users.findOne({ email: "user@example.com" })

// Find users with selected cards
db.users.find({ selectedCards: { $exists: true, $ne: [] } })

// Find users with high spending
db.users.find({ "spendingAnalysis.totalMonthlySpending": { $gt: 2000 } })
```

## Features

- User authentication (signup/login)
- Credit card selection and management
- Spending analysis
- Reward recommendations
- Data visualization
- Dark/Light theme support
- Responsive design

## Project Structure

```
cashback-rewards/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   │   ├── components/        # React components
│   │   ├── services/         # API services
│   │   ├── styles/           # CSS files
│   │   ├── types/            # TypeScript types
│   │   └── data/             # Static data
│   ├── backend/              # Backend source code
│   │   ├── src/
│   │   │   ├── models/      # MongoDB models
│   │   │   ├── routes/      # API routes
│   │   │   ├── middleware/  # Express middleware
│   │   │   └── index.ts     # Server entry point
│   │   └── package.json
│   └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### User Data
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/cards` - Update selected cards
- `PUT /api/user/spending` - Update spending analysis

## Development

### Adding New Features
1. Create new components in `src/components/`
2. Add new routes in `backend/src/routes/`
3. Update types in `src/types/`
4. Add new API services in `src/services/`

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use async/await for API calls
- Implement proper error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository.
