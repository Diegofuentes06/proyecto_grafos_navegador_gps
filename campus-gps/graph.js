// graph.js - Implementación del grafo ponderado
// Usa lista de adyacencia para representar conexiones

class Graph {
    constructor() {
        this.adjacencyList = {};
        this.nodes = {};
    }

    // Agregar nodo
    addNode(node) {
        this.adjacencyList[node.id] = [];
        this.nodes[node.id] = node;
    }

    // Agregar arista
    addEdge(edge) {
        this.adjacencyList[edge.from].push({
            node: edge.to,
            distance: edge.distance,
            accessible: edge.accessible,
            blocked: edge.blocked
        });
        // Grafo no dirigido, agregar en ambos sentidos
        this.adjacencyList[edge.to].push({
            node: edge.from,
            distance: edge.distance,
            accessible: edge.accessible,
            blocked: edge.blocked
        });
    }

    // Obtener vecinos de un nodo
    getNeighbors(nodeId) {
        return this.adjacencyList[nodeId] || [];
    }

    // Obtener nodo por ID
    getNode(nodeId) {
        return this.nodes[nodeId];
    }

    // Bloquear/desbloquear arista
    toggleBlock(from, to, blocked) {
        const neighbors = this.adjacencyList[from];
        for (let neighbor of neighbors) {
            if (neighbor.node === to) {
                neighbor.blocked = blocked;
                break;
            }
        }
        // También en el otro sentido
        const reverseNeighbors = this.adjacencyList[to];
        for (let neighbor of reverseNeighbors) {
            if (neighbor.node === from) {
                neighbor.blocked = blocked;
                break;
            }
        }
    }

    // Construir grafo desde datos
    buildFromData(nodesData, edgesData) {
        nodesData.forEach(node => this.addNode(node));
        edgesData.forEach(edge => this.addEdge(edge));
    }
}