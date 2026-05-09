// script.js - Lógica principal de la aplicación

const svg = document.getElementById('map-svg');
const tooltip = document.getElementById('tooltip');
let currentPath = [];
let selectedOrigin = '';
let selectedDestination = '';

// Inicializar aplicación
function init() {
    graph.buildFromData(nodes, edges);
    populateSelects();
    drawMap();
    setupEventListeners();
}

// Poblar selects con nodos
function populateSelects() {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const blockFromSelect = document.getElementById('block-from');
    const blockToSelect = document.getElementById('block-to');

    nodes.forEach(node => {
        const option = document.createElement('option');
        option.value = node.id;
        option.textContent = node.name;
        originSelect.appendChild(option.cloneNode(true));
        destinationSelect.appendChild(option.cloneNode(true));
        blockFromSelect.appendChild(option.cloneNode(true));
        blockToSelect.appendChild(option.cloneNode(true));
    });
}

// Dibujar mapa con SVG
function drawMap() {
    // Limpiar SVG
    svg.innerHTML = '';

    // Crear defs
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Marker normal
    const markerNormal = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    markerNormal.setAttribute('id', 'arrowhead');
    markerNormal.setAttribute('markerWidth', '10');
    markerNormal.setAttribute('markerHeight', '7');
    markerNormal.setAttribute('refX', '9');
    markerNormal.setAttribute('refY', '3.5');
    markerNormal.setAttribute('orient', 'auto');
    const polygonNormal = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygonNormal.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygonNormal.setAttribute('fill', '#95a5a6');
    markerNormal.appendChild(polygonNormal);
    defs.appendChild(markerNormal);

    // Marker active
    const markerActive = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    markerActive.setAttribute('id', 'arrowhead-active');
    markerActive.setAttribute('markerWidth', '10');
    markerActive.setAttribute('markerHeight', '7');
    markerActive.setAttribute('refX', '9');
    markerActive.setAttribute('refY', '3.5');
    markerActive.setAttribute('orient', 'auto');
    const polygonActive = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygonActive.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygonActive.setAttribute('fill', '#27ae60');
    markerActive.appendChild(polygonActive);
    defs.appendChild(markerActive);

    // Marker blocked
    const markerBlocked = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    markerBlocked.setAttribute('id', 'arrowhead-blocked');
    markerBlocked.setAttribute('markerWidth', '10');
    markerBlocked.setAttribute('markerHeight', '7');
    markerBlocked.setAttribute('refX', '9');
    markerBlocked.setAttribute('refY', '3.5');
    markerBlocked.setAttribute('orient', 'auto');
    const polygonBlocked = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygonBlocked.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygonBlocked.setAttribute('fill', '#e74c3c');
    markerBlocked.appendChild(polygonBlocked);
    defs.appendChild(markerBlocked);

    svg.appendChild(defs);

    // Dibujar aristas
    edges.forEach(edge => {
        const fromNode = graph.getNode(edge.from);
        const toNode = graph.getNode(edge.to);
        
        const isActive = currentPath.includes(edge.from) && currentPath.includes(edge.to) && isConsecutive(edge.from, edge.to);
        const strokeColor = edge.blocked ? '#e74c3c' : (isActive ? '#27ae60' : '#95a5a6');
        const strokeWidth = edge.blocked ? 4 : (isActive ? 4 : 2);
        const marker = edge.blocked ? 'url(#arrowhead-blocked)' : (isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead)');
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x);
        line.setAttribute('y1', fromNode.y);
        line.setAttribute('x2', toNode.x);
        line.setAttribute('y2', toNode.y);
        line.setAttribute('stroke', strokeColor);
        line.setAttribute('stroke-width', strokeWidth);
        line.setAttribute('marker-end', marker);
        line.classList.add('edge');
        svg.appendChild(line);
        
        // Etiqueta de distancia
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midX);
        text.setAttribute('y', midY - 5);
        text.textContent = `${edge.distance}m`;
        text.classList.add('distance-label');
        svg.appendChild(text);
    });

    // Dibujar nodos
    nodes.forEach(node => {
        const color = node.color;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 20);
        circle.setAttribute('fill', currentPath.includes(node.id) ? '#f39c12' : color);
        circle.setAttribute('stroke', '#2c3e50');
        circle.setAttribute('stroke-width', 2);
        circle.classList.add('node');
        
        circle.addEventListener('mouseover', (e) => showTooltip(e, node));
        circle.addEventListener('mouseout', hideTooltip);
        
        svg.appendChild(circle);
        
        // Etiqueta
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 35);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#2c3e50');
        text.setAttribute('font-size', '12px');
        text.textContent = node.name;
        svg.appendChild(text);
    });
}

// Verificar si dos nodos son consecutivos en la ruta
function isConsecutive(node1, node2) {
    for (let i = 0; i < currentPath.length - 1; i++) {
        if ((currentPath[i] === node1 && currentPath[i + 1] === node2) ||
            (currentPath[i] === node2 && currentPath[i + 1] === node1)) {
            return true;
        }
    }
    return false;
}

// Mostrar tooltip
function showTooltip(event, node) {
    tooltip.textContent = `${node.name} (${nodeTypes[node.type].name})`;
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

// Ocultar tooltip
function hideTooltip() {
    tooltip.style.display = 'none';
}

// Calcular ruta
function calculateRoute() {
    selectedOrigin = document.getElementById('origin').value;
    selectedDestination = document.getElementById('destination').value;
    const onlyAccessible = document.getElementById('accessible').checked;

    if (!selectedOrigin || !selectedDestination) {
        alert('Selecciona origen y destino');
        return;
    }

    const result = dijkstra(graph, selectedOrigin, selectedDestination, onlyAccessible);
    currentPath = result.path;

    if (result.distance === Infinity) {
        document.getElementById('distance').textContent = 'Distancia: No hay ruta';
        document.getElementById('time').textContent = 'Tiempo estimado: --';
    } else {
        document.getElementById('distance').textContent = `Distancia: ${result.distance} metros`;
        document.getElementById('time').textContent = `Tiempo estimado: ${calculateTime(result.distance)} minutos`;
    }

    drawMap();
    showNearbyInterests();
}

// Mostrar puntos de interés cercanos
function showNearbyInterests() {
    const list = document.getElementById('interest-list');
    list.innerHTML = '';

    if (currentPath.length === 0) return;

    const pathNodes = currentPath.map(id => graph.getNode(id));
    const nearby = pointsOfInterest.filter(poi => {
        return pathNodes.some(node => Math.abs(node.x - poi.x) < 100 && Math.abs(node.y - poi.y) < 100);
    });

    nearby.forEach(poi => {
        const li = document.createElement('li');
        li.textContent = poi.name;
        list.appendChild(li);
    });
}

// Bloquear/desbloquear camino con recalculo automático
function toggleBlock(block) {
    const from = document.getElementById('block-from').value;
    const to = document.getElementById('block-to').value;

    if (!from || !to) {
        alert('Selecciona nodos para bloquear/desbloquear');
        return;
    }

    graph.toggleBlock(from, to, block);
    
    // Mostrar mensaje de recalculo
    const message = block ? 'Ruta bloqueada — recalculando...' : 'Ruta desbloqueada — recalculando...';
    alert(message);
    
    drawMap();

    // Recalcular si hay ruta activa
    if (selectedOrigin && selectedDestination) {
        setTimeout(() => {
            calculateRoute();
        }, 500); // Pequeño delay para animación
    }
}

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('calculate').addEventListener('click', calculateRoute);
    document.getElementById('block').addEventListener('click', () => toggleBlock(true));
    document.getElementById('unblock').addEventListener('click', () => toggleBlock(false));
    document.getElementById('accessible').addEventListener('change', () => {
        if (selectedOrigin && selectedDestination) {
            calculateRoute();
        }
    });
}

// Inicializar
init();