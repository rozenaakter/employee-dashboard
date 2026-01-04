# 🏢 Employee Management Dashboard

A modern, full-featured employee management system built with **Next.js 16**, **TypeScript**, and **Ant Design**. This application provides a complete CRUD interface with advanced features like search, filtering, multiple view modes, and CSV export capabilities.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.1.3-1890ff?style=flat-square&logo=ant-design)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

## Live Link - vercel
https://employee-dashboard-rust.vercel.app/

### 📋 Core Features
- **Complete CRUD Operations**
  - ✅ Create new employees with auto-generated IDs
  - ✅ Read/View employees in table or card layout
  - ✅ Update employee information
  - ✅ Delete (Soft delete/Archive) employees
  - ✅ Restore archived employees

### 🔍 Advanced Search & Filter
- **Multi-field Global Search** - Search across name, role, department, and employee ID
- **Department Filter** - Filter by Engineering, Marketing, HR, or Sales
- **Status Filter** - Filter by Active or Inactive status
- **Date Range Filter** - Filter employees by joining date range
- **Combined Filters** - Apply multiple filters simultaneously
- **Active Filter Count** - Visual badge showing number of active filters
- **Clear All Filters** - Reset all filters with one click

### 🎨 Multiple View Modes
- **Table View** - Classic data table with sorting and pagination
- **Card View** - Modern grid layout with responsive cards
- **View Preference** - Saved in localStorage, persists across sessions
- **Responsive Grid** - Auto-adjusts columns based on screen size

### 📊 Data Management
- **LocalStorage Persistence** - All data saved locally in browser
- **Auto ID Generation** - Sequential employee IDs (EMP001, EMP002...)
- **Performance Tracking** - Visual performance score with color coding
- **Archive System** - Soft delete functionality for data safety

### 📥 Export Functionality
- **CSV Export** - Download employee data as CSV file
- **Export Filtered Data** - Export only visible/filtered employees
- **Export All Data** - Export complete employee database
- **Export Statistics** - Preview statistics before exporting
- **Proper CSV Formatting** - Handles special characters and commas

### 🎯 Form Validations
- Required field validation
- Minimum character length validation
- Future date prevention for joining dates
- Performance score range validation (1-100)
- Real-time error messages

### 💅 UI/UX Excellence
- Beautiful, modern interface
- Smooth animations and transitions
- Loading states and spinners
- Success/error toast notifications
- Empty states with helpful messages
- Hover effects on interactive elements
- Color-coded tags and status indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd employee-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
employee-dashboard/
├── app/
│   ├── components/           # Reusable React components
│   │   ├── AddEmployeeDrawer.tsx
│   │   ├── EditEmployeeDrawer.tsx
│   │   ├── EmployeeTable.tsx
│   │   ├── EmployeeCardView.tsx
│   │   ├── SearchAndFilter.tsx
│   │   ├── ExportButton.tsx
│   │   └── PerformanceBar.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── employee.ts
│   ├── utils/               # Utility functions
│   │   ├── storage.ts       # LocalStorage helpers
│   │   ├── filterEmployees.ts
│   │   └── exportCSV.ts
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Ant Design 6.1.3** - UI component library

### Key Dependencies
- `@ant-design/icons` - Icon library
- `@ant-design/nextjs-registry` - Ant Design integration
- `dayjs` - Date manipulation library

### Development Tools
- **ESLint** - Code linting
- **Tailwind CSS 4** - Utility-first CSS (optional)
- **TypeScript** - Static type checking

## 📖 Usage Guide

### Adding an Employee
1. Click **"Add Employee"** button
2. Fill in the form fields:
   - Name (required)
   - Department (required)
   - Role (required)
   - Joining Date (required, cannot be future date)
   - Status (required)
   - Performance Score (1-100)
3. Click **"Add Employee"** to save

### Editing an Employee
1. Click **"Edit"** button on any employee row
2. Modify the desired fields
3. Click **"Save Changes"**

### Deleting/Archiving an Employee
1. Click **"Delete"** button on any employee row
2. Confirm the action in the popup
3. Employee will be archived (soft delete)

### Viewing Archived Employees
1. Toggle **"Show Archived"** switch ON
2. View all archived employees
3. Click **"Restore"** to bring back to active list

### Searching and Filtering
1. Use the search box for text search
2. Select filters from dropdowns
3. Pick date range for joining date filter
4. Click **"Clear All"** to reset filters

### Switching Views
1. Click **Table** icon for table view
2. Click **Cards** icon for card grid view
3. Preference is automatically saved

### Exporting Data
1. Click **"Export CSV"** button
2. Choose **"Export Filtered Data"** or **"Export All Data"**
3. Optionally view **"Export Info"** for statistics
4. CSV file will download automatically

## 🎨 Color Coding

### Department Colors
- 🔵 **Engineering** - Blue
- 🟢 **Marketing** - Green
- 🟠 **HR** - Orange
- 🟣 **Sales** - Purple

### Status Colors
- 🟢 **Active** - Green
- 🔴 **Inactive** - Red

### Performance Colors
- 🔴 **0-40%** - Red (Poor)
- 🟠 **41-70%** - Orange (Average)
- 🟢 **71-100%** - Green (Excellent)

## 💾 Data Persistence

All employee data is stored in the browser's **localStorage** with the key `employees_data`. This means:
- ✅ Data persists across page refreshes
- ✅ No backend/database required
- ✅ Works offline
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete all employees

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Screens** (1440px+)

### Card View Grid
- **Mobile (xs)**: 1 column
- **Tablet (sm)**: 2 columns
- **Desktop (md)**: 3 columns
- **Large (lg+)**: 4 columns

## 🔐 Features in Detail

### Auto ID Generation
Employee IDs are automatically generated in the format `EMP###`:
- First employee: `EMP001`
- Second employee: `EMP002`
- And so on...

### Soft Delete System
Employees are never permanently deleted. Instead:
1. They are marked as `archived: true`
2. They disappear from the main list
3. They can be viewed by toggling "Show Archived"
4. They can be restored at any time

### Performance Score Visualization
Each employee has a performance score (1-100) displayed as:
- Colored progress bar
- Percentage value
- Color-coded based on performance level

## 🚧 Known Limitations

- Data is stored locally (not synced to cloud)
- No user authentication system
- No multi-user support
- Limited to browser's localStorage capacity (~5-10MB)
- No backend API integration

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Backend API integration
- [ ] User authentication
- [ ] Role-based access control
- [ ] Advanced analytics dashboard
- [ ] Bulk operations (bulk edit, bulk delete)
- [ ] Employee attendance tracking
- [ ] Salary management
- [ ] Email notifications
- [ ] PDF export functionality
- [ ] Import CSV data
- [ ] Dark mode theme

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rozena Akter**
- GitHub: (https://github.com/rozenaakter)
- Email: 90rozena@gmail.com

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design](https://ant.design/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact via email
- Check the [documentation](https://nextjs.org/docs)

---

**Made with ❤️ using Next.js and Ant Design**

⭐ If you found this project helpful, please give it a star!