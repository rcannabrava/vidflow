const containerVideos = document.querySelector('.videos__container');

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json();

        videos.forEach((video) => {
            if(video.categoria == "") {
                throw new Error(`Vídeo "${video.titulo}" não foi categorizado`)
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `
        })
    } catch(error) {
        containerVideos.innerHTML = `<p style = "color: red">Houve um erro ao carregar os videos: ${error}`
    }
}
buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorInput = barraDePesquisa.value.toLowerCase();

        videos.forEach(video => {
            const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();  

            video.style.display = valorInput ? titulo.includes(valorInput) ? 'block': 'none' : 'block';
        })
    
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    const nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
    
})

function filtrarPorCategoria(filtro)  {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = filtro.toLowerCase();

    videos.forEach(video => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    });
}