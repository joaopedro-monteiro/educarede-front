import React, { useEffect, useState } from "react";
import { Button, DatePicker, message, Modal, Upload, UploadProps } from "antd";
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import moment from "moment";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { ProdutoService } from "../../Produto/service/produto-service";
import { useGerenciarPedidos } from "../hooks/use-gerenciar-pedidos";

interface FinalizarPedidoModalProps {
  id?: string;
  unidadeEscolar?: string;
  onSaved: () => void;
}

const FinalizarPedidoModal: React.FC<FinalizarPedidoModalProps> = ({
  id,
  unidadeEscolar,
  onSaved,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dataDaEntrega, setDataDaEntrega] = useState<Date | null>(null);
  const [sending, setSending] = useState(false);
  const [guiaDeRemessaEnviada, setGuiaDeRemessaEnviada] = useState<
    string | null
  >(null);

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} não é um arquivo PDF.`);
      } else {
        setPdfFile(file);
        message.success(`${file.name} foi selecionado.`);
      }
      return false;
    },

    fileList: pdfFile
      ? [
        {
          uid: "-1",
          name: pdfFile.name,
          status: "done",
          url: URL.createObjectURL(pdfFile),
        },
      ]
      : [],
  };

  const handleUploadToFirebase = async () => {
    if (!pdfFile) {
      message.error("Por favor, selecione um arquivo PDF para finalizar.");
      return;
    }
    try {
      handleDataEntrega()
        .then(async () => {
          const storageRef = ref(storage, `guia-de-remessa/${pdfFile.name}`);

          const snapshot = await uploadBytes(storageRef, pdfFile);
          console.log("Uploaded a blob or file!", snapshot);

          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("Arquivo disponível em: ", downloadURL);

          handleRecordInDatabase(downloadURL);

          setPdfFile(null);

          console.log("Data da entrega alterada com sucesso!");
          //toast.success("Data da entrega alterada com sucesso!");
          toast.success("Pedido finalizado com sucesso!");
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Erro ao alterar a data da entrega:", error);
          toast.error("Erro ao alterar a data da entrega.");
          return;
        });
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo: ", error);
      toast.error("Erro ao finalizar o pedido.");
    }
  };

  const handleRecordInDatabase = async (url: string) => {
    const documentData = {
      nomeDoArquivo: pdfFile?.name,
      unidadeEscolar: unidadeEscolar,
      url: url,
      dataUpload: new Date().toISOString(),
    };

    await setDoc(doc(db, "guia-de-remessa", id!), documentData)
      .then(() => {
        console.log("Documento adicionado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar documento:", error);
      });
  };

  async function handleDataEntrega() {
    console.log('Chegou aqui');
    try{
      const guiaDeRemessaFirebase = useGerenciarPedidos(id!);
      console.log('guiaDeRemessaFirebase', guiaDeRemessaFirebase);
    }catch(error){
      console.error("Erro ao buscar guia de remessa:", error);      
    }
    const guiaDeRemessaService = new GuiaDeRemessaService();
    const response = await guiaDeRemessaService.alterarDataDaEntrega({
      id: id,
      dataDaEntrega: new Date(dataDaEntrega!),
      //linkGuiaDeRemessaStorage: guiaDeRemessaFirebase!.url,
    });
  }

  function atualizarEstoqueAposEnvio() {
    const produtoService = new ProdutoService();
    const fetchData = async () => {
      try {
        await produtoService.atualizarEstoqueAposEnvio(id!)
          .then(() => {
            console.log("Estoque atualizado com sucesso!");
            toast.success("Pedido finalizado com sucesso!");
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!pdfFile) {
      message.error("Por favor, selecione um arquivo PDF para finalizar.");
      return;
    }

    if (!dataDaEntrega) {
      message.error("Por favor, selecione a data da entrega.");
      return;
    }
    handleUploadToFirebase()
      .then(() => {
        setSending(true);
        onSaved();
      });

    atualizarEstoqueAposEnvio();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {sending && toast.info("Enviando arquivo para o servidor...")}
      <Button
        style={{
          backgroundColor: "#21c16e",
          color: "white",
        }}
        onClick={showModal}
        icon={<CheckOutlined />}
      >
        <strong>Finalizar Pedido</strong>
      </Button>
      <Modal
        title="Para finalizar o pedido faça o upload da Guia de Remessa assinada"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancelar"
        width={550}
      >
        <Upload {...props} maxCount={1}>
          <Button icon={<UploadOutlined />}>
            Clique aqui para inserir o arquivo
          </Button>
        </Upload>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", marginTop: 20 }}
        >
          <label>Data da entrega:</label>
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            placeholder="Data da entrega"
            onChange={(date) => setDataDaEntrega(date ? date.toDate() : null)}
          />
        </div>
      </Modal>
    </>
  );
};

export default FinalizarPedidoModal;
