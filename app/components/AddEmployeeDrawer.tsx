import React from 'react';
import {
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Space,
  message,
} from 'antd';
import { Employee } from '../types/employee';
import dayjs, { Dayjs } from 'dayjs';

interface AddEmployeeDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
  existingIds: string[];
}

interface FormValues {
  name: string;
  department: Employee['department'];
  role: string;
  joiningDate: Dayjs;
  status: Employee['status'];
  performanceScore: number;
}

export const AddEmployeeDrawer: React.FC<AddEmployeeDrawerProps> = ({
  open,
  onClose,
  onAdd,
  existingIds,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = React.useState(false);

  // Generate new employee ID
  const generateEmployeeId = (): string => {
    if (existingIds.length === 0) return 'EMP001';
    
    const numbers = existingIds.map(id => parseInt(id.replace('EMP', '')));
    const maxNumber = Math.max(...numbers);
    const newNumber = maxNumber + 1;
    
    return `EMP${newNumber.toString().padStart(3, '0')}`;
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const newEmployee: Employee = {
        id: generateEmployeeId(),
        name: values.name,
        department: values.department,
        role: values.role,
        joiningDate: values.joiningDate.format('YYYY-MM-DD'),
        status: values.status,
        performanceScore: values.performanceScore,
        archived: false,
      };

      onAdd(newEmployee);
      message.success('Employee added successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle drawer close
  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Add New Employee"
      size="large"
      onClose={handleClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Add Employee
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
      >
        {/* Name Field */}
        <Form.Item
          name="name"
          label="Employee Name"
          rules={[
            { required: true, message: 'Please enter employee name' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input
            placeholder="e.g., John Doe"
            size="large"
          />
        </Form.Item>

        {/* Department Field */}
        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select
            placeholder="Select department"
            size="large"
            options={[
              { label: '💻 Engineering', value: 'Engineering' },
              { label: '📢 Marketing', value: 'Marketing' },
              { label: '👥 HR', value: 'HR' },
              { label: '💰 Sales', value: 'Sales' },
            ]}
          />
        </Form.Item>

        {/* Role Field */}
        <Form.Item
          name="role"
          label="Role"
          rules={[
            { required: true, message: 'Please enter role' },
            { min: 2, message: 'Role must be at least 2 characters' },
          ]}
        >
          <Input
            placeholder="e.g., Senior Developer"
            size="large"
          />
        </Form.Item>

        {/* Joining Date Field */}
        <Form.Item
          name="joiningDate"
          label="Joining Date"
          rules={[
            { required: true, message: 'Please select joining date' },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                if (value.isAfter(dayjs())) {
                  return Promise.reject('Joining date cannot be in the future');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            style={{ width: '100%' }}
            size="large"
            format="YYYY-MM-DD"
            disabledDate={(current) => current && current.isAfter(dayjs())}
          />
        </Form.Item>

        {/* Status Field */}
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select
            placeholder="Select status"
            size="large"
            options={[
              { label: '✅ Active', value: 'Active' },
              { label: '❌ Inactive', value: 'Inactive' },
            ]}
          />
        </Form.Item>

        {/* Performance Score Field */}
        <Form.Item
          name="performanceScore"
          label="Performance Score"
          rules={[
            { required: true, message: 'Please enter performance score' },
            {
              type: 'number',
              min: 1,
              max: 100,
              message: 'Score must be between 1 and 100',
            },
          ]}
          tooltip="Enter a score between 1-100"
        >
          <InputNumber
            style={{ width: '100%' }}
            size="large"
            min={1}
            max={100}
            placeholder="e.g., 85"
            addonAfter="%"
          />
        </Form.Item>
      </Form>

      {/* Info Message */}
      <div style={{
        marginTop: 16,
        padding: 12,
        background: '#f0f5ff',
        border: '1px solid #adc6ff',
        borderRadius: 4,
      }}>
        <p style={{ margin: 0, fontSize: 13, color: '#1890ff' }}>
          💡 <strong>Note:</strong> Employee ID will be auto-generated as {generateEmployeeId()}
        </p>
      </div>
    </Drawer>
  );
};