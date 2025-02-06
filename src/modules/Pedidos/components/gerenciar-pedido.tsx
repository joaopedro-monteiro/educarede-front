import React, { useContext } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useParams } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import 'moment/locale/pt-br';
import FinalizarPedidoModal from "./finalizar-pedido-modal";
import { useGerenciarPedidos } from "../hooks/use-gerenciar-pedidos";
import { downloadPdf } from "../utils/download-guia-de-remessa-pdf-util";
import { AuthContext } from "../../../infrastructure/context/auth";

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
        {user.role === "Gestor" ? (
          <div>
            {guiaDeRemessaFirebase !== null ? (
              <p>
                Guia de Remessa com assinatura enviada para o sistema em:{" "}
                {moment(guiaDeRemessaFirebase.dataUpload).format(
                  "DD/MM/YYYY HH:mm"
                )}
                {" | "}
                <a href={guiaDeRemessaFirebase.url} target="_blank">
                  Clique aqui
                </a>{" "}
                para visualizar
              </p>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={() => downloadPdf(guiaDeRemessaId!, guiaDeRemessa!)}
                  icon={<DownloadOutlined />}
                >
                  <strong>Guia de Remessa</strong>
                </Button>
                <FinalizarPedidoModal
                  id={guiaDeRemessaId}
                  unidadeEscolar={guiaDeRemessa?.unidadeEscolar}
                  onSaved={fetchDataGuiaDeRemessaFirebase}
                />
              </>
            )}
          </div>
        ) : null}
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
