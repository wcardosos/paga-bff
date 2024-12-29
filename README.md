# paga

Bem-vindo à API do **paga**, uma aplicação voltada para organização financeira. O sistema permite gerenciar seus orçamentos mensais, visualizar gastos, receitas e traçar metas de despesas, integrando-se com planilhas do Google Sheets.

## 🎯 Objetivo

A aplicação foi criada para estruturar de forma visual e prática os orçamentos financeiros pessoais, resolvendo a limitação de visualizações da planilha no Google Sheets. Com o **paga**, é possível ter acesso detalhado e organizado aos dados financeiros de forma clara e funcional.

## ✨ Funcionalidades

- **Resumo financeiro**:
  - Receita total.
  - Despesas totais.
  - Balanço (receitas - despesas).
  - Valores pagos e valores pendentes.
  - Quantia já separada (reservas).
- **Gestão de despesas**:
  - Controle de metas de gastos.
  - Exibição de valores detalhados por categoria.
- **Autenticação/Autorização**:
  - Conta universal definida via variáveis de ambiente para acesso ao sistema.

## 🛠️ Tecnologias utilizadas

- **Node.js** com **TypeScript** para o backend.
- **Fastify** para gerenciar o servidor.
- Integração com a API do Google para acessar os dados da planilha.

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório**:
   ```bash
   git clone git@github.com:wcardosos/paga-bff.git
   cd paga-bff
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Copie o arquivo `.env.sample` para `.env`:
     ```bash
     cp .env.sample .env
     ```
   - Preencha as variáveis de ambiente conforme suas configurações.

4. **Execute o servidor em ambiente de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Rode os testes**:
   - Testes unitários:
     ```bash
     npm run test
     ```
   - Testes E2E:
     ```bash
     npm run test:e2e
     ```

## 📝 Estrutura esperada da planilha

Para que a aplicação funcione corretamente, é necessário utilizar uma planilha no formato esperado. Um exemplo da estrutura está disponível na pasta `docs` do projeto.

## ⚠️ Contribuições

Contribuições não estão sendo aceitas no momento.  

## 🗒️ Licença

Este projeto ainda não possui uma licença definida.

---

🎉 **Obrigado por utilizar o paga!** Caso tenha alguma dúvida, fique à vontade para entrar em contato. Acesse também o frontend da aplicação em https://github.com/wcardosos/paga-web.

