import React, { useMemo, useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import moment from "moment";

interface ExcluirProdutoProps {
  id: string;
  unidadeEscolar: string;
  dataDaEmissao: Date;
  onSaved: () => void;
}

const ExcluirPedidoModal: React.FC<ExcluirProdutoProps> = ({
  id,
  unidadeEscolar,
  dataDaEmissao,
  onSaved
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const guiaDeRemessaService = useMemo(() => new GuiaDeRemessaService(), [])

  const handleOk = () => {
    guiaDeRemessaService
      .delete(id)
      .then(() => {
        toast.success("Pedido excluído com sucesso!");
        console.log("Pedido excluído com sucesso!");
        onSaved();
      })
      .catch((error) => {
        toast.error("Erro ao excluir Pedido!");
        console.log("Erro ao excluir Pedido: ", error);
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Excluir Pedido">
        <Button onClick={showModal} icon={<DeleteFilled style={{color: "red"}}/>} />       
        {/* <DeleteFilled onClick={showModal} style={{color: "red"}} /> */}
      </Tooltip>
      <Modal
        title="Deseja mesmo excluir este Pedido?"
        open={isModalOpen}
        onOk={handleOk}
        okText="Excluir"
        okType="danger"
        onCancel={handleCancel}
        cancelText="Cancelar"
      >
        <p>
          <strong>Unidade Escolar:</strong> {unidadeEscolar}
        </p>
        <p>
          <strong>Data da emissão:</strong> {moment(dataDaEmissao).format("DD/MM/YYYY HH:mm")}
        </p>       
      </Modal>
    </>
  );
};

export default ExcluirPedidoModal;
