import dayjs from 'dayjs';
import { Employee } from '../types/employee';
import type { FilterState } from '../components/SearchAndFilter';

/**
 * Filter employees based on search and filter criteria
 */
export const filterEmployees = (
  employees: Employee[],
  filters: FilterState
): Employee[] => {
  return employees.filter((employee) => {
    // 1. Search Filter (search in name, role, department)
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const matchesSearch =
        employee.name.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.id.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // 2. Department Filter
    if (filters.department && filters.department !== 'all') {
      if (employee.department !== filters.department) return false;
    }

    // 3. Status Filter
    if (filters.status && filters.status !== 'all') {
      if (employee.status !== filters.status) return false;
    }

    // 4. Date Range Filter (joining date)
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const joiningDate = dayjs(employee.joiningDate);
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];

      if (
        joiningDate.isBefore(startDate, 'day') ||
        joiningDate.isAfter(endDate, 'day')
      ) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Count active filters
 */
export const countActiveFilters = (filters: FilterState): number => {
  let count = 0;

  if (filters.searchText) count++;
  if (filters.department && filters.department !== 'all') count++;
  if (filters.status && filters.status !== 'all') count++;
  if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) count++;

  return count;
};