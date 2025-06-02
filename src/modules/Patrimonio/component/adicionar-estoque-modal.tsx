import React, { useEffect, useState } from "react";
import { InputNumber, Modal, Tooltip } from "antd";
import { Form } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Patrimonio } from "../entity/patrimonio-entity";
import { PatrimonioService } from "../service/patrimonio-service";
import { AlterarEstoqueCommand } from "../../Produto/commands/adicionar-estoque-command";

interface AdicionarQuantidadeEmEstoqueModalProps {
  id?: string;
  quantidadeEmEstoque?: number;
  onSaved: () => void;
}

const AdicionarQuantidadeEmEstoquePatrimonioModal: React.FC<
  AdicionarQuantidadeEmEstoqueModalProps
> = ({ id, quantidadeEmEstoque, onSaved }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patrimonioLoad, setPatrimonioLoad] = useState<Patrimonio>();

  const [quantidadeAdicionada, setQuantidadeAdicionada] = useState<number>();

  const quantidadeTotal =
    quantidadeAdicionada! + quantidadeEmEstoque! ||
    quantidadeEmEstoque;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {  

    debugger

    console.log("ID QUE ESTA CHEGANDO: ", id);
    console.log("quantidade que está chegando: ", quantidadeTotal);

    const patrimonioService = new PatrimonioService();
    var adicionarEstoque = new AlterarEstoqueCommand();    

    adicionarEstoque.id = id;
    adicionarEstoque.quantidadeEmEstoque = quantidadeTotal;

    patrimonioService.alterarEstoque(adicionarEstoque)
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
        console.log("Produto carregado: ", patrimonioLoad);
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
        </p>
        <p>
          Nova quantidade em estoque: <strong>{quantidadeTotal}</strong>{" "}         
        </p>
      </Modal>
    </>
  );
};

export default AdicionarQuantidadeEmEstoquePatrimonioModal;
