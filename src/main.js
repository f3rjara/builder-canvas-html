/* Canvas context */
const canvas__template = document.getElementById('canvas__template');
const ctx = canvas__template.getContext('2d');

/* DropZone Template Div */
let dropzone__template = document.getElementById('dropzone__template');
let elements__item = document.querySelectorAll('.elements__item');

/* Input change Background canvas */
const background_canvas = document.getElementById('background_canvas');
background_canvas.addEventListener('change', (event) => loadBackgroundTemplate(event) );

const loadBackgroundTemplate = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      document.getElementById('file-upload-info').textContent = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          const aspectRatio = image.width / image.height;
          const desiredWidth = 850; // Ancho deseado para una hoja tamaño carta en píxeles
          const desiredHeight = desiredWidth / aspectRatio;
          dropzone__template.style.backgroundImage = `url(${image.src})`;
          dropzone__template.style.backgroundSize = `${desiredWidth}px ${desiredHeight}px`;
          dropzone__template.style.backgroundPosition = 'center';
          dropzone__template.style.backgroundRepeat = 'no-repeat';
          dropzone__template.style.backgroundSize = 'cover';
        };
      };
    } else {
      alert('Por favor, selecciona un archivo de imagen válido (jpg o png).');
    }
  }
};

const initiazlieEvents = () => {
  console.log('initiazlieEvents');
  elements__item.forEach(( element_drag ) => {
    element_drag.addEventListener('dragstart', (event) => dragStart(event) );
    element_drag.addEventListener('drag', (event) => drag(event) );
    element_drag.addEventListener('dragend', (event) => dragEnd(event) );
  });

  dropzone__template.addEventListener('dragenter', (event) => dragEnter(event) );
  dropzone__template.addEventListener('dragover', (event) => dragOver(event) );
  dropzone__template.addEventListener('dragleave', (event) => dragLeave(event) );
  dropzone__template.addEventListener('drop', (event) => drop(event) );
};

/* Input Save Canvas with Name */
const name_canvas = document.getElementById('name_canvas');
const save__canvas = document.getElementById('save__canvas');
save__canvas.addEventListener('click', (event) => saveCanvas(event) );
const patternNameTemplate = /^[a-zA-Z0-9_]+$/;
const templates__saved = [];
let template__active = null;

const saveCanvas = ( event ) => {
  const name_to_save = name_canvas.value.trim().toLowerCase();
  if( name_to_save.length <= 3 ) {
    alert("Asigne un nombre a la plantilla valido");
    return;
  }
  if( !patternNameTemplate.test(name_to_save) ) {
    alert("Asigne un nombre a la plantilla valido");
  }
  console.log(`${name_to_save}.canvas_template`);

  const container__canvas = document.querySelector('.container__canvas');


  const template_to_save = {
    id: 123,
    name: `${name_to_save}.canvas_template`,
    status: 'active',
    content: container__canvas.innerHTML
  }

  template__active = template_to_save;

  const existing_template = templates__saved.find( template => template.id === canvas_to_save.id );
  if( existing_template ) {
    // update
    const index = templates__saved.indexOf(existing_template);
    templates__saved[index] = template_to_save;
  } else {
    // add
    templates__saved.push(template_to_save);
  }
  // save in local storage templates__saved
  localStorage.setItem('templates__saved', JSON.stringify(templates__saved));

  alert("Plantilla guardada correctamente");  
};

/* Button load Template */
const load__canvas = document.getElementById('load__canvas');
load__canvas.addEventListener('click', (event) => loadTemplate(event) );

const loadTemplate = ( event ) => {
  const templates__saved = JSON.parse(localStorage.getItem('templates__saved'));
  template__active = templates__saved[0];
  const template__loader = templates__saved[0].content;
  const container__canvas = document.querySelector('.container__canvas');
  // clean container__canvas
  container__canvas.innerHTML = '';
  // add template__loader to container__canvas
  container__canvas.innerHTML = template__loader;
  // add events
  dropzone__template = document.getElementById('dropzone__template');
  elements__item = document.querySelectorAll('.elements__item');

  setTimeout(() => {
    initiazlieEvents();
  }, 200);

  alert("Plantilla cargada correctamente");
};

/* Button download Canvas */
const download__canvas_buttons = document.querySelectorAll('.download__canvas');
download__canvas_buttons.forEach( button => button.addEventListener('click', (event) => downloadCanvas(event) ) );

const downloadCanvas = ( event ) => {
  const data_type_download = event.target.dataset.typeDownload;
  if ( data_type_download === 'jpg' ){
    const link = document.createElement('a');
    link.download =  `${template__active.name.split('.')[0]}.jpg`;
    link.href = canvas__template.toDataURL('image/jpeg', 0.8);
    link.click();
  }
  else if ( data_type_download === 'pdf' ){
    console.log('pdf');
    // Crear un objeto jsPDF
    const filePdf = new jsPDF('l', 'mm', 'a4');
    const canvasData = canvas__template.toDataURL('image/jpeg', 0.8);
    // Agregar la imagen del canvas al PDF
    const pageWidth = filePdf.internal.pageSize.width;
    const pageHeight = filePdf.internal.pageSize.height;
    filePdf.addImage(canvasData, 'JPEG', 0, 0, pageWidth, pageHeight);
    // Descargar el archivo PDF
    filePdf.save(`${template__active.name.split('.')[0]}.pdf`);
  }
};

/* Button Generate Canvas */ 
const btn_generate = document.getElementById('generate__canvas');
btn_generate.addEventListener('click', (event) => generateCanvasTemplate(event) );

const modal__container = document.querySelector('.modal__container');

modal__container.addEventListener('click', (event) => {
  if( event.target.classList.contains('modal__container') ) {
    modal__container.classList.remove('modal__container--active');
  }
});

const generateCanvasTemplate = ( event ) => {
  if( !template__active ) {
    alert('No se ha guardado una plantilla');
    return;
  }
  
  console.log('generateCanvasTemplate');
  modal__container.classList.add('modal__container--active');
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