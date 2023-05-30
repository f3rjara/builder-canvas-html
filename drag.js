console.log("archivo de prueba");
const elements__item = document.querySelectorAll('.elements__item');
const dropzone__template = document.querySelector('.dropzone__template');
const dropzone__canvas = document.querySelector('.dropzone__canvas');
const cntx = dropzone__canvas.getContext('2d');


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
    element_drag_clone.id = `${element_drag_id}--clone`;

    // agregar evento para drag
    element_drag_clone.addEventListener('dragstart', (event) => dragStart(event) );
    element_drag_clone.addEventListener('drag', (event) => drag(event) );
    element_drag_clone.addEventListener('dragend', (event) => dragEnd(event) );
  }
  
  if(!element_drag || !element_drag_clone) { return; }

  
  if (element_drag_clone && element_dropzone === dropzone__template) {
    console.log("---> Drop, el usuario solto el elemento en la dropzone", element_drag_clone );
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

    if(!element_drag.classList.contains('drop--element')) {
      element_drag_clone.classList.add('drop--element');
      dropzone__template.appendChild(element_drag_clone);  
    }

    // Establecer la posición del elemento en el dropzone
    element_drag_clone.style.position = 'absolute';
    element_drag_clone.style.left = `${clampedX}px`;
    element_drag_clone.style.top = `${clampedY}px`;

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