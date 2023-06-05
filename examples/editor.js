

(function ($) {
  $.extend($.summernote.lang, {
    'es-ES': {
      font: {
        bold: 'Negrita',
        italic: 'Itálica',
        underline: 'Subrayado',
        strike: 'Tachado',
        clear: 'Quitar estilo de fuente Perros',
        height: 'Altura de la línea',
        size: 'Tamaño de la fuente',
        strikethrough: 'Tachado',
      },
      image: {
        image: 'Imagen',
        insert: 'Insertar imagen',
        resizeFull: 'Redimensionar a tamaño completo',
        resizeHalf: 'Redimensionar a la mitad',
        resizeQuarter: 'Redimensionar a un cuarto',
        floatLeft: 'Flotar a la izquierda',
        floatRight: 'Flotar a la derecha',
        floatNone: 'No flotar',
        dragImageHere: 'Arrastre una imagen aquó',
        selectFromFiles: 'Seleccionar a partir de un archivo',
        url: 'URL de la imagen'
      },
      link: {
        link: 'Link',
        insert: 'Insertar link',
        unlink: 'Quitar link',
        edit: 'Editar',
        textToDisplay: 'Texto para mostrar',
        url: 'Hacia que URL lleva el link?'
      },
      video: {
        video: 'Video',
        videoLink: 'Link para el video',
        insert: 'Insertar video',
        url: 'URL del video?',
        providers: '(YouTube, Vimeo, Vine, Instagram, o DailyMotion)'
      },
      table: {
        table: 'Tabla'
      },
      hr: {
        insert: 'Insertar línea horizontal'
      },
      style: {
        style: 'Estilo',
        normal: 'Normal',
        blockquote: 'Cita',
        pre: 'Código',
        h1: 'Título 1',
        h2: 'Título 2',
        h3: 'Título 3',
        h4: 'Título 4',
        h5: 'Título 5',
        h6: 'Título 6'
      },
      lists: {
        unordered: 'Lista con marcadores',
        ordered: 'Lista numerada'
      },
      options: {
        help: 'Ayuda',
        fullscreen: 'Pantalla completa',
        codeview: 'Ver código fuente'
      },
      paragraph: {
        paragraph: 'Párrafo',
        outdent: 'Menos tabulación',
        indent: 'Más tabulación',
        left: 'Alinear a la izquierda',
        center: 'Alinear al centro',
        right: 'Alinear a la derecha',
        justify: 'Justificar'
      },
      color: {
        recent: 'Color de fondo',
        more: 'Más colores',
        background: 'Fondo',
        foreground: 'Fuente',
        transparent: 'Transparente',
        setTransparent: 'Fondo transparente',
        reset: 'Restaurar',
        resetToDefault: 'Restaurar por defecto'
      },
      shortcut: {
        shortcuts: 'Atajos de teclado',
        close: 'Cerrar',
        textFormatting: 'Formato de texto',
        action: 'Acción',
        paragraphFormatting: 'Formatao de párrafo',
        documentStyle: 'Estilo de documento'
      },
      history: {
        undo: 'Deshacer',
        redo: 'Rehacer'
      }
    }
  });
})(jQuery);

const elements__item = document.querySelectorAll('.elements__item');

$(document).ready(function () {
  elements__item.forEach(element => {
    const content__element = element.querySelector('.content__element');
    $(content__element).summernote({
      lang: 'es-ES',
      disableDragAndDrop: true,
      airMode: true,
      popover: {
        air: [
          ['reset', ['clear', 'undo', 'redo']],
          ['styleText', ['bold', 'italic', 'underline', 'strikethrough']],
          ['fontname', ['fontname']],
          ['style', ['style']],
          ['fontsize', ['color', 'height', 'fontsize']],
        ]
      },
      fontNames: ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Sacramento']
    });
  });
});


const buttons_edit = document.querySelectorAll('.edit-button');
buttons_edit.forEach(button => {
  button.addEventListener('click', (event) => editElement(event));
});


const editElement = (event) => {
  const button = event.currentTarget;
  const element_ref_id = button.dataset.elementRef;
  $(`#${element_ref_id} > .content__element`).summernote({ focus: true, airMode: true });
  $(`#${element_ref_id} > .content__element`).trigger('click');
  // select all text in editor
  $(`#${element_ref_id} > .content__element`).select();
  const element_ref = document.getElementById(element_ref_id);
  const note_popover =  element_ref.querySelector('.note-air-popover');
  note_popover.style.display = 'block';
  note_popover.style.top = '100%';
};