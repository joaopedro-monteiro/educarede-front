import React, { useEffect, useMemo, useState } from 'react';
import { Col, Input, Row, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { LocalSolicitacaoItem, LocalSolicitacaoItemDescricao } from '../enum/patrimonio-enum';
import { Patrimonio } from '../entity/patrimonio-entity';
import { PatrimonioService } from '../service/patrimonio-service';
import NovoPatrimonioModal from './add-patrimonio-modal';
import EditarPatrimonioModal from './editar-patrimonio-modal';
import ExcluirPatrimonioModal from './excluir-patrimonio-modal';
import AdicionarQuantidadeEmEstoquePatrimonioModal from './adicionar-estoque-modal';
import ReduzirQuantidadeEmEstoquePatrimonioModal from './reduzir-estoque-modal';

interface DataType {
    key?: string;
    descricao?: string;
    quantidade?: number;
    local?: LocalSolicitacaoItem | string;
}

const PatrimonioPage: React.FC = () => {
    const[patrimonio, setPatrimonio] = useState<Patrimonio[]>([]);
    const[patrimonioSearched, setPatrimonioSearched] = useState<string>("");

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',                                
        },
        {
            title: 'Quantidade em estoque',
            dataIndex: 'quantidade',    
            render: (_, record) => (
                <div style={{ display: 'flex' }}>                    
                    <AdicionarQuantidadeEmEstoquePatrimonioModal id={record.key} quantidadeEmEstoque={record.quantidade} onSaved={refreshPatrimonio}/>      
                    <ReduzirQuantidadeEmEstoquePatrimonioModal id={record.key} quantidadeEmEstoque={record.quantidade} onSaved={refreshPatrimonio}/>             
                </div>
            ),                  
        },
        {
            title: 'Localizado em:',
            dataIndex: 'local',            
        },
        {
            title: 'Ações',
            width: '2%',
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <EditarPatrimonioModal
                        id={record?.key}
                        descricao={record.descricao}         
                        quantidade={record.quantidade}               
                        local={record.local}
                        onSaved={() => refreshPatrimonio()}       
                    />
                    <ExcluirPatrimonioModal
                        id={record?.key}
                        descricao={record.descricao}                        
                        local={record.local}
                        onSaved={() => refreshPatrimonio()} />
                </div>
            ),
        }
    ];

    const patrimonioFilter = patrimonio.filter((patrimonio) => patrimonio.descricao?.toLowerCase().includes(patrimonioSearched.toLowerCase()));

    const data = patrimonioFilter.map((patrimonio) => {
        return {
            key: patrimonio.id,
            descricao: patrimonio.descricao,
            quantidade: patrimonio.quantidade,
            local: patrimonio.local !== undefined 
            ? LocalSolicitacaoItemDescricao[patrimonio.local] 
            : "Local não informado",
        }
    })

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    var patrimonioService = useMemo(() => new PatrimonioService(), []);

    var refreshPatrimonio = () => {
        patrimonioService.getAll().then((patrimonio) => {
            setPatrimonio(patrimonio);
            console.log(patrimonio);
        })
    }

    useEffect(() => refreshPatrimonio(), []); 

    return <div>
    <Row justify="space-between" align="middle" style={{marginBottom: "10px"}}>
      <Col span={21} style={{paddingBottom: "5px"}}>
        <Input.Search
          placeholder="Pesquisar"
          enterButton
          onChange={(e) => setPatrimonioSearched(e.target.value)}            
        />
      </Col>    
      <Col style={{paddingBottom: "5px"}}>
        <NovoPatrimonioModal onSaved={refreshPatrimonio}/>
      </Col>  
    </Row>
    <Table<DataType>
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  </div>
}

export default PatrimonioPage;