import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { FornecedorService } from "../service/fornecedor-service";

interface ExcluirProdutoProps {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  onSaved: () => void;
}

const ExcluirFornecedorModal: React.FC<ExcluirProdutoProps> = ({
  id,
  nome,
  cnpj,
  telefone,
  email,
  onSaved
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const fornecedorService = new FornecedorService();
    fornecedorService
      .delete(id)
      .then(() => {
        toast.success("Fornecedor excluído com sucesso!");
        console.log("Fornecedor excluído com sucesso!");
        onSaved();
      })
      .catch((error) => {
        toast.error("Erro ao excluir Fornecedor!");
        console.log("Erro ao excluir Fornecedor: ", error);
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Excluir Fornecedor">
        <DeleteFilled onClick={showModal} style={{color: "red"}} />
      </Tooltip>
      <Modal
        title="Deseja mesmo excluir este Fornecedor?"
        open={isModalOpen}
        onOk={handleOk}
        okText="Excluir"
        okType="danger"
        onCancel={handleCancel}
        cancelText="Cancelar"
      >
        <p>
          <strong>Nome:</strong> {nome}
        </p>
        <p>
          <strong>CNPJ:</strong> {cnpj}
        </p>
        <p>
          <strong>Telefone:</strong> {telefone}
        </p>
        <p>
          <strong>E-mail:</strong> {email}
        </p>
      </Modal>
    </>
  );
};

export default ExcluirFornecedorModal;
