import "antd/dist/reset.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Alert,
  theme as antdTheme,
} from "antd";

type TokenResponse = {
  access: string;
  refresh: string;
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const analyticsBase = (import.meta.env.VITE_ANALYTICS_API_BASE || "http://127.0.0.1:8000").replace(/\/$/, "");

  const { token } = antdTheme.useToken();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${analyticsBase}/api/analytics/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed.");
      }

      const data = (await response.json()) as TokenResponse;
      localStorage.setItem("analyticsAdminToken", data.access);
      localStorage.setItem("analyticsAdminRefreshToken", data.refresh);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
        background: token.colorFillQuaternary,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 16,
          boxShadow: token.boxShadowSecondary,
        }}
        bodyStyle={{ padding: 28 }}
      >
        <Space direction="vertical" size={18} style={{ width: "100%" }}>
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Admin Login
            </Typography.Title>
            <Typography.Text type="secondary">Sign in to access analytics.</Typography.Text>
          </div>

          {error && <Alert type="error" showIcon message={error} />}

          <Form layout="vertical" onFinish={handleFinish} requiredMark={false}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input placeholder="Enter username" autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter password" autoComplete="current-password" />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              block
              style={{
                height: 40,
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
