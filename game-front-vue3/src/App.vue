<template>
  <div>
    <table-template
      caption="Kõik mängud"
      :items="games"
      :showControls="true"
      @show="gameDetailId = $event.id"
    >
    </table-template>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gameDetailId != 0" @close="gameDetailId = 0">
      <template #header>
        <h3>Mängu Üksikasjad</h3>
      </template>
      <template #body>
        <b>Nimi:</b>{{ currentGame.name }}<br />
        <b>Kirjeldus:</b>{{ currentGame.description }}<br />
        <b>Teema valdkond:</b>{{ currentGame.genre }}<br />
        <b>Stuudio:</b>{{ currentGame.studio }}<br />
        <b>Avalikustamine:</b>{{ currentGame.releasedate }}<br />
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from "./components/Modal.vue";
import TableTemplate from "./components/Table.vue";

export default {
  components: {
    Modal,
    TableTemplate,
  },
  data() {
    return {
      games: [],
      gameDetailId: 0,
      currentGame: {
        id: 0,
        name: "",
        description: "",
        studio: "",
        genre: "",
        releasedate: "",
      },
    };
  },
  async created() {
    this.games = await (await fetch("http://localhost:8090/games")).json();
  },
  watch: {
    async gameDetailId(newId) {
      if (newId == 0) return;
      this.currentGame = await (
        await fetch(`http://localhost:8090/games/${newId}`)
      ).json();
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
