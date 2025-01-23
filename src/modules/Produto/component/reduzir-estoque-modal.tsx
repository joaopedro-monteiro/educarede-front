import React, { useEffect, useState } from "react";
import { InputNumber, Modal, Tooltip } from "antd";
import { Form } from "antd";
import { MinusCircleTwoTone } from "@ant-design/icons";
import { Produto } from "../entity/produto";
import { ProdutoService } from "../service/produto-service";
import { AlterarEstoqueCommand } from "../commands/adicionar-estoque-command";
import { toast } from "react-toastify";

interface ReduzirQuantidadeEmEstoqueModalProps {
  id?: string;
  descricao?: string;
  quantidadeEmEstoque?: number;
  fornecedor?: string;
  unidadeDeEnvio?: string;
  onSaved: () => void;
}

const ReduzirQuantidadeEmEstoqueModal: React.FC<
  ReduzirQuantidadeEmEstoqueModalProps
> = ({ id, descricao, quantidadeEmEstoque, fornecedor, unidadeDeEnvio, onSaved }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoLoad, setProdutoLoad] = useState<Produto>();

  const [quantidadeReduzida, setQuantidadeReduzida] = useState<number>();

  const quantidadeTotal =
    quantidadeEmEstoque! - quantidadeReduzida! ||
    quantidadeEmEstoque;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {  
    const produtoService = new ProdutoService();
    var reduzirEstoque = new AlterarEstoqueCommand();    

    reduzirEstoque.id = id;
    reduzirEstoque.quantidadeEmEstoque = quantidadeTotal;

    produtoService.alterarEstoque(reduzirEstoque)
    .then(() => {
      toast.success("Quantidade atualizada com sucesso!");
      onSaved();
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erro ao atualizar o estoque!");
    });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const produtoService = new ProdutoService();

    const fetchData = async () => {
      try {
        const produtoLoad = await produtoService.getById(id!);
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
        <Tooltip title="Reduzir Estoque">
          <MinusCircleTwoTone onClick={showModal} twoToneColor="red"/>
        </Tooltip>    

      <Modal
        title="Reduzir quantidade em estoque"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Quantidade a ser reduzida em estoque">
            <InputNumber
              min={0}
              max={quantidadeEmEstoque}
              onChange={(val) => setQuantidadeReduzida(val!)}
            />
          </Form.Item>
        </Form>
        <p>
          Quantidade em estoque atual:{" "}
          <strong>{quantidadeEmEstoque}</strong>{" "}
          {quantidadeEmEstoque === 1
            ? unidadeDeEnvio
            : unidadeDeEnvio + "s"}
        </p>
        <p>
          Nova quantidade em estoque: <strong>{quantidadeTotal}</strong>{" "}
          {quantidadeTotal === 1
            ? unidadeDeEnvio
            : unidadeDeEnvio + "s"}
        </p>
      </Modal>
    </>
  );
};

export default ReduzirQuantidadeEmEstoqueModal;
