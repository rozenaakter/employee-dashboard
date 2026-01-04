'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Card, Button, Typography, message, Space, Switch, Segmented } from 'antd';
import { PlusOutlined, InboxOutlined, TableOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Employee, initialEmployees } from './types/employee';
import { getEmployeesFromStorage, saveEmployeesToStorage } from './utils/storage';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCardView } from './components/EmployeeCardView';
import { AddEmployeeDrawer } from './components/AddEmployeeDrawer';
import { EditEmployeeDrawer } from './components/EditEmployeeDrawer';
import { SearchAndFilter, FilterState } from './components/SearchAndFilter';
import { ExportButton } from './components/ExportButton';
import { filterEmployees, countActiveFilters } from './utils/filterEmployees';

const { Header, Content } = Layout;
const { Title } = Typography;

type ViewMode = 'table' | 'card';

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    department: 'all',
    status: 'all',
    dateRange: null,
  });

  // Load data on mount
  useEffect(() => {
    const savedData = getEmployeesFromStorage();
    
    if (savedData.length > 0) {
      setEmployees(savedData);
    } else {
      // First time load - use initial data
      setEmployees(initialEmployees);
      saveEmployeesToStorage(initialEmployees);
    }
    
    // Load view preference from localStorage
    const savedView = localStorage.getItem('view_mode');
    if (savedView === 'table' || savedView === 'card') {
      setViewMode(savedView);
    }
    
    setLoading(false);
  }, []);

  // Save to storage whenever employees change
  useEffect(() => {
    if (employees.length > 0 && !loading) {
      saveEmployeesToStorage(employees);
    }
  }, [employees, loading]);

  // Save view mode preference
  useEffect(() => {
    localStorage.setItem('view_mode', viewMode);
  }, [viewMode]);

  // Add new employee
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  // Edit employee
  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setSelectedEmployee(null);
  };

  // Open edit drawer
  const handleOpenEditDrawer = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditDrawerOpen(true);
  };

  // Close edit drawer
  const handleCloseEditDrawer = () => {
    setEditDrawerOpen(false);
    setSelectedEmployee(null);
  };

  // Delete (Archive) employee
  const handleDeleteEmployee = (employee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employee.id ? { ...emp, archived: true } : emp
      )
    );
    message.success(`${employee.name} archived successfully!`);
  };

  // Restore archived employee
  const handleRestoreEmployee = (employee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employee.id ? { ...emp, archived: false } : emp
      )
    );
    message.success(`${employee.name} restored successfully!`);
  };

  // Filter employees based on archived status
  const displayedEmployees = showArchived
    ? employees.filter((emp) => emp.archived)
    : employees.filter((emp) => !emp.archived);

  // Apply search and filters using useMemo for performance
  const filteredEmployees = useMemo(() => {
    return filterEmployees(displayedEmployees, filters);
  }, [displayedEmployees, filters]);

  // Count active filters
  const activeFilterCount = countActiveFilters(filters);

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      searchText: '',
      department: 'all',
      status: 'all',
      dateRange: null,
    });
    message.success('All filters cleared!');
  };

  // Get existing IDs for auto-generate
  const existingIds = employees.map((emp) => emp.id);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <Header
        style={{
          background: '#001529',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          🏢 Employee Management Dashboard
        </Title>
      </Header>

      {/* Main Content */}
      <Content
        style={{
          padding: '24px',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Card
          style={{
            borderRadius: 8,
            boxShadow:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          }}
        >
          {/* Card Header */}
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                {showArchived ? 'Archived Employees' : 'Employee List'}
              </Title>
              <span style={{ color: '#666', fontSize: 14 }}>
                {filteredEmployees.length} of {displayedEmployees.length} employees
                {activeFilterCount > 0 && (
                  <span style={{ color: '#1890ff', marginLeft: 8 }}>
                    ({activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active)
                  </span>
                )}
              </span>
            </div>

            <Space size="middle" wrap>
              {/* View Toggle */}
              <Segmented
                value={viewMode}
                onChange={(value) => setViewMode(value as ViewMode)}
                options={[
                  {
                    label: 'Table',
                    value: 'table',
                    icon: <TableOutlined />,
                  },
                  {
                    label: 'Cards',
                    value: 'card',
                    icon: <AppstoreOutlined />,
                  },
                ]}
              />

              {/* Export Button */}
              <ExportButton
                employees={displayedEmployees}
                filteredEmployees={filteredEmployees}
                disabled={showArchived}
              />

              {/* Archive Toggle Switch */}
              <Space>
                <span style={{ fontSize: 14, color: '#666' }}>
                  Show Archived
                </span>
                <Switch
                  checked={showArchived}
                  onChange={setShowArchived}
                  checkedChildren={<InboxOutlined />}
                  unCheckedChildren={<InboxOutlined />}
                />
              </Space>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setAddDrawerOpen(true)}
                style={{ fontWeight: 500 }}
                disabled={showArchived}
              >
                Add Employee
              </Button>
            </Space>
          </div>

          {/* Search and Filter Component */}
          {!showArchived && (
            <SearchAndFilter
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
              activeFilterCount={activeFilterCount}
            />
          )}

          {/* Employee Display - Table or Card View */}
          {viewMode === 'table' ? (
            <EmployeeTable
              employees={filteredEmployees}
              loading={loading}
              onEdit={handleOpenEditDrawer}
              onDelete={showArchived ? handleRestoreEmployee : handleDeleteEmployee}
              isArchived={showArchived}
            />
          ) : (
            <EmployeeCardView
              employees={filteredEmployees}
              loading={loading}
              onEdit={handleOpenEditDrawer}
              onDelete={showArchived ? handleRestoreEmployee : handleDeleteEmployee}
              isArchived={showArchived}
            />
          )}
        </Card>
      </Content>

      {/* Add Employee Drawer */}
      <AddEmployeeDrawer
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        onAdd={handleAddEmployee}
        existingIds={existingIds}
      />

      {/* Edit Employee Drawer */}
      <EditEmployeeDrawer
        open={editDrawerOpen}
        onClose={handleCloseEditDrawer}
        onEdit={handleEditEmployee}
        employee={selectedEmployee}
      />
    </Layout>
  );
}