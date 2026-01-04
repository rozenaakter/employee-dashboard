import { Employee } from '../types/employee';

/**
 * Convert employees array to CSV format
 */
export const convertToCSV = (employees: Employee[]): string => {
  // CSV Headers
  const headers = [
    'Employee ID',
    'Name',
    'Department',
    'Role',
    'Joining Date',
    'Status',
    'Performance Score (%)',
    'Archived',
  ];

  // Create CSV rows
  const rows = employees.map((emp) => [
    emp.id,
    emp.name,
    emp.department,
    emp.role,
    emp.joiningDate,
    emp.status,
    emp.performanceScore.toString(),
    emp.archived ? 'Yes' : 'No',
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => {
        // Escape commas and quotes in cell content
        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    ),
  ].join('\n');

  return csvContent;
};

/**
 * Download CSV file
 */
export const downloadCSV = (employees: Employee[], filename?: string): void => {
  if (employees.length === 0) {
    throw new Error('No employees to export');
  }

  const csvContent = convertToCSV(employees);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const finalFilename = filename || `employees_export_${timestamp}.csv`;

  // Create download link (Modern approach)
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = finalFilename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * Get export statistics
 */
export const getExportStats = (employees: Employee[]) => {
  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === 'Active').length,
    inactive: employees.filter((e) => e.status === 'Inactive').length,
    departments: {
      Engineering: employees.filter((e) => e.department === 'Engineering').length,
      Marketing: employees.filter((e) => e.department === 'Marketing').length,
      HR: employees.filter((e) => e.department === 'HR').length,
      Sales: employees.filter((e) => e.department === 'Sales').length,
    },
    avgPerformance:
      employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length || 0,
  };

  return stats;
};