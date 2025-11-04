# TODO: Implementar Posts Dinâmicos com Nome e Imagem no Painel Admin

## Passos para Implementação

1. **Atualizar Modelo Post**:
   - ✅ Adicionar coluna `imagem` ao modelo `post_models.py` para armazenar o caminho da imagem.

2. **Modificar Template Criar Post**:
   - ✅ Atualizar `criar_post.html` para incluir campo de upload de imagem obrigatório.

3. **Atualizar Template Editar Post**:
   - ✅ Modificar `editar_post.html` para incluir campo de imagem.

4. **Atualizar Rotas**:
   - ✅ Modificar rota `/admin/post/criar` para salvar imagem no diretório `static/img/` e armazenar caminho no banco.
   - ✅ Modificar rota `/admin/post/<int:post_id>/editar` para atualizar imagem se nova for enviada.
   - ✅ Criar nova rota `/posts` (GET) para retornar lista de posts com nome e imagem para o frontend.

5. **Atualizar Frontend**:
   - ✅ Modificar `index.html` para adicionar uma seção dinâmica na `.pet-sec` para posts criados.
   - ✅ Atualizar `scripts.js` para buscar posts via AJAX na rota `/posts` e renderizar cards dinâmicos com nome e imagem, mantendo os cards fixos.

6. **Testes**:
   - Testar criação de post com imagem obrigatória.
   - Verificar exibição no frontend.
   - Testar edição de post com nova imagem.

## Dependências
- Nenhum novo pacote necessário, usar Flask para upload de arquivos.

## Status
- ✅ Modelo Post atualizado com coluna `imagem`.
- ✅ Templates de criar e editar post atualizados com upload de imagem.
- ✅ Rotas de criar e editar post modificadas para salvar imagem.
- ✅ Nova rota `/posts` criada para listar posts dinamicamente.
- ✅ Frontend atualizado para carregar posts dinamicamente via JavaScript.
- ✅ Scripts.js atualizado com funções `carregarPostsDinamicos` e `carregarCurtidas`.
