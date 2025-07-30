import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BookOpen, 
  ShoppingCart, 
  Users, 
  Truck,
  TrendingUp,
  Calendar,
  AlertCircle,
  Lightbulb,
  Target,
  Star
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState({
    todaySales: 13100,
    totalBooks: 5,
    totalCustomers: 5,
    totalSuppliers: 5,
    lowStockBooks: 2,
    recentSales: [],
    salesChart: [],
    categoryChart: [],
    monthlyTrends: [],
    aiInsights: []
  });

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = () => {
      // Sales chart data (last 7 days)
      const salesChart = [
        { date: 'Jul 21', sales: 2400, orders: 3 },
        { date: 'Jul 22', sales: 1800, orders: 2 },
        { date: 'Jul 23', sales: 3200, orders: 4 },
        { date: 'Jul 24', sales: 2800, orders: 3 },
        { date: 'Jul 25', sales: 1200, orders: 1 },
        { date: 'Jul 26', sales: 1200, orders: 2 },
        { date: 'Jul 27', sales: 13100, orders: 4 }
      ];

      // Category distribution
      const categoryChart = [
        { name: 'Fiction', value: 35, count: 15, color: '#8884d8' },
        { name: 'Educational', value: 30, count: 12, color: '#82ca9d' },
        { name: 'History', value: 20, count: 8, color: '#ffc658' },
        { name: 'Children', value: 10, count: 4, color: '#ff7300' },
        { name: 'Other', value: 5, count: 2, color: '#00ff00' }
      ];

      // Monthly trends (last 6 months)
      const monthlyTrends = [
        { month: 'Feb', revenue: 45000, customers: 12 },
        { month: 'Mar', revenue: 52000, customers: 18 },
        { month: 'Apr', revenue: 48000, customers: 15 },
        { month: 'May', revenue: 61000, customers: 22 },
        { month: 'Jun', revenue: 58000, customers: 19 },
        { month: 'Jul', revenue: 67000, customers: 25 }
      ];

      // AI-powered insights about demanding books in Sri Lanka
      const aiInsights = [
        {
          type: 'trending',
          title: 'Educational Books High Demand',
          description: 'Mathematics and Science textbooks are in high demand due to the upcoming school term. Consider stocking Grade 10-12 materials.',
          priority: 'high',
          action: 'Stock up on educational materials'
        },
        {
          type: 'seasonal',
          title: 'Fiction Books Popular',
          description: 'Contemporary Sinhala novels by Martin Wickramasinghe and modern authors are trending among young readers.',
          priority: 'medium',
          action: 'Expand fiction collection'
        },
        {
          type: 'market',
          title: 'English Learning Materials',
          description: 'English language learning books are increasingly popular as more students prepare for international exams.',
          priority: 'high',
          action: 'Add English learning resources'
        },
        {
          type: 'local',
          title: 'Sri Lankan History Books',
          description: 'Books about Sri Lankan culture and history are popular among tourists and local students studying heritage.',
          priority: 'medium',
          action: 'Promote local history section'
        }
      ];

      // Recent sales
      const recentSales = [
        { customer: 'Priya Jayawardena', amount: 11400, items: 'The Alchemist × 12', time: '2 hours ago' },
        { customer: 'Nimal Perera', amount: 1700, items: 'Madol Doova × 2', time: '1 day ago' },
        { customer: 'Kamala Silva', amount: 1200, items: 'Math Grade 10, Viragaya', time: '2 days ago' },
        { customer: 'Sunil Fernando', amount: 1200, items: 'Sri Lankan History × 1', time: '3 days ago' }
      ];

      setDashboardData({
        todaySales: 13100,
        totalBooks: 5,
        totalCustomers: 5,
        totalSuppliers: 5,
        lowStockBooks: 2,
        recentSales,
        salesChart,
        categoryChart,
        monthlyTrends,
        aiInsights
      });
    };

    loadDashboardData();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      case 'seasonal': return <Calendar className="h-4 w-4" />;
      case 'market': return <Target className="h-4 w-4" />;
      case 'local': return <Star className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.todaySales)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-500">{dashboardData.lowStockBooks} low stock</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">2 VIP customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">All active</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.salesChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? formatCurrency(value) : value,
                    name === 'sales' ? 'Sales' : 'Orders'
                  ]}
                />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Book Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.categoryChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.categoryChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? formatCurrency(value) : value,
                  name === 'revenue' ? 'Revenue' : 'New Customers'
                ]}
              />
              <Bar dataKey="revenue" fill="#8884d8" />
              <Bar dataKey="customers" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI-Powered Market Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.aiInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-semibold">{insight.title}</h4>
                  </div>
                  <Badge variant={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  {insight.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Sales Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{sale.customer}</p>
                  <p className="text-sm text-muted-foreground">{sale.items}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(sale.amount)}</p>
                  <p className="text-xs text-muted-foreground">{sale.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/books')}
            >
              <BookOpen className="h-6 w-6 mb-2" />
              Add Book
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/sales')}
            >
              <ShoppingCart className="h-6 w-6 mb-2" />
              New Sale
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/customers')}
            >
              <Users className="h-6 w-6 mb-2" />
              Add Customer
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/books')}
            >
              <AlertCircle className="h-6 w-6 mb-2" />
              Low Stock Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

