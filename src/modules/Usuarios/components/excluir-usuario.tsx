import React, { useMemo, useState } from "react";
import { Modal, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { UsuariosService } from "../services/usuarios-service";

interface ExcluirUsuarioProps {
  id?: string;
  email?: string;
  nomeDaEscola?: string;
  role?: string;
  onSaved: () => void;
}

const ExcluirUsuarioModal: React.FC<ExcluirUsuarioProps> = ({
  id,
  email,
  nomeDaEscola,
  role,
  onSaved,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const usuarioService = useMemo(() => new UsuariosService(), []);

  const handleOk = () => {
    usuarioService
      .delete(id!)
      .then(() => {
        toast.success("Usuário excluído com sucesso!");
        console.log("Usuário excluído com sucesso!");
        onSaved();
      })
      .catch((error) => {
        toast.error("Erro ao excluir Usuário!");
        console.log("Erro ao excluir Usuário: ", error);
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Excluir Usuário">
        <DeleteFilled onClick={showModal} style={{ color: "red" }} />
      </Tooltip>
      <Modal
        title="Deseja mesmo excluir este usuário?"
        open={isModalOpen}
        onOk={handleOk}
        okText="Excluir"
        okType="danger"
        onCancel={handleCancel}
        cancelText="Cancelar"
      >
        <p>
          <strong>E-mail:</strong> {email}
        </p>
        <p>
          <strong>Nome da Escola:</strong> {nomeDaEscola}
        </p>
        <p>
          <strong>Tipo de Acesso:</strong> {role}
        </p>       
      </Modal>
    </>
  );
};

export default ExcluirUsuarioModal;
