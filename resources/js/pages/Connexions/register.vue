<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <a-card class="w-full max-w-md shadow-lg rounded-2xl">
      <h2 class="text-2xl font-bold text-center mb-6">Inscription</h2>
      <a-form
        layout="vertical"
        :model="form"
        :rules="rules"
        @finish="handleSubmit"
      >
        <a-form-item label="Nom complet" name="name">
          <a-input v-model:value="form.name" placeholder="Votre nom complet" />
        </a-form-item>

        <a-form-item label="Email" name="email">
          <a-input v-model:value="form.email" placeholder="Votre email" />
        </a-form-item>

        <a-form-item label="Mot de passe" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="Mot de passe"
          />
        </a-form-item>

        <a-form-item label="Confirmer mot de passe" name="confirmPassword">
          <a-input-password
            v-model:value="form.confirmPassword"
            placeholder="Confirmer le mot de passe"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="w-full bg-green-600 hover:bg-green-700"
          >
            S'inscrire
          </a-button>
        </a-form-item>

        <div class="text-center text-sm">
          Déjà un compte ?
          <a @click="seconnecter" class="text-blue-600 hover:underline">
            Se connecter
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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = {
  name: [{ required: true, message: "Veuillez entrer votre nom", trigger: "blur" }],
  email: [
    { required: true, message: "Veuillez entrer votre email", trigger: "blur" },
    { type: "email", message: "Email invalide", trigger: "blur" },
  ],
  password: [{ required: true, message: "Veuillez entrer un mot de passe", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "Veuillez confirmer votre mot de passe", trigger: "blur" },
    {
      validator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value !== form.password) {
            reject("Les mots de passe ne correspondent pas");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
};

const handleSubmit = () => {
  console.log("Données envoyées :", form);
  // 🔹 Ici tu peux appeler ton API d'inscription
};

const seconnecter = () => {
  router.get("/"); // 👉 redirige vers login
};
</script>
