import { TrendingUp, Users, Settings, Info, AlertCircle } from 'lucide-react';

// Mock data for the dashboard
export const statsData = [
  {
    title: "Total Users",
    value: 142850,
    change: 12.5,
    icon: "users",
    gradient: "from-pink-500 to-pink-600"
  },
  {
    title: "Revenue",
    value: 892340,
    change: 8.2,
    icon: "dollar",
    gradient: "from-mint-500 to-mint-600"
  },
  {
    title: "Conversion Rate",
    value: 3.45,
    change: -2.1,
    icon: "trending",
    gradient: "from-yellow-500 to-yellow-600"
  },
  {
    title: "Active Sessions",
    value: 28450,
    change: 15.8,
    icon: "activity",
    gradient: "from-purple-500 to-purple-600"
  }
];

export const lineChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

export const areaChartData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

export const barChartData = [
  { name: 'Q1', value: 40000 },
  { name: 'Q2', value: 30000 },
  { name: 'Q3', value: 50000 },
  { name: 'Q4', value: 45000 },
];

export const pieChartData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 15 },
  { name: 'Other', value: 5 },
];

export const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', revenue: 12500, signupDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', revenue: 8900, signupDate: '2024-01-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', revenue: 0, signupDate: '2024-02-01' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', revenue: 15600, signupDate: '2024-02-10' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active', revenue: 22100, signupDate: '2024-02-15' },
  { id: 6, name: 'Diana Davis', email: 'diana@example.com', status: 'Active', revenue: 9800, signupDate: '2024-02-20' },
  { id: 7, name: 'Eve Miller', email: 'eve@example.com', status: 'Inactive', revenue: 0, signupDate: '2024-03-01' },
  { id: 8, name: 'Frank Garcia', email: 'frank@example.com', status: 'Active', revenue: 18700, signupDate: '2024-03-05' },
];

export const tableColumns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'revenue', label: 'Revenue ($)', sortable: true },
  { key: 'signupDate', label: 'Signup Date', sortable: true },
];

// Initial notifications data
export const initialNotifications = [
  {
    id: '1',
    type: 'success' as const,
    title: 'Revenue Goal Achieved',
    message: 'Monthly revenue target of $50K has been reached!',
    time: '2 minutes ago',
    read: false,
    icon: TrendingUp
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'New User Milestone',
    message: 'Congratulations! You\'ve reached 10,000 active users.',
    time: '1 hour ago',
    read: false,
    icon: Users
  },
  {
    id: '3',
    type: 'warning' as const,
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2 AM EST.',
    time: '3 hours ago',
    read: true,
    icon: Settings
  },
  {
    id: '4',
    type: 'info' as const,
    title: 'Weekly Report Ready',
    message: 'Your weekly analytics report is now available for download.',
    time: '1 day ago',
    read: true,
    icon: Info
  },
  {
    id: '5',
    type: 'error' as const,
    title: 'API Rate Limit Warning',
    message: 'You\'re approaching your API rate limit for this month.',
    time: '2 days ago',
    read: false,
    icon: AlertCircle
  }
];