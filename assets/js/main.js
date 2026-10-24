/**
 * main.js — Interatividade da página de vendas Mapa Macro
 * Funcionalidades:
 * 1. Link de checkout da Kiwify (substitua {{KIWIFY_CHECKOUT_URL}} no HTML)
 * 2. Carrossel de páginas (setas avançam uma figura por vez)
 * 3. Botão flutuante sticky (aparece quando o botão topo sai da tela e some quando a oferta entra)
 * 4. Eventos do Google Analytics (track cliques de compra)
 */

(function () {
  "use strict";

  // 1. Checkout Kiwify — o link já está no HTML no botão #btn-comprar
  // Se quiser definir via JS, descomente e coloque seu link:
  // const CHECKOUT_URL = "https://pay.kiwify.com.br/SEU_ID_AQUI";
  // document.querySelectorAll("#btn-comprar, [data-checkout]").forEach((b) => {
  //   b.href = CHECKOUT_URL;
  //   b.target = "_blank";
  //   b.rel = "noopener";
  // });

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
    const trilho = document.querySelector(".pages");
    const esq = document.querySelector(".arrow-left");
    const dir = document.querySelector(".arrow-right");

    if (!trilho || !esq || !dir) return;

    const getStep = () => {
      const fig = trilho.querySelector("figure");
      if (!fig) return 0;
      const rect = fig.getBoundingClientRect();
      return rect.width + 24; // largura + gap
    };

    const updateArrows = () => {
      esq.disabled = trilho.scrollLeft <= 4;
      dir.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
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
    const fixo = document.getElementById("sticky-bar");
    const btnTopo = document.getElementById("btn-topo");
    const secaoCompra = document.getElementById("comprar");

    if (!fixo || !btnTopo || !secaoCompra) return;

    const visibilidade = { passou: false, oferta: false };
    const toggle = () => fixo.classList.toggle("on", visibilidade.passou && !visibilidade.oferta);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target.id === "btn-topo") {
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
          : a.closest("#sticky-bar")
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
              obs.unobserve(previewSection);
            }
          });
        },
        { threshold: 0.5 }
      );
      obs.observe(previewSection);
    }
  }
})();