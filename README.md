# El Toldo — García Melín — Sitio Web

Sitio web estático (HTML5 + CSS3 + JavaScript puro, sin frameworks ni Bootstrap)
para el restaurante chileno **El Toldo**, San Bernardo.

## Estructura del proyecto

```
el-toldo/
├── index.html        → Toda la estructura y contenido del sitio
├── css/
│   └── styles.css    → Estilos, animaciones y la paleta de marca
├── js/
│   └── script.js      → Interactividad (scroll reveal, menú, carrusel, formulario, etc.)
├── img/               → Todas las imágenes (logo real ya incluido + fotos de marcador de posición)
└── README.md
```

Listo para subir directo a **GitHub Pages** o **Netlify**, sin build ni dependencias.

## Paleta de marca (ya aplicada en `css/styles.css`, variables `:root`)

| Color   | Hex       | Uso principal                          |
|---------|-----------|-----------------------------------------|
| Carbón  | `#2B2B2B` | Fondo general, textos sobre crema       |
| Crema   | `#F5F0E8` | Fondo de secciones claras (Menú, Galería, Reservas) |
| Taupe   | `#8B7964` | Acentos, textos secundarios "García Melín" |
| Olivo   | `#5F6B51` | Botones, hover, detalles cálidos        |

## Logo

Ya se incluyó tu logo real (el de fondo blanco/marca oficial) en 4 variantes, generadas
automáticamente a partir del archivo que enviaste, con el fondo recortado a transparente:

- `img/icon-dark.png` → solo el ícono del toldo, en tono carbón (usado como favicon y en navbar sobre fondo claro)
- `img/icon-cream.png` → mismo ícono, en crema (navbar sobre fondo oscuro/con scroll)
- `img/logo-full-dark.png` → logo completo (ícono + "El Toldo" + "García Melín"), en carbón
- `img/logo-full-cream.png` → logo completo, en crema (usado en el footer)

Si en algún momento quieres reemplazarlos por una nueva versión, solo pisa esos 4 archivos
manteniendo el mismo nombre.

## Imágenes por reemplazar

**Todas las fotografías del sitio son marcadores de posición** (fondo de color de marca +
etiqueta con el nombre del plato/sección), para que puedas ver el diseño funcionando de
inmediato. Reemplázalas por las fotos reales pisando el archivo con el mismo nombre dentro
de `img/` — el código HTML no necesita ningún cambio. Por ejemplo:

- `img/hero-parrillada.jpg` → foto grande de portada
- `img/menu-pastel-choclo.jpg`, `img/menu-*.jpg` → una foto por plato del menú
- `img/galeria-*.jpg` → fotos para la galería tipo masonry
- `img/marquee-01.jpg` a `marquee-11.jpg` → fotos de la cinta que se mueve con el scroll
- `img/historia-antigua-01.jpg`, `historia-antigua-02.jpg`, `historia-actual.jpg` → fotos de la sección Historia
- `img/deco-*.png` → íconos decorativos (hoja, leña, parrilla) de la sección Historia — actualmente son círculos simples de marcador, ideal reemplazarlos por recortes PNG con fondo transparente

Todas las rutas usadas en `index.html` ya están comentadas junto a cada `<img>` para
identificarlas fácilmente.

## Datos que quedaron comentados para completar

- **Correo** (`reservas@eltoldo.cl`): aparece comentado en el HTML (sección Contacto y Footer)
  tal como se pidió. Descomenta esas líneas cuando quieras mostrarlo.
- **Mapa de Google**: el `<iframe>` en la sección Contacto ya apunta a la dirección del
  restaurante vía búsqueda; puedes reemplazar el `src` por el embed exacto que generes desde
  Google Maps ("Compartir" → "Insertar un mapa").
- **Redes sociales** en el footer: los enlaces de Instagram/Facebook están con `href="#"`,
  reemplázalos por las URLs reales.

## Funcionalidades incluidas

- Navbar transparente con efecto vidrio (glassmorphism) al hacer scroll + menú móvil
- Animaciones "fade in" al hacer scroll en todas las secciones
- Cinta (marquee) de dos filas que se desplaza según el scroll de la página
- Texto de "Nuestra Historia" que se revela carácter a carácter con el scroll
- Línea de tiempo (1984 → 1991 → 2018 → Hoy)
- Menú con filtros por categoría (Entradas, Parrilladas, Platos Chilenos, Postres, Bebidas)
- Galería tipo masonry con hover
- Carrusel de opiniones con controles y autoplay
- Formulario de reservas con validación en JavaScript (nombre, correo, teléfono, fecha,
  horario del local, cantidad de personas)
- Botón flotante de WhatsApp y botón de "volver arriba"
- SEO: meta description, Open Graph, Twitter Card y favicon ya configurados

## Cómo previsualizar localmente

Como es HTML/CSS/JS puro, basta con abrir `index.html` en el navegador. Para evitar
restricciones de algunos navegadores con rutas locales, también puedes correr un servidor
simple desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000`.
