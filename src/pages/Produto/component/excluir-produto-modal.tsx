import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { ProdutoService } from "../service/produto-service";
import { toast } from "react-toastify";

interface ExcluirProdutoProps {
  id: string;
  descricao: string;
  fornecedor: string;
  unidadeDeEnvio: string;
  quantidadeEmEstoque: number;
}

const ExcluirProdutoModal: React.FC<ExcluirProdutoProps> = ({
  id,
  descricao,
  fornecedor,
  unidadeDeEnvio,
  quantidadeEmEstoque,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const produtoService = new ProdutoService();
    produtoService
      .delete(id)
      .then(() => {
        toast.success("Produto excluído com sucesso!");
        console.log("Produto excluído com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao excluir Produto!");
        console.log("Erro ao excluir Produto: ", error);
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Excluir Produto">
        <DeleteFilled onClick={showModal} style={{color: "red"}} />
      </Tooltip>
      <Modal
        title="Deseja mesmo excluir este produto?"
        open={isModalOpen}
        onOk={handleOk}
        okText="Excluir"
        okType="danger"
        onCancel={handleCancel}
        cancelText="Cancelar"
      >
        <p>
          <strong>Descrição:</strong> {descricao}
        </p>
        <p>
          <strong>Quantidade em Estoque:</strong> {quantidadeEmEstoque}
        </p>
        <p>
          <strong>Fornecedor:</strong> {fornecedor}
        </p>
        <p>
          <strong>Unidade de Envio:</strong> {unidadeDeEnvio}
        </p>
      </Modal>
    </>
  );
};

export default ExcluirProdutoModal;
