import React, { useEffect, useState } from "react";
import { Col, Input, Row, Table, Tag, Tooltip } from "antd";
import { Button, TableColumnsType, TableProps } from "antd";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { downloadPdf } from '../utils/download-guia-de-remessa-pdf-util';
import { usePedidos } from "../hooks/use-pedidos";

interface DataType {
  key?: string;
  unidadeEscolar?: string;
  dataDaEmissao?: Date;
  dataDaEntrega?: Date;
}

const PedidosPage: React.FC = () => {
  const navigate = useNavigate();
  const { pedidos } = usePedidos();
  const [pedidosSerched, setPedidosSerched] = useState<string>("");

  const columns: TableColumnsType<DataType> = [
    {
      title: "Unidade Escolar",
      dataIndex: "unidadeEscolar",
      showSorterTooltip: { target: "full-header" },
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      // ],
      // // specify the condition of filtering result
      // // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ['descend'],
    },
    {
      title: "Data de Emissão",
      dataIndex: "dataDaEmissao",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        moment(a.dataDaEmissao).unix() - moment(b.dataDaEmissao).unix(),
      render: (dataDaEmissao) =>
        moment(dataDaEmissao).format("DD/MM/YYYY hh:mm"),
    },
    {
      title: "Data de Entrega",
      dataIndex: "dataDaEntrega",
      render: (dataDaEntrega) => {
        return dataDaEntrega ? (
          moment(dataDaEntrega).format("DD/MM/YYYY")
        ) : (
          <Tag color="red">Não entregue</Tag>
        );
      },
    },
    {
      title: "Ações",
      width: "10%",
      dataIndex: "acoes",
      render: (_, record) =>
        record.key ? (
          <div style={{ display: "flex", gap: 5 }}>
            <Tooltip title="Visualizar">
              <Button onClick={() => handleRedirect(record.key!)}>
                <SearchOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Baixar Guia de Remessa">
              <Button
                type="primary"
                onClick={() =>
                  downloadPdf(record.key!, record as GuiaDeRemessa)
                }
              >
                <DownloadOutlined />
              </Button>
            </Tooltip>
          </div>
        ) : null,
    },
  ];

  function handleRedirect(id: string) {
    const guiaDeRemessaId = id;
    navigate(`/pedidos/gerenciar/${guiaDeRemessaId}`);
  }

  const pedidosFilter = pedidos.filter((pedido) =>
    pedido.unidadeEscolar?.toLowerCase().includes(pedidosSerched.toLowerCase())
  );

  const data = pedidosFilter.map((pedido) => {
    return {
      key: pedido.id,
      unidadeEscolar: pedido.unidadeEscolar,
      dataDaEmissao: pedido.dataDaEmissao,
      dataDaEntrega: pedido.dataDaEntrega,
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

  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "10px" }}
      >
        <Col span={24} style={{ paddingBottom: "5px" }}>
          <Input.Search
            placeholder="Pesquisar"
            enterButton
            onChange={(e) => setPedidosSerched(e.target.value)}
          />
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

export default PedidosPage;
