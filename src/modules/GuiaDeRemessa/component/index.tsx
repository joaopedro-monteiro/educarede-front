import React, { useContext, useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
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

  const {user} = useContext(AuthContext);

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
    
    guiaDeRemessa.Itens = guiaDeRemessaItens;

    const guiaDeRemessaService = new GuiaDeRemessaService();

    guiaDeRemessaService
      .create(guiaDeRemessa)
      .then(() => {
        console.log("Sucesso");
        toast.success("Pedido enviado com sucesso!");
        navigate("/");
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
    <Row>
      <Col span={24}>
        <h1 style={{ textAlign: "center", marginTop:"auto" }}>Adicionar Material</h1>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}
          autoComplete="off"
        >
          <Form.List name="itens">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "produtoId"]}
                      rules={[
                        { required: true, message: "Preencha o material..." },
                      ]}
                    >
                      <Select
                        placeholder="Material"
                        style={{ width: 200 }}
                        onChange={(value) => handleUnidadeDeEnvio(value, index)}
                      >
                        {produtos.map((produto) => (
                          <Select.Option key={produto.id} value={produto.id}>
                            {produto.nome}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
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
                        addonAfter={unidadeDeEnvio[index]}
                        type="number"
                      />
                    </Form.Item>
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
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                    style={{ width: "25vw" }}
                  >
                    Adicionar item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar pedido
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default GuiaDeRemessaPage;
