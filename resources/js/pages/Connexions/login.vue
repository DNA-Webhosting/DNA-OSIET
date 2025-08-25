<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <a-card class="w-full max-w-md shadow-lg rounded-2xl">
      <h2 class="text-2xl font-bold text-center mb-6">Connexion</h2>
      <a-form
        layout="vertical"
        :model="form"
        :rules="rules"
        @finish="handleSubmit"
      >
        <a-form-item label="Email" name="email">
          <a-input v-model:value="form.email" placeholder="Entrer votre email" />
        </a-form-item>

        <a-form-item label="Mot de passe" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="Entrer votre mot de passe"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700"
            @click="seconnecter"
          >
            Se connecter
          </a-button>
        </a-form-item>

        <div class="text-center text-sm">
          Pas encore de compte ?
          <a @click="inscrire" class="text-blue-600 hover:underline">
            S'inscrire
          </a>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { router } from "@inertiajs/vue3";

const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: [
    { required: true, message: "Veuillez entrer votre email", trigger: "blur" },
    { type: "email", message: "Email invalide", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Veuillez entrer votre mot de passe", trigger: "blur" },
  ],
};

const handleSubmit = () => {
  console.log("Données envoyées :", form);
  // 🔹 Ici tu peux appeler ton API de login
};

const inscrire = () => {
  router.get("/inscrire"); // ✅ redirige vers la page Register
};
const seconnecter = () => {
  router.get("/dashboard"); // ✅ redirige vers la page Register
};
</script>
