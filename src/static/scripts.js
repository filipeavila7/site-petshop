// Aguarda o DOM estar completamente carregado antes de executar QUALQUER código
document.addEventListener('DOMContentLoaded', async function () {

  console.log("✅ DOM carregado! Iniciando scripts...");

  // ========== MODAL DE LOGIN ==========
  const modal = document.getElementById("modalLogin");
  const btn = document.getElementById("abrirModal");
  const fechar = document.querySelector(".fechar");

  if (btn && modal && fechar) {
    btn.onclick = () => {
      modal.style.display = "flex";
    }

    fechar.onclick = () => {
      modal.style.display = "none";
    }

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  // ========== MODAL DE CADASTRO ==========
  const modalCadastro = document.getElementById("modalCadastro");
  const btnCadastro = document.getElementById("abrirModalCadastro");
  const fecharCadastro = document.querySelector(".fechar-cadastro");
  const formCadastro = document.getElementById("formCadastro");
  const mensagemCadastro = document.getElementById("mensagemCadastro");

  if (btnCadastro && modalCadastro && fecharCadastro) {
    btnCadastro.onclick = () => {
      modalCadastro.style.display = "flex";
    }

    fecharCadastro.onclick = () => {
      modalCadastro.style.display = "none";
      mensagemCadastro.textContent = "";
    }

    window.onclick = (event) => {
      if (event.target === modalCadastro) {
        modalCadastro.style.display = "none";
        mensagemCadastro.textContent = "";
      }
    }
  }

  // ========== FORMULÁRIO DE CADASTRO ==========
  if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("emailCadastro").value.trim();
      const senha = document.getElementById("senhaCadastro").value.trim();

      // Limpa mensagens anteriores
      mensagemCadastro.textContent = "";
      mensagemCadastro.style.color = "red";

      try {
        const response = await fetch("/cadastrar_usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            nome: nome,
            email: email,
            senha: senha
          })
        });

        const data = await response.json();

        if (data.success) {
          mensagemCadastro.style.color = "green";
          mensagemCadastro.textContent = data.mensagem;
          formCadastro.reset();
          // Fecha o modal após 1 segundo
          setTimeout(() => {
            modalCadastro.style.display = "none";
            mensagemCadastro.textContent = "";
          }, 1000);
        } else {
          mensagemCadastro.textContent = data.mensagem;
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        mensagemCadastro.textContent = "Erro interno do servidor.";
      }
    });
  }

  // ========== EXIBIR MSG DE LOGIN ==========
  const params = new URLSearchParams(window.location.search);
  const msg = params.get("msg");

  if (msg) {
    const div = document.createElement("div");
    div.className = "alerta";

    if (msg === "sucesso") {
      div.textContent = "✅ Login realizado com sucesso!";
      div.style.backgroundColor = "#4CAF50";
    } else if (msg === "erro") {
      div.textContent = "❌ Usuário ou senha inválidos!";
      div.style.backgroundColor = "#e74c3c";
      // opcional: reabrir o modal automaticamente
      const modalLogin = document.getElementById("modalLogin");
      if (modalLogin) {
        modalLogin.style.display = "flex";
      }
    }

    div.style.position = "fixed";
    div.style.top = "250px";
    div.style.right = "20px";
    div.style.padding = "12px 18px";
    div.style.borderRadius = "8px";
    div.style.color = "#fff";
    div.style.fontWeight = "bold";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    div.style.zIndex = "999";

    document.body.appendChild(div);

    // Esconde depois de 3 segundos
    setTimeout(() => div.remove(), 3000);
  }

  // ========== CARREGAR CURTIDAS ==========
  console.log("🔄 Iniciando fetch de curtidas...");

  try {
    const response = await fetch("/curtidas_usuario");
    if (!response.ok) throw new Error("Erro na requisição");

    const curtidas = await response.json();
    console.log("Dados recebidos:", curtidas);

    // Atualiza os corações dos cards
    document.querySelectorAll(".card-pet").forEach(card => {
      const postId = card.dataset.postId;
      const btn = card.querySelector(".curtir-btn");

      if (!btn) return;

      if (curtidas[postId]) {
        btn.src = "static/img/curtido.png";
        btn.classList.add("curtido");
        console.log(`❤️ Post ${postId} está curtido`);
      } else {
        btn.src = "static/img/heart.png";
        btn.classList.remove("curtido");
        console.log(`🤍 Post ${postId} não está curtido`);
      }
    });

  } catch (error) {
    console.error("💥 Erro ao carregar curtidas:", error);
  }

  // Carregar posts dinâmicos
  await carregarPostsDinamicos();

  // Atualizar totais após carregar curtidas
  await atualizarTotais();
  await atualizarTotaisComentarios();

  // ========== ENVIAR COMENTÁRIO ==========
  const formComentario = document.getElementById('form-comentario');

  if (formComentario) {
    formComentario.addEventListener('submit', async (e) => {
      e.preventDefault();

      console.log("🚀 Evento de envio de comentário acionado!");

      const modalComentarios = document.getElementById('modalComentarios');
      if (!modalComentarios) {
        console.error("❌ Modal de comentários não encontrado!");
        return;
      }

      const postId = modalComentarios.dataset.postId;
      if (!postId) {
        console.error("❌ Post ID não definido no modal!");
        return;
      }

      const textoInput = document.getElementById('comentario-texto');
      const texto = textoInput.value.trim();

      console.log("🆔 Post ID:", postId);
      console.log("📝 Texto digitado:", texto);

      if (!texto) {
        console.warn("⚠️ Nenhum texto foi digitado!");
        alert("Escreva algo antes de enviar!");
        return;
      }

      const formData = new FormData();
      formData.append("texto", texto);

      console.log("📦 Dados preparados para envio:", [...formData.entries()]);

      try {
        console.log(`📡 Enviando requisição para /comentario/${postId}...`);

        const response = await fetch(`/comentario/${postId}`, {
          method: "POST",
          body: formData
        });

        console.log("📬 Resposta recebida:", response);

        // ⚠️ Verifica se o usuário está deslogado
        if (response.status === 401) {
          const data = await response.json();
          alert(data.mensagem || "Você precisa estar logado para comentar!");
          return;
        }

        if (!response.ok) {
          console.error("❌ Erro HTTP:", response.status, response.statusText);
          alert("Erro na comunicação com o servidor.");
          return;
        }

        const data = await response.json();
        console.log("📨 Dados retornados do backend:", data);

        if (data.success) {
          console.log("✅ Comentário adicionado com sucesso!");
          textoInput.value = ""; // limpa o campo
          abrirComentarios(postId); // 🔄 atualiza lista
          await atualizarTotaisComentarios();
        } else {
          console.warn("⚠️ Erro ao adicionar comentário:", data.mensagem);
          alert(data.mensagem || "Erro ao enviar comentário.");
        }

      } catch (error) {
        console.error("💥 Erro inesperado ao enviar comentário:", error);
        alert("Erro inesperado. Veja o console para mais detalhes.");
      }
    });
  }

}); // FIM DO DOMContentLoaded


// ========== FUNÇÕES GLOBAIS (fora do DOMContentLoaded) ==========

// Função para curtir/descurtir
async function curtirPost(postId, btn) {
  try {
    const response = await fetch(`/curtir/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    // ⚠️ Caso o usuário não esteja logado
    if (response.status === 401) {
      const data = await response.json();
      console.warn("⚠️ Usuário não autenticado:", data.mensagem);

      // Exibe alerta e abre o modal de login
      alert(data.mensagem || "Você precisa estar logado para curtir!");
      const modalLogin = document.getElementById("modalLogin");
      if (modalLogin) modalLogin.style.display = "flex";
      return; // Para a execução aqui
    }


    const data = await response.json();



    if (data.success) {
      if (data.curtida) {
        btn.src = "static/img/curtido.png";
        btn.classList.add('curtido');
        atualizarTotais();
      } else {
        btn.src = "static/img/heart.png";
        btn.classList.remove('curtido');
        atualizarTotais();
      }
    } else {
      console.error(data.mensagem);
    }
  } catch (error) {
    console.error('Erro ao curtir post:', error);
  }
}


async function atualizarTotaisComentarios() {
  try{
    const response = await fetch("/total_comentarios");
    const totais = await response.json();
    console.log("total de comentarios recebidos:", totais)

    document.querySelectorAll(".card-pet").forEach(card =>{
      const postId = card.dataset.postId;
      const span = card.querySelector(".total-comentarios");
      if (span){
        span.textContent = totais[postId] || 0;
      }
    });
  } catch (err){
    console.error("error ao atualizar comentarios")
  }
}



async function atualizarTotais() {
  try {
    const response = await fetch("/total_curtidas");
    const totais = await response.json();
    console.log("📊 Totais recebidos:", totais);

    document.querySelectorAll(".card-pet").forEach(card => {
      const postId = card.dataset.postId;
      const span = card.querySelector(".total-curtidas");
      if (span) {
        span.textContent = totais[postId] || 0;
      }
    });
  } catch (err) {
    console.error("💥 Erro ao atualizar totais:", err);
  }
}

// Função para abrir e listar os comentarios
function abrirComentarios(postId) {
  const modal = document.getElementById('modalComentarios');
  const lista = document.getElementById('comentarios-lista');

  if (!modal || !lista) {
    console.error("❌ Modal ou lista de comentários não encontrados!");
    return;
  }

  // Mostra mensagem de carregamento
  lista.innerHTML = "<p>Carregando...</p>";

  // Abre o modal
  modal.style.display = "flex";

  // Atualiza o postId no modal
  modal.dataset.postId = postId;

  // Busca os comentários via fetch
  fetch(`/comentarios/${postId}`)
    .then(res => res.json())
    .then(comentarios => {
      if (comentarios.length) {
        // Lista os comentários
        lista.innerHTML = comentarios
          .map(c => `<p><strong>${c.usuario_nome}:</strong> ${c.texto}</p>`)
          .join('');
      } else {
        lista.innerHTML = "<p>Seja o primeiro a comentar!</p>";
      }
      console.log("📄 Comentários carregados:", comentarios);
    })
    .catch(err => {
      console.error("💥 Erro ao carregar comentários:", err);
      lista.innerHTML = "<p>Erro ao carregar comentários.</p>";
    });

  // Seleciona o botão de fechar
  const fecharBtn = document.querySelector('.fechar-comentario');

  if (fecharBtn && modal) {
    fecharBtn.onclick = () => {
      modal.style.display = 'none';
    };
  }

  // Fecha ao clicar fora do modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Função para carregar posts dinâmicos
async function carregarPostsDinamicos() {
  try {
    const response = await fetch("/posts");
    const posts = await response.json();
    console.log("Posts carregados:", posts);

    const petContainer = document.querySelector(".pet-container");
    if (!petContainer) return;

    // Limpa os posts estáticos
    petContainer.innerHTML = "";

    // Adiciona posts dinâmicos
    posts.forEach(post => {
      const card = document.createElement("div");
      card.className = "card-pet";
      card.setAttribute("data-post-id", post.id);

      card.innerHTML = `
        <div class="pet-content">
          <img src="${post.imagem ? 'static/' + post.imagem : 'static/img/default.jpg'}" alt="${post.nome_post}" onclick="abrirModalDetalhes(${post.id})" style="cursor: pointer;">
          <h3 onclick="abrirModalDetalhes(${post.id})" style="cursor: pointer;">${post.nome_post}</h3>
          <div class="acoes">
            <img src="static/img/heart.png" class="curtir-btn" onclick="curtirPost(${post.id}, this)">
            <span class="total-curtidas">0</span>
            <img src="static/img/coment.png" alt="comentario" onclick="abrirComentarios(${post.id})">
            <span class="total-comentarios">0</span>
          </div>
        </div>
      `;

      petContainer.appendChild(card);
    });

    // Após carregar posts, carregar curtidas
    await carregarCurtidas();

  } catch (error) {
    console.error("Erro ao carregar posts:", error);
  }
}

// Função para carregar curtidas após posts dinâmicos
async function carregarCurtidas() {
  try {
    const response = await fetch("/curtidas_usuario");
    const curtidas = await response.json();

    document.querySelectorAll(".card-pet").forEach(card => {
      const postId = card.dataset.postId;
      const btn = card.querySelector(".curtir-btn");

      if (curtidas[postId]) {
        btn.src = "static/img/curtido.png";
        btn.classList.add("curtido");
      } else {
        btn.src = "static/img/heart.png";
        btn.classList.remove("curtido");
      }
    });
  } catch (error) {
    console.error("Erro ao carregar curtidas:", error);
  }
}

// Função para abrir modal de detalhes do pet
function abrirModalDetalhes(postId) {
  // Buscar dados do post específico
  fetch(`/post/${postId}`)
    .then(res => res.json())
    .then(post => {
      if (post) {
        document.getElementById('detalhes-nome').textContent = post.nome_post;
        document.getElementById('detalhes-imagem').src = post.imagem ? 'static/' + post.imagem : 'static/img/default.jpg';
        document.getElementById('detalhes-idade').textContent = post.idade;
        document.getElementById('detalhes-peso').textContent = post.peso;
        document.getElementById('detalhes-raca').textContent = post.raca || 'Não determinada';

        const modal = document.getElementById('modalDetalhes');
        modal.style.display = "flex";

        // Fechar modal
        const fecharBtn = document.querySelector('.fechar-detalhes');
        fecharBtn.onclick = () => {
          modal.style.display = 'none';
        };

        // Fecha ao clicar fora do modal
        window.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });
      }
    })
    .catch(err => {
      console.error("Erro ao carregar detalhes do pet:", err);
    });
}
