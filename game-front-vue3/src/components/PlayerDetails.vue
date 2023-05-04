<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="playerDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Mängija Üksikasjad</h3>
      </template>
      <template #body
        ><b>Nimi: </b>{{ currentPlayer.name }}<br />
        <b>Mängitud mängud: </b>
        <ul>
          <li v-for="gameplay in currentPlayer.gameplays" :key="gameplay.id">
            {{ gameplay.game.name }}
          </li>
        </ul>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  components: {
    Modal,
  },
  props: {
    playerDetailId: {
      type: Number,
      required: true,
    },
  },
  emits: ["close"],
  data() {
    return {
      currentPlayer: {
        id: 0,
        name: "",
        gameplays: [
          {
            id: 0,
            game: {
              id: 0,
              name: "",
            },
          },
        ],
      },
    };
  },
  beforeUpdate() {
    if (this.playerDetailId == 0) return;
    this.getDetails();
  },
  methods: {
    async getDetails() {
      this.currentPlayer = await (
        await fetch(`http://localhost:8090/players/${this.playerDetailId}`)
      ).json();
    },
  },
};
</script>
<style>
.modal-container {
  width: 700px;
}
</style>
