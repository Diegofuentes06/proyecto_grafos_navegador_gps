// dijkstra.js - Implementación del algoritmo de Dijkstra
// Encuentra la ruta más corta en un grafo ponderado

function dijkstra(graph, start, end, onlyAccessible = false) {
    const distances = {};
    const previous = {};
    const priorityQueue = [];

    // Inicializar distancias
    for (let nodeId in graph.adjacencyList) {
        distances[nodeId] = Infinity;
        previous[nodeId] = null;
    }
    distances[start] = 0;

    // Agregar inicio a la cola
    priorityQueue.push({ node: start, distance: 0 });

    while (priorityQueue.length > 0) {
        // Ordenar cola por distancia (cola de prioridad simple)
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const current = priorityQueue.shift();

        if (current.node === end) break;

        const neighbors = graph.getNeighbors(current.node);
        for (let neighbor of neighbors) {
            if (neighbor.blocked) continue; // Ignorar caminos bloqueados
            if (onlyAccessible && !neighbor.accessible) continue; // Ignorar no accesibles si filtro activo

            const alt = distances[current.node] + neighbor.distance;
            if (alt < distances[neighbor.node]) {
                distances[neighbor.node] = alt;
                previous[neighbor.node] = current.node;
                priorityQueue.push({ node: neighbor.node, distance: alt });
            }
        }
    }

    // Reconstruir camino
    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    if (path[0] !== start) {
        return { path: [], distance: Infinity }; // No hay ruta
    }

    return { path, distance: distances[end] };
}

// Calcular tiempo estimado (asumiendo 5 km/h caminando, 83 m/min)
function calculateTime(distance) {
    const speed = 83; // metros por minuto
    return Math.ceil(distance / speed);
}