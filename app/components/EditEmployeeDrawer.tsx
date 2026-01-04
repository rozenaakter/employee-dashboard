import React, { useEffect } from 'react';
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
  Divider,
} from 'antd';
import { Employee } from '../types/employee';
import dayjs, { Dayjs } from 'dayjs';

interface EditEmployeeDrawerProps {
  open: boolean;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  employee: Employee | null;
}

interface FormValues {
  name: string;
  department: Employee['department'];
  role: string;
  joiningDate: Dayjs;
  status: Employee['status'];
  performanceScore: number;
}

export const EditEmployeeDrawer: React.FC<EditEmployeeDrawerProps> = ({
  open,
  onClose,
  onEdit,
  employee,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = React.useState(false);

  // Pre-fill form when employee data changes
  useEffect(() => {
    if (employee && open) {
      form.setFieldsValue({
        name: employee.name,
        department: employee.department,
        role: employee.role,
        joiningDate: dayjs(employee.joiningDate),
        status: employee.status,
        performanceScore: employee.performanceScore,
      });
    }
  }, [employee, open, form]);

  // Handle form submit
  const handleSubmit = async () => {
    if (!employee) return;

    try {
      setLoading(true);
      const values = await form.validateFields();

      const updatedEmployee: Employee = {
        ...employee,
        name: values.name,
        department: values.department,
        role: values.role,
        joiningDate: values.joiningDate.format('YYYY-MM-DD'),
        status: values.status,
        performanceScore: values.performanceScore,
      };

      onEdit(updatedEmployee);
      message.success(`${values.name} updated successfully!`);
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

  if (!employee) return null;

  return (
    <Drawer
      title="Edit Employee"
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
            Save Changes
          </Button>
        </Space>
      }
    >
      {/* Employee ID Display */}
      <div
        style={{
          marginBottom: 16,
          padding: 12,
          background: '#f0f5ff',
          border: '1px solid #adc6ff',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#1890ff' }}>
          <strong>Employee ID:</strong> {employee.id}
        </p>
      </div>

      <Form form={form} layout="vertical" requiredMark="optional">
        {/* Name Field */}
        <Form.Item
          name="name"
          label="Employee Name"
          rules={[
            { required: true, message: 'Please enter employee name' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input placeholder="e.g., John Doe" size="large" />
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
          <Input placeholder="e.g., Senior Developer" size="large" />
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

      <Divider />

      {/* Info Message */}
      <div
        style={{
          padding: 12,
          background: '#fffbe6',
          border: '1px solid #ffe58f',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#faad14' }}>
          ⚠️ <strong>Note:</strong> Changes will be saved immediately and cannot
          be undone.
        </p>
      </div>
    </Drawer>
  );
};