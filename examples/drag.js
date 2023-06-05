console.log("archivo de prueba");
const elements__item = document.querySelectorAll('.elements__item');
const dropzone__template = document.querySelector('.dropzone__template');
const dropzone__canvas = document.querySelector('.dropzone__canvas');
const cntx = dropzone__canvas.getContext('2d');

let buttons_edit = document.querySelectorAll('.edit-button');

elements__item.forEach(( element_drag ) => {
  element_drag.addEventListener('dragstart', (event) => dragStart(event) );
  element_drag.addEventListener('drag', (event) => drag(event) );
  element_drag.addEventListener('dragend', (event) => dragEnd(event) );
});

const dragStart = ( event ) => {
  let element_drag = event.target;
  console.log("Drag Start, el usuario inicio a arrastrar");
  element_drag.classList.add('dragging');
  event.dataTransfer.setData("text/plain", element_drag.id);
  console.log(element_drag.id);
}

const drag = ( event ) => {
  let element_drag = event.target;
  //console.log("Drag, el usuario esta arrastrando");
  element_drag.classList.add('dragging--active');
}

const dragEnd = ( event ) => {
  let element_drag = event.target;
  //console.log("Drag End, el usuario dejo de arrastrar");
  element_drag.classList.remove('dragging', 'dragging--active');
}


dropzone__template.addEventListener('dragenter', (event) => dragEnter(event) );
dropzone__template.addEventListener('dragover', (event) => dragOver(event) );
dropzone__template.addEventListener('dragleave', (event) => dragLeave(event) );
dropzone__template.addEventListener('drop', (event) => drop(event) );

const dragEnter = ( event ) => {
  let element_dropzone = event.target;
  //console.log("Drag Enter, el usuario entro a la dropzone");
  //console.log("siempre que el mouse este sobre el dropzone");
  element_dropzone.classList.add('dragging--enter');
}

const dragOver = ( event ) => {
  event.preventDefault();
  let element_dropzone = event.target;
  //console.log("Drag Over, el usuario esta sobre la dropzone");
  element_dropzone.classList.add('dragging--over');
}

const dragLeave = ( event ) => {
  let element_dropzone = event.target;
  //console.log("Drag Leave, el usuario salio de la dropzone");
  //console.log("siempre que el mouse salga del dropzone");
  element_dropzone.classList.remove('dragging--enter', 'dragging--over');
}

const drop = ( event ) => {
  let element_dropzone = event.target;
  element_dropzone.classList.remove('dragging--enter', 'dragging--over');

  let element_drag_id = event.dataTransfer.getData("text/plain");
  let element_drag = document.getElementById(element_drag_id);
  let element_drag_clone = null;

  // element_drag_id contien el texto --clone
  if (element_drag_id.includes('--clone')) {
    element_drag_clone = element_drag
  } else {
    element_drag.classList.remove('dragging--active','dragging');
    element_drag_clone = element_drag.cloneNode(true);
    const uid = Math.floor(Math.random() * 1000000);
    element_drag_clone.id = `${element_drag_id}--clone--${uid}`;
    element_drag_clone.classList.add('elements__item--clone');

    // get child .edit-button element of element_drag_clone
    const edit_button = element_drag_clone.querySelector('.edit-button');
    // add data-target id 
      edit_button.setAttribute('data-target', element_drag_clone.id);
      console.log('edit_button --->', edit_button);


    // agregar evento para drag
    element_drag_clone.addEventListener('dragstart', (event) => dragStart(event) );
    element_drag_clone.addEventListener('drag', (event) => drag(event) );
    element_drag_clone.addEventListener('dragend', (event) => dragEnd(event) );
  }
  
  if(!element_drag || !element_drag_clone) { return; }

  
  if (element_drag_clone && element_dropzone === dropzone__template) {
    console.log("---> Drop, el usuario solto el elemento en la dropzone", element_drag_clone );

    // Verificar si existe en el DropZone, sino agregar el elemento
    if(!element_drag.classList.contains('drop--element')) {
      element_drag_clone.classList.add('drop--element');
      dropzone__template.appendChild(element_drag_clone);  
    }

    // Obtener las coordenadas del evento en relación con el dropzone
    const dropX = event.clientX - dropzone__template.getBoundingClientRect().left;
    const dropY = event.clientY - dropzone__template.getBoundingClientRect().top;

    // Obtener el ancho y alto del elemento arrastrado
    const elementWidth = element_drag.getBoundingClientRect().width;
    const elementHeight = element_drag.getBoundingClientRect().height;

    // Verificar si el elemento arrastrado se saldría del dropzone
    const maxX = dropzone__template.getBoundingClientRect().width - elementWidth;
    const maxY = dropzone__template.getBoundingClientRect().height - elementHeight;
    const clampedX = Math.min(Math.max(dropX, 0), maxX);
    const clampedY = Math.min(Math.max(dropY, 0), maxY);


    // Establecer la posición del elemento en el dropzone
    element_drag_clone.style.position = 'absolute';
    element_drag_clone.style.left = `${clampedX}px`;
    element_drag_clone.style.top = `${clampedY}px`;


    buttons_edit = document.querySelectorAll('.edit-button');
    buttons_edit.forEach(button => button.addEventListener('click', (event) => activateEditBlock(event)));

    tinymce.init({
      selector: `#${element_drag_clone.id} > .content__element`,
      inline: true,
      menubar: false,
      toolbar: [
        { name: 'history', items: ['undo', 'redo'] },
        { name: 'styles', items: ['styleselect'] },
        { name: 'formatting', items: ['bold', 'italic', 'underline', 'fontsizeselect', 'lineheight'] },
        { name: 'color', items: ['forecolor', 'backcolor'] },
      ],
      setup: function (editor) {
        editor.on('init', function () {
          editor.setMode('readonly'); // Establecer el modo de edición como solo lectura inicialmente
        });
      }
    });

  } else {
    console.log("**********************");
    console.log("No se puede soltar el elemento en el dropzone");
  }
}

const btn_generate = document.querySelector('.btn-generate');
btn_generate.addEventListener('click', (event) => generateCanvasTemplate(event) );

const generateCanvasTemplate = ( event ) => {
 // Capturar una imagen del contenido de dropzone__template utilizando html2canvas
  html2canvas(dropzone__template).then((canvas) => {
    // Limpiar el contenido existente en dropzone__canvas
    const ctx = dropzone__canvas.getContext('2d');
    ctx.clearRect(0, 0, dropzone__canvas.width, dropzone__canvas.height);

    // Establecer el tamaño del dropzone__canvas para que coincida con el tamaño de la imagen capturada
    dropzone__canvas.width = canvas.width;
    dropzone__canvas.height = canvas.height;

    // Dibujar la imagen capturada en dropzone__canvas
    ctx.drawImage(canvas, 0, 0);
  });

}



buttons_edit.forEach(button => {
  button.addEventListener('click', (event) => activateEditBlock(event));
})

const activateEditBlock = async (event) => {
  const button = event.currentTarget;
  button.classList.toggle('action--edit');
  const targetElementId = button.getAttribute('data-target');
  const elementEditorId = document.querySelector(`#${targetElementId}`);
  let thisEditor = await tinymce.get(`#${elementEditorId.id} > .content__element`);

  if (!thisEditor) {
    tinymce.init({
      selector: `#${elementEditorId.id} > .content__element`,
      inline: true,
      menubar: false,
      toolbar: [
        { name: 'history', items: ['undo', 'redo'] },
        { name: 'styles', items: ['styleselect'] },
        { name: 'formatting', items: ['bold', 'italic', 'underline', 'fontsizeselect', 'lineheight'] },
        { name: 'color', items: ['forecolor', 'backcolor'] },
      ],
      setup: function (editor) {
        editor.on('init', function () {
          editor.setMode('readonly'); // Establecer el modo de edición como solo lectura inicialmente
        });
      }
    });
  } else {
    if (thisEditor.getMode() === 'readonly') {
      thisEditor.setMode('design'); // Cambiar al modo de edición si el editor estaba en modo de solo lectura
    } else {
      thisEditor.setMode('readonly'); // Cambiar al modo de solo lectura si el editor estaba en modo de edición
    }
  }

  console.log('thisEditor --------->', thisEditor);
}