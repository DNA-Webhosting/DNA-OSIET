<template>
  <main class="w-full mx-auto px-4 sm:px-6">
    <!-- Hero Section -->
    <div class="gradient-bg rounded-2xl w-full py-24  mb-8 border-1 border-[#0077FF] relative overflow-hidden">
      <div class="relative px-12">
        <h2 class="text-4xl font-bold text-white">Tableau de bord</h2>
        <p class="text-xl text-white/90 leading-8">Vue d'ensemble de votre système de gestion médical</p>
      </div>
      <div class="absolute transform -translate-y-1/2 w-full opacity-50 mt-26">
        <img src="/images/fondbleu.jpg" alt="Fond bleu" class="w-full h-full">
      </div>
      <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30">
        <i class="fas fa-heartbeat text-9xl px-10"></i>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in statsCards" 
        :key="stat.id"
        class="bg-white rounded-xl p-6 shadow-md border-2 hover:shadow-lg transition-all duration-300 card-hover "
        :class="stat.borderColor"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ stat.title }}</h3>
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-3xl font-bold text-gray-900">{{ stat.value }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <i :class="`fas ${stat.trendIcon} text-sm ${stat.trendColor}`"></i>
              <span :class="`text-sm font-medium ${stat.trendColor}`">{{ stat.trend }}</span>
            </div>
          </div>
          <div :class="`p-4 rounded-lg ${stat.iconBg}`">
            <i :class="`${stat.icon} text-2xl ${stat.iconColor}`"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      <!-- Recent Activities -->
      <div class="bg-white rounded-xl border-2 border-[#CFCFCF]">
        <div class="px-5 py-4 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-black flex items-center underline px-4 py-2 border-l-4 border-green-700">
            Activités Récentes
          </h3>
        </div>
        <div class="p-4">
          <div class="space-y-2">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="flex items-center space-x-4 py-4 border-b border-black/15 hover:bg-gray-50 transition-colors duration-200"
            >
              <div :class="`w-full max-w-10 text-center p-2 h-10 rounded-lg ${activity.iconBg}`">
                <i :class="`${activity.icon} ${activity.iconColor}`"></i>
              </div>
              <div class="flex-1">
                <p class="font-medium text-black">{{ activity.title }}</p>
                <p class="text-sm text-gray-500">{{ activity.description }}</p>
              </div>
              <div class="flex flex-col items-end space-y-2">
                <span 
                  :class="`px-3 py-1 rounded-full text-xs font-medium ${activity.statusColor}`"
                >
                  {{ activity.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patients Waiting -->
      <div class="bg-white rounded-xl border-2 border-[#CFCFCF]">
        <div class="px-5 py-4 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-black flex items-center underline px-4 py-2 border-l-4 border-[#764BA2]">
            Patients en Attente
          </h3>
        </div>
        <div class="p-4">
          <div class="space-y-2">
            <div 
              v-for="patient in waitingPatients" 
              :key="patient.id"
              class="flex items-center space-x-1 py-4 border-b border-black/15 hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="flex-1">
                <p class="font-medium text-black">{{ patient.name }}</p>
                <p class="text-sm text-gray-500">{{ patient.description }}</p>
              </div>
              <div class="flex flex-col items-end space-y-2">
                <span 
                  :class="`px-3 py-1 rounded-full text-xs font-medium ${patient.statusColor}`"
                >
                  {{ patient.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts Section -->
    <div class="bg-white rounded-xl border-2 border-[#CFCFCF] mb-10">
      <div class="px-4 py-4 flex flex-row justify-between items-center">
        <h3 class="text-xl underline px-2 font-semibold text-black flex items-center border-l-4 border-red-500">
          Alertes
        </h3>
        <button class="hover:text-medical-blue/80 text-sm font-medium">
          Voir tout
        </button>
      </div>
      <div class="p-3">
        <div class="space-y-4">
          <div 
            v-for="alert in alerts" 
            :key="alert.id"
            :class="`border-l-4 p-4 rounded-lg ${alert.borderColor} ${alert.bgColor}`"
          >
            <div class="flex items-center space-x-3">
              <i :class="`${alert.icon} text-3xl ${alert.iconColor} `"></i>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ alert.title }}</h4>
                <p class="text-sm text-gray-600">{{ alert.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    statusColor: 'bg-yellow-200 text-[#FF6200]',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'DNA Webhosting',
    description: 'Cardiologie • 15:00',
    status: 'Programmé',
    statusColor: 'bg-blue-100 text-blue-800',
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'DNA Webhosting',
    description: 'Dermatologie • 15:30',
    status: 'Programmé',
    statusColor: 'bg-blue-100 text-blue-800',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'DNA Webhosting',
    description: 'Urgence • Immédiat',
    status: 'Urgent',
    statusColor: 'bg-red-100 text-[#FF0000]',
    avatar: 'https://images.pexels.com/photos/5452266/pexels-photo-5452266.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'DNA Webhosting',
    description: 'Urgence • Immédiat',
    status: 'Urgent',
    statusColor: 'bg-red-100 text-[#FF0000]',
    avatar: 'https://images.pexels.com/photos/5452288/pexels-photo-5452288.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face'
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
</style>