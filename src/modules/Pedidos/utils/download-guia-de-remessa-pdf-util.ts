import moment from "moment";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { GuiaDeRemessaItemService } from "../../GuiaDeRemessaItem/service/guia-de-remessa-item-service";
import { toast } from "react-toastify";

  export const downloadPdf = async (guiaDeRemessaId: string, guiaDeRemessa: GuiaDeRemessa) => {
    handleDownloadPdf(guiaDeRemessaId!, guiaDeRemessa!)
      .then(() => {
        console.log("PDF baixado com sucesso");
        toast.success("PDF baixado com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao baixar o PDF:", error);
        toast.error("Erro ao baixar o PDF");
      });
  }

  const handleDownloadPdf = async (
    idGuiaDeRemessa: string,
    guiaDeRemessa: GuiaDeRemessa
  ) => {
    try {
      const id = idGuiaDeRemessa;
      const guiaDeRemessaItemService = new GuiaDeRemessaItemService();
      const pdfBlob = await guiaDeRemessaItemService.getGuiaDeRemessaPdf(id!);
      downloadFile(
        pdfBlob,
        `${guiaDeRemessa?.unidadeEscolar}-GUIA-DE-REMESSA-${moment(
          guiaDeRemessa?.dataDaEmissao
        ).format("DD/MM/YYYY hh:mm")}.pdf`
      );
    } catch (error) {
      alert("Erro ao baixar o PDF");
    }
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
