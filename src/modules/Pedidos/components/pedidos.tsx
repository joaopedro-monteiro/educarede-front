import React, { useContext, useEffect, useMemo, useState } from "react";
import { Col, Input, Row, Table, Tag, Tooltip } from "antd";
import { Button, TableColumnsType, TableProps } from "antd";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import moment from "moment";
import "moment/locale/pt-br";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { downloadPdf } from "../utils/download-guia-de-remessa-pdf-util";
import { usePedidos } from "../hooks/use-pedidos";
import { AuthContext } from "../../../infrastructure/context/auth";
import DataDeEntregaPedidosComponent from "./data-de-entrega-component";
import ExcluirPedidoModal from "./excluir-pedido-modal";

export interface PedidosInterface {
  key?: string;
  unidadeEscolar?: string;
  dataDaEmissao?: Date;
  dataDaEntrega?: Date;
  idUsuario?: string;
  recusado?: boolean;
  dataRecusa?: Date;
  motivoRecusa?: string;
}

const PedidosPage: React.FC = () => {
  const navigate = useNavigate();
  const { pedidos, refreshFornecedores } = usePedidos();
  const [pedidosSerched, setPedidosSerched] = useState<string>("");
  const { user } = useContext(AuthContext);

  const columns: TableColumnsType<PedidosInterface> = [
    {
      title: "Unidade Escolar",
      dataIndex: "unidadeEscolar",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Data de Emissão",
      dataIndex: "dataDaEmissao",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        moment(a.dataDaEmissao).unix() - moment(b.dataDaEmissao).unix(),
      render: (dataDaEmissao) =>
        moment(dataDaEmissao).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Data de Entrega",
      dataIndex: "dataDaEntrega",
      render: (_, record) => <DataDeEntregaPedidosComponent pedido={record} />,
    },
    {
      title: "Ações",
      width: "10%",
      dataIndex: "acoes",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Tooltip title="Visualizar">
            <Button onClick={() => handleRedirect(record.key!)}>
              <SearchOutlined />
            </Button>
          </Tooltip>
          {user?.role === "Gestor" ? (
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
          ) : null}
          {
            (record.idUsuario == user?.id && record.dataDaEntrega == null && record.recusado == false) ? (
              <ExcluirPedidoModal id={record.key!} dataDaEmissao={record.dataDaEmissao!} unidadeEscolar={record.unidadeEscolar!} onSaved={refreshFornecedores}/>
            ) : null
          }
        </div>
      ),
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
      idUsuario: pedido.idUsuario,
      recusado: pedido.recusado,
      dataRecusa: pedido.dataRecusa,
      motivoRecusa: pedido.motivoRecusa,
    };
  });

  const onChange: TableProps<PedidosInterface>["onChange"] = (
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

      <Table<PedidosInterface>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default PedidosPage;
