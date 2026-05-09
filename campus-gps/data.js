// data.js - Datos del grafo del campus universitario
// Contiene nodos, aristas y puntos de interés

const nodes = [
    { id: 'biblioteca', name: 'Biblioteca Central', x: 200, y: 150, type: 'edificio', interest: true, color: '#3498db' },
    { id: 'bloqueA', name: 'Bloque A', x: 400, y: 100, type: 'edificio', interest: false, color: '#3498db' },
    { id: 'bloqueB', name: 'Bloque B', x: 600, y: 200, type: 'edificio', interest: false, color: '#9b59b6' },
    { id: 'cafeteria', name: 'Cafetería', x: 300, y: 300, type: 'servicio', interest: true, color: '#e67e22' },
    { id: 'laboratorio', name: 'Laboratorio de Ciencias', x: 500, y: 350, type: 'edificio', interest: false, color: '#9b59b6' },
    { id: 'parqueadero', name: 'Parqueadero Principal', x: 100, y: 400, type: 'servicio', interest: true, color: '#95a5a6' },
    { id: 'banos', name: 'Baños Públicos', x: 700, y: 250, type: 'servicio', interest: true, color: '#27ae60' },
    { id: 'oficina', name: 'Oficina Administrativa', x: 450, y: 50, type: 'edificio', interest: true, color: '#e74c3c' },
    { id: 'gimnasio', name: 'Gimnasio', x: 650, y: 400, type: 'edificio', interest: false, color: '#9b59b6' },
    { id: 'auditorio', name: 'Auditorio', x: 150, y: 250, type: 'edificio', interest: false, color: '#3498db' },
    { id: 'residencias', name: 'Residencias Estudiantiles', x: 550, y: 450, type: 'edificio', interest: false, color: '#3498db' },
    { id: 'plaza', name: 'Plaza Central', x: 350, y: 200, type: 'espacio', interest: true, color: '#27ae60' }
];

const edges = [
    { from: 'biblioteca', to: 'bloqueA', distance: 120, accessible: true, blocked: false },
    { from: 'bloqueA', to: 'bloqueB', distance: 180, accessible: true, blocked: false },
    { from: 'bloqueB', to: 'laboratorio', distance: 90, accessible: true, blocked: false },
    { from: 'laboratorio', to: 'gimnasio', distance: 150, accessible: true, blocked: false },
    { from: 'gimnasio', to: 'residencias', distance: 100, accessible: true, blocked: false },
    { from: 'residencias', to: 'parqueadero', distance: 250, accessible: true, blocked: false },
    { from: 'parqueadero', to: 'auditorio', distance: 140, accessible: true, blocked: false },
    { from: 'auditorio', to: 'biblioteca', distance: 200, accessible: true, blocked: false },
    { from: 'biblioteca', to: 'plaza', distance: 80, accessible: true, blocked: false },
    { from: 'plaza', to: 'cafeteria', distance: 100, accessible: true, blocked: false },
    { from: 'cafeteria', to: 'bloqueB', distance: 160, accessible: true, blocked: false },
    { from: 'bloqueA', to: 'oficina', distance: 70, accessible: true, blocked: false },
    { from: 'oficina', to: 'bloqueB', distance: 130, accessible: true, blocked: false },
    { from: 'bloqueB', to: 'banos', distance: 50, accessible: true, blocked: false },
    { from: 'banos', to: 'laboratorio', distance: 110, accessible: true, blocked: false },
    { from: 'laboratorio', to: 'residencias', distance: 220, accessible: false, blocked: false }, // Escaleras
    { from: 'bloqueA', to: 'bloqueB', distance: 280, accessible: false, blocked: true }, // Camino bloqueado inicialmente
    { from: 'cafeteria', to: 'gimnasio', distance: 190, accessible: true, blocked: false },
    { from: 'auditorio', to: 'plaza', distance: 170, accessible: true, blocked: false },
    { from: 'plaza', to: 'banos', distance: 240, accessible: false, blocked: true } // Otro bloqueado
];

const pointsOfInterest = nodes.filter(node => node.interest);