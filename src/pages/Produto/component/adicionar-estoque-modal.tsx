import React, { useEffect, useState } from "react";
import { Input, InputNumber, Modal, Tooltip } from "antd";
import { Form } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { UnidadeDeEnvio } from "../../UnidadeDeEnvio/entity/unidade-de-envio";
import { Produto } from "../entity/produto";
import { ProdutoService } from "../service/produto-service";

interface DataType {
  key?: string;
  descricao?: string;
  quantidadeEmEstoque?: number;
  fornecedor?: string;
  unidadeDeEnvio?: string;
}

interface AdicionarQuantidadeEmEstoqueModalProps {
  produto: DataType;
}

const AdicionarQuantidadeEmEstoqueModal: React.FC<
  AdicionarQuantidadeEmEstoqueModalProps
> = ({ produto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoLoad, setProdutoLoad] = useState<Produto>();

  const [quantidadeAdicionada, setQuantidadeAdicionada] = useState<number>();

  const quantidadeTotal =
    quantidadeAdicionada! + produto.quantidadeEmEstoque! ||
    produto.quantidadeEmEstoque;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const produtoService = new ProdutoService();

    const fetchData = async () => {
      try {
        const produtoLoad = await produtoService.getById(produto.key!);
        setProdutoLoad(produtoLoad);
        console.log("Produto carregado: ", produtoLoad);
      } catch (error) {
        console.error("Erro ao buscar produto: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Tooltip title="Adicionar Estoque">
        <PlusCircleTwoTone onClick={showModal} />
      </Tooltip>
      <Modal
        title="Adicionar quantidade em estoque"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Quantidade a ser adicionada em estoque">
            <InputNumber
              min={0}
              onChange={(val) => setQuantidadeAdicionada(val!)}
            />
          </Form.Item>
        </Form>
        <p>
          Quantidade em estoque atual:{" "}
          <strong>{produto.quantidadeEmEstoque}</strong>{" "}
          {produto.quantidadeEmEstoque === 1
            ? produto.unidadeDeEnvio
            : produto.unidadeDeEnvio + "s"}
        </p>
        <p>
          Nova quantidade em estoque: <strong>{quantidadeTotal}</strong>{" "}
          {quantidadeTotal === 1
            ? produto.unidadeDeEnvio
            : produto.unidadeDeEnvio + "s"}
        </p>
      </Modal>
    </>
  );
};

export default AdicionarQuantidadeEmEstoqueModal;
