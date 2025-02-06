import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";
import { Register } from "../commands/register-command";
import { UsuariosService } from "../services/usuarios-service";
import { toast } from "react-toastify";
import { Role } from "../commands/roles-command";

interface EdiitarUsuarioModalProps {
  id?: string;
  emailAtual?: string;
  nomeDaEscolaAtual?: string;
  roleAtual?: string;
  onSaved: () => void;
}

const EditarUsuarioModal: React.FC<EdiitarUsuarioModalProps> = ({
  id,
  emailAtual,
  nomeDaEscolaAtual,
  roleAtual,
  onSaved,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nomeDaEscola, setNomeDaEscola] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [roles, setRoles] = useState<Role[]>([]);

  const showModal = () => {
    console.log("id: ", id);
    console.log("email: ", emailAtual);
    console.log("nome da escola: ", nomeDaEscolaAtual);
    console.log("role: ", roleAtual);
    setEmail(emailAtual!);
    setNomeDaEscola(nomeDaEscolaAtual!);
    setRole(roleAtual!);

    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Remove o handleOk do onOk da modal
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const registerService = useMemo(() => new UsuariosService(), []);

  const onFinish = (values: any) => {
    const editarUsuario: Register = {
      id: id,
      email: email,
      password: password,
      nomeDaEscola: nomeDaEscola,
      role: role,
    };

    registerService
      .update(editarUsuario)
      .then(() => {
        toast.success("Usuário editado com sucesso!");
        onSaved();
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        console.log("Erro ao editar usuário: ", error);
        toast.error("Erro ao editar usuário!");        
      });
  };

  const usuariosService = useMemo(() => new UsuariosService(), []);

  var refreshRoles = () => {
    usuariosService.getAllRoles().then((roles) => {
      setRoles(roles);
    });
  };

  return (
    <>
      <Tooltip title="Editar Usuário">
        <EditFilled onClick={showModal} />
      </Tooltip>
      <Modal
        title="Editar Usuário"        
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}        
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Editar
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            email: emailAtual,
            nomeDaEscola: nomeDaEscolaAtual,
            role: roleAtual,            
          }}
        >
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
                <Select
                  placeholder="Tipo de Acesso"
                  size="large"
                  onDropdownVisibleChange={refreshRoles}
                  onSelect={(value) => setRole(value)}
                >
                  {roles.map((role) => (
                    <Select.Option key={role.id} value={role.name}>
                      {role.name}
                    </Select.Option>
                  ))}
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
                    required: false,
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
                  placeholder="Nova Senha"
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
                    required: false,
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
                <Input.Password size="large" placeholder="Confirme a nova senha" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditarUsuarioModal;
