import { useCallback, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaShieldHalved,
  FaTrashCan,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import { ModalConfirmacaoComponent } from "../../components/modal-confirmacao/modal-confirmacao.component";
import { useTema } from "../../context/theme.context";
import {
  apagarDadosSalvos,
  existemDadosSalvos,
} from "../../shared/utils/armazenamento";
import { AboutPageStyle } from "./about-page.style";

export const AboutPage = () => {
  const { redefinirTema } = useTema();
  const [temDados, setTemDados] = useState<boolean>(existemDadosSalvos);
  const [confirmando, setConfirmando] = useState<boolean>(false);

  const cancelarExclusao = useCallback(() => setConfirmando(false), []);

  function apagarDados() {
    setConfirmando(false);

    if (!apagarDadosSalvos()) {
      toast.error(
        "Não foi possível apagar os dados. Verifique as permissões de armazenamento do navegador.",
      );
      return;
    }

    redefinirTema();
    setTemDados(false);
    toast.success("Todos os seus dados foram apagados.");
  }

  return (
    <AboutPageStyle>
      <div className="about-container">
        <header className="about-hero">
          <h1>Calculadora de Notas FESA</h1>
          <p>
            Uma ferramenta para os estudantes da{" "}
            <strong>Faculdade Engenheiro Salvador Arena (FESA)</strong>{" "}
            acompanharem suas notas e simularem médias ao longo do semestre.
          </p>
        </header>

        <section className="about-card">
          <h2>
            <FaShieldHalved /> Seus dados
          </h2>
          <p>
            As notas, as DPs e suas preferências (como o tema) ficam salvas{" "}
            <strong>somente neste navegador</strong>. Elas não são enviadas
            para nenhum servidor e não exigem cadastro. Por isso, ao trocar de
            navegador ou de aparelho, você começa do zero.
          </p>
          <p>
            O site usa o Vercel Analytics para medir o número de acessos. Essa
            ferramenta não tem acesso às notas que você digita.
          </p>

          <div className="danger-zone">
            <div className="danger-text">
              <h3>Apagar meus dados</h3>
              <p>
                Remove deste navegador todas as notas, DPs e preferências
                salvas, incluindo o tema e o aceite do aviso. Não dá para
                desfazer. Se quiser guardar suas notas, baixe o PDF antes.
              </p>
            </div>
            <button
              type="button"
              className="btn-apagar"
              disabled={!temDados}
              onClick={() => setConfirmando(true)}
            >
              <FaTrashCan />
              Apagar todos os meus dados
            </button>
            {!temDados && (
              <span className="sem-dados" role="status">
                Não há dados salvos neste navegador.
              </span>
            )}
          </div>
        </section>

        <section className="about-card warning">
          <h2>
            <FaTriangleExclamation /> Aviso importante
          </h2>
          <p>
            Esta ferramenta <strong>não possui vínculo oficial</strong> com a
            instituição. Podem ocorrer divergências de arredondamento,
            imprecisões ou diferenças na grade curricular. Os resultados são
            apenas <strong>referenciais</strong> e{" "}
            <strong>não devem ser considerados oficiais</strong>.
          </p>
          <p>
            Em caso de dúvidas ou inconsistências, procure o professor
            responsável ou a própria instituição.
          </p>
        </section>

        <section className="about-contact">
          <p>
            Encontrou algum problema ou tem uma sugestão de melhoria? Fale com o
            desenvolvedor:
          </p>
          <div className="contact-links">
            <a
              href="https://www.linkedin.com/in/jos%C3%A9gabrielsouza/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://github.com/Gabriieu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </section>
      </div>

      {confirmando && (
        <ModalConfirmacaoComponent
          titulo="Apagar todos os dados?"
          descricao="Suas notas, DPs e preferências salvas neste navegador serão removidas de forma definitiva."
          textoConfirmar="Apagar tudo"
          onConfirmar={apagarDados}
          onCancelar={cancelarExclusao}
        />
      )}
    </AboutPageStyle>
  );
};
