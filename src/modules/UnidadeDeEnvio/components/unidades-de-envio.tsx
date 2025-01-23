import React, { useEffect, useMemo, useState } from "react";
import { Col, Input, Row, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { UnidadeDeEnvio } from "../entity/unidade-de-envio";
import { UnidadeDeEnvioService } from "../service/unidade-de-envio-service";
import NovoFornecedorModal from "../../Fornecedor/components/add-fornecedor-modal";
import NovaUnidadeDeEnvioModal from "./add-unidade-de-envio-modal";
import EditarUnidadeDeEnvioModal from "./editar-unidade-de-envio";
import ExcluirUnidadeDeMedidaModal from "./excluir-unidade-de-envio";

interface DataType {
  key?: string;
  unidadeDeEnvio?: string;
  quantidadePorUnidade?: number;
  observacao?: string;  
}

const UnidadesDeEnvioPage: React.FC = () => {
  const [unidadesDeEnvio, setUnidadesDeEnvio] = useState<UnidadeDeEnvio[]>([]);
  const [unidadesDeEnvioSearched, setUnidadesDeEnvioSearched] = useState<string>("");  

  const columns: TableColumnsType<DataType> = [
    {
      title: "Unidade de Envio",
      dataIndex: "unidadeDeEnvio",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Quantidade por Unidade de Envio",
      dataIndex: "quantidadePorUnidade",        
    },
    {
      title: "Observação",
      dataIndex: "observacao",
    },    
    {
      title: "Ações",
      width: "2%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditarUnidadeDeEnvioModal
            id={record?.key}
            unidadeDeEnvio={record.unidadeDeEnvio}
            quantidadePorUnidade={record.quantidadePorUnidade}
            observacao={record.observacao}     
            onSaved={refreshUnidadeDeEnvio}       
          />
          <ExcluirUnidadeDeMedidaModal
            id={record?.key}
            unidadeDeEnvio={record.unidadeDeEnvio}
            quantidadePorUnidade={record.quantidadePorUnidade}
            observacao={record.observacao} 
            onSaved={refreshUnidadeDeEnvio}  
          />
        </div>
      ),
    },
  ];

  const unidadesDeEnvioFilter = unidadesDeEnvio.filter((unidadeDeEnvio) =>
    unidadeDeEnvio.unidadeDeEnvio?.toLowerCase().includes(unidadesDeEnvioSearched.toLowerCase())
  );

  const data = unidadesDeEnvioFilter.map((unidadeDeEnvio) => {
    return {
      key: unidadeDeEnvio.id,
      unidadeDeEnvio: unidadeDeEnvio.unidadeDeEnvio,
      quantidadePorUnidade: unidadeDeEnvio.quantidadePorUnidade,
      observacao: unidadeDeEnvio.observacao,      
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

  var unidadeDeEnvioService = useMemo(() => new UnidadeDeEnvioService(), []);

  var refreshUnidadeDeEnvio = () => {
    unidadeDeEnvioService.getAll().then((unidadesDeEnvio) => {
      setUnidadesDeEnvio(unidadesDeEnvio);
    });
  }

  useEffect (()=> refreshUnidadeDeEnvio(), []);

  return (
    <div>
      <Row justify="space-between" align="middle" style={{marginBottom: "10px"}}>
        <Col span={20} style={{paddingBottom: "5px"}}>
          <Input.Search
            placeholder="Pesquisar"
            enterButton
            onChange={(e) => setUnidadesDeEnvioSearched(e.target.value)}            
          />
        </Col>
        <Col style={{paddingBottom: "5px"}}>
          <NovaUnidadeDeEnvioModal typeButton="primary" onSaved={refreshUnidadeDeEnvio}  />
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

export default UnidadesDeEnvioPage;
