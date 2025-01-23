import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Row, Select, Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";
import { ProdutoService } from "../service/produto-service";
import { Produto } from "../entity/produto";
import { Fornecedor } from "../../Fornecedor/entity/fornecedor";
import { FornecedorService } from "../../Fornecedor/service/fornecedor-service";
import { UnidadeDeEnvio } from "../../UnidadeDeEnvio/entity/unidade-de-envio";
import { UnidadeDeEnvioService } from "../../UnidadeDeEnvio/service/unidade-de-envio-service";
import { toast } from "react-toastify";

interface EditarProdutoModalProps {
  id?: string;
  descricaoAtual?: string;
  fornecedorAtual?: string;
  unidadeDeEnvioAtual?: string;
  onSaved: () => void;
}

const EditarProdutoModal: React.FC<EditarProdutoModalProps> = ({
  id,
  descricaoAtual,
  fornecedorAtual,
  unidadeDeEnvioAtual,
  onSaved,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [unidadesDeEnvio, setUnidadesDeEnvio] = useState<UnidadeDeEnvio[]>([]);

  const [descricaoToPut, setDescricaoToPut] = useState<string>("");
  const [fornecedorIdToPut, setFornecedorIdToPut] = useState<string>("");
  const [unidadeDeEnvioIdToPut, setUnidadeDeEnvioIdToPut] =
    useState<string>("");

  const showModal = () => {
    setDescricaoToPut(descricaoAtual || "");
    setFornecedorIdToPut(fornecedorAtual || "");
    setUnidadeDeEnvioIdToPut(unidadeDeEnvioAtual || "");

    console.log("fornecedorid: ", fornecedorIdToPut);
    console.log("unidadeDeEnvioId: ", unidadeDeEnvioIdToPut);

    setIsModalOpen(true);
  };

  const handleOk = () => {
    var produtoToPut = new Produto();
    produtoToPut.id = id;
    produtoToPut.nome = descricaoToPut;
    produtoToPut.fornecedorId = fornecedorIdToPut;
    produtoToPut.unidadeDeEnvioId = unidadeDeEnvioIdToPut;

    console.log("produto editado: ", produtoToPut);

    const produtoService = new ProdutoService();
    produtoService
      .update(produtoToPut)
      .then(() => {
        console.log("Produto atualizado com sucesso!");
        toast.success("Produto atualizado com sucesso!");
        onSaved();
      })
      .catch((error) => {
        console.log("Erro ao atualizar Produto: ", error);
        toast.error("Erro ao atualizar Produto!");
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fornecedorService = new FornecedorService();
      const fornecedores = await fornecedorService.getAll();
      setFornecedores(fornecedores);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const unidadeDeEnvioService = new UnidadeDeEnvioService();
      const unidadesDeEnvio = await unidadeDeEnvioService.getAll();
      setUnidadesDeEnvio(unidadesDeEnvio);
    };
    fetchData();
  }, []);

  return (
    <>
      <Tooltip title="Editar Produto">
        <EditFilled onClick={showModal} />
      </Tooltip>

      <Modal
        title="Editar Produto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk}>
          <Form.Item>
            <Row>
              <Input
                placeholder="Descrição"
                value={descricaoToPut}
                onChange={(e) => setDescricaoToPut(e.target.value)}
              />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Select
                placeholder="Fornecedor"
                value={fornecedorIdToPut}
                onSelect={setFornecedorIdToPut}
              >
                {fornecedores.map((fornecedor) => (
                  <Select.Option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nome}
                  </Select.Option>
                ))}
              </Select>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Select
                placeholder="Unidade de Envio"
                value={unidadeDeEnvioIdToPut}
                onSelect={setUnidadeDeEnvioIdToPut}
              >
                {unidadesDeEnvio.map((unidadeDeEnvio) => (
                  <Select.Option
                    key={unidadeDeEnvio.id}
                    value={unidadeDeEnvio.id}
                  >
                    {unidadeDeEnvio.unidadeDeEnvio}
                  </Select.Option>
                ))}
              </Select>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditarProdutoModal;
