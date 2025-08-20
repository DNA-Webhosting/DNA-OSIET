<template>
  <div
    class="flex flex-row bg-white w-full h-16 items-center justify-between border-b border-gray-300 shadow-sm px-2 lg:px-6 animate-slideDown">

    <!-- Logo -->
    <div class="flex items-center w-full gap-2 lg:gap-5 animate-fadeInLeft">
      <div class="flex">
        <img src="/images/MEDIALOG.png" alt="Logo"
          class="w-full max-w-32 transition-transform duration-300 hover:scale-105">
      </div>
      <div class="border-l-2 border-[#6B7280] px-2 lg:px-5">
        <i
          class="fa-solid fa-house text-white text-center text-xs lg:text-xl bg-green-600 p-2 rounded-full transition-all duration-300 hover:bg-green-700 hover:scale-110"></i>
      </div>
    </div>

    <!-- Recherche -->
    <div class="w-full hidden md:mr-14 md:block animate-fadeInUp">
      <div
        class="bg-black/10 w-full h-full flex flex-row items-center rounded-lg px-2 border-2 border-[#e0e0e0] transition-all duration-300 hover:border-blue-300 focus-within:border-blue-400">
        <svg class="w-full max-w-7 text-center text-[#6B7280] transition-colors duration-300" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input class="w-full text-black/50 bg-transparent border-none outline-none px-2 py-1"
          placeholder="Rechercher un patient, medecin..." />
      </div>
    </div>

    <!-- Mobile search button -->
    <div class="md:hidden flex flex-1 justify-center items-center">
      <button @click="toggleMobileSearch"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <svg class="w-6 h-6 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>

    <!-- Profil & notifications -->
    <div class="flex flex-row w-full items-center justify-end gap-4 lg:gap-6 animate-fadeInRight">

      <!-- Icônes notifications -->
      <div class="flex gap-2 lg:gap-4">
        <!-- Cloche -->
        <div
          class="relative w-full max-w-8 lg:max-w-[40px] flex items-center justify-center animate-bounce-subtle">
          <div
            class="bg-blue-200/50 w-full rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-300/50 hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full p-2 text-[#353341]" fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 24c1.104 0 2-.896 2-2h-4c0 
                         1.104.896 2 2 2zm6.364-6V11c0-3.071-1.641-5.64-4.5-6.32V4a1.5 
                         1.5 0 10-3 0v.68C7.277 5.36 5.636 7.929 
                         5.636 11v7L4 20v1h16v-1l-1.636-2z" />
            </svg>
          </div>
          <div
            class="absolute -top-2 -right-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-2 h-5 min-w-[1.25rem] animate-pulse">
            3
          </div>
        </div>

        <!-- Enveloppe -->
        <div
          class="relative w-full max-w-8 lg:max-w-[40px] flex items-center justify-center animate-bounce-subtle"
          style="animation-delay: 0.2s;">
          <div
            class="bg-blue-200/50 w-full rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-300/50 hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full p-2 text-[#353341]" fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 00-2 
                         2v12a2 2 0 002 2h16a2 2 0 
                         002-2V6a2 2 0 00-2-2zm0 
                         4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <div
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-2 h-5 min-w-[1.25rem] animate-pulse">
            12
          </div>
        </div>
      </div>

      <!-- Avatar et menu profil -->
      <div class="relative">
        <div @click="toggleProfileMenu"
          class="flex flex-row items-center justify-between pl-4 gap-4 w-full max-w-[200px] border-l-2 border-[#764BA2] cursor-pointer transition-all duration-300 hover:bg-gray-50">
          <div class="p-[1px] w-full max-w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110"
            style="background: linear-gradient(to bottom, rgba(0,119,255,0.61), rgba(222,5,255,0.55));">
            <div class="w-full h-full rounded-full overflow-hidden bg-white">
              <img src="/images/profil.jpg" alt="Profil" class="w-full h-full">
            </div>
          </div>

          <div class="flex flex-col w-full hidden sm:block">
            <p class="font-bold font-inter text-[#1F2937] md:text-[10px] lg:text-sm">Dr. Dna Webhosting</p>
            <p class="font-regular text-[#6B7280] md:text-[10px] lg:text-xs">Administrateur</p>
          </div>
        </div>

        <!-- Menu Profil -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95 translate-y-[-10px]"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-[-10px]">
          <div v-if="isProfileMenuOpen" @mouseleave="closeProfileMenu"
            class="absolute top-full mt-4 lg:mt-3 right-0 lg:left-auto lg:right-0 lg:w-full lg:max-w-64 bg-white rounded-b-lg shadow-lg border border-gray-200 z-50">

            <!-- User Info -->
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="font-bold text-gray-800 text-sm">Dr. Dna <span class="hidden">Webhosting</span></p>
              <p class="text-gray-500 text-xs">Administrateur</p>
            </div>

            <!-- Menu Items -->
            <div class="lg:py-1">
              <a href="#"
                class="flex items-center px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
                Mon Profil
              </a>
              <a href="#"
                class="flex items-center px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
                Paramètres
              </a>
              <a href="#"
                class="flex items-center px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
                Aide & Support
              </a>
            </div>

            <!-- Logout -->
            <div class="border-t border-gray-100 py-1">
              <a href="#"
                class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                Déconnexion
              </a>
            </div>

          </div>
        </Transition>
      </div>
    </div>
  </div>

  <!-- Mobile Search Overlay -->
  <Transition enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full">
    <div v-if="isMobileSearchOpen"
      class="fixed top-16 left-0 w-full bg-white border-b border-gray-300 px-4 py-3 z-50 md:hidden">
      <div class="bg-black/10 flex items-center rounded-lg gap-2 p-2 border-2 border-[#e0e0e0]">
        <svg class="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input ref="mobileSearchInput"
          class="w-full text-black/70 bg-transparent border-none outline-none px-2 py-1 text-sm"
          placeholder="Rechercher un patient, médecin..." @blur="closeMobileSearch" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const isProfileMenuOpen = ref(false)
const isMobileSearchOpen = ref(false)
const mobileSearchInput = ref<HTMLInputElement>()

const toggleProfileMenu = () => isProfileMenuOpen.value = !isProfileMenuOpen.value
const closeProfileMenu = () => isProfileMenuOpen.value = false

const toggleMobileSearch = async () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value
  if (isMobileSearchOpen.value) await nextTick(() => mobileSearchInput.value?.focus())
}
const closeMobileSearch = () => setTimeout(() => isMobileSearchOpen.value = false, 150)

// Close profile menu if click outside
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) isProfileMenuOpen.value = false
})
</script>

<style scoped>
/* Animation header */
@keyframes slideDown { from { transform: translateY(-100%); opacity:0 } to { transform: translateY(0); opacity:1 } }
@keyframes fadeInLeft { from { transform: translateX(-30px); opacity:0 } to { transform: translateX(0); opacity:1 } }
@keyframes fadeInRight { from { transform: translateX(30px); opacity:0 } to { transform: translateX(0); opacity:1 } }
@keyframes fadeInUp { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
@keyframes bounceSubtle { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-2px);} }
.animate-slideDown { animation: slideDown 0.6s ease-out; }
.animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out 0.2s both; }
.animate-fadeInRight { animation: fadeInRight 0.8s ease-out 0.4s both; }
.animate-fadeInUp { animation: fadeInUp 0.8s ease-out 0.3s both; }
.animate-bounce-subtle { animation: bounceSubtle 2s ease-in-out infinite; }

/* Responsive */
@media (max-width: 768px) {
  .w-64 { width: 90vw; left: 5%; }
}
</style>
