import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { UsuariosService } from "../services/usuarios-service";
import { User } from "../../Login/commands/user-command";
import { Link } from "react-router-dom";
import NovoUsuarioModal from "./add-usuario-modal";
import EditarUsuarioModal from "./editar-usuario-modal";
import ExcluirUsuarioModal from "./excluir-usuario";

const Usuarios: React.FC = () => {
  interface DataType {
    key?: string;
    email?: string;
    nomeDaEscola?: string;
    role?: string;
  }

  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [usuariosSearched, setUsuariosSearched] = useState<string>("");

  const columns: TableColumnsType<DataType> = [
    {
      title: "E-mail",
      dataIndex: "email",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Nome da Escola",
      dataIndex: "nomeDaEscola",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Tipo de Acesso",
      dataIndex: "role",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Ações",
      width: "2%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditarUsuarioModal
            id={record.key}
            emailAtual={record.email}
            nomeDaEscolaAtual={record.nomeDaEscola}
            roleAtual={record.role}
            onSaved={refreshUsuarios}
          />
          <ExcluirUsuarioModal
            id={record.key}
            email={record.email}
            nomeDaEscola={record.nomeDaEscola}
            role={record.role}
            onSaved={refreshUsuarios}
          />
        </div>
      ),
    },
  ];

  const usuariosFilter = usuarios.filter((usuario) =>
    usuario.nomeDaEscola?.toLowerCase().includes(usuariosSearched.toLowerCase())
  );

  const data = usuariosFilter.map((usuario) => {
    return {
      key: usuario.id,
      email: usuario.email,
      nomeDaEscola: usuario.nomeDaEscola,
      role: usuario.role,
    };
  });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  var usuariosService = useMemo(() => new UsuariosService(), []);

  var refreshUsuarios = () => {
    usuariosService.getAllUsers().then((usuariosCarregados) => {
      setUsuarios(usuariosCarregados);
    });
  };

  useEffect(() => refreshUsuarios(), []);

  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "10px" }}
      >
        <Col span={22} style={{ paddingBottom: "5px" }}>
          <Input.Search
            placeholder="Pesquisar"
            enterButton
            onChange={(e) => setUsuariosSearched(e.target.value)}
          />
        </Col>
        <Col style={{ paddingBottom: "5px" }}>
          <NovoUsuarioModal onSaved={refreshUsuarios} />
        </Col>
      </Row>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        footer={() => (<span style={{color: "red"}}><InfoCircleOutlined /> Não altere o 'Tipo de Acesso' do seu usuário, isso poderá causar problemas no sistema!</span>)}
      />
    </div>
  );
};

export default Usuarios;
