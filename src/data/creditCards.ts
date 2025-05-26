import { CreditCard } from '../types'

export const categories = [
  'Dining',
  'Grocery',
  'Gas',
  'Travel',
  'Entertainment',
  'OnlineShopping',
  'Drugstores',
  'HomeImprovement',
  'Streaming',
  'Utilities'
] as const

export const creditCards: CreditCard[] = [
  {
    id: 'amex-gold',
    name: 'American Express Gold',
    categories: {
      Dining: 4,
      Grocery: 4,
      Travel: 3,
      Entertainment: 2,
      OnlineShopping: 1,
      Gas: 1,
      Drugstores: 1,
      HomeImprovement: 1,
      Streaming: 1,
      Utilities: 1
    },
    annualFee: 250,
    signUpBonus: {
      amount: 60000,
      spendingRequirement: 4000,
      timeFrame: 6
    },
    imageUrl: 'https://www.americanexpress.com/content/dam/amex/us/credit-cards/card-assets/centurion/gold-card.png',
    benefits: [
      '$120 Dining Credit',
      '$120 Uber Cash',
      'Airport Lounge Access',
      'No Foreign Transaction Fees'
    ],
    creditScoreRequirement: 'excellent'
  },
  {
    id: 'chase-sapphire',
    name: 'Chase Sapphire Preferred',
    categories: {
      Dining: 3,
      Grocery: 3,
      Travel: 3,
      OnlineShopping: 3,
      Streaming: 3,
      Gas: 1,
      Drugstores: 1,
      HomeImprovement: 1,
      Entertainment: 1,
      Utilities: 1
    },
    annualFee: 95,
    signUpBonus: {
      amount: 60000,
      spendingRequirement: 4000,
      timeFrame: 3
    },
    imageUrl: 'https://creditcards.chase.com/K-Marketplace/CreditCards/Images/CardArt/Sapphire_Preferred.png',
    benefits: [
      'Travel Insurance',
      'Primary Rental Car Coverage',
      'Trip Delay Protection',
      'No Foreign Transaction Fees'
    ],
    creditScoreRequirement: 'excellent'
  },
  {
    id: 'capital-one-savor',
    name: 'Capital One Savor',
    categories: {
      Dining: 4,
      Entertainment: 4,
      Grocery: 3,
      Streaming: 3,
      Gas: 1,
      Travel: 1,
      OnlineShopping: 1,
      Drugstores: 1,
      HomeImprovement: 1,
      Utilities: 1
    },
    annualFee: 95,
    signUpBonus: {
      amount: 300,
      spendingRequirement: 3000,
      timeFrame: 3
    },
    imageUrl: 'https://www.capitalone.com/credit-cards/images/card-art/savor-rewards-credit-card.png',
    benefits: [
      'No Foreign Transaction Fees',
      'Extended Warranty',
      'Purchase Protection',
      'Travel Accident Insurance'
    ],
    creditScoreRequirement: 'good'
  },
  {
    id: 'citi-double',
    name: 'Citi Double Cash',
    categories: {
      Dining: 2,
      Grocery: 2,
      Gas: 2,
      Travel: 2,
      Entertainment: 2,
      OnlineShopping: 2,
      Drugstores: 2,
      HomeImprovement: 2,
      Streaming: 2,
      Utilities: 2
    },
    annualFee: 0,
    imageUrl: 'https://www.citi.com/credit-cards/images/card-art/double-cash-credit-card.png',
    benefits: [
      'No Annual Fee',
      'No Foreign Transaction Fees',
      'Extended Warranty',
      'Price Protection'
    ],
    creditScoreRequirement: 'good'
  },
  {
    id: 'discover-it',
    name: 'Discover it',
    categories: {
      Dining: 2,
      Grocery: 2,
      Gas: 2,
      Travel: 2,
      Entertainment: 2,
      OnlineShopping: 2,
      Drugstores: 2,
      HomeImprovement: 2,
      Streaming: 2,
      Utilities: 2
    },
    annualFee: 0,
    imageUrl: 'https://www.discover.com/credit-cards/card-art/discover-it.png',
    benefits: [
      'No Annual Fee',
      'First Year Cashback Match',
      'No Foreign Transaction Fees',
      'Free FICO Score'
    ],
    creditScoreRequirement: 'good'
  }
] 