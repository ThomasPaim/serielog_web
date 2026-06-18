<template>
    

  <main>
    <h1>SerieFlow</h1>

   <input v-model="termoBusca" placeholder="Nome da série..." />

<button @click="buscar(termoBusca)">
  Buscar
</button>

<label for="generos">Escolha um gênero </label>
<select
  name="generos"
  v-model="generoSelecionado"
>
  <option value="">Todos</option>

  <option value="Drama">Drama</option>
  <option value="Ficcao">Ficçao Científica</option>
  <option value="Comedia">Comédia</option>
  <option value="Historia">História</option>
  <option value="Aventura">Aventura</option>
</select>

<!-- <div v-if="seriesExibidas.length > 0">
  <ul>
    <li
      v-for="serie in seriesExibidas"
      :key="serie.id"
    >
      {{ serie.titulo }} - {{ serie.genero }}
    </li>
  </ul>
</div>
   -->

<div v-if="serie">
  <h2>{{ serie.titulo }}</h2>
  <p>{{ serie.genero }}</p>
  <p>{{ serie.nota }}</p>
  <p>{{ serie.ano }}</p>
  <p>{{ serie.assistida }}</p>
</div>

<p v-if="erro">{{ erro }}</p>


    <div v-if="seriesExibidas.length > 0">
      <div v-for="serie in seriesExibidas" :key="serie.id">
        {{ serie.titulo }}, 
        {{ serie.genero }},
        {{ serie.nota }},
        {{ serie.ano }},
        {{ serie.assistida }}
        <button @click="excluirSerie(serie.id)">


    Excluir
  </button>

          <router-link :to="`/series/${serie.id}`">
            Ver detalhes
          </router-link>


      </div>
    </div>

    <p v-else>Nenhuma série encontrada.</p>


  <form @submit.prevent="criarNovaSerie">

  <label for="titulo">Titulo</label>
  <input type="text" v-model="titulo">

  <label for="genero">Gênero</label>
  <input type="text" v-model="genero">

  <label for="nota">Nota</label>
  <input type="number" v-model.number="nota">

  <label for="ano">Ano</label>
  <input type="number" v-model.number="ano">

  <button type="submit">
    Criar nova série
  </button>

</form>
  </main>
</template>



<script setup>
import { ref, computed, onMounted } from "vue";

//Listar series

const series = ref([]);

async function listarSeries() {
  try {
    const response = await fetch("http://localhost:3000/series");

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data = await response.json();

    console.log(data);

    series.value = data;
  } catch (error) {
    console.error("Erro ao buscar séries:", error);
  }
}

onMounted(() => {
  console.log("Home carregada");
  listarSeries();
});

// Buscar 

const termoBusca = ref("");
const serie = ref(null);
const erro = ref("");



async function buscar(nome) {
  try {
    erro.value = "";

    const response = await fetch(
      "http://localhost:3000/series"
    );

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const listaSerie = await response.json();

    const serieEncontrada = listaSerie.find(
      serie =>
        serie.titulo.toLowerCase() ===
        nome.toLowerCase()
    );

    if (!serieEncontrada) {
      erro.value = "Série não encontrada";
      serie.value = null;
      return;
    }

    serie.value = serieEncontrada;
  } catch (error) {
    erro.value = error.message;
  }
}


//Post


const titulo = ref("")
const ano = ref("")
const nota = ref("")
const genero = ref("")

async function criarNovaSerie() {
  try {
    erro.value = "";

    const dados = {
      titulo: titulo.value,
      ano: ano.value,
      nota: nota.value,
      genero: genero.value,
      assistida: false
    };

    const response = await fetch(
      "http://localhost:3000/series",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      }
    );

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const novaSerie = await response.json();

    series.value.push(novaSerie);

    titulo.value = "";
    ano.value = "";
    nota.value = "";
    genero.value = "";

  } catch (error) {
    erro.value = error.message;
  }
}

//Delete

async function excluirSerie(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/series/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao excluir série");
    }

    console.log("Série excluída");

    series.value = series.value.filter(
      serie => serie.id !== id
    );


  } catch (error) {
    console.error(error);
  }
}


//Filtro   
const generoSelecionado = ref('');


const seriesExibidas = computed(() => {

  if (!generoSelecionado.value) {
    return series.value;
  }

  return series.value.filter(
    serie => serie.genero === generoSelecionado.value
  );

});


</script>