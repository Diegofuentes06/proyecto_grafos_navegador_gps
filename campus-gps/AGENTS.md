# AGENTS.md - Documentación Técnica Completa

## ¿Qué hace el proyecto?

Este proyecto implementa un navegador GPS simulado para un campus universitario. Utiliza estructuras de datos de grafos y el algoritmo de Dijkstra para calcular rutas óptimas entre puntos del campus, considerando factores como accesibilidad y bloqueos temporales de caminos.

## Cómo ejecutar el proyecto

1. Abrir `index.html` en cualquier navegador web moderno
2. No requiere instalación de dependencias ni servidor
3. Funciona completamente en el cliente

## Estructura de carpetas

```
campus-gps/
├── index.html      # Interfaz principal HTML
├── styles.css      # Estilos visuales
├── script.js       # Controlador principal, eventos y renderizado
├── graph.js        # Clase Graph para manejo de estructura de datos
├── dijkstra.js     # Implementación del algoritmo de Dijkstra
├── data.js         # Datos estáticos del grafo
├── README.md       # Documentación general
├── AGENTS.md       # Esta documentación técnica
├── assets/         # Recursos multimedia
└── docs/           # Documentación especializada
```

## Responsabilidades de cada archivo

### index.html
- Define la estructura HTML de la interfaz
- Incluye sidebar para controles
- Contiene el canvas para visualización del mapa
- Importa todos los scripts JS

### styles.css
- Define estilos modernos y responsive
- Implementa diseño tipo Google Maps
- Maneja layout flexbox para sidebar y mapa
- Incluye animaciones y efectos hover

### script.js
- Inicializa la aplicación
- Maneja eventos de usuario (clics, cambios)
- Coordina entre UI y lógica de grafos
- Renderiza el mapa en canvas
- Gestiona estado de rutas y bloqueos

### graph.js
- Implementa clase Graph con lista de adyacencia
- Métodos para agregar nodos y aristas
- Funciones para consultar vecinos
- Manejo de bloqueo/desbloqueo de aristas

### dijkstra.js
- Implementa algoritmo de Dijkstra desde cero
- Usa cola de prioridad simple (array ordenado)
- Calcula ruta más corta considerando filtros
- Retorna camino y distancia total

### data.js
- Define array de nodos con posiciones x,y
- Define array de aristas con pesos y propiedades
- Incluye puntos de interés marcados
- Datos de ejemplo con 12 nodos y 20 conexiones

## Cómo funciona el algoritmo de Dijkstra

1. **Inicialización**: Todas las distancias = ∞, distancia origen = 0
2. **Cola de prioridad**: Inserta origen con distancia 0
3. **Bucle principal**:
   - Extrae nodo con menor distancia
   - Para cada vecino no bloqueado (y accesible si filtro activo):
     - Calcula distancia alternativa
     - Si mejor, actualiza distancia y predecesor
     - Inserta en cola
4. **Reconstrucción**: Desde destino, sigue predecesores hasta origen

Complejidad: O((V+E) log V) con cola de prioridad eficiente

## Cómo está implementado el grafo

- **Estructura**: Lista de adyacencia en objeto JavaScript
- **Nodos**: Objetos con id, nombre, posición x/y, tipo, interés
- **Aristas**: Objetos con from/to, distance, accessible, blocked
- **Métodos**: addNode, addEdge, getNeighbors, toggleBlock

## Cómo se maneja la accesibilidad

- Checkbox en UI activa filtro `onlyAccessible`
- Dijkstra ignora aristas con `accessible: false`
- Aristas marcadas como no accesibles representan escaleras o barreras
- Filtro se aplica automáticamente al recalcular rutas

## Cómo bloquear caminos

- Interfaz con selects para elegir nodos from/to
- Botones "Bloquear" y "Desbloquear"
- Método `toggleBlock` actualiza propiedad `blocked` en aristas
- Dijkstra ignora aristas con `blocked: true`
- Mapa se redibuja con aristas bloqueadas en rojo

## Cómo agregar nuevos nodos y aristas

### Agregar nodo:
1. Añadir objeto a array `nodes` en `data.js`
2. Incluir id único, name, x/y, type, interest
3. Llamar `graph.addNode(node)` en inicialización

### Agregar arista:
1. Añadir objeto a array `edges` en `data.js`
2. Incluir from/to (ids existentes), distance, accessible, blocked
3. Llamar `graph.addEdge(edge)` en inicialización

## Convenciones de código

- **Nombres**: camelCase para variables/funciones, PascalCase para clases
- **Comentarios**: JSDoc para funciones, inline para lógica compleja
- **Modularidad**: Un archivo por responsabilidad principal
- **ES6+**: Arrow functions, const/let, template literals
- **Indentación**: 4 espacios
- **Separación**: Lógica/UI separada, funciones reutilizables

## Flujo general del sistema

1. **Carga**: `index.html` importa scripts
2. **Inicialización**: `script.js` construye grafo desde `data.js`
3. **Render**: Dibuja mapa inicial en canvas
4. **Interacción**: Usuario selecciona origen/destino
5. **Cálculo**: `dijkstra()` encuentra ruta óptima
6. **Visualización**: Resalta ruta en mapa, muestra info
7. **Actualización**: Recalcula automáticamente en cambios (bloqueos, filtros)

## Arquitectura completa

- **Frontend puro**: Sin backend, todo en cliente
- **MVC implícito**: HTML (vista), CSS (estilo), JS (controlador/modelo)
- **Separación de concerns**: UI, datos, algoritmos en archivos separados
- **Event-driven**: Eventos DOM manejados por `script.js`
- **Canvas rendering**: Visualización imperativa del grafo

## Cómo modificar el grafo

- **Cambiar pesos**: Editar `distance` en `edges` array
- **Agregar conexiones**: Push new edge objects to `edges`
- **Cambiar posiciones**: Modificar `x,y` en `nodes`
- **Marcar accesibilidad**: Set `accessible` en edges
- **Puntos de interés**: Set `interest: true` en nodes

## Cómo agregar edificios

1. Definir nuevo nodo en `nodes` con posición apropiada
2. Conectar con aristas existentes en `edges`
3. Asegurar posiciones no se superpongan en canvas
4. Actualizar selects automáticamente (poblados dinámicamente)

## Cómo agregar conexiones

1. Identificar ids de nodos existentes
2. Crear objeto edge con from/to, distance, accessible, blocked
3. Push a `edges` array
4. Grafo se reconstruye en cada carga

## Cómo cambiar pesos

- Editar valores `distance` en objetos de `edges`
- Peso representa distancia en metros
- Dijkstra usa estos pesos para cálculo de ruta más corta

## Cómo funciona Dijkstra (detallado)

```javascript
function dijkstra(graph, start, end, onlyAccessible) {
    // Inicializar distancias y cola
    const distances = { [start]: 0 };
    const queue = [{ node: start, dist: 0 }];
    
    while (queue.length) {
        // Extraer mínimo
        queue.sort((a,b) => a.dist - b.dist);
        const { node: current } = queue.shift();
        
        // Para cada vecino válido
        for (let neighbor of graph.getNeighbors(current)) {
            if (neighbor.blocked || (onlyAccessible && !neighbor.accessible)) continue;
            
            const alt = distances[current] + neighbor.distance;
            if (alt < (distances[neighbor.node] || Infinity)) {
                distances[neighbor.node] = alt;
                queue.push({ node: neighbor.node, dist: alt });
            }
        }
    }
    
    // Reconstruir camino usando distances
    return reconstructPath(distances, start, end);
}
```

## Cómo funciona accesibilidad

- Flag `accessible` en cada arista
- Si `false`: representa escaleras, rampas faltantes, etc.
- Checkbox UI activa filtro `onlyAccessible`
- Dijkstra salta aristas no accesibles cuando filtro activo
- Visualmente: mismas aristas, pero no usables en rutas filtradas

## Cómo se recalculan rutas

- Triggers: clic "Calcular", cambio checkbox accesibilidad, bloqueo camino
- Llama `calculateRoute()` que ejecuta `dijkstra()`
- Actualiza `currentPath` con nuevo resultado
- Redibuja mapa con nueva ruta resaltada
- Actualiza panel de información (distancia, tiempo)
- Refresca lista de puntos de interés cercanos

## Cómo funciona el bloqueo

- UI: selects para elegir nodos, botones bloquear/desbloquear
- `toggleBlock(from, to, blocked)`: actualiza propiedad en lista de adyacencia
- Dijkstra ignora aristas con `blocked: true`
- Visual: aristas bloqueadas en rojo (#e74c3c)
- Automático: recalcula ruta si había una activa

## Responsabilidad de cada archivo (detallado)

### script.js
- **Inicialización**: `init()` configura todo
- **Eventos**: `setupEventListeners()` maneja UI
- **Render**: `drawMap()` dibuja canvas
- **Lógica**: `calculateRoute()`, `toggleBlock()`, `showNearbyInterests()`
- **Estado**: mantiene `currentPath`, `selectedOrigin/Destination`

### graph.js
- **Modelo de datos**: representa grafo como lista de adyacencia
- **Métodos CRUD**: addNode, addEdge, getNeighbors
- **Estado**: `adjacencyList`, `nodes`
- **Utilidades**: `toggleBlock`, `getNode`

### dijkstra.js
- **Algoritmo puro**: implementación standalone
- **Entrada**: graph, start, end, onlyAccessible
- **Salida**: { path: [], distance: number }
- **Utilidades**: `calculateTime()` para estimación

### data.js
- **Datos estáticos**: arrays `nodes`, `edges`, `pointsOfInterest`
- **Configuración**: posiciones, conexiones, propiedades
- **Ejemplo**: 12 nodos, 20 aristas, accesibilidad mixta

## Nueva implementación corregida

Después de corrección crítica, el mapa ahora muestra:

### Renderizado real de nodos en el mapa

Cada nodo se dibuja como círculo SVG coloreado:

```javascript
nodes.forEach(node => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', 20);
    circle.setAttribute('fill', currentPath.includes(node.id) ? '#f39c12' : node.color);
    circle.setAttribute('stroke', '#2c3e50');
    circle.setAttribute('stroke-width', 2);
    circle.classList.add('node');
    
    circle.addEventListener('mouseover', (e) => showTooltip(e, node));
    circle.addEventListener('mouseout', hideTooltip);
    
    svg.appendChild(circle);
    
    // Etiqueta de texto
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.y + 35);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = node.name;
    svg.appendChild(text);
});
```

### Renderizado real de aristas en el mapa

Cada arista se dibuja como línea SVG con distancia:

```javascript
edges.forEach(edge => {
    const fromNode = graph.getNode(edge.from);
    const toNode = graph.getNode(edge.to);
    
    const isActive = currentPath.includes(edge.from) && currentPath.includes(edge.to) && isConsecutive(edge.from, edge.to);
    const strokeColor = edge.blocked ? '#e74c3c' : (isActive ? '#27ae60' : '#95a5a6');
    const strokeWidth = edge.blocked ? 4 : (isActive ? 4 : 2);
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', fromNode.x);
    line.setAttribute('y1', fromNode.y);
    line.setAttribute('x2', toNode.x);
    line.setAttribute('y2', toNode.y);
    line.setAttribute('stroke', strokeColor);
    line.setAttribute('stroke-width', strokeWidth);
    line.setAttribute('marker-end', `url(#arrowhead${edge.blocked ? '-blocked' : isActive ? '-active' : ''})`);
    svg.appendChild(line);
    
    // Etiqueta de distancia
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', midX);
    text.setAttribute('y', midY - 5);
    text.textContent = `${edge.distance}m`;
    svg.appendChild(text);
});
```

### Sistema de colores aplicado al grafo

En `data.js`, cada nodo tiene `color` específico:

- **Biblioteca**: Azul (#3498db)
- **Bloque A**: Azul (#3498db) 
- **Bloque B**: Morado (#9b59b6)
- **Cafetería**: Naranja (#e67e22)
- **Laboratorio**: Morado (#9b59b6)
- **Parqueadero**: Gris (#95a5a6)
- **Baños**: Verde (#27ae60)
- **Oficina**: Rojo (#e74c3c)
- **Gimnasio**: Morado (#9b59b6)
- **Auditorio**: Azul (#3498db)
- **Residencias**: Azul (#3498db)
- **Plaza**: Verde (#27ae60)

### Visualización de distancias dinámicas

- **Texto**: `${edge.distance}m` (ej: "120m")
- **Posición**: Centro de arista (midX, midY - 5)
- **Estilo**: Negro, centrado, legible
- **Dinámico**: Actualizado desde datos del grafo

### Recalculo dinámico de rutas tipo GPS

```javascript
function toggleBlock(block) {
    graph.toggleBlock(from, to, block);
    alert('Ruta bloqueada — recalculando...');
    drawMap(); // Muestra bloqueo rojo
    if (selectedOrigin && selectedDestination) {
        setTimeout(() => {
            calculateRoute(); // Nueva ruta verde
        }, 500);
    }
}
```

Proceso completo: bloqueo visual → mensaje → recalculo → nueva ruta resaltada.

### Cómo agregar nuevos tipos de nodos

1. **Elegir color único**: Hex code no usado
2. **Agregar a node**: `color: '#hex'` en objeto node
3. **Actualizar leyenda**: Item en HTML
4. **Verificar**: Nodo visible con color correcto

### Cómo agregar nuevos colores

1. **Seleccionar color**: Contraste adecuado
2. **Aplicar**: Modificar `node.color` en data.js
3. **Testear**: Visualizar en mapa
4. **Documentar**: Actualizar AGENTS.md

### Cómo modificar visualización

- **Tamaños nodos**: Cambiar `r="20"`
- **Grosor aristas**: Modificar `stroke-width`
- **Posiciones**: Ajustar `x,y` en nodes
- **Animaciones**: CSS `.node:hover`
- **Fuentes**: `font-size` en textos