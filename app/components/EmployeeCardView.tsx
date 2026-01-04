import React from 'react';
import { Card, Tag, Button, Space, Row, Col, Popconfirm, Empty, Spin } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
  UserOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Employee, departmentColors } from '../types/employee';
import { PerformanceBar } from './PerformanceBar';

interface EmployeeCardViewProps {
  employees: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  isArchived?: boolean;
}

export const EmployeeCardView: React.FC<EmployeeCardViewProps> = ({
  employees,
  loading,
  onEdit,
  onDelete,
  isArchived = false,
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Empty description="No employees found" />
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {employees.map((employee) => (
        <Col key={employee.id} xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card
            hoverable
            style={{
              height: '100%',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.3s',
            }}
            styles={{
              body: {
                padding: 20,
              },
            }}
          >
            {/* Header Section */}
            <div style={{ marginBottom: 16 }}>
              {/* Employee ID */}
              <div
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                {employee.id}
              </div>

              {/* Name */}
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#1f1f1f',
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <UserOutlined style={{ color: '#1890ff' }} />
                {employee.name}
              </div>

              {/* Role */}
              <div
                style={{
                  fontSize: 13,
                  color: '#666',
                  marginBottom: 12,
                }}
              >
                {employee.role}
              </div>

              {/* Department & Status Tags */}
              <Space size={8}>
                <Tag color={departmentColors[employee.department]}>
                  {employee.department}
                </Tag>
                <Tag color={employee.status === 'Active' ? 'green' : 'red'}>
                  {employee.status}
                </Tag>
              </Space>
            </div>

            {/* Info Section */}
            <div
              style={{
                background: '#fafafa',
                padding: 12,
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              {/* Joining Date */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                  fontSize: 13,
                  color: '#666',
                }}
              >
                <CalendarOutlined style={{ color: '#1890ff' }} />
                <span>Joined: {employee.joiningDate}</span>
              </div>

              {/* Performance Score */}
              <div style={{ marginBottom: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8,
                    fontSize: 13,
                    color: '#666',
                  }}
                >
                  <TrophyOutlined style={{ color: '#faad14' }} />
                  <span>Performance</span>
                </div>
                <PerformanceBar score={employee.performanceScore} />
              </div>
            </div>

            {/* Actions */}
            <Space size="small" style={{ width: '100%', justifyContent: 'center' }}>
              {!isArchived && (
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(employee)}
                  style={{ flex: 1 }}
                >
                  Edit
                </Button>
              )}

              {isArchived ? (
                <Popconfirm
                  title="Restore Employee"
                  description={`Restore ${employee.name}?`}
                  onConfirm={() => onDelete(employee)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    icon={<RollbackOutlined />}
                    style={{ flex: 1 }}
                  >
                    Restore
                  </Button>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title="Archive Employee"
                  description={`Archive ${employee.name}?`}
                  onConfirm={() => onDelete(employee)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ danger: true }}
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    style={{ flex: 1 }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};