<template>
  <main class="w-full mx-auto px-2 sm:px-4">
    <!-- Hero Section -->
    <div
      class="gradient-bg rounded-2xl w-full mb-6 sm:mb-8 border border-[#0077FF] relative overflow-hidden animate-on-load animate-fade-in-up">
      <!-- Version Mobile - Texte centré avec animation -->
      <div class="block lg:hidden py-12 sm:py-16">
        <div class="text-center px-4">
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3 text-glow-animation">
            Tableau de bord
          </h2>
          <p class="text-base sm:text-lg text-white/90 leading-6 animate-pulse-slow">
            Vue d'ensemble de votre système de gestion médical
          </p>
        </div>
        <div class="absolute transform -translate-y-1/2 w-full h-full -mt-12 md:-mt-[35px] opacity-20">
          <img src="/images/fondbleu.jpg" alt="Fond médical" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Version Desktop/Tablette - Design complet -->
      <div class="hidden lg:block py-16 xl:py-24">
        <div class="relative px-6 xl:px-12">
          <h2 class="text-3xl xl:text-4xl font-bold text-white animate-float">
            Tableau de bord
          </h2>
          <p class="text-lg xl:text-xl text-white/90 leading-7 xl:leading-8 mt-2">
            Vue d'ensemble de votre système de gestion médical
          </p>
        </div>
        <div class="absolute transform -translate-y-1/2 w-full opacity-50 mt-5 xl:mt-12">
          <img src="/images/fondbleu.jpg" alt="Fond médical" class="w-full h-full object-cover">
        </div>
        <div class="absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 text-white/30 animate-pulse-slow">
          <i class="fas fa-heartbeat text-6xl xl:text-9xl"></i>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      <div v-for="(stat, index) in statsCards" :key="stat.id"
        class="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 hover:shadow-lg transition-all duration-300 card-hover animate-on-load animate-fade-in-up"
        :class="[stat.borderColor, `delay-${(index + 1) * 100}`]">
        <div class="flex items-center justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="text-sm sm:text-lg font-semibold text-gray-900 mb-2 truncate">{{ stat.title }}</h3>
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-2xl sm:text-3xl font-bold text-gray-900">{{ stat.value }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <i :class="`fas ${stat.trendIcon} text-xs sm:text-sm ${stat.trendColor}`"></i>
              <span :class="`text-xs sm:text-sm font-medium ${stat.trendColor} truncate`">{{ stat.trend }}</span>
            </div>
          </div>
          <div :class="`p-3 sm:p-4 rounded-lg ${stat.iconBg} flex-shrink-0 ml-2`">
            <i :class="`${stat.icon} text-xl sm:text-2xl ${stat.iconColor}`"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
      <!-- Recent Activities -->
      <div class="bg-white rounded-xl border-2 border-[#CFCFCF] animate-on-load animate-fade-in-left delay-500">
        <div class="px-4 sm:px-5 py-4 border-b border-gray-200">
          <h3
            class="text-lg sm:text-xl font-semibold text-black flex items-center underline px-2 sm:px-4 py-2 border-l-4 border-green-700">
            Activités Récentes
          </h3>
        </div>
        <div class="p-3 sm:p-4">
          <div class="space-y-2">
            <div v-for="activity in recentActivities" :key="activity.id"
              class="flex items-center space-x-2 sm:space-x-4 py-3 sm:py-4 border-b border-black/15 hover:bg-gray-50 transition-colors duration-200">
              <div
                :class="`w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-lg ${activity.iconBg} flex-shrink-0`">
                <i :class="`${activity.icon} text-sm sm:text-base ${activity.iconColor}`"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-black text-sm sm:text-sm truncate">{{ activity.title }}</p>
                <p class="text-[10px] sm:text-sm text-gray-500 truncate">{{ activity.description }}</p>
              </div>
              <div class="flex flex-col items-end space-y-2 flex-shrink-0">
                <span :class="`px-2 sm:px-3 py-1 rounded-full text-[10px] lg:text-sm font-medium ${activity.statusColor}`">
                  {{ activity.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patients Waiting -->
      <div class="bg-white rounded-xl border-2 border-[#CFCFCF] animate-on-load animate-fade-in-right delay-600">
        <div class="px-4 sm:px-5 py-4 border-b border-gray-200">
          <h3
            class="text-lg sm:text-xl font-semibold text-black flex items-center underline px-2 sm:px-4 py-2 border-l-4 border-[#764BA2]">
            Patients en Attente
          </h3>
        </div>
        <div class="p-3 sm:p-4">
          <div class="space-y-2">
            <div v-for="patient in waitingPatients" :key="patient.id"
              class="flex items-center space-x-2 sm:space-x-4 py-3 sm:py-4 border-b border-black/15 hover:bg-gray-50 transition-colors duration-200">
              <div class="flex-1 min-w-0">
                <p class="font-medium text-black text-sm sm:text-base truncate">{{ patient.name }}</p>
                <p class="text-[10px] sm:text-sm text-gray-500 truncate">{{ patient.description }}</p>
              </div>
              <div class="flex flex-col items-end space-y-2 flex-shrink-0">
                <span :class="`px-2 sm:px-3 py-1 rounded-full text-[10px] lg:text-sm font-medium ${patient.statusColor}`">
                  {{ patient.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts Section -->
    <div
      class="bg-white rounded-xl border-2 border-[#CFCFCF] mb-6 sm:mb-10 animate-on-load animate-fade-in-up delay-700">
      <div class="px-3 sm:px-4 py-4 flex flex-row justify-between items-center">
        <h3
          class="text-lg sm:text-xl underline px-2 font-semibold text-black flex items-center border-l-4 border-red-500">
          Alertes
        </h3>
        <button class="hover:text-medical-blue/80 text-xs sm:text-sm font-medium">
          Voir tout
        </button>
      </div>
      <div class="p-3">
        <div class="space-y-3 sm:space-y-4">
          <div v-for="alert in alerts" :key="alert.id"
            :class="`border-l-4 p-3 sm:p-4 rounded-lg ${alert.borderColor} ${alert.bgColor}`">
            <div class="flex items-start space-x-2 sm:space-x-3">
              <i :class="`${alert.icon} text-xl sm:text-2xl lg:text-3xl ${alert.iconColor} flex-shrink-0 mt-1`"></i>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 text-[12px] lg:text-sm sm:text-base">{{ alert.title }}</h4>
                <p class="text-[10px] lg:text-xs sm:text-sm text-gray-600">{{ alert.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const statsCards = ref([
  {
    id: 1,
    title: 'Sociétés Actives',
    value: '142',
    trend: '+12% par rapport au mois dernier',
    trendIcon: 'fa-arrow-up',
    trendColor: 'text-green-600',
    icon: 'fas fa-building',
    iconBg: 'bg-[#059669]',
    iconColor: 'text-white',
    borderColor: 'border-green-500'
  },
  {
    id: 2,
    title: 'Alertes Urgentes',
    value: '4',
    trend: '+3 aujourd\'hui',
    trendIcon: 'fa-arrow-up',
    trendColor: 'text-red-600',
    icon: 'fas fa-exclamation-triangle',
    iconBg: 'bg-[#F3001A]',
    iconColor: 'text-white',
    borderColor: 'border-red-500'
  },
  {
    id: 3,
    title: 'Stock Médicaments',
    value: '305',
    trend: '+3% articles',
    trendIcon: 'fa-arrow-up',
    trendColor: 'text-green-600',
    icon: 'fas fa-pills',
    iconBg: 'bg-[#FF6200]',
    iconColor: 'text-white',
    borderColor: 'border-orange-500'
  },
  {
    id: 4,
    title: 'Médecins disponibles',
    value: '14',
    trend: 'Médecins disponibles',
    trendIcon: 'fa-arrow-up',
    trendColor: 'text-blue-600',
    icon: 'fas fa-user-md',
    iconBg: 'bg-[#0077FF]',
    iconColor: 'text-white',
    borderColor: 'border-blue-500'
  }
])

const recentActivities = ref([
  {
    id: 1,
    title: 'Nouveau patient enregistré',
    description: 'Dr Webhosting • Il y a 5 minutes',
    status: 'Succès',
    statusColor: 'bg-green-100 text-green-800',
    icon: 'fas fa-user-plus',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 2,
    title: 'Ordonnance délivrée',
    description: 'Dr Webhosting • Prescription médicament • Il y a 17 minutes',
    status: 'Succès',
    statusColor: 'bg-green-100 text-green-800',
    icon: 'fas fa-prescription-bottle',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 3,
    title: 'Alerte stock',
    description: 'Inventaire • Stock faible • 90 • Il y a 30 minutes',
    status: 'En retard',
    statusColor: 'bg-red-200 text-[#F3001A]',
    icon: 'fas fa-exclamation-triangle',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 4,
    title: 'Réception stock',
    description: 'Magasin Des Webhosting • 150 articles • Il y a 3 heures',
    status: 'En attente',
    statusColor: 'bg-yellow-200 text-[#FF6200]',
    icon: 'fas fa-truck',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: 5,
    title: 'Paiement reçu',
    description: 'Société Des Webhosting • 24 000 Ariary • Il y a 4 heures',
    status: 'Succès',
    statusColor: 'bg-green-100 text-green-800',
    icon: 'fas fa-check-circle',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
])

const waitingPatients = ref([
  {
    id: 1,
    name: 'DNA Webhosting',
    description: 'Consultation générale • 14:30',
    status: 'En attente',
    statusColor: 'bg-yellow-200 text-[#FF6200]'
  },
  {
    id: 2,
    name: 'DNA Webhosting',
    description: 'Cardiologie • 15:00',
    status: 'Programmé',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 3,
    name: 'DNA Webhosting',
    description: 'Dermatologie • 15:30',
    status: 'Programmé',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 4,
    name: 'DNA Webhosting',
    description: 'Urgence • Immédiat',
    status: 'Urgent',
    statusColor: 'bg-red-100 text-[#FF0000]'
  },
  {
    id: 5,
    name: 'DNA Webhosting',
    description: 'Urgence • Immédiat',
    status: 'Urgent',
    statusColor: 'bg-red-100 text-[#FF0000]'
  }
])

const alerts = ref([
  {
    id: 1,
    title: 'Stock critique: Paracétamol 500mg - Reste 5 boîtes',
    description: 'Réapprovisionnement urgent requis',
    icon: 'fas fa-exclamation-triangle',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500'
  },
  {
    id: 2,
    title: 'Cotisations impayées: 3 sociétés en retard',
    description: 'Relances automatiques envoyées',
    icon: 'fas fa-exclamation-circle',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500'
  },
  {
    id: 3,
    title: 'Sauvegarde automatique réussie',
    description: 'Toutes les données sont sécurisées',
    icon: 'fas fa-check-circle',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500'
  },
  {
    id: 4,
    title: 'Paiements en Retard',
    description: '5 sociétés ont des paiements en retard de plus de 30 jours',
    icon: 'fas fa-exclamation-circle',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500'
  },
  {
    id: 5,
    title: 'Maintenance Système',
    description: 'Maintenance programmée dimanche de 2h à 4h du matin',
    icon: 'fas fa-info-circle',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500'
  }
])

onMounted(() => {
  // Déclencher les animations au chargement
  setTimeout(() => {
    const elements = document.querySelectorAll('.animate-on-load')
    elements.forEach(el => {
      el.classList.remove('animate-on-load')
    })
  }, 100)
})
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(100deg, rgb(0, 92, 197) 100%, rgba(0, 119, 255, 0) 100%);
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Animations d'entrée */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes textGlow {

  0%,
  100% {
    text-shadow: 0 0 5px rgba(0, 119, 255, 0.3);
  }

  50% {
    text-shadow: 0 0 20px rgba(0, 119, 255, 0.6), 0 0 30px rgba(0, 119, 255, 0.4);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.6s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.text-glow-animation {
  animation: textGlow 2s ease-in-out infinite;
}

/* Délais d'animation */
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-800 {
  animation-delay: 0.8s;
}

/* Styles initiaux pour les animations */
.animate-on-load {
  opacity: 0;
}
</style>