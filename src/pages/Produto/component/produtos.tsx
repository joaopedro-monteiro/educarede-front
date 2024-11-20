import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ProdutoService } from "../service/produto-service";
import { Produto } from "../entity/produto";
import { ColumnFilterItem } from "antd/es/table/interface";
import EditarProdutoModal from "./editar-produto-modal";
import ExcluirProdutoModal from "./excluir-produto-modal";
import AdicionarQuantidadeEmEstoqueModal from "./adicionar-estoque-modal";

interface DataType {
  key?: string;
  descricao?: string;
  quantidadeEmEstoque?: number;
  fornecedor?: string;
  unidadeDeEnvio?: string;
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
      render: (quantidadeEmEstoque: number, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{quantidadeEmEstoque}</span>
          <div>
            <AdicionarQuantidadeEmEstoqueModal produto={record}/>
          </div>
        </div>
      ),
      sorter: (a, b) => a.quantidadeEmEstoque! - b.quantidadeEmEstoque!,
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
      title: "Unidade de Envio",
      dataIndex: "unidadeDeEnvio",
    },
    {
      title: "Ações",
      width: "2%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditarProdutoModal
            id={record?.key}
            descricaoAtual={record.descricao}
            fornecedorAtual={record.fornecedor}
            unidadeDeEnvioAtual={record.unidadeDeEnvio}
          />
          <ExcluirProdutoModal
            id={record.key!}
            descricao={record.descricao!}
            fornecedor={record.fornecedor!}
            quantidadeEmEstoque={record.quantidadeEmEstoque!}
            unidadeDeEnvio={record.unidadeDeEnvio!}
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

  useEffect(() => {
    const produtoService = new ProdutoService();
    const fetchData = async () => {
      try {
        const produtos = await produtoService.getAll();
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
        console.log(produtos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <Input.Search
          placeholder="Pesquisar"
          enterButton
          onChange={(e) => setProdutosSerched(e.target.value)}
        />
      </div>
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
