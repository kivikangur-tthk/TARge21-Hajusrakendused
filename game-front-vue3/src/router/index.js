import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/games/AllGamesView.vue"),
    },
    {
      path: "/addGame",
      name: "addGame",
      component: () => import("../views/games/CreateGameView.vue"),
    },
    {
      path: "/players",
      name: "players",
      component: () => import("../views/players/AllPlayersView.vue"),
    },

    {
      path: "/addGamePlay",
      name: "addGamePlay",
      component: () => import("../views/gamePlays/CreateGamePlayView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
