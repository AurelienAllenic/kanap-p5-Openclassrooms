// Configuration centralisée de l'URL de l'API
// Détecte automatiquement si on est en local ou en production
const API_BASE_URL = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'  // URL pour le développement local
  : '';  // URL relative pour la production (Vercel)
