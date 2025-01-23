import React, { useEffect, useState } from "react";
import { InputNumber, Modal, Tooltip } from "antd";
import { Form } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Produto } from "../entity/produto";
import { ProdutoService } from "../service/produto-service";
import { AlterarEstoqueCommand } from "../commands/adicionar-estoque-command";
import { toast } from "react-toastify";

interface AdicionarQuantidadeEmEstoqueModalProps {
  id?: string;
  descricao?: string;
  quantidadeEmEstoque?: number;
  fornecedor?: string;
  unidadeDeEnvio?: string;
  onSaved: () => void;
}

const AdicionarQuantidadeEmEstoqueModal: React.FC<
  AdicionarQuantidadeEmEstoqueModalProps
> = ({ id, descricao, quantidadeEmEstoque, fornecedor, unidadeDeEnvio, onSaved }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoLoad, setProdutoLoad] = useState<Produto>();

  const [quantidadeAdicionada, setQuantidadeAdicionada] = useState<number>();

  const quantidadeTotal =
    quantidadeAdicionada! + quantidadeEmEstoque! ||
    quantidadeEmEstoque;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {  

    console.log("ID QUE ESTA CHEGANDO: ", id);
    console.log("quantidade que está chegando: ", quantidadeTotal);

    const produtoService = new ProdutoService();
    var adicionarEstoque = new AlterarEstoqueCommand();    

    adicionarEstoque.id = id;
    adicionarEstoque.quantidadeEmEstoque = quantidadeTotal;

    produtoService.alterarEstoque(adicionarEstoque)
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{quantidadeEmEstoque}</span>
        <Tooltip title="Adicionar Estoque">
          <PlusCircleTwoTone onClick={showModal} style={{marginRight: "5px"}}/>
        </Tooltip>
      </div>

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

export default AdicionarQuantidadeEmEstoqueModal;
