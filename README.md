# InvoiCy API Documentation

Portal de documentação interativa para a API da plataforma **InvoiCy** — integração com sistemas de documentos fiscais eletrônicos brasileiros (NF-e, NFC-e, NFS-e, CT-e, MDF-e, NFCom).

---

## Visão Geral

Este projeto é uma **Single Page Application (SPA)** construída com React + TypeScript que serve como referência completa para desenvolvedores integrando com a API InvoiCy. O portal cobre autenticação JWT, endpoints organizados por categoria, tabela de códigos de retorno e exemplos de requisição/resposta.

### Ambientes da API

| Ambiente | URL Base |
|---|---|
| Homologação | `https://apibrhomolog.invoicy.com.br` |
| Produção | `https://apibr.invoicy.com.br` |

---

## Funcionalidades

- **Navegação por scroll-spy** — sidebar destaca automaticamente a seção visível na tela
- **Busca de endpoints** — filtra em tempo real por título ou path em todas as categorias
- **Estrutura expansível** — pastas colapsáveis por categoria de documento fiscal
- **Autenticação documentada** — fluxo completo JWT em dois níveis (Partner e Company) com vídeo tutorial embarcado
- **Exemplos de código** — blocos com syntax highlight, copiáveis, com links para GitHub e Postman
- **Tabela de códigos de retorno** — mais de 100 status codes com descrições em português, paginada por categoria
- **Responsivo** — sidebar mobile com backdrop animado e modo escuro (dark mode)
- **Links externos** — artigos, layouts de DANFE/DAMDFe e repositório de exemplos por endpoint

---

## Categorias de Endpoints

| Categoria | Descrição |
|---|---|
| Empresas | Gerenciamento de empresas e certificados |
| WebHooks | Configuração de callbacks de eventos |
| Exportações | Download de XMLs e relatórios |
| Extensões | Funcionalidades adicionais por documento |
| NF-e | Nota Fiscal Eletrônica |
| NFC-e | Nota Fiscal de Consumidor Eletrônica |
| NFS-e | Nota Fiscal de Serviço Eletrônica |
| NFCom | Nota Fiscal de Comunicação |
| MDF-e | Manifesto Eletrônico de Documentos Fiscais |
| CT-e | Conhecimento de Transporte Eletrônico |

---

## Pré-requisitos

- Node.js 18+
- npm ou yarn

---

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 8080)
npm run dev

# Build de produção
npm run build

# Preview do build de produção
npm run preview

# Executar testes
npm run test

# Linting
npm run lint
```

---

## Formato de Dados — Endpoint

Cada entrada em `src/data/endpoints.json` segue a estrutura:

```json
{
  "id": "nfe-emitir",
  "title": "Emitir NF-e",
  "method": "POST",
  "path": "/nfe/{cnpj}",
  "description": "Descrição em markdown do endpoint...",
  "request_body": "{ ... }",
  "response_body": "{ ... }",
  "article_url": "https://...",
  "article_label": "Ver artigo completo",
  "examples_url": "https://github.com/...",
  "examples_label": "Ver exemplos",
  "layout_url": "https://...",
  "layout_label": "Layout DANFE",
  "notes": "Observações adicionais..."
}
```

---

## Autenticação

A API InvoiCy usa autenticação JWT em dois níveis:

1. **Partner JWT** — gerado com o Partner Secret fornecido pela Migrate
2. **Company JWT** — gerado usando o Partner JWT para autorizar operações em nome de uma empresa específica

Consulte a seção "Autenticação" no próprio portal para o fluxo completo com exemplos e o tutorial em vídeo.

---

## Recursos Externos

| Recurso | Link |
|---|---|
| Repositório de exemplos | [github.com/migrate-company/integracao-InvoiCy-BR](https://github.com/migrate-company/integracao-InvoiCy-BR) |
| Portal do desenvolvedor | [desenvolvedores.migrate.info](https://desenvolvedores.migrate.info/) |
| Coleção Postman | [Documentação Postman](https://documenter.getpostman.com/view/9193875/SztEanQL) |
| Site Migrate | [migrate.info](https://migrate.info/) |

---

## Licença

Propriedade da **MIGRATE SISTEMAS DE INFORMAÇÃO LTDA**. Todos os direitos reservados.
