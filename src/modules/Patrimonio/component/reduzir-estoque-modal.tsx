import React, { useEffect, useState } from "react";
import { InputNumber, Modal, Tooltip } from "antd";
import { Form } from "antd";
import { MinusCircleTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Patrimonio } from "../entity/patrimonio-entity";
import { PatrimonioService } from "../service/patrimonio-service";
import { AlterarEstoqueCommand } from "../../Produto/commands/adicionar-estoque-command";

interface ReduzirQuantidadeEmEstoqueModalProps {
  id?: string;
  quantidadeEmEstoque?: number;
  onSaved: () => void;
}

const ReduzirQuantidadeEmEstoquePatrimonioModal: React.FC<
  ReduzirQuantidadeEmEstoqueModalProps
> = ({ id, quantidadeEmEstoque, onSaved }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patrimonioLoad, setPatrimonioLoad] = useState<Patrimonio>();

  const [quantidadeReduzida, setQuantidadeReduzida] = useState<number>();

  const quantidadeTotal =
    quantidadeEmEstoque! - quantidadeReduzida! ||
    quantidadeEmEstoque;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {  
    const patrimonioService = new PatrimonioService();
    var reduzirEstoque = new AlterarEstoqueCommand();    

    reduzirEstoque.id = id;
    reduzirEstoque.quantidadeEmEstoque = quantidadeTotal;

    patrimonioService.alterarEstoque(reduzirEstoque)
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
    const patrimonioService = new PatrimonioService();

    const fetchData = async () => {
      try {
        const patrimonioLoad = await patrimonioService.getById(id!);
        setPatrimonioLoad(patrimonioLoad);
        console.log("Patrimônio carregado: ", patrimonioLoad);
      } catch (error) {
        console.error("Erro ao buscar Patrimônio: ", error);
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
        </p>
        <p>
          Nova quantidade em estoque: <strong>{quantidadeTotal}</strong>{" "}          
        </p>
      </Modal>
    </>
  );
};

export default ReduzirQuantidadeEmEstoquePatrimonioModal;
