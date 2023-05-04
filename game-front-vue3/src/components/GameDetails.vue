<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gameDetailId != 0" @close="$emit('close')">
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
import Modal from "./Modal.vue";
export default {
  components: {
    Modal,
  },
  props: {
    gameDetailId: {
      type: Number,
      required: true,
    },
  },
  emits: ["close"],
  data() {
    return {
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
  beforeUpdate() {
    if (this.gameDetailId == 0) return;
    this.getDetails();
  },
  methods: {
    async getDetails() {
      this.currentGame = await (
        await fetch(`http://localhost:8090/games/${this.gameDetailId}`)
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
