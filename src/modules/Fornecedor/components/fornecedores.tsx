import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import { Fornecedor } from "../entity/fornecedor";
import { FornecedorService } from "../service/fornecedor-service";
import { cnpjMask } from "../../../infrastructure/helpers/cnpj-mask";
import NovoFornecedorModal from "./add-fornecedor-modal";
import EditarFornecedorModal from "./editar-fornecedor-modal";
import ExcluirFornecedorModal from "./excluir-fornecedor-modal";

interface DataType {
  key?: string;
  nome?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
}

const FornecedoresPage: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [fornecedoresSearched, setFornecedoresSerched] = useState<string>("");  

  const columns: TableColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "nome",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",  
      render: (cnpj) => cnpjMask(cnpj),    
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
    },
    {
      title: "E-mail",
      dataIndex: "email",      
    },
    {
      title: "Ações",
      width: "2%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditarFornecedorModal
            id={record?.key}
            nome={record.nome}
            cnpj={record.cnpj}
            telefone={record.telefone}
            email={record.email}
            onSaved={refreshFornecedores}
          />
          <ExcluirFornecedorModal
            id={record.key!}
            nome={record.nome!}
            cnpj={record.cnpj!}
            telefone={record.telefone!}
            email={record.email!}
            onSaved={refreshFornecedores}
          />
        </div>
      ),
    },
  ];

  const fornecedoresFilter = fornecedores.filter((fornecedor) =>
    fornecedor.nome?.toLowerCase().includes(fornecedoresSearched.toLowerCase())
  );

  const data = fornecedoresFilter.map((fornecedor) => {
    return {
      key: fornecedor.id,
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      telefone: fornecedor.telefone,
      email: fornecedor.email,
    };
  });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // setFornecedorFilter((filters.fornecedor as React.Key[]) || []);
    console.log("params", pagination, filters, sorter, extra);
  };

  var fornecedorService = useMemo(() => new FornecedorService(), []);

  var refreshFornecedores = () => {
    fornecedorService.getAll().then((fornecedores) => {
      setFornecedores(fornecedores);
    });
  }

  useEffect(() => refreshFornecedores(), []);

  return (
    <div>
      <Row justify="space-between" align="middle" style={{marginBottom: "10px"}}>
        <Col span={21} style={{paddingBottom: "5px"}}>
          <Input.Search
            placeholder="Pesquisar"
            enterButton
            onChange={(e) => setFornecedoresSerched(e.target.value)}            
          />
        </Col>
        <Col style={{paddingBottom: "5px"}}>
          <NovoFornecedorModal typeButton="primary" onSaved={refreshFornecedores} />
        </Col>
      </Row>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default FornecedoresPage;
