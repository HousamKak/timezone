# Analyst Trade Portal - Frontend

A modern, professional trading portal built with React, TypeScript, Vite, Tailwind CSS, and PrimeReact.

## 🏗️ Architecture Overview

This frontend follows a clean, maintainable architecture with clear separation of concerns:

### 📁 Project Structure

```
src/
├── components/                 # Reusable UI Components
│   ├── ui/                    # Generic UI Components
│   │   ├── Button.tsx         # Reusable button component
│   │   ├── Card.tsx           # Card layouts
│   │   ├── Table.tsx          # Data table component
│   │   ├── Badge.tsx          # Status badges
│   │   └── index.ts           # Component exports
│   ├── layout/                # Layout Components
│   │   ├── AppLayout.tsx      # Main app layout
│   │   ├── Header.tsx         # Navigation header
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── trades/                # Trade-specific Components
│   │   ├── TradeTable.tsx     # Trade data table
│   │   ├── TradeForm.tsx      # Trade creation form
│   │   └── TradeFilters.tsx   # Trade filtering
│   └── dashboard/             # Dashboard Components
│       ├── MetricCard.tsx     # KPI metric cards
│       ├── ChartWidget.tsx    # Chart components
│       └── RecentActivity.tsx # Activity feed
│
├── pages/                     # Page Components
│   ├── Dashboard.tsx          # Main dashboard
│   ├── TradeHistory.tsx       # Trade history page
│   ├── NewTrade.tsx           # New trade form
│   └── Performance.tsx        # Performance analytics
│
├── types/                     # TypeScript Definitions
│   └── index.ts               # All type definitions
│
├── utils/                     # Utility Functions
│   └── helpers.ts             # Helper functions
│
├── data/                      # Mock Data & Services
│   └── mockData.ts            # Sample data
│
└── hooks/                     # Custom React Hooks
    ├── useAuth.ts             # Authentication hook
    ├── useTrades.ts           # Trade data hook
    └── useTheme.ts            # Theme management
```

## 🎨 Design System

### Component Architecture
- **Atomic Design Pattern**: UI components are built from small, reusable pieces
- **Composable**: Components can be easily combined and customized
- **Consistent**: Shared design tokens ensure visual consistency
- **Accessible**: Built with accessibility best practices

### UI Components

#### Button Component
```tsx
<Button variant="primary" size="md" loading={false}>
  Submit Trade
</Button>
```

#### Card Component
```tsx
<Card padding="md">
  <CardHeader>Trade Details</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

#### Table Component
```tsx
<Table 
  data={trades}
  columns={columns}
  onRowClick={handleRowClick}
  loading={isLoading}
  hoverable
/>
```

## 🚀 Key Features

### 1. **Modern Tech Stack**
- ⚛️ React 18 with TypeScript
- ⚡ Vite for fast development
- 🎨 Tailwind CSS for styling
- 🎯 PrimeReact for advanced components

### 2. **Clean Architecture**
- 📦 Modular component structure
- 🔧 Reusable UI components
- 📊 Centralized state management
- 🎭 Custom hooks for logic separation

### 3. **Professional Trading Interface**
- 📈 Interactive trade tables
- 📊 Performance dashboards
- 🎯 Real-time metrics
- 📱 Responsive design

### 4. **Developer Experience**
- 🔍 TypeScript for type safety
- 🎨 Tailwind for rapid styling
- 🔧 ESLint & Prettier for code quality
- 📱 Hot module replacement

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

## 🛠️ Installation & Setup

1. **Install Node.js**
   ```bash
   # Download and install from https://nodejs.org/
   # Or use a package manager:
   winget install OpenJS.NodeJS  # Windows
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🎯 Component Usage Examples

### MetricCard for KPIs
```tsx
<MetricCard
  title="Total Trades"
  value={15}
  color="blue"
  trend={{ value: 2.3, label: "vs last month" }}
/>
```

### TradeTable for Data Display
```tsx
<TradeTable
  trades={tradeData}
  onTradeClick={handleTradeDetails}
  loading={isLoading}
/>
```

## 🎨 Theming & Customization

### Dark Mode Support
The application includes built-in dark mode support:
```tsx
const [isDarkMode, setIsDarkMode] = useState(false);

// Toggle theme
const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
  document.documentElement.classList.toggle('dark');
};
```

### Custom Colors
Tailwind configuration includes custom color palette:
```js
// tailwind.config.js
colors: {
  primary: {
    500: '#3b82f6',
    600: '#2563eb',
  },
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
}
```

## 📊 Data Flow

1. **Mock Data**: Currently uses static mock data
2. **API Integration**: Ready for backend integration
3. **State Management**: Redux Toolkit for complex state
4. **Real-time Updates**: WebSocket support planned

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 📱 Demo

A static HTML demo is available at `demo.html` to showcase the design without requiring Node.js installation.

## 🤝 Best Practices Implemented

1. **Component Composition**: Small, focused components
2. **TypeScript**: Full type safety
3. **Accessibility**: ARIA labels and keyboard navigation
4. **Performance**: Lazy loading and optimization
5. **Maintainability**: Clear file structure and naming
6. **Responsive Design**: Mobile-first approach

## 🔮 Future Enhancements

- [ ] Real-time price updates
- [ ] Advanced charting with Chart.js
- [ ] File upload capabilities
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Notification system
- [ ] Performance analytics
- [ ] Multi-language support

## 📞 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

---

**Built with ❤️ using modern React best practices for enterprise trading applications.**
