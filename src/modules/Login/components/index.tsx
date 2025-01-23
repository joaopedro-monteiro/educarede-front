import React from "react";
import { Form, Input, Button, Card, Typography, Row, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginService } from "../services/login-service";
import { Login } from "../commands/login-command";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/user-service";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const loginService = new LoginService();
    const userService = new UserService();

    try {
      const login = new Login();
      login.email = email;
      login.password = password;

      const response = await loginService.login(login);
      console.log(response);
      toast.success("Login efetuado com sucesso!");
      
      

      userService.user()
      .then((res) => {
        console.log(res);
        navigate("/produtos");
      });

    } catch (error) {
      console.log(error);
      toast.error("Erro ao efetuar login!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "96vh",
        backgroundColor: "#f0f2f5",
        padding: "16px",
      }}
    >
      <Card
        style={{ maxWidth: "400px", width: "100%", minHeight: "500px" }}
        bordered
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu email!" },
              { type: "email", message: "Por favor, insira um email válido!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <Row style={{ height: "150px" }} align={"middle"}>
          <Image
            preview={false}
            src="https://firebasestorage.googleapis.com/v0/b/tickets-7246a.appspot.com/o/imagens%2FLOGO%20PREFEITURA%20MUNICIPAL%20DE%20BOM%20DESPACHO.png?alt=media&token=16daff62-b30e-4814-bd41-0fe94f7df49d"
          />
        </Row>
      </Card>
    </div>
  );
};

export default LoginPage;
