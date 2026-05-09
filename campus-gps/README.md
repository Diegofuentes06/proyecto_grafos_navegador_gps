# Navegador GPS para Campus Universitario

## Descripción del Proyecto

Esta aplicación web simula un sistema de navegación inteligente dentro de un campus universitario grande. Utiliza estructuras de datos de grafos y el algoritmo de Dijkstra para calcular rutas óptimas entre edificios y puntos de interés, considerando factores como accesibilidad y bloqueos temporales de caminos. La visualización utiliza SVG para un mapa interactivo con distancias visibles, colores por categoría y animaciones suaves.

## Objetivos

- Proporcionar navegación visual intuitiva en un campus universitario
- Implementar rutas accesibles para personas con movilidad reducida
- Permitir bloqueo temporal de caminos con recalculo automático
- Mostrar información detallada de rutas (distancia, tiempo estimado)
- Exhibir puntos de interés cercanos con colores diferenciados
- Ofrecer experiencia de usuario tipo GPS profesional

## Tecnologías Usadas

- **HTML5**: Estructura de la aplicación con SVG para visualización
- **CSS3**: Estilos modernos, animaciones y responsive design
- **JavaScript ES6+**: Lógica de la aplicación, implementación de grafos y Dijkstra

## Cómo Ejecutar

1. Clona o descarga el repositorio
2. Abre el archivo `index.html` en un navegador web moderno
3. La aplicación funciona completamente localmente sin necesidad de servidor

## Funcionalidades

- **Mapa Visual Interactivo SVG**: Visualización avanzada del campus con elementos gráficos modernos, nodos coloreados y aristas con distancias
- **Nodos Coloreados por Categoría**: Cada edificio/servicio tiene color único aplicado directamente al grafo
- **Distancias Visibles en Aristas**: Cada conexión muestra "Xm" dinámicamente desde datos del grafo
- **Cálculo de Rutas**: Algoritmo de Dijkstra para encontrar la ruta más corta
- **Filtros de Accesibilidad**: Opción para rutas accesibles (sin escaleras)
- **Bloqueo Dinámico de Caminos**: Interfaz para bloquear/desbloquear con recalculo automático tipo GPS
- **Indicadores Visuales**: Líneas rojas gruesas para bloqueos, verdes para rutas activas
- **Información de Ruta**: Distancia total y tiempo estimado de caminata
- **Puntos de Interés**: Lista de POIs cercanos a la ruta calculada
- **Tooltips Interactivos**: Información al pasar mouse sobre nodos
- **Leyenda Visual**: Referencia de colores para categorías
- **Animaciones Suaves**: Transiciones y efectos hover profesionales

## Sistema de Colores Aplicado al Grafo

- **Azul (#3498db)**: Biblioteca, Bloque A, Auditorio, Residencias
- **Naranja (#e67e22)**: Cafetería
- **Morado (#9b59b6)**: Bloque B, Laboratorio, Gimnasio
- **Verde (#27ae60)**: Baños, Plaza
- **Gris (#95a5a6)**: Parqueadero
- **Rojo (#e74c3c)**: Oficina Administrativa
- **Naranja Activo (#f39c12)**: Nodos en ruta calculada

## Sistema de Bloqueo Dinámico Tipo GPS

Cuando se bloquea un camino:
1. La arista se marca en rojo grueso con flecha roja
2. Se muestra mensaje "Ruta bloqueada — recalculando..."
3. Dijkstra recalcula automáticamente una ruta alternativa
4. La nueva ruta se resalta en verde con flechas verdes
5. Se actualiza la información de distancia y tiempo
6. Los nodos en ruta cambian a naranja

## Explicación del Algoritmo

El algoritmo de Dijkstra encuentra la ruta más corta en un grafo ponderado. En esta implementación:

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

## Renderizado Visual del Grafo

### Nodos
- **Forma**: Círculos SVG con radio 20px y borde negro
- **Color**: Aplicado directamente desde `node.color` en datos
- **Activos**: Color naranja cuando parte de ruta calculada
- **Hover**: Escala 1.1x con transición CSS suave
- **Etiquetas**: Texto centrado debajo de cada nodo

### Aristas
- **Líneas SVG**: Conectan centros de nodos
- **Estados Visuales**:
  - Normal: Gris (#95a5a6), ancho 2px, flecha gris
  - Activa: Verde (#27ae60), ancho 4px, flecha verde
  - Bloqueada: Rojo (#e74c3c), ancho 4px, flecha roja
- **Distancias**: Texto SVG "Xm" centrado sobre cada línea

### Interactividad
- **Tooltips**: Al hover muestran nombre y tipo
- **Animaciones**: Transiciones CSS para cambios de estado
- **Leyenda**: Panel lateral con explicación de colores

## Capturas Simuladas

```
[Mapa SVG Interactivo con Nodos y Aristas]
Biblioteca (Azul) -- 120m -- Bloque A (Azul)
   |                        |
 80m                      180m
   |                        |
Plaza (Verde) -- 100m -- Cafetería (Naranja)
```

Ruta activa en verde con flechas, distancias visibles, nodos coloreados.

## Estructura del Proyecto

```
campus-gps/
├── index.html          # Estructura HTML con SVG
├── styles.css          # Estilos con animaciones y colores
├── script.js           # Lógica con renderizado SVG y bloqueo dinámico
├── graph.js            # Clase Graph para manejo de estructura de datos
├── dijkstra.js         # Algoritmo de Dijkstra
├── data.js             # Datos con tipos de nodos y colores
├── README.md           # Esta documentación
├── AGENTS.md           # Documentación técnica detallada
├── assets/             # Recursos multimedia
│   ├── campus-map.png  # Imagen del mapa (placeholder)
│   └── icons/          # Iconos (vacío)
└── docs/               # Documentación adicional
    ├── analisis.md     # Análisis del problema
    ├── requisitos.md   # Requisitos funcionales/no funcionales
    └── complejidad.md  # Análisis de complejidad
```