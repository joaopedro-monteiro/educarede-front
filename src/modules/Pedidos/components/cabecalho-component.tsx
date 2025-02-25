import moment from "moment";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import {
  GuiaDeRemessaFirebase,
  useGerenciarPedidos,
} from "../hooks/use-gerenciar-pedidos";
import { Button, Spin } from "antd";
import { downloadPdf } from "../utils/download-guia-de-remessa-pdf-util";
import { DownloadOutlined } from "@ant-design/icons";
import RecusarPedidoModal from "./recusar-pedido-modal";
import FinalizarPedidoModal from "./finalizar-pedido-modal";

interface CabecalhoGerenciarPedidosProps {
  guiaDeRemessaFirebase: GuiaDeRemessaFirebase;
  guiaDeRemessaId: string;
  guiaDeRemessa: GuiaDeRemessa;
  userRole: string;
}

function CabecalhoGerenciarPedidos({
  guiaDeRemessaFirebase,
  guiaDeRemessaId,
  guiaDeRemessa,
  userRole
}: CabecalhoGerenciarPedidosProps) {
  const { fetchDataGuiaDeRemessaFirebase } = useGerenciarPedidos(
    guiaDeRemessaId!
  );

  if(!guiaDeRemessa){
    return <Spin fullscreen={true}/>
  }

  let mensagem;

  if (guiaDeRemessaFirebase !== null) {
    mensagem = (
      <p>
        Guia de Remessa com assinatura enviada para o sistema em:{" "}
        {moment(guiaDeRemessaFirebase.dataUpload).format("DD/MM/YYYY HH:mm")}
        {" | "}
        <a href={guiaDeRemessaFirebase.url} target="_blank">
          Clique aqui
        </a>{" "}
        para visualizar
      </p>
    );
  } else if (guiaDeRemessa.recusado) {
    mensagem = (
      <p>
        Este pedido foi recusado em:{" "}
        <strong>
          {moment(guiaDeRemessa.dataRecusa).format("DD/MM/YYYY HH:mm")}
        </strong>{" "}
        | Motivo: <strong>{guiaDeRemessa.motivoRecusa}</strong>
      </p>
    );
  } else if(userRole === "Gestor"){
    mensagem = (
      <>
        <div style={{ gap: "10px", display: "flex" }}>
          <Button
            type="primary"
            onClick={() => downloadPdf(guiaDeRemessaId!, guiaDeRemessa!)}
            icon={<DownloadOutlined />}
          >
            <strong>Guia de Remessa</strong>
          </Button>        
          <RecusarPedidoModal guiaDeRemessaId={guiaDeRemessa?.id} />
          <FinalizarPedidoModal
            id={guiaDeRemessaId}
            unidadeEscolar={guiaDeRemessa?.unidadeEscolar}
            onSaved={fetchDataGuiaDeRemessaFirebase}
          />
        </div>
      </>
    );
  }

  else {
    mensagem = <p></p>
  }

  return mensagem;
}

export default CabecalhoGerenciarPedidos;
