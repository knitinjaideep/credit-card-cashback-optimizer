import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { creditCards, categories } from './data/creditCards'
import type { Recommendation } from './types/index'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import './App.css'
import { CreditCard, SpendingAnalysis } from './types'
import Layout from './components/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import { auth, user } from './services/api'
import Dashboard from './components/Dashboard'
import Welcome from './components/Welcome'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

type Section = 'dashboard' | 'cards' | 'recommendations' | 'faq' | 'contact' | 'chat'
type Theme = 'light' | 'dark'
type AuthMode = 'login' | 'signup'

function AppContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('token')
    return !!token
  })
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [authError, setAuthError] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // State management
  const [selectedCards, setSelectedCards] = useState<CreditCard[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [chatInput, setChatInput] = useState('')
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme as Theme) || 'light'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [spendingAnalysis, setSpendingAnalysis] = useState<SpendingAnalysis>({
    monthlySpending: {
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
    },
    totalMonthlySpending: 3000,
    estimatedAnnualSavings: 0,
    bestCardCombinations: []
  })

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      user.getProfile()
        .then(response => {
          setUserData(response)
          setIsAuthenticated(true)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUserData(null)
          setIsAuthenticated(false)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthError('')
      const response = await auth.login(email, password)
      localStorage.setItem('token', response.token)
      setUserData(response.user)
      setIsAuthenticated(true)
    } catch (error: any) {
      setAuthError(error.response?.data?.message || 'Login failed')
    }
  }

  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      setAuthError('')
      const response = await auth.signup(name, email, password)
      localStorage.setItem('token', response.token)
      setUserData(response.user)
      setIsAuthenticated(true)
    } catch (error: any) {
      setAuthError(error.response?.data?.message || 'Signup failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserData(null)
    setIsAuthenticated(false)
    setSelectedCards([])
    setRecommendations([])
    setSpendingAnalysis({
      monthlySpending: {
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
      },
      totalMonthlySpending: 3000,
      estimatedAnnualSavings: 0,
      bestCardCombinations: []
    })
  }

  const loadUserData = async () => {
    try {
      const userData = await user.getProfile()
      if (userData.selectedCards) {
        const cards = userData.selectedCards.map((cardId: string) => 
          creditCards.find(card => card.id === cardId)
        ).filter(Boolean) as CreditCard[]
        setSelectedCards(cards)
      }
      if (userData.spendingAnalysis) {
        setSpendingAnalysis(userData.spendingAnalysis)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      // Handle error appropriately
      localStorage.removeItem('token')
      setUserData(null)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && selectedCards.length > 0) {
      const cardIds = selectedCards.map(card => card.id)
      user.updateCards(cardIds).catch(console.error)
    }
  }, [selectedCards, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      user.updateSpending(spendingAnalysis).catch(console.error)
    }
  }, [spendingAnalysis, isAuthenticated])

  const handleCardSelection = (card: CreditCard) => {
    setSelectedCards(prev => {
      const isSelected = prev.some(c => c.id === card.id)
      if (isSelected) {
        return prev.filter(c => c.id !== card.id)
      } else {
        return [...prev, card]
      }
    })
  }

  const removeCard = (cardId: string) => {
    setSelectedCards(prev => prev.filter(card => card.id !== cardId))
  }

  const getRecommendations = () => {
    const newRecommendations: Recommendation[] = []
    
    categories.forEach(category => {
      let bestCard = ''
      let bestCashback = 0

      selectedCards.forEach(card => {
        const cashback = card.categories[category as keyof typeof card.categories] || 0
        if (cashback > bestCashback) {
          bestCashback = cashback
          bestCard = card.name
        }
      })

      if (bestCard && bestCashback > 0) {
        newRecommendations.push({
          category,
          cardName: bestCard,
          cashbackPercentage: bestCashback
        })
      }
    })

    setRecommendations(newRecommendations)
    setActiveSection('recommendations')
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }])
    setChatInput('')

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm an AI assistant. How can I help you with credit card recommendations?" }])
    }, 1000)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const saveProfile = () => {
    setIsLoading(true)
    const profile = {
      selectedCards,
      recommendations,
      spendingAnalysis,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('creditCardProfile', JSON.stringify(profile))
    
    setTimeout(() => {
      setIsLoading(false)
      alert('Profile saved successfully!')
    }, 500)
  }

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('creditCardProfile')
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setSelectedCards(profile.selectedCards || [])
      setRecommendations(profile.recommendations || [])
      setSpendingAnalysis(profile.spendingAnalysis || { monthlySpending: {}, totalMonthlySpending: 0, estimatedAnnualSavings: 0, bestCardCombinations: [] })
    }
  }

  const exportRecommendations = () => {
    const data = {
      recommendations,
      selectedCards,
      spendingAnalysis,
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `credit-card-recommendations-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatCategoryName = (category: string) => {
    if (category === 'OnlineShopping') return 'Online Shopping';
    return category.replace(/([A-Z])/g, ' $1').trim();
  }

  useEffect(() => {
    calculateSavings()
  }, [selectedCards, spendingAnalysis.monthlySpending])

  const calculateSavings = () => {
    if (selectedCards.length === 0) return

    let totalSavings = 0
    const bestCombinations: { category: string; card: string; cashback: number }[] = []

    Object.entries(spendingAnalysis.monthlySpending).forEach(([category, amount]) => {
      let bestCashback = 0
      let bestCard = ''

      selectedCards.forEach(card => {
        const cashback = card.categories[category as keyof typeof card.categories] || 0
        if (cashback > bestCashback) {
          bestCashback = cashback
          bestCard = card.name
        }
      })

      const monthlySavings = (amount * bestCashback) / 100
      totalSavings += monthlySavings

      bestCombinations.push({
        category,
        card: bestCard,
        cashback: bestCashback
      })
    })

    const annualSavings = totalSavings * 12
    const totalAnnualFees = selectedCards.reduce((sum, card) => sum + (card.annualFee || 0), 0)
    const netAnnualSavings = annualSavings - totalAnnualFees

    setSpendingAnalysis(prev => ({
      ...prev,
      estimatedAnnualSavings: netAnnualSavings,
      bestCardCombinations: bestCombinations
    }))
  }

  const getChartData = () => {
    const categoryData = {
      labels: [...categories].map(formatCategoryName),
      datasets: [
        {
          label: 'Average Cashback by Category',
          data: categories.map(category => {
            const total = selectedCards.reduce((sum, card) => {
              return sum + (card.categories[category as keyof typeof card.categories] || 0)
            }, 0)
            return selectedCards.length ? total / selectedCards.length : 0
          }),
          backgroundColor: ['rgba(37, 99, 235, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(96, 165, 250, 0.8)', 'rgba(147, 197, 253, 0.8)', 'rgba(191, 219, 254, 0.8)', 'rgba(224, 242, 254, 0.8)', 'rgba(30, 58, 138, 0.8)', 'rgba(124, 58, 237, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(167, 139, 250, 0.8)'], // Using primary colors
          borderColor: ['rgba(37, 99, 235, 1)', 'rgba(59, 130, 246, 1)', 'rgba(96, 165, 250, 1)', 'rgba(147, 197, 253, 1)', 'rgba(191, 219, 254, 1)', 'rgba(224, 242, 254, 1)', 'rgba(30, 58, 138, 1)', 'rgba(124, 58, 237, 1)', 'rgba(139, 92, 246, 1)', 'rgba(167, 139, 250, 1)'],
          borderWidth: 1
        }
      ]
    }

    const cardDistributionData = {
      labels: selectedCards.map(card => card.name),
      datasets: [
        {
          data: selectedCards.map(card => {
            // Calculate average cashback for the card across all categories in spendingAnalysis
            let totalCashback = 0
            let categoryCount = 0
            Object.keys(spendingAnalysis.monthlySpending).forEach(category => {
              const cashback = card.categories[category as keyof typeof card.categories] || 0
              if (cashback > 0) {
                totalCashback += cashback
                categoryCount++
              }
            })
            return categoryCount > 0 ? totalCashback / categoryCount : 0
          }),
          backgroundColor: [
            'rgba(37, 99, 235, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(96, 165, 250, 0.8)',
            'rgba(147, 197, 253, 0.8)',
            'rgba(191, 219, 254, 0.8)',
            'rgba(224, 242, 254, 0.8)',
            'rgba(30, 58, 138, 0.8)',
            'rgba(124, 58, 237, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(167, 139, 250, 0.8)',
          ],
          borderColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(147, 197, 253, 1)',
            'rgba(191, 219, 254, 1)',
            'rgba(224, 242, 254, 1)',
            'rgba(30, 58, 138, 1)',
            'rgba(124, 58, 237, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(167, 139, 250, 1)',
          ],
          borderWidth: 1
        }
      ]
    }

    const cashbackTrendData = {
      labels: [...categories].map(formatCategoryName),
      datasets: selectedCards.map((card, index) => {
        return {
          label: card.name,
          data: categories.map(category => card.categories[category as keyof typeof card.categories] || 0),
          borderColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(147, 197, 253, 1)',
            'rgba(191, 219, 254, 1)',
            'rgba(224, 242, 254, 1)',
            'rgba(30, 58, 138, 1)',
            'rgba(124, 58, 237, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(167, 139, 250, 1)',
          ][index % 10], // Use modulo 10 for more colors
          backgroundColor: [ // Add corresponding background colors
            'rgba(37, 99, 235, 0.2)',
            'rgba(59, 130, 246, 0.2)',
            'rgba(96, 165, 250, 0.2)',
            'rgba(147, 197, 253, 0.2)',
            'rgba(191, 219, 254, 0.2)',
            'rgba(224, 242, 254, 0.2)',
            'rgba(30, 58, 138, 0.2)',
            'rgba(124, 58, 237, 0.2)',
            'rgba(139, 92, 246, 0.2)',
            'rgba(167, 139, 250, 0.2)',
          ][index % 10],
          tension: 0.4,
          pointBackgroundColor: 'white',
          pointBorderColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(147, 197, 253, 1)',
            'rgba(191, 219, 254, 1)',
            'rgba(224, 242, 254, 1)',
            'rgba(30, 58, 138, 1)',
            'rgba(124, 58, 237, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(167, 139, 250, 1)',
          ][index % 10],
          pointHoverRadius: 8,
          pointHoverBorderColor: 'white',
          pointHoverBackgroundColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(147, 197, 253, 1)',
            'rgba(191, 219, 254, 1)',
            'rgba(224, 242, 254, 1)',
            'rgba(30, 58, 138, 1)',
            'rgba(124, 58, 237, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(167, 139, 250, 1)',
          ][index % 10],
        }
      })
    }

    return { categoryData, cardDistributionData, cashbackTrendData }
  }

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome onGetStarted={handleGetStarted} isAuthenticated={isAuthenticated} />} />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/signup"
        element={
          !isAuthenticated ? (
            <Signup onSignup={handleSignup} />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Layout
              selectedCards={selectedCards}
              recommendations={recommendations}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              chatMessages={chatMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleChatSubmit={handleChatSubmit}
              theme={theme}
              toggleTheme={toggleTheme}
              onLogout={handleLogout}
              handleCardSelection={handleCardSelection}
              removeCard={removeCard}
              getRecommendations={getRecommendations}
              spendingAnalysis={spendingAnalysis}
              setSpendingAnalysis={setSpendingAnalysis}
              formatCategoryName={formatCategoryName}
              getChartData={getChartData}
              setChatMessages={setChatMessages}
              saveProfile={saveProfile}
              loadProfile={loadProfile}
              exportRecommendations={exportRecommendations}
              isLoading={isLoading}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
