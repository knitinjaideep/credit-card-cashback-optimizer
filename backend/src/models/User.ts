import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  selectedCards: string[];
  spendingAnalysis: {
    monthlySpending: {
      [key: string]: number;
    };
    totalMonthlySpending: number;
    estimatedAnnualSavings: number;
    bestCardCombinations: Array<{
      category: string;
      card: string;
      cashback: number;
    }>;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  selectedCards: [{
    type: String
  }],
  spendingAnalysis: {
    monthlySpending: {
      type: Map,
      of: Number,
      default: {
        Dining: 500,
        Grocery: 800,
        Gas: 300,
        Travel: 400,
        Entertainment: 200,
        OnlineShopping: 300,
        Drugstores: 100,
        HomeImprovement: 200,
        Streaming: 50,
        Utilities: 150
      }
    },
    totalMonthlySpending: {
      type: Number,
      default: 3000
    },
    estimatedAnnualSavings: {
      type: Number,
      default: 0
    },
    bestCardCombinations: [{
      category: String,
      card: String,
      cashback: Number
    }]
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 