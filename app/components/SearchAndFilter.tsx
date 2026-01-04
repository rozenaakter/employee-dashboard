import React from 'react';
import { Input, Select, DatePicker, Button, Space, Card, Badge } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { Employee } from '../types/employee';

const { RangePicker } = DatePicker;

export interface FilterState {
  searchText: string;
  department: Employee['department'] | 'all';
  status: Employee['status'] | 'all';
  dateRange: [Dayjs | null, Dayjs | null] | null;
}

interface SearchAndFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}) => {
  // Handle search text change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchText: e.target.value,
    });
  };

  // Handle department filter change
  const handleDepartmentChange = (value: Employee['department'] | 'all') => {
    onFilterChange({
      ...filters,
      department: value,
    });
  };

  // Handle status filter change
  const handleStatusChange = (value: Employee['status'] | 'all') => {
    onFilterChange({
      ...filters,
      status: value,
    });
  };

  // Handle date range change
  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    onFilterChange({
      ...filters,
      dateRange: dates,
    });
  };

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        {/* Title with badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FilterOutlined style={{ fontSize: 16, color: '#1890ff' }} />
          <span style={{ fontWeight: 500, fontSize: 15 }}>Search & Filters</span>
          {activeFilterCount > 0 && (
            <Badge
              count={activeFilterCount}
              style={{ backgroundColor: '#52c41a' }}
            />
          )}
        </div>

        {/* Filters Row */}
        <Space size="middle" wrap style={{ width: '100%' }}>
          {/* Global Search */}
          <Input
            placeholder="Search by name, role, department..."
            prefix={<SearchOutlined />}
            value={filters.searchText}
            onChange={handleSearchChange}
            allowClear
            style={{ width: 300 }}
            size="large"
          />

          {/* Department Filter */}
          <Select
            placeholder="Department"
            value={filters.department}
            onChange={handleDepartmentChange}
            style={{ width: 160 }}
            size="large"
            options={[
              { label: 'All Departments', value: 'all' },
              { label: '💻 Engineering', value: 'Engineering' },
              { label: '📢 Marketing', value: 'Marketing' },
              { label: '👥 HR', value: 'HR' },
              { label: '💰 Sales', value: 'Sales' },
            ]}
          />

          {/* Status Filter */}
          <Select
            placeholder="Status"
            value={filters.status}
            onChange={handleStatusChange}
            style={{ width: 140 }}
            size="large"
            options={[
              { label: 'All Status', value: 'all' },
              { label: '✅ Active', value: 'Active' },
              { label: '❌ Inactive', value: 'Inactive' },
            ]}
          />

          {/* Date Range Filter */}
          <RangePicker
            value={filters.dateRange}
            onChange={handleDateRangeChange}
            format="YYYY-MM-DD"
            placeholder={['Start Date', 'End Date']}
            size="large"
            style={{ width: 260 }}
          />

          {/* Clear All Filters Button */}
          {activeFilterCount > 0 && (
            <Button
              icon={<ClearOutlined />}
              onClick={onClearFilters}
              size="large"
              danger
            >
              Clear All ({activeFilterCount})
            </Button>
          )}
        </Space>
      </Space>
    </Card>
  );
};