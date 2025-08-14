<template>
    <div
        class="flex flex-row bg-white w-full h-16 items-center justify-between border-b border-gray-300 shadow-sm px-8">

        <!-- logo -->
        <div class="flex flex-row items-center w-full gap-6">
            <div class="flex">
                <img src="/images/MEDIALOG.png" alt="Logo" class="w-full max-w-32">
            </div>
            <div class="border-l-2 border-[#6B7280] px-5">
                <i  class="fa-solid fa-house text-white text-center text-lg bg-green-600 p-2 rounded-full"></i>
            </div>

        </div>

        <!-- Recherche -->
        <div class="w-full">
            <div class="bg-black/10 flex flex-row items-center rounded-lg gap-2 p-0.5 border-2 border-[#e0e0e0]">
                <div class="">
                    <!-- Search Icon -->
                    <svg class="w-full max-w-7 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <Input class="w-full text-black/50" placeholder="Rechercher un patient, medecin..." />
            </div>
        </div>

        <!-- profil -->
        <div class="flex flex-row w-full items-center justify-end gap-6">
            <div class="flex gap-4">
                <!-- Icône cloche -->
                <div class="relative w-full max-w-[40px] flex items-center justify-center">
                    <!-- Cercle bleu clair -->
                    <div class="bg-blue-200/50 w-full rounded-full flex items-center justify-center">
                        <!-- Icône cloche -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full p-2 text-gray-800" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 24c1.104 0 2-.896 2-2h-4c0 
                         1.104.896 2 2 2zm6.364-6V11c0-3.071-1.641-5.64-4.5-6.32V4a1.5 
                         1.5 0 10-3 0v.68C7.277 5.36 5.636 7.929 
                         5.636 11v7L4 20v1h16v-1l-1.636-2z" />
                        </svg>
                    </div>
                    <!-- Badge rouge -->
                    <div
                        class="absolute -top-2 -right-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-2 h-5 min-w-[1.25rem]">
                        3
                    </div>
                </div>

                <!-- Icône enveloppe -->
                <div class="relative w-full max-w-[40px] flex items-center justify-center">
                    <!-- Cercle bleu clair -->
                    <div class="bg-blue-200/50 w-full rounded-full flex items-center justify-center">
                        <!-- Icône enveloppe -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full p-2 text-gray-800" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M20 4H4a2 2 0 00-2 
                         2v12a2 2 0 002 2h16a2 2 0 
                         002-2V6a2 2 0 00-2-2zm0 
                         4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                    </div>
                    <!-- Badge rouge -->
                    <div
                        class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-2 h-5 min-w-[1.25rem]">
                        12
                    </div>
                </div>
            </div>
            <!-- photo -->
            <div
                class="flex flex-row items-center justify-between pl-4 gap-4 w-full max-w-[220px] border-l-2 border-[#764BA2]">
                <div class="p-[1px] w-full max-w-12 rounded-full"
                    style="background: linear-gradient(to bottom, rgba(0,119,255,0.61), rgba(222,5,255,0.55));">
                    <div class="w-full h-full rounded-full overflow-hidden bg-white">
                        <img src="/images/profil.jpg" alt="Profil" class="w-full">
                    </div>
                </div>

                <div class="flex flex-col w-full">
                    <p class="font-bold font-inter text-[#1F2937] text-sm">Dr. Dna Webhosting</p>

                    <p class="font-regular text-[#6B7280] text-xs">
                        Administrateur
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style></style>