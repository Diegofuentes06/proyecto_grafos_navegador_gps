# Requisitos Funcionales y No Funcionales

## Requisitos Funcionales

### RF-01: Mapa Visual Interactivo
**Descripción**: La aplicación debe mostrar un mapa visual del campus con edificios, caminos y conexiones.
**Criterios de aceptación**:
- Nodos representados como círculos con etiquetas
- Aristas como líneas conectando nodos
- Diseño limpio y visualmente atractivo
- Responsive para diferentes tamaños de pantalla

### RF-02: Cálculo de Ruta Más Corta
**Descripción**: Implementar algoritmo de Dijkstra para encontrar la ruta óptima entre dos puntos.
**Criterios de aceptación**:
- Selección de origen y destino mediante dropdowns
- Cálculo automático al presionar botón
- Ruta resaltada visualmente en el mapa
- Manejo de caso sin ruta disponible

### RF-03: Filtro de Accesibilidad
**Descripción**: Permitir rutas accesibles para personas con movilidad reducida.
**Criterios de aceptación**:
- Checkbox "Solo rutas accesibles"
- Ignorar caminos con escaleras o barreras
- Recalculo automático al activar/desactivar
- Indicación visual de rutas accesibles vs no accesibles

### RF-04: Bloqueo de Caminos
**Descripción**: Interfaz para bloquear/desbloquear caminos temporalmente.
**Criterios de aceptación**:
- Selects para elegir nodos origen y destino del camino
- Botones "Bloquear" y "Desbloquear"
- Visualización en rojo de caminos bloqueados
- Recalculo automático de rutas activas

### RF-05: Información de Ruta
**Descripción**: Mostrar distancia total y tiempo estimado de la ruta.
**Criterios de aceptación**:
- Distancia en metros
- Tiempo estimado en minutos (velocidad caminata 5 km/h)
- Actualización automática al calcular ruta
- Formato claro y legible

### RF-06: Puntos de Interés
**Descripción**: Mostrar puntos de interés cercanos a la ruta calculada.
**Criterios de aceptación**:
- Lista de POIs dentro de radio de la ruta
- Información de nombre y tipo
- Actualización dinámica al cambiar ruta
- Al menos 5 puntos de interés definidos

### RF-07: Distancias Visibles en Aristas
**Descripción**: Cada conexión del grafo debe mostrar su distancia en metros.
**Criterios de aceptación**:
- Etiquetas de texto sobre cada arista
- Distancias en formato "Xm" (ej: 120m)
- Texto legible y bien posicionado
- Actualización automática con datos del grafo

### RF-08: Colores Diferenciados por Categoría
**Descripción**: Nodos coloreados según tipo de lugar.
**Criterios de aceptación**:
- Edificios en azul (#3498db)
- Servicios en naranja (#e67e22)
- Espacios abiertos en verde (#27ae60)
- Leyenda visual explicando colores
- Hover effects en nodos

### RF-09: Recalculo Automático de Rutas
**Descripción**: Al bloquear caminos, recalcular automáticamente rutas alternativas.
**Criterios de aceptación**:
- Bloqueo activa recalculo inmediato
- Nueva ruta resaltada en verde
- Mensaje "recalculando..." durante proceso
- Transición visual suave entre rutas

### RF-10: Indicadores Visuales de Bloqueo
**Descripción**: Caminos bloqueados con indicadores claros.
**Criterios de aceptación**:
- Líneas rojas gruesas para bloqueos
- Flechas rojas en marcadores
- Animación de cambio de estado
- Persistencia visual del bloqueo

## Requisitos No Funcionales

### RNF-01: Interfaz Moderna y Profesional
**Descripción**: Diseño de interfaz tipo aplicaciones GPS profesionales.
**Criterios de aceptación**:
- Paleta de colores profesional (azul, blanco, gris)
- Efectos hover y transiciones suaves
- Bordes redondeados y sombras
- Layout responsive (desktop y móvil)

### RNF-02: Funcionamiento Local
**Descripción**: Aplicación completamente funcional desde navegador sin servidor.
**Criterios de aceptación**:
- Abrir index.html directamente
- Sin dependencias externas
- Funcionamiento offline
- Compatibilidad con navegadores modernos

### RNF-03: Arquitectura Modular
**Descripción**: Código organizado, mantenible y extensible.
**Criterios de aceptación**:
- Separación de responsabilidades (HTML, CSS, JS)
- Funciones reutilizables
- Comentarios claros en código
- Nombres descriptivos de variables/funciones

### RNF-04: Implementación Nativa
**Descripción**: Algoritmos implementados desde cero sin librerías externas.
**Criterios de aceptación**:
- Dijkstra implementado manualmente
- Estructura de grafo propia
- Renderizado canvas nativo
- Sin frameworks JS (React, Vue, etc.)

## Requisitos de Datos

### RD-01: Datos de Ejemplo
**Descripción**: Conjunto mínimo de datos para demostrar funcionalidad.
**Criterios de aceptación**:
- Mínimo 12 nodos
- Mínimo 20 conexiones/aristas
- Al menos 5 puntos de interés
- Al menos 3 caminos no accesibles
- Al menos 2 caminos inicialmente bloqueados

### RD-02: Propiedades de Nodos
**Descripción**: Cada nodo debe contener información completa.
**Criterios de aceptación**:
- ID único
- Nombre descriptivo
- Posición x,y en canvas
- Tipo (edificio, servicio, espacio)
- Flag de punto de interés

### RD-03: Propiedades de Aristas
**Descripción**: Cada conexión debe tener atributos completos.
**Criterios de aceptación**:
- Nodos origen y destino
- Distancia/peso en metros
- Flag de accesibilidad
- Flag de bloqueo temporal

## Requisitos de Usuario

### RU-01: Experiencia Fluida
**Descripción**: Interacción intuitiva y responsive.
**Criterios de aceptación**:
- Carga inmediata al abrir
- Respuestas rápidas a interacciones
- Feedback visual claro
- Mensajes de error informativos

### RU-02: Accesibilidad Web
**Descripción**: Interfaz usable por personas con discapacidades.
**Criterios de aceptación**:
- Etiquetas apropiadas en elementos
- Contraste de colores adecuado
- Navegación por teclado
- Texto alternativo en imágenes

### RU-03: Compatibilidad
**Descripción**: Funcionamiento en múltiples plataformas.
**Criterios de aceptación**:
- Navegadores: Chrome, Firefox, Safari, Edge
- Dispositivos: Desktop, tablet, móvil
- Sistemas operativos: Windows, macOS, Linux