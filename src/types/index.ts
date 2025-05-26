export interface CreditCard {
  id: string;
  name: string;
  categories: {
    [key: string]: number;
  }; // category name to cashback percentage
  annualFee?: number;
  signUpBonus?: {
    amount: number;
    spendingRequirement: number;
    timeFrame: number; // in months
  };
  imageUrl?: string;
  benefits?: string[];
  creditScoreRequirement?: 'excellent' | 'good' | 'fair';
}

export interface Category {
  id: string;
  name: string;
}

export interface Recommendation {
  category: string;
  cardName: string;
  cashbackPercentage: number;
}

export interface SpendingAnalysis {
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
}

export interface CardScore {
  overall: number;
  strengths: string[];
  weaknesses: string[];
} 