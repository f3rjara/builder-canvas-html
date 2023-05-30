<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificado Builder</title>
  <link rel="stylesheet" href="./public/css/main.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body>

  <main class="main">
    <section class="card panel">
      <div class="panel__control">
        <div class="form-select">
        <select class="panel__options " name="panel__options" id="panel__options">
          <option value="none" disabled selected>SELECCIONE</option>
          <option value="text">TEXTO</option>
          <option value="image">IMAGE</option>
        </select>
        </div>
        <button class="btn">Agregar</button>
      </div>
      <div class="panel__elements">
        <div class="elements">
          <div class="elements__item" id="elements__item--1" draggable="true"> elemento 1 </div>
          <div class="elements__item" id="elements__item--2" draggable="true"> elemento 2 </div>
          <div class="elements__item" id="elements__item--3" draggable="true"> 
            <img src="https://picsum.photos/200/300" alt="hola" style="user-select: none;"> 
          </div>
        </div>
      </div>
    </section>

    <section class="card container">
      <div class="container__menu">
        
        <div class="wrapper__input">
          <input type="text" name="name_canvas" id="name_canvas" pattern="^[a-zA-Z0-9_]+$" require  placeholder="NOMBRE PLANTILLA" title="Sin espacios, solo letras y guion bajo" >
        </div>

        <div class="wrapper__input">
          <label for="background_canvas" class="label-file-upload">Seleccionar fondo</label>
          <input type="file" accept="image/png,image/jpeg" class="file-browser" name="background_canvas" id="background_canvas">
          <span class="file-upload-info" id="file-upload-info"></span>
        </div>
        
        <button class="btn btn__save" type="button" name="save__canvas" id="save__canvas">GUARDAR PLANTILLA</button>

        <button class="btn btn__save" type="button" name="load__canvas" id="load__canvas">CARGAR PLANTILLA</button>

        <button class="btn btn__save btn__generate"  type="button" name="generate__canvas" id="generate__canvas">GENERAR PLANTILLA</button>

      </div>

      <div class="container__canvas canvas">
        <div id="dropzone__template" class="dropzone__template"></div>
      </div>

      
    </section>

    <div class="modal__container">
      <canvas id="canvas__template" class="canvas__template" width="841" height="595"></canvas>

      <div class="container__actions">
        <button class="btn btn__download download__canvas" type="button" id="download__canvas" name="download__canvas" data-type-download="pdf">
          DESCARGAR PDF
        </button>
        <button class="btn btn__download download__canvas" type="button" id="download__canvas"  name="download__canvas" data-type-download="jpg">
          DESCARGAR JPG
        </button>
      </div>
    </div>
  </main>
  
  <script src="./src/main.js"></script>
  <script src="./src/dragable.js"></script>
</body>
</html>