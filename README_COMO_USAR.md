# 📋 Guia de Uso — Template de Página de Vendas

> **Template pronto para deploy na Netlify + integração Kiwify**

---

## 🚀 Deploy em 5 passos (15-20 min)

### 1. Clone ou copie os arquivos
```bash
# Opção A: Copie a pasta sales-page-template para seu projeto
cp -r C:/Users/Marcelo/Projeto_Editor_DEV/Obsidian_Vault_Youtube/sales-page-template ./minha-pagina

# Opção B: Crie um repo no GitHub e faça upload
git clone https://github.com/mastersceo/minha-pagina-vendas
cd minha-pagina-vendas
```

### 2. Configure as variáveis
Abra `index.html` e substitua todas as variáveis `{{...}}` pelos seus dados:

```html
<!-- Exemplo: -->
<title>Relatório GeoMacro Brasil 2025</title>
<meta name="description" content="Ebook com 10 cenários geopolíticos que moldam o Brasil até 2030...">
```

#### Principais variáveis:
| Variável | Exemplo | Onde achar |
|----------|---------|------------|
| `{{CHANNEL_NAME}}` | "Geopolítica Hoje" | Seu canal YouTube |
| `{{PRODUCT_NAME}}` | "Relatório GeoMacro Brasil 2025" | Nome do infoproduto |
| `{{PRICE}}` | "47" | Preço final |
| `{{KIWIFY_CHECKOUT_URL}}` | `https://pay.kiwify.com.br/seu-id` | [kiwify.com.br](https://kiwify.com.br) |
| `{{GA_MEASUREMENT_ID}}` | `G-XXXXXXXXXX` | Google Analytics |
| `{{PRODUCT_TYPE}}` | "ebook" / "relatório" | Tipo do produto |
| `{{EDITION}}` | "Janeiro/2025" | Edição do produto |

### 3. Substitua as imagens
Na pasta `img/`:

| Arquivo | O que substituir | Ferramenta |
|---------|------------------|------------|
| `favicon.svg` | Ícone do site (32x32) | [favicon.io](https://favicon.io) |
| `pagina-1.jpg` | Capa do produto (1080x1440px) | Canva / Photoshop |
| `pagina-2.jpg` | Página de conteúdo (1080x1440px) | Screenshot do PDF |
| `pagina-3.jpg` | Gráfico ou mapa (1080x1440px) | Flourish / Blender |
| `pagina-4.jpg` | Sumário ou layout (1080x1440px) | Screenshot do PDF |

### 4. Crie a conta Kiwify e o produto
1. Acesse [kiwify.com.br](https://kiwify.com.br)
2. Crie uma conta (gratuita)
3. "Criar Produto Digital" → Configure nome, preço (R$ 47), garantia (7 dias)
4. Copie o link de checkout e substitua em `{{KIWIFY_CHECKOUT_URL}}`

### 5. Suba na Netlify
1. Crie uma conta gratuita em [netlify.com](https://netlify.com)
2. Conecte sua conta GitHub
3. Crie um site novo → selecione seu repositório
4. Clique em "Deploy site" — pronto! 🎉

---

## 🎨 Customização Visual (Opcional)

### Mudar cores
No arquivo `assets/css/style.css`, alterne os valores de `:root`:

```css
--amber-accent: #FF6B35; /* Seu accent vermelho-laranja */
--emerald: #2ECC71;       /* Verde alternativo */
```

### Mudar fontes
No `<head>` do `index.html`, substitua os links do Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 📊 Métricas de Conversão (Track no GA)

| Evento | Gatilho | Parâmetros |
|--------|---------|------------|
| `purchase_intent` | Clique no botão "Comprar" | `{ button_location: 'top' \| 'middle' \| 'bottom' \| 'sticky' }` |
| `preview_view` | Scroll até #conteudo | `{ }` |
| `bonus_hover` | Hover no bônus | `{ }` |

No Google Analytics → Configure → "Eventos" → veja o flow.

---

## 🔧 Se precisar de algo

- **Problemas técnicos:** abra uma issue no repo GitHub
- **Customização avançada:** me chama no [seu-contato]
- **Criar mais variações A/B:** copie a pasta, renomeie, mude a cor do CTA