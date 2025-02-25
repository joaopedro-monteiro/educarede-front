import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { Produto } from "../entity/produto";
import { Fornecedor } from "../../Fornecedor/entity/fornecedor";
import { FornecedorService } from "../../Fornecedor/service/fornecedor-service";
import NovoFornecedorModal from "../../Fornecedor/components/add-fornecedor-modal";
import { UnidadeDeEnvio } from "../../UnidadeDeEnvio/entity/unidade-de-envio";
import { UnidadeDeEnvioService } from "../../UnidadeDeEnvio/service/unidade-de-envio-service";
import NovaUnidadeDeEnvioModal from "../../UnidadeDeEnvio/components/add-unidade-de-envio-modal";
import { ProdutoService } from "../service/produto-service";
import { toast } from "react-toastify";

const NovoProdutoPage: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [fornecedorId, setFornecedorId] = useState<string>();
  const [unidadeDeEnvioId, setUnidadeDeEnvioId] = useState<string>();

  const [fornecedoresLoad, setFornecedoresLoad] = useState<Fornecedor[]>([]);
  const [unidadesDeEnvioLoad, setUnidadesDeEnvioLoad] = useState<
    UnidadeDeEnvio[]
  >([]);

  const [form] = Form.useForm();
  const onFinish = () => {
    var produtoToPost = new Produto();
    produtoToPost.nome = nome;
    produtoToPost.fornecedorId = fornecedorId;
    produtoToPost.unidadeDeEnvioId = unidadeDeEnvioId;

    const produtoService = new ProdutoService();

    produtoService
      .create(produtoToPost)
      .then(() => {
        console.log("Produto criado com sucesso!");
        toast.success("Produto criado com sucesso!");

        form.resetFields();        
        setNome("");
        setFornecedorId(undefined);
        setUnidadeDeEnvioId(undefined);
      })
      .catch((error) => {
        console.log("Erro ao criar Produto: ", error);
        toast.error("Erro ao criar Produto!");
      });
  };

  const handleLoadFornecedores = async () => {
    const fornecedoresService = new FornecedorService();
    try {
      const fornecedores = await fornecedoresService.getAll();
      setFornecedoresLoad(fornecedores);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadUnidadesDeMedida = async () => {
    const unidadeDeEnvioService = new UnidadeDeEnvioService();
    try {
      const unidadesDeEnvio = await unidadeDeEnvioService.getAll();
      console.log(unidadesDeEnvio);
      setUnidadesDeEnvioLoad(unidadesDeEnvio);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
    <Row gutter={[16, 16]}> {/* Reduzi o gutter para dispositivos menores */}
      {/* Nome */}
      <Col xs={24} sm={12} md={8}> {/* Ajusta o span para diferentes tamanhos de tela */}
        <Form.Item label="Nome" name="nome">
          <Input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Item>
      </Col>

      {/* Fornecedor */}
      <Col xs={24} sm={12} md={8}>
        <Form.Item label="Fornecedor" name="fornecedor">
          <Select
            placeholder="Fornecedor"
            onDropdownVisibleChange={handleLoadFornecedores}
            value={fornecedorId}
            onSelect={setFornecedorId}
          >
            {fornecedoresLoad.map((fornecedor) => (
              <Select.Option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </Select.Option>
            ))}
          </Select>
          <br />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <NovoFornecedorModal typeButton="dashed" />
          </div>
        </Form.Item>
      </Col>

      {/* Unidade de Envio */}
      <Col xs={24} sm={12} md={8}>
        <Form.Item label="Unidade de Envio" name="unidadeDeEnvio">
          <Select
            placeholder="Unidade de Envio"
            onDropdownVisibleChange={handleLoadUnidadesDeMedida}
            value={unidadeDeEnvioId}
            onSelect={setUnidadeDeEnvioId}
          >
            {unidadesDeEnvioLoad.map((unidadeDeEnvio) => (
              <Select.Option key={unidadeDeEnvio.id} value={unidadeDeEnvio.id}>
                {unidadeDeEnvio.unidadeDeEnvio}
              </Select.Option>
            ))}
          </Select>
          <br />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <NovaUnidadeDeEnvioModal typeButton="dashed" />
          </div>
        </Form.Item>
      </Col>
    </Row>

    {/* Botão Criar */}
    <Row>
      <Col span={24} style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Criar
        </Button>
      </Col>
    </Row>
  </Form>
  );
};

export default NovoProdutoPage;
