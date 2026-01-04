// Employee Type Definition
export interface Employee {
  id: string;
  name: string;
  department: 'Engineering' | 'Marketing' | 'HR' | 'Sales';
  role: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
  performanceScore: number;
  archived: boolean;
}

// Department color mapping
export const departmentColors: Record<Employee['department'], string> = {
  Engineering: 'blue',
  Marketing: 'green',
  HR: 'orange',
  Sales: 'purple',
};

// Sample/Mock Data
export const initialEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Jon Doe',
    department: 'Engineering',
    role: 'Senior Developer',
    joiningDate: '2024-01-15',
    status: 'Active',
    performanceScore: 85,
    archived: false,
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    department: 'Marketing',
    role: 'Marketing Manager',
    joiningDate: '2023-11-20',
    status: 'Active',
    performanceScore: 92,
    archived: false,
  },
  {
    id: 'EMP003',
    name: 'Mike Johnson',
    department: 'HR',
    role: 'HR Executive',
    joiningDate: '2024-03-10',
    status: 'Inactive',
    performanceScore: 78,
    archived: false,
  },
  {
    id: 'EMP004',
    name: 'Sarah Williams',
    department: 'Sales',
    role: 'Sales Lead',
    joiningDate: '2023-08-05',
    status: 'Active',
    performanceScore: 88,
    archived: false,
  },
  {
    id: 'EMP005',
    name: 'David Brown',
    department: 'Engineering',
    role: 'Junior Developer',
    joiningDate: '2024-05-22',
    status: 'Active',
    performanceScore: 72,
    archived: false,
  },
];