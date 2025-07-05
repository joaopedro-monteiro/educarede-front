import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ProdutoService } from "../service/produto-service";
import { Produto } from "../entity/produto";
import { ColumnFilterItem } from "antd/es/table/interface";
import EditarProdutoModal from "./editar-produto-modal";
import ExcluirProdutoModal from "./excluir-produto-modal";
import AdicionarQuantidadeEmEstoqueModal from "./adicionar-estoque-modal";
import ReduzirQuantidadeEmEstoqueModal from "./reduzir-estoque-modal";
import { Link } from "react-router-dom";
import { error } from "console";
import { toast } from "react-toastify";

interface DataType {
  key?: string;
  descricao?: string;
  quantidadeEmEstoque?: number;
  fornecedor?: string;
  unidadeDeEnvio?: string;
  fornecedorId?: string;
  unidadeDeEnvioId?: string;
}

const ProdutosPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosSerched, setProdutosSerched] = useState<string>("");
  const [fornecedores, setFornecedores] = useState<ColumnFilterItem[]>([]);
  const [fornecedorFilter, setFornecedorFilter] = useState<React.Key[]>([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Descrição",
      dataIndex: "descricao",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Quantidade em Estoque",
      dataIndex: "quantidadeEmEstoque",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <AdicionarQuantidadeEmEstoqueModal
            id={record.key}
            descricao={record.descricao}
            fornecedor={record.fornecedor}
            quantidadeEmEstoque={record.quantidadeEmEstoque}
            unidadeDeEnvio={record.unidadeDeEnvio}
            onSaved={refreshProdutos}
          />

          <ReduzirQuantidadeEmEstoqueModal
            id={record.key}
            descricao={record.descricao}
            fornecedor={record.fornecedor}
            quantidadeEmEstoque={record.quantidadeEmEstoque}
            unidadeDeEnvio={record.unidadeDeEnvio}
            onSaved={refreshProdutos}
          />
        </div>
      ),
      sorter: (a, b) => a.quantidadeEmEstoque! - b.quantidadeEmEstoque!,
    },
    {
      title: "Unidade de Envio",
      dataIndex: "unidadeDeEnvio",
    },
    {
      title: "Fornecedor",
      dataIndex: "fornecedor",
      filters: fornecedores,
      filterMode: "tree",
      filterSearch: true,
      filteredValue: fornecedorFilter.length ? fornecedorFilter : null,
      onFilter: (value, record) =>
        fornecedorFilter.includes(record.fornecedor as React.Key),
    },    
    {
      title: "Ações",
      width: "2%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditarProdutoModal
            id={record?.key}
            descricaoAtual={record.descricao}
            fornecedorAtual={record.fornecedorId}
            unidadeDeEnvioAtual={record.unidadeDeEnvioId}
            onSaved={refreshProdutos}
          />
          <ExcluirProdutoModal
            id={record.key!}
            descricao={record.descricao!}
            fornecedor={record.fornecedor!}
            quantidadeEmEstoque={record.quantidadeEmEstoque!}
            unidadeDeEnvio={record.unidadeDeEnvio!}
            onSaved={refreshProdutos}
          />
        </div>
      ),
    },
  ];

  const produtosFilter = produtos.filter((produto) =>
    produto.nome?.toLowerCase().includes(produtosSerched.toLowerCase())
  );

  const data = produtosFilter.map((produto) => {
    return {
      key: produto.id,
      descricao: produto.nome,
      quantidadeEmEstoque: produto.quantidadeEmEstoque,
      fornecedor: produto.fornecedor?.nome,
      unidadeDeEnvio: produto.unidadeDeEnvio?.unidadeDeEnvio,
      fornecedorId: produto.fornecedor?.id,
      unidadeDeEnvioId: produto.unidadeDeEnvio?.id,
    };
  });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    setFornecedorFilter((filters.fornecedor as React.Key[]) || []);
    console.log("params", pagination, filters, sorter, extra);
  };

  var produtosService = useMemo( () => new ProdutoService(), []);

  var refreshProdutos = () => {  
    produtosService.getAll().then((produtos) => {
      setProdutos(produtos);
      setFornecedores(
        Array.from(
          new Set(produtos.map((produto) => produto.fornecedor?.nome))
        )
          .filter(
            (fornecedor): fornecedor is string => fornecedor !== undefined
          )
          .map((fornecedor) => ({ text: fornecedor, value: fornecedor }))
      );
    }).catch(error => {
      toast.error('Não foi possível carregar os produtos disponíveis');
    });
  };

  useEffect(() => refreshProdutos(), []);

  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "10px" }}
      >
        <Col span={22} style={{ paddingBottom: "5px" }}>
          <Input.Search
            placeholder="Pesquisar"
            enterButton
            onChange={(e) => setProdutosSerched(e.target.value)}
          />
        </Col>
        <Col style={{ paddingBottom: "5px" }}>
          <Link to="/novo-produto">
            <Button type="primary">Novo Produto</Button>
          </Link>
        </Col>
      </Row>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default ProdutosPage;
