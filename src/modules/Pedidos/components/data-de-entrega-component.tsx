import moment from "moment";
import { PedidosInterface } from "./pedidos";
import { Spin, Tag, Tooltip } from "antd";
import { CheckOutlined, CloseCircleOutlined, InfoCircleFilled, InfoCircleOutlined } from "@ant-design/icons";

interface DataDeEntregaPedidosProps {
  pedido: PedidosInterface;
}

function DataDeEntregaPedidosComponent({ pedido }: DataDeEntregaPedidosProps) {
  let mensagem;

  if(!pedido){
    return <Spin fullscreen={true}/>
  }

  if (pedido.dataDaEntrega) {
    mensagem = <Tag icon={<CheckOutlined />} color="green">{moment(pedido.dataDaEntrega).format("DD/MM/YYYY")}</Tag>;
  } else if(pedido.recusado) {
    mensagem = <div><Tag icon={<CloseCircleOutlined />} color="#5c0011">Recusado</Tag> <Tooltip title={<p><strong>Recusado em:</strong> {moment(pedido.dataRecusa).format("DD/MM/YYYY HH:mm")} <br /><strong>Motivo:</strong> {pedido.motivoRecusa}</p>}><InfoCircleOutlined /></Tooltip></div>;
  } 
  else {
    mensagem = <Tag color="red">Não entregue</Tag>;
  }

  return mensagem;
}

export default DataDeEntregaPedidosComponent;
