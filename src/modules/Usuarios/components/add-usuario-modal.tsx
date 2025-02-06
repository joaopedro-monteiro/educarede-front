import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { Register } from "../commands/register-command";
import { UsuariosService } from "../services/usuarios-service";
import { toast } from "react-toastify";
import { Role } from "../commands/roles-command";

interface AdicionarUsuarioModalProps {
  onSaved: () => void;
}

const NovoUsuarioModal: React.FC<AdicionarUsuarioModalProps> = ({onSaved}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nomeDaEscola, setNomeDaEscola] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [roles, setRoles] = useState<Role[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const registerService = useMemo(() => new UsuariosService(), []);

  const handleOk = () => {
    // Remove o handleOk do onOk da modal
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    const novoUsuario: Register = {
      email: email,
      password: password,
      nomeDaEscola: nomeDaEscola,
      role: role,
    };

    registerService
      .register(novoUsuario)
      .then(() => {
        toast.success("Usuário registrado com sucesso!");
        onSaved();
        setIsModalOpen(false); // Fecha a modal apenas se o registro for bem-sucedido
        form.resetFields(); // Limpa os campos após o sucesso
      })
      .catch((error) => {
        console.log("Erro ao registrar usuário: ", error);
        toast.error("Erro ao registrar usuário!");
      });
  };

  const usuariosService = useMemo(() => new UsuariosService(), []);

  var refreshRoles = () => {
    usuariosService.getAllRoles().then((roles) => {
      setRoles(roles);
    });
  }
  

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Novo Usuário
      </Button>
      <Modal
        title="Adicionar Usuário"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Registrar
          </Button>,
        ]}
      >
        <Form form={form} onFinish={onFinish}>
          <Row gutter={20} justify="center">
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o e-mail!",
                  },
                  {
                    type: "email",
                    message: "Por favor, insira um e-mail válido!",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="E-mail"
                  size="large"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={25} justify="center">
            <Col span={12}>
              <Form.Item
                name="nomeDaEscola"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o nome da escola!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Nome da Escola"
                  size="large"
                  onChange={(e) => setNomeDaEscola(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={25} justify="center">
            <Col span={12}>
                <Form.Item
                    name="role"
                    rules={[
                    {
                        required: true,
                        message: "Por favor, insira o tipo de acesso!",
                    },
                    ]}
                >
                    <Select placeholder="Tipo de Acesso" size="large" onDropdownVisibleChange={refreshRoles} onSelect={(value) => setRole(value)}>
                        {
                            roles.map((role) => (
                                <Select.Option key={role.id} value={role.name}>
                                    {role.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={25} justify="center">
            <Col span={12}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, digite sua senha",
                  },
                  {
                    min: 6,
                    message: "A senha deve ter pelo menos 6 caracteres.",
                  },
                  {
                    pattern: /[^a-zA-Z0-9]/,
                    message:
                      "A senha deve conter pelo menos um caractere não alfanumérico.",
                  },
                  {
                    pattern: /[a-z]/,
                    message:
                      "A senha deve conter pelo menos uma letra minúscula ('a'-'z').",
                  },
                  {
                    pattern: /[A-Z]/,
                    message:
                      "A senha deve conter pelo menos uma letra maiúscula ('A'-'Z').",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Senha"
                  size="large"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={25} justify="center">
            <Col span={12}>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor, confirme sua senha!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "A senha que você digitou não é igual a senha acima!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="Confirme a senha" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default NovoUsuarioModal;
