import { useEffect, useState } from "react";
import { GuiaDeRemessaItem } from "../../GuiaDeRemessaItem/entity/guia-de-remessa-item";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { GuiaDeRemessaItemService } from "../../GuiaDeRemessaItem/service/guia-de-remessa-item-service";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export interface GuiaDeRemessaFirebase {
  dataUpload: Date;
  url: string;
  nomeDoArquivo: string;
  unidadeEscolar: string;
}

export const useGerenciarPedidos = (guiaDeRemessaId: string) => {
  const [pedidos, setPedidos] = useState<GuiaDeRemessaItem[]>([]);
  const [guiaDeRemessa, setGuiaDeRemessa] = useState<GuiaDeRemessa>();
  const [guiaDeRemessaFirebase, setGuiaDeRemessaFirebase] =
    useState<GuiaDeRemessaFirebase | null>(null);

  const fetchDataPedidos = async (
    guiaDeRemessaItemService: GuiaDeRemessaItemService
  ) => {
    try {
      if (guiaDeRemessaId) {
        const guiaDeRemessaItems =
          await guiaDeRemessaItemService.getPedidosByGuiaDeRemessaId(
            guiaDeRemessaId
          );
        setPedidos(guiaDeRemessaItems);
        console.log("pedido: ", guiaDeRemessaItems);
      } else {
        console.warn("guiaDeRemessaId está indefinido.");
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const fetchDataGuiaDeRemessa = async (
    guiaDeRemessaService: GuiaDeRemessaService
  ) => {
    try {
      const guiaDeRemessa = await guiaDeRemessaService.getById(
        guiaDeRemessaId!
      );
      setGuiaDeRemessa(guiaDeRemessa);
      console.log("guia de remessa: ", guiaDeRemessa);
    } catch (error) {
      console.error("Erro ao buscar guia de remessa:", error);
    }
  };

  const fetchDataGuiaDeRemessaFirebase = async () => {
    var guiaDeRemessaUpada = await getDoc(
      doc(db, "guia-de-remessa", guiaDeRemessaId!)
    );
    console.log("guia de remessa upada:", guiaDeRemessaUpada.data());
    if (guiaDeRemessaUpada.exists()) {
      setGuiaDeRemessaFirebase(
        guiaDeRemessaUpada.data() as GuiaDeRemessaFirebase
      );
    }
  };

  useEffect(() => {
    const guiaDeRemessaItemService = new GuiaDeRemessaItemService();
    const guiaDeRemessaService = new GuiaDeRemessaService();

    fetchDataPedidos(guiaDeRemessaItemService);
    fetchDataGuiaDeRemessa(guiaDeRemessaService);
    fetchDataGuiaDeRemessaFirebase();
  }, []);

  return {
    pedidos,
    guiaDeRemessa,
    guiaDeRemessaFirebase,
    fetchDataGuiaDeRemessaFirebase,
  };
};
