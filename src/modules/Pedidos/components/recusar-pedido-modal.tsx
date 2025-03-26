import React, { useMemo, useState } from "react";
import { Button, Input, Modal } from "antd";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

interface RecusarPedidoProps {
  guiaDeRemessaId?: string;
}

const RecusarPedidoModal: React.FC<RecusarPedidoProps> = ({
  guiaDeRemessaId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [motivoRecusa, setMotivoRecusa] = useState("");
  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    recusarPedido();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const guiaDeRemessaService = useMemo(() => new GuiaDeRemessaService(), []);

  async function recusarPedido() {
    const linkPedido =  window.location.origin + location.pathname;
    guiaDeRemessaService
      .recusarPedido(guiaDeRemessaId!, motivoRecusa, linkPedido)
      .then(() => {
        toast.success("Pedido recusado com sucesso!");
        navigate("/pedidos");
      })
      .catch((error) => {
        toast.error("Erro ao recusar pedido!");
        console.error("Erro ao recusar pedido:", error);
      });
  }

  return (
    <>
      <Button
        type="primary"
        style={{ backgroundColor: "red" }}
        onClick={showModal}
        icon={<CloseCircleOutlined />}
      >
        <strong>Recusar Pedido</strong>
      </Button>
      <Modal
        title="Qual o motivo da recusa?"
        open={isModalOpen}
        onOk={handleOk}
        okText="Confirmar"        
        onCancel={handleCancel}        
        cancelText="Cancelar"
      >
        <Input.TextArea
          placeholder="Motivo da recusa..."
          maxLength={500}
          onChange={(e) => setMotivoRecusa(e.target.value)}
        />
        <p style={{margin: "auto", fontSize: "12px", color: "gray"}}>{motivoRecusa.length}/500</p>
        <p style={{margin:"auto", color: "red"}}>*Após ser recusado o pedido não poderá ser reaberto!</p>
      </Modal>
    </>
  );
};

export default RecusarPedidoModal;
