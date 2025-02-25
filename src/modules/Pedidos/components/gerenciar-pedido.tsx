import React, { useContext, useMemo } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  DownloadOutlined,
  XOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/pt-br";
import FinalizarPedidoModal from "./finalizar-pedido-modal";
import { useGerenciarPedidos } from "../hooks/use-gerenciar-pedidos";
import { downloadPdf } from "../utils/download-guia-de-remessa-pdf-util";
import { AuthContext } from "../../../infrastructure/context/auth";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { toast } from "react-toastify";
import RecusarPedidoModal from "./recusar-pedido-modal";
import CabecalhoGerenciarPedidos from "./cabecalho-component";

interface DataType {
  key?: React.Key;
  produtoNome?: string;
  quantidade?: number;
}

const GerenciarPedidosPage: React.FC = () => {
  const { guiaDeRemessaId } = useParams<{ guiaDeRemessaId: string }>();
  const {
    pedidos,
    guiaDeRemessa,
    guiaDeRemessaFirebase,
    fetchDataGuiaDeRemessaFirebase,
  } = useGerenciarPedidos(guiaDeRemessaId!);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Produto",
      dataIndex: "produtoNome",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
    },
  ];

  const data: DataType[] = pedidos.map((pedido) => {
    return {
      key: pedido.id,
      produtoNome: pedido.produtoNome,
      quantidade: pedido.quantidade,
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Detalhes do Pedido</h3>
        <CabecalhoGerenciarPedidos
          guiaDeRemessaId={guiaDeRemessaId!}
          guiaDeRemessaFirebase={guiaDeRemessaFirebase!}
          guiaDeRemessa={guiaDeRemessa!}
          userRole={user?.role!}
        />
      </div>
      <div>
        <Table<DataType>
          columns={columns}
          dataSource={data}
          onChange={onChange}
          footer={() =>
            `Pedido emitido por: ${guiaDeRemessa?.unidadeEscolar} em ${moment(
              guiaDeRemessa?.dataDaEmissao
            ).format("DD/MM/YYYY hh:mm")}`
          }
        />
      </div>
    </div>
  );
};

export default GerenciarPedidosPage;
