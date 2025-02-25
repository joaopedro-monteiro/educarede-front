import React, { useContext, useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  ProductFilled,
  ShopFilled,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, Tag, theme, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../../infrastructure/context/auth";

interface NavbarProps {
  children: React.ReactNode;
  tituloDaPagina: string;
}

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Navbar: React.FC<NavbarProps> = ({ children, tituloDaPagina }) => {
  const { user, logout } = useContext(AuthContext);

  const items: MenuItem[] = [

    getItem(
      <Link to="/guia-de-remessa">Guia de Remessa</Link>,
      "1",
      <PieChartOutlined />
    ),    
    getItem(<Link to="/pedidos">Pedidos</Link>, "2", <DesktopOutlined />),
  ];

  if(user?.role === "Gestor") {
    items.push(getItem(<Link to="/produtos">Produtos</Link>, "3", <ProductFilled />));
    items.push(getItem(<Link to="/fornecedores">Fornecedores</Link>, "4", <ShopFilled />));
    items.push(getItem(<Link to="/unidades-de-envio">Unidades de Envio</Link>, "5", <DesktopOutlined />));   
    items.push(getItem(<Link to="/usuarios">Usuários</Link>, "6", <UserOutlined />));    
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  async function deslogarHandle() {
    logout();
  }

  function mostrarUser() {
    console.log(JSON.stringify(user));
    console.log("nome da escola: ", user?.nomeDaEscola);
    console.log("email: ", user?.email);
    console.log("role: ", user?.role);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: "transparent" }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{user?.nomeDaEscola}</Breadcrumb.Item>
              <Breadcrumb.Item>{tituloDaPagina}</Breadcrumb.Item>
            </Breadcrumb>
            <p>
              Você está logado como:{" "}
              <Tag color="blue">{user?.nomeDaEscola}</Tag>|{" "}
              <Button
                onClick={deslogarHandle}
                type="link"
                style={{ textDecoration: "underline" }}
              >
                Sair
              </Button>
            </p>
          </div>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
