<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARCHIVO PRUEBA DE DRAG</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <main class="main">

    <div class="elements"> 
      <div class="elements__item" id="elements__item--1" draggable="true"> elemento 1 </div>
      <div class="elements__item" id="elements__item--2" draggable="true"> elemento 2 </div>
    </div>


    

    <div class="container__canvas canvas">
      <div id="dropzone__template" class="dropzone__template"></div>
      <button class="btn btn-generate">GENERATE CANVAS</button> <br>
      <canvas id="dropzone__canvas" class="dropzone dropzone__canvas " width="841" height="595"></canvas>
    </div>
  
  </main>

  <script src="drag.js"></script>
</body>
</html>