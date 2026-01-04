import React, { useState } from 'react';
import { Button, Dropdown, Modal, message, Space, Statistic, Row, Col } from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Employee } from '../types/employee';
import { downloadCSV, getExportStats } from '../utils/exportCSV';

interface ExportButtonProps {
  employees: Employee[];
  filteredEmployees: Employee[];
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  employees,
  filteredEmployees,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Handle export all employees
  const handleExportAll = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      downloadCSV(employees, `all_employees_${new Date().toISOString().split('T')[0]}.csv`);
      message.success(`Successfully exported ${employees.length} employees!`);
    } catch (error) {
      message.error('Failed to export data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle export filtered employees
  const handleExportFiltered = async () => {
    try {
      if (filteredEmployees.length === 0) {
        message.warning('No employees to export');
        return;
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      downloadCSV(
        filteredEmployees,
        `filtered_employees_${new Date().toISOString().split('T')[0]}.csv`
      );
      message.success(`Successfully exported ${filteredEmployees.length} employees!`);
    } catch (error) {
      message.error('Failed to export data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Show export preview modal
  const handleShowPreview = () => {
    setModalVisible(true);
  };

  // Get statistics
  const stats = getExportStats(filteredEmployees);

  // Dropdown menu items
  const menuItems: MenuProps['items'] = [
    {
      key: 'filtered',
      label: 'Export Filtered Data',
      icon: <FileExcelOutlined />,
      onClick: handleExportFiltered,
      disabled: filteredEmployees.length === 0,
    },
    {
      key: 'all',
      label: 'Export All Data',
      icon: <FileExcelOutlined />,
      onClick: handleExportAll,
      disabled: employees.length === 0,
    },
    {
      type: 'divider',
    },
    {
      key: 'preview',
      label: 'View Export Info',
      icon: <InfoCircleOutlined />,
      onClick: handleShowPreview,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: menuItems }} placement="bottomRight" disabled={disabled}>
        <Button
          icon={<DownloadOutlined />}
          loading={loading}
          disabled={disabled}
          size="large"
        >
          Export CSV
        </Button>
      </Dropdown>

      {/* Export Info Modal */}
      <Modal
        title="Export Information"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="export"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              handleExportFiltered();
              setModalVisible(false);
            }}
            disabled={filteredEmployees.length === 0}
          >
            Export Now
          </Button>,
        ]}
      >
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <h4 style={{ marginBottom: 16 }}>Current Selection Statistics:</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Total Employees" value={stats.total} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Avg Performance"
                  value={stats.avgPerformance.toFixed(1)}
                  suffix="%"
                />
              </Col>
            </Row>
          </div>

          <div>
            <h4 style={{ marginBottom: 16 }}>By Status:</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Active" value={stats.active} valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Inactive"
                  value={stats.inactive}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Col>
            </Row>
          </div>

          <div>
            <h4 style={{ marginBottom: 16 }}>By Department:</h4>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Engineering" value={stats.departments.Engineering} />
              </Col>
              <Col span={12}>
                <Statistic title="Marketing" value={stats.departments.Marketing} />
              </Col>
              <Col span={12}>
                <Statistic title="HR" value={stats.departments.HR} />
              </Col>
              <Col span={12}>
                <Statistic title="Sales" value={stats.departments.Sales} />
              </Col>
            </Row>
          </div>

          <div
            style={{
              padding: 12,
              background: '#f0f5ff',
              border: '1px solid #adc6ff',
              borderRadius: 4,
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: '#1890ff' }}>
              💡 <strong>Note:</strong> The export will include all visible employees based on your
              current filters.
            </p>
          </div>
        </Space>
      </Modal>
    </>
  );
};