<template>
  <div>
    <router-link to="/addGame">Lisa uus mäng</router-link>
    <table-template
      caption="Kõik mängud"
      :items="games"
      :showControls="true"
      @show="gameDetailId = $event.id"
      @delete="gameToDelete = $event">
    </table-template>
  </div>
  <game-details
    :gameDetailId="gameDetailId"
    @close="gameDetailId = 0"
  ></game-details>
  <modal :show="JSON.stringify(gameToDelete) !== '{}'">
    <template #header>
      <h3>Mängu Kustutamine</h3>
    </template>
    <template #body>
      <p>Oled kindel, et soovid kustutada seda mängu?</p>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="deleteGame()">Jah</button>
      <button class="modal-default-button" @click="gameToDelete = {}">
        Ei
      </button>
    </template>
  </modal>
</template>

<script>
import TableTemplate from "../../components/Table.vue";
import GameDetails from "../../components/GameDetails.vue";
import Modal from "../../components/Modal.vue";
import { RouterLink } from "vue-router";
export default {
  components: {
    TableTemplate,
    GameDetails,
    RouterLink,
    Modal,
  },
  data() {
    return {
      games: [],
      gameDetailId: 0,
      gameToDelete: {},
    };
  },
  async created() {
    this.games = await (await fetch("http://localhost:8090/games")).json();
  },
  methods: {
    async deleteGame() {
      fetch("http://localhost:8090/games/" + this.gameToDelete.id, {
        method: "delete",
      }).then(async (response) => {
        if (response.status == 204) {
          this.games.splice(this.games.indexOf(this.gameToDelete), 1);
          this.gameToDelete = {};
        } else {
          const data = await response.json();
          console.log("DELETE: ", data);
        }
      });
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
