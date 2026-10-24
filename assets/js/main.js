/**
 * main.js — Interatividade da página de vendas
 * Baseado no script de Brasil Avançado 2050, adaptado para template reutilizável.
 *
 * Funcionalidades:
 * 1. Link de checkout da Kiwify (substituir {{KIWIFY_CHECKOUT_URL}})
 * 2. Carrossel de páginas (setas avançam uma figura por vez)
 * 3. Botão flutuante sticky (aparece quando o botão topo sai da tela e some quando a oferta entra)
 * 4. Eventos do Google Analytics (track cliques de compra)
 */

(function () {
  "use strict";

  // 1. Checkout Kiwify — substitua pela URL da sua oferta
  const CHECKOUT_URL = document.querySelector("[data-checkout]")?.href || "#";
  document.querySelectorAll("#btn-comprar, [data-checkout]").forEach((b) => {
    b.href = CHECKOUT_URL;
    b.target = "_blank";
    b.rel = "noopener";
  });

  // 2. Carrossel de páginas
  initCarousel();

  // 3. Botão flutuante sticky
  initFloatingButton();

  // 4. Eventos do GA
  initAnalytics();


  /* =============== */
  /* Funções         */
  /* =============== */

  /**
   * Carrossel: as setas avançam/recuam uma página (figure) por clique.
   */
  function initCarousel() {
    const trilho = document.querySelector(".paginas");
    const esq = document.querySelector(".seta-esq");
    const dir = document.querySelector(".seta-dir");

    if (!trilho || !esq || !dir) return;

    // Largura de uma figura + gap
    const getStep = () => {
      const fig = trilho.querySelector("figure");
      if (!fig) return 0;
      const rect = fig.getBoundingClientRect();
      // Inclui o gap (18px conforme CSS)
      return rect.width + 18;
    };

    const updateArrows = () => {
      esq.disabled = trilho.scrollLeft <= 4;
      dir.disabled =
        trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
    };

    esq.addEventListener("click", () => {
      trilho.scrollBy({ left: -getStep() });
    });
    dir.addEventListener("click", () => {
      trilho.scrollBy({ left: getStep() });
    });
    trilho.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  /**
   * Botão fixo/flutuante: aparece quando o botão topo "sai" da viewport
   * e desaparece quando a seção de oferta ("#comprar") entra em vista.
   */
  function initFloatingButton() {
    const fixo = document.getElementById("fixo");
    const btnTopo = document.getElementById("btn-topo");
    const secaoCompra = document.getElementById("comprar");

    if (!fixo || !btnTopo || !secaoCompra) return;

    const visibilidade = { passou: false, oferta: false };
    const toggle = () => fixo.classList.toggle("on", visibilidade.passou && !visibilidade.oferta);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target.id === "btn-topo") {
          // O topo "passou" quando deixou de ser visível e está acima da tela
          visibilidade.passou = !e.isIntersecting && e.boundingClientRect.top < 0;
        } else {
          visibilidade.oferta = e.isIntersecting;
        }
        toggle();
      });
    });

    observer.observe(btnTopo);
    observer.observe(secaoCompra);
  }

  /**
   * Eventos do Google Analytics 4.
   * Envia:
   * - 'purchase_intent' quando clica em qualquer botão "Comprar"
   * - 'preview_view' quando chega na seção de pré-visualização
   * - 'bonus_hover' quando passa o mouse no bônus
   */
  function initAnalytics() {
    // Track cliques em botões de compra
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a.btn");
      if (!a) return;

      if (typeof gtag !== "function") return;

      const local =
        a.id === "btn-comprar"
          ? "oferta"
          : a.closest("#fixo")
            ? "sticky"
            : a.id === "btn-topo"
              ? "hero"
              : "outro";

      gtag("event", "purchase_intent", { button_location: local });
    });

    // Track visualização da seção de conteúdo
    const previewSection = document.getElementById("conteudo");
    if (previewSection && typeof gtag === "function") {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              gtag("event", "preview_view");
              obs.unobserve(previewSection); // Só registra uma vez
            }
          });
        },
        { threshold: 0.5 }
      );
      obs.observe(previewSection);
    }
  }
})();