# Análisis del Problema

## Definición del problema

En un campus universitario grande, estudiantes, visitantes y personas con movilidad reducida necesitan navegar eficientemente entre edificios y puntos de interés. Los sistemas de navegación tradicionales no consideran factores como accesibilidad, bloqueos temporales de caminos o visualización intuitiva de rutas en entornos universitarios.

## ¿Qué problema resuelve?

- **Navegación confusa**: Campus grandes son difíciles de navegar sin guía
- **Accesibilidad**: Personas con movilidad reducida necesitan rutas alternativas
- **Cambios dinámicos**: Caminos pueden bloquearse temporalmente (construcción, eventos)
- **Información limitada**: Falta de datos sobre distancia, tiempo y puntos cercanos
- **Experiencia pobre**: Interfaces no intuitivas para navegación universitaria

## Usuarios objetivo

1. **Estudiantes**: Navegación diaria entre clases, biblioteca, cafetería
2. **Visitantes**: Encuentran oficinas administrativas, auditorios
3. **Personal con movilidad reducida**: Requieren rutas accesibles sin escaleras
4. **Personal universitario**: Gestionan bloqueos temporales de caminos
5. **Nuevo personal**: Aprenden layout del campus

## ¿Por qué usar grafos?

Los grafos son ideales para modelar redes de caminos:

- **Nodos**: Representan edificios, intersecciones, puntos de interés
- **Aristas**: Conexiones entre nodos con pesos (distancia, tiempo)
- **Ponderación**: Permite rutas "óptimas" vs "más cortas"
- **Flexibilidad**: Fácil agregar/quitar conexiones, cambiar pesos
- **Algoritmos**: Dijkstra encuentra ruta más corta eficientemente

## Justificación de estructura de datos

### Lista de adyacencia elegida sobre matriz

- **Espacio**: O(V + E) vs O(V²) para matriz dispersa
- **Tiempo**: Iteración de vecinos O(grado) vs O(V)
- **Flexibilidad**: Fácil agregar nodos/aristas dinámicamente
- **Memoria**: Eficiente para grafos no densos (campus típico)

### Propiedades de aristas

- **distance**: Peso principal para optimización
- **accessible**: Flag para filtrado de accesibilidad
- **blocked**: Estado dinámico para bloqueos temporales

## ¿Qué representa cada nodo?

- **Edificios**: Biblioteca, aulas, laboratorios, oficinas
- **Servicios**: Cafeterías, baños, parqueaderos
- **Espacios**: Plazas, zonas de descanso
- **Intersecciones**: Puntos de cruce de caminos

Cada nodo incluye:
- **id**: Identificador único
- **name**: Nombre descriptivo
- **x,y**: Posición en mapa 2D
- **type**: Categorización (edificio, servicio, espacio)
- **interest**: Si es punto de interés destacado

## ¿Qué representa cada arista?

- **Conexión física**: Camino entre dos puntos
- **Peso**: Distancia en metros (base para optimización)
- **Propiedades**:
  - **accessible**: Si permite acceso sin barreras
  - **blocked**: Si está temporalmente cerrado

## Tipo de grafo

- **No dirigido**: Caminos bidireccionales
- **Ponderado**: Pesos representan distancia
- **Conectado**: Asumimos campus conectado (manejo de desconexión)
- **Simple**: Sin bucles ni aristas múltiples

## Complejidad

### Complejidad temporal

- **Dijkstra**: O((V + E) log V) con cola de prioridad binaria
- **Implementación actual**: O((V + E) log V) por sort en cola
- **Búsqueda de ruta**: Dominada por Dijkstra
- **Renderizado**: O(E + V) para dibujar grafo

### Complejidad espacial

- **Grafo**: O(V + E) para lista de adyacencia
- **Datos**: O(V + E) para arrays de nodos/aristas
- **Canvas**: O(1) relativo al tamaño fijo
- **Total**: O(V + E) - eficiente para campus típico

### Complejidad de Dijkstra

- **Caso promedio**: Eficiente para grafos dispersos
- **Peor caso**: O(V²) sin cola de prioridad optimizada
- **Optimización posible**: Usar heap binario para O((V+E)log V)

## Requisitos funcionales

RF-01: Mostrar mapa visual interactivo del campus
RF-02: Calcular ruta más corta entre origen y destino
RF-03: Permitir selección de rutas accesibles
RF-04: Permitir bloqueo temporal de caminos
RF-05: Mostrar distancia y tiempo estimado de ruta
RF-06: Exhibir puntos de interés cercanos a la ruta

## Requisitos no funcionales

RNF-01: Interfaz responsive y moderna
RNF-02: Funcionamiento completo en navegador
RNF-03: Código modular y mantenible
RNF-04: Algoritmo implementado desde cero

## Reflexión

### Diferencia entre BFS y Dijkstra

- **BFS**: Encuentra ruta más corta en grafos no ponderados (mínimo número de aristas)
- **Dijkstra**: Encuentra ruta más corta en grafos ponderados (mínimo peso total)
- **Aplicación**: Dijkstra apropiado para distancias reales, BFS para "menos giros"

### Manejo de accesibilidad

- **Filtrado preventivo**: Dijkstra ignora aristas no accesibles
- **Rutas alternativas**: Encuentra caminos más largos pero accesibles
- **Flexibilidad**: Checkbox permite alternar entre modos

### ¿Qué pasa si se desconecta el grafo?

- **Detección**: Dijkstra retorna distance = Infinity
- **Manejo**: UI muestra "No existe ruta disponible"
- **Prevención**: Diseño del campus asegura conectividad básica
- **Recuperación**: Desbloquear caminos o cambiar filtros

### Posible implementación de A*

- **Heurística**: Distancia euclidiana al destino
- **Mejora**: Más eficiente que Dijkstra puro
- **Complejidad**: Similar pero con guía heurística
- **Implementación**: Requiere función heurística admisible

### Cómo validar rutas

- **Conectividad**: Verificar camino existe en grafo
- **Accesibilidad**: Filtrar aristas según requerimientos
- **Bloqueos**: Ignorar aristas marcadas como bloqueadas
- **Consistencia**: Validar pesos positivos y finitos

### Decisiones de diseño UI

- **Sidebar**: Panel lateral para controles, mapa central
- **Canvas**: Renderizado directo para performance
- **Colores**: Azul para rutas, rojo para bloqueos, verde para activos
- **Responsive**: Flexbox para adaptación móvil
- **Profesional**: Sombras, bordes redondeados, efectos hover

## Interpretación visual de rutas y nodos

### Visualización de grafos en interfaces

La representación visual de grafos es crucial para la usabilidad:

- **Nodos como puntos de interés**: Cada círculo representa un lugar físico
- **Aristas como caminos**: Líneas conectan lugares con distancias reales
- **Colores por categoría**: Codificación visual para identificación rápida
- **Estados dinámicos**: Cambio de apariencia según interacción

### Sistema de colores

- **Azul (#3498db)**: Edificios académicos - confianza y profesionalismo
- **Naranja (#e67e22)**: Servicios - energía y accesibilidad
- **Verde (#27ae60)**: Espacios abiertos - naturaleza y tranquilidad
- **Naranja activo (#f39c12)**: Nodos en ruta - destaque y atención
- **Rojo bloqueo (#e74c3c)**: Caminos cerrados - peligro y restricción

### Elementos visuales interactivos

- **Tooltips**: Información contextual al hover
- **Animaciones**: Transiciones suaves para cambios de estado
- **Leyenda**: Referencia visual para interpretación de colores
- **Distancias visibles**: Información cuantitativa sobre caminos

### Experiencia de usuario

- **Intuitiva**: Colores y formas familiares (GPS reales)
- **Informativa**: Datos visibles sin sobrecargar
- **Dinámica**: Cambios en tiempo real al interactuar
- **Accesible**: Contraste adecuado, tooltips descriptivos

### Justificación visual

- **SVG vs Canvas**: SVG permite mejor manipulación de texto y elementos
- **Colores diferenciados**: Reducen carga cognitiva al identificar tipos
- **Distancias en aristas**: Información crítica para toma de decisiones
- **Animaciones**: Guían la atención del usuario durante cambios

### Interpretación de rutas

- **Líneas verdes**: Ruta óptima calculada
- **Flechas direccionales**: Indican sentido del flujo
- **Nodos naranjas**: Puntos de paso en la ruta
- **Texto de distancia**: Métrica cuantitativa del camino

### Manejo visual de bloqueos

- **Transición automática**: Cambio visual + recalculo lógico
- **Feedback inmediato**: Mensaje + cambio de color
- **Nueva ruta**: Resaltado automático de alternativa
- **Persistencia**: Estado visual mantiene bloqueo hasta desbloquear