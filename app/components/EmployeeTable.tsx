import React from 'react';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Employee, departmentColors } from '../types/employee';
import { PerformanceBar } from './PerformanceBar';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  isArchived?: boolean;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  onEdit,
  onDelete,
  isArchived = false,
}) => {
  // Table columns configuration
  const columns: ColumnsType<Employee> = [
    {
      title: 'Employee ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: [
        { text: 'Engineering', value: 'Engineering' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'HR', value: 'HR' },
        { text: 'Sales', value: 'Sales' },
      ],
      onFilter: (value, record) => record.department === value,
      render: (department: Employee['department']) => (
        <Tag color={departmentColors[department]}>{department}</Tag>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Joining Date',
      dataIndex: 'joiningDate',
      key: 'joiningDate',
      sorter: (a, b) => new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Employee['status']) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'performanceScore',
      key: 'performanceScore',
      sorter: (a, b) => a.performanceScore - b.performanceScore,
      render: (score: number) => <PerformanceBar score={score} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 200,
      render: (_: any, record: Employee) => (
        <Space size="small">
          {!isArchived && (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            >
              Edit
            </Button>
          )}
          
          {isArchived ? (
            <Popconfirm
              title="Restore Employee"
              description={`Are you sure you want to restore ${record.name}?`}
              onConfirm={() => onDelete(record)}
              okText="Yes, Restore"
              cancelText="No"
            >
              <Button
                type="link"
                icon={<RollbackOutlined />}
              >
                Restore
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Archive Employee"
              description={`Are you sure you want to archive ${record.name}?`}
              onConfirm={() => onDelete(record)}
              okText="Yes, Archive"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employees}
      rowKey="id"
      loading={loading}
      scroll={{ x: 1200 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} employees`,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
    />
  );
};