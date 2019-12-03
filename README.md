![Adalab](_src/assets/images/logo-adalab-80px.png)

# Modulo 2: Evaluación final.

## Buscador de series

Desarrollo de una aplicación web de búsqueda de series de TV, que nos permite des/marcar las series como favoritas y guardarlas en local storage.

Se conecta al [API abierto de TVMaze](http://www.tvmaze.com/api#show-search) y realiza búsquedas por nombre de show, mostrando la respuesta en la sección de la derecha de la página web.

En la búsqueda puedes seleccionar o deseleccionar a tu gusto para considerarlos favoritos y, una vez tengan esta distinción, pasan a aparecer en la sección de la izquierda encabezada por *Mis series favoritas*.

Si, en cualquier momento, quieres dejar de considerar favorita a una, sólo tienes que desmarcarla. Lo puedes hacer tanto en el panel de la derecha como a la izquierda con el aspa que acompaña al listado de favoritos.


## Guía de inicio rápido

1. Descarga o clona el repositorio
2. Instala las dependencias locales con `npm install`
3. Arranca el kit de Adalab con `gulp`
4. Inicio de un web server para desarrollo con `npm start` o `gulp` en la terminal desde la carpeta del repositorio.

La estructura de carpetas:
```
/
`- _src
   |- assets
   |  |- icons
   |  |- images
   |  |- js
   |  `- scss
   |     `- core
   |      |_templates
   |      |_vendors  
   |
   `- templates
      `- partials

```

## Technologies used

- HTML5.
- CSS3 (SASS).
- JavaScript.
- Json.
- Gulp.
- GitHub.

## License

[MIT](https://choosealicense.com/licenses/mit/)