import React, { useContext, useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, Tooltip } from "antd";
import { ProdutoService } from "../../Produto/service/produto-service";
import { Produto } from "../../Produto/entity/produto";
import { useNavigate } from "react-router-dom";
import { GuiaDeRemessaItem } from "../../GuiaDeRemessaItem/entity/guia-de-remessa-item";
import { GuiaDeRemessa } from "../entity/guia-de-remessa";
import { GuiaDeRemessaService } from "../service/guia-de-remessa-service";
import { toast } from "react-toastify";
import { UnidadeDeEnvioService } from "../../UnidadeDeEnvio/service/unidade-de-envio-service";
import { AuthContext } from "../../../infrastructure/context/auth";

const GuiaDeRemessaPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [unidadeDeEnvio, setUnidadeDeEnvio] = useState<{
    [key: number]: string;
  }>({});

  const[observacaoUnidadeDeEnvio, setObservacaoUnidadeDeEnvio] = useState<{[key:number]:string}>({});

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    if (!values.itens || values.itens.length === 0) {
      toast.error("Adicione pelo menos um item antes de enviar o pedido!");
      return;
    }

    const serviceProduto = new ProdutoService();
    var guiaDeRemessaItens = new Array<GuiaDeRemessaItem>();
    for (const item of values.itens) {
      guiaDeRemessaItens.push({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        produtoNome: (await serviceProduto.getById(item.produtoId)).nome,
      });
    }

    var guiaDeRemessa = new GuiaDeRemessa();
    guiaDeRemessa.unidadeEscolar = user?.nomeDaEscola;
    guiaDeRemessa.idUsuario = user?.id;

    guiaDeRemessa.Itens = guiaDeRemessaItens;

    const guiaDeRemessaService = new GuiaDeRemessaService();

    guiaDeRemessaService
      .create(guiaDeRemessa)
      .then(() => {
        console.log("Sucesso");
        toast.success("Pedido enviado com sucesso!");
        navigate("/pedidos");
        values.itens = [];
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao enviar pedido!");
        return error;
      });

    console.log(guiaDeRemessaItens);
  };

  const handleUnidadeDeEnvio = async (id: string, index: number) => {
    const produtoSelecionado = produtos.find((produto) => produto.id === id);
    const unidadeDeEnvioService = new UnidadeDeEnvioService();

    try {
      const unidadeDeEnvioSelected = await unidadeDeEnvioService.getById(
        produtoSelecionado?.unidadeDeEnvioId as string
      );
      setUnidadeDeEnvio((prev) => ({
        ...prev,
        [index]: unidadeDeEnvioSelected.unidadeDeEnvio || "",
      }));
      setObservacaoUnidadeDeEnvio((prev) => ({
        ...prev,
        [index]: unidadeDeEnvioSelected.observacao || "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const produtoService = new ProdutoService();
    const fetchData = async () => {
      try {
        const produtos = await produtoService.getAll();
        setProdutos(produtos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Row justify="center" style={{ marginTop: "20px" }}>
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
          Adicionar Material
        </h1>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <Form.List name="itens">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Row key={key} gutter={[16, 16]} justify="center" align="middle">
                    <Col xs={24} sm={13} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "produtoId"]}
                        rules={[
                          {
                            required: true,
                            message: "Preencha o material...",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Material"
                          onChange={(value) =>
                            handleUnidadeDeEnvio(value, index)
                          }
                          style={{ width: "100%" }}
                        >
                          {produtos.map((produto) => (
                            <Select.Option key={produto.id} value={produto.id}>
                              {produto.nome}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={11} lg={11} xl={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "quantidade"]}
                        rules={[
                          {
                            required: true,
                            message: "Preencha a quantidade...",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Quantidade"
                          addonAfter={unidadeDeEnvio[index] ? <span>{unidadeDeEnvio[index]} | <Tooltip title={observacaoUnidadeDeEnvio[index]}><InfoCircleOutlined style={{color:"blue"}} /></Tooltip></span> : ""}
                          type="number"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{
                          fontSize: "16px",
                          color: "red",
                          cursor: "pointer",
                          marginBottom: "25px",
                          alignSelf: "center",
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Adicionar item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar pedido
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default GuiaDeRemessaPage;