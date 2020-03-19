

//********************************************************************
//DECLARACION DE VARIABLES GLOBALES
//********************************************************************
    var largoFilas = 7;
    var largoColumnas=7;
    var columnaName="";
    var filaname="";
    var imagenRandom="";

    var imagen1="";
    var imagen2="";
    var imagen3="";

    var existioAcierto1 = false;

    var primerCarga = true;
    var imagenAcertada ="";


    var contAcert   =1;
    var cargaImgUno = true;
    var ubicHastaAciert ="";

    var aciertoTresImag = 100;
    var aciertoCuartaIgual=50;
    var puntajeTotal = 0;

    var ArrayConTodosLosAciertos = [];
    var posicionArray = 0;

    var idDrag="";

 

//********************************************************************
//MI PROYECTO 
//********************************************************************

//Ejecuta al cargar la pagina LOAD.
$(document).ready(function( )
{

    $("#idJuegoTerminado").hide(0);
    var puntajeTotal = 0; 
    var aciertoTresImag = 100;
    var aciertoCuartaIgual=50;
    var imgMov1 ="";
    var click = true;

   
    cargaInicialRandom();
    AnimacionTitulo("h1");

 
})
  
 
 
 
 
  
//****************************************************************************
// CARGA INICIAL RANDOM
//****************************************************************************

function cargaInicialRandom()
{
    var columnaName="";
    var imagenRandom="";
   
    for (var col = 0; col <= 7; col++) 
    { //COLUMNA
      columnaName=".col-"+col;

      for (var fila = 0; fila <= 7; fila++) 
      {  //FILA
           
        //----------------------------------------------------------------------------------
        // Obtiene imagen random  y Armma imagen que va a insertar con nameClass
        //----------------------------------------------------------------------------------
        imagenRandom= rutaImagenRandom();
        var nameImag = "img"+col+"-"+fila;



        if(imagenRandom=="image/1.png")
        {
          namClass ="clasImag1";
        }
        else if (imagenRandom=="image/2.png")
        {
          namClass ="clasImag2";
        }
         else if (imagenRandom=="image/3.png")
        {
          namClass ="clasImag3";
        }
         else if (imagenRandom=="image/4.png")
        {
          namClass ="clasImag4";
        }
            
        //---------------------------------------------------------------------------------- 
        //Si el espacio esta vacio , inserta imagen
        //----------------------------------------------------------------------------------
      
        var nameImag ="img" + col + "-" + fila;
        $(columnaName).append("<img src='"+imagenRandom + "' class='"+namClass+"' id='"+nameImag+"'/>" );
        
       
        agregarPropiedadDraggable(nameImag);
        agregarPropiedadDroppable(nameImag);

    
        

        }
    }
} 


function rutaImagenRandom()
{
  for (var i = 0; i < 3; i++) 
  {   
    var numero = Math.floor((Math.random() * 4) + 1);
    var ruta ="image/"+numero+".png";
    return ruta;
  }
}
 



//****************************************************************************
// BOTONES
//****************************************************************************
  

 $(".btn-reinicio").click(function() 
  { 
    textoActual = $(".btn-reinicio").text(); 
    //textoActual = "inicio"; //BORRAR
    if (textoActual == "Reiniciar")
    {
      tiempo(textoActual);
      $(".btn-reinicio").text("Iniciar");
      location.reload();
    }
    else
    {
      
     
      tiempo(textoActual);
      $(".btn-reinicio").text("Reiniciar");
      AciertoFilas_Columnas();
    }
   });



//****************************************************************************
// ANIMACIONES
//****************************************************************************


      //*******************************************************
      // ANIMACIONES INICIO
      //*******************************************************

        function AnimacionTitulo(elemento)
        {
           $(elemento).animate(
           {
             color: "white"
           }, 4000, function(){
             color1Titulo(elemento)
           })
          }


        function color1Titulo(elemento)
        {
           $(elemento).animate(
           {
             color: "red"
           }, 350, function(){
             color2Titulo(elemento)
           }
           )
        }

        function color2Titulo(elemento)
        {
           $(elemento).animate(
           {
             color: "yellow"
           }, 350, function(){
             color1Titulo(elemento)
           }
           )
        } 


      //*******************************************************
      // ANIMACIONES OTRAS
      //*******************************************************

     


// PARPADEO
    function OOUT (ArrayConTodosLosAciertos)
    {    
         var fLen = ArrayConTodosLosAciertos.length;
              
                  for (i = 0; i < fLen; i++)
                  {  
                    imagen = ArrayConTodosLosAciertos[i];
                    if(imagen != "x"){ 

                       $(imagen).fadeOut(400,function()
                                                         {
                                                             IIN(imagen)
                                                         })
                     }
                   }
                   }
   
animacionPrueba =  function(ArrayUbicAciertos)
                {
                  var fLen = ArrayUbicAciertos.length;
              
                  for (i = 0; i < fLen; i++)
                  {  
                     idImagenAnimar="";
                     idImagenAnimar =ArrayUbicAciertos[i] ;
                     if(idImagenAnimar != "x")
                     {
                         for (var x = 0; x < 50; x++) 
                         {            
                            $("#" + idImagenAnimar).fadeTo(500, .1)
                                                      .fadeTo(500, 1);
                         }   
                      }
                   }
                }
         
         

      //*******************************************************
      // ANIMACIONES FIN
      //*******************************************************

        function finalizarJuego()
        {
          //Llamado desde la funcion tiempo cuando finaliza el msimo.
          $("#idJuegoTerminado").show(10);
          $(".panel-tablero").hide(300); 
          $(".time").hide(300); 

          AnimacionFinalizarJuego("div.score"); 
          AnimacionFinalizarJuego("div.moves");                                  
        }

          function AnimacionFinalizarJuego(elemento)
          {
            $(elemento).animate(
            { 
              height: "26%",
              width: "400%"
            }, 3000 )
          }


   






//****************************************************************************
//  FUNCIONES
//****************************************************************************

function AciertoFilas_Columnas() 
{
   
   existioAcierto = false;
   var ArrayUbicAciertos = [];
   var i=0;
   var DireccionFilas =false;
   var huboAciertoRecientemente = false;
   InicializarVariablesComprobarAciertos();
 
    for (var col = 0; col <= largoColumnas; col++) 
    { 
      for (var fila = 0; fila <= largoFilas; fila++) 
      {
        ubicacion = obtenerUbicacionDireccion(DireccionFilas,fila,col);
       
        $(ubicacion).each(function ()
        {
          //alert (ubicacion);
          if(cargaImgUno == true)
          {
               imagen1 = $(ubicacion).attr('class');
               idImagen1= $(ubicacion).attr('id'); 
               idImagen1    = idImagen1.substring(0, 6);
               imagen1 = imagen1.substring(0, 10);
             

               cargaImgUno=false;
          }
          else
          {
             //cargaImgUno = true;
               imagen2 = $(ubicacion).attr('class');
               idImagen2= $(ubicacion).attr('id'); 
               idImagen2    = idImagen2.substring(0, 6);
               imagen2 = imagen2.substring(0, 10);     
              
               imagen1 = imagen1.trim();
               imagen2 = imagen2.trim();

             
             if(imagen1 == imagen2)
             {            

                cargaImgUno = false;
                ArrayUbicAciertos = GuardarIdImagenesAcertadas(idImagen1,idImagen2,ArrayUbicAciertos); 
               if(ArrayUbicAciertos.length >=3)
               {
                  existioAcierto = true;
                  ArrayConTodosLosAciertos =   GuardarImagenesArrayGlobalAnimar(ArrayUbicAciertos);    

                 
               }
             }
             else if (imagen1.trim() != imagen2)
             {
               ArrayUbicAciertos.length = 0; 
             }
                imagen1 =imagen2;
                idImagen1= idImagen2;
           }
        })

          //alert (ubicacion);
          if (col == 7 && fila ==7)
          {
            if (DireccionFilas)
              { 
               //Finalizo COMPLETAMENTE   
                col=7;
                fila=7;
              }
              else //CAMBIO A COMPROBAR FILAS
              {
                 if(ArrayUbicAciertos.length >=3)
                 {
                    existioAcierto = true;
                    ArrayConTodosLosAciertos =   GuardarImagenesArrayGlobalAnimar(ArrayUbicAciertos);    

                 } 

                  InicializarVariablesComprobarAciertos();
                  DireccionFilas = true;
                  col=0;
                  fila=0;
                         
                  ArrayUbicAciertos.length = 0;
              }
          }
      }
   
        //Cambia  col o fila , segun el estado que este y limpia para que no cuente coincidencias entre lineas diferentes.
         ArrayUbicAciertos.length = 0;
         imagen1 ="";
         idImagen1="";
         imagen2 = "";
         idImagen2= ""; 
         cargaImgUno = true;
    }
    Calcular_Actualizar_Puntaje(ArrayConTodosLosAciertos,existioAcierto);
     OOUT (ArrayConTodosLosAciertos);
     
    
    
    //AnimacionParpadeo(ArrayConTodosLosAciertos); 
    reemplazarImagenesAcertadas(ArrayConTodosLosAciertos);

  
     if(existioAcierto == true )
     {
         AciertoFilas_Columnas();
         acierto = true;
     }
     else
     {
        acierto = false;
     }

     return acierto;
  } 
 





function reemplazarImagenesAcertadas(ArrayConTodosLosAciertos)
{

  /******************************Declare variant */
 
  var arrayUnAcierto =[];
  var aciertoFila = false;
  var aciertoObtenido =  false;
  var tipoDeAcierto;
  var cantAcertado=0; 
   
  var arrayLugaresAModificar=[];

  //-----------------------------------------------

  var fLen = ArrayConTodosLosAciertos.length;

  idImagenAOcultar="";

  for (i = 0; i < fLen; i++)
  {
     //Obtener ubicacion del acierto 
     
     arrayUnAcierto = obtUbicDeAUnAcierto(ArrayConTodosLosAciertos); // obtiene de a un acierto para trabajar. (Ultimo campo devuelve si es acierto de fila o columna)
     
     if (typeof arrayUnAcierto != "undefined" &&  arrayUnAcierto != "x" &&  arrayUnAcierto != ""  )  
     {
         var  tipoDeAcierto = informacionSobreTipoAcierto(arrayUnAcierto);  //Devuelve ultimo campo de array que indica si es de fila o de columna
  
         var  cantAcertado  = infoCantidadAcertado(arrayUnAcierto);     //Devuelve cantidad de caramelos acertados
        
         var arrayLugaresAModificar = infoLugaresAmodificar(tipoDeAcierto,cantAcertado,arrayUnAcierto);     

          
         matrizLugaresAModificar = reempImagenesALugaresDeImagenesAcertadas(cantAcertado,tipoDeAcierto,arrayUnAcierto,arrayLugaresAModificar); // imagenes existentes , bajarlas al lugar de las acertadas.

         BajarImagenesAlugaresDeAcierto(matrizLugaresAModificar);
       
         matrizLugaresAModificar.length =0;
         arrayUnAcierto.length =0;
      }
     
   }
}

 


/*******************************************************************************/
/*FUNCIONES SECUNDARIAS UTILIZADAS EN EL METODO DE REEMPLAZAR IMAGENES ACERTADAS*/
/*******************************************************************************/

 

  function  BajarImagenesAlugaresDeAcierto(matrizLugaresAModificar)
  {
     var fLen = matrizLugaresAModificar.length;
     var srcImagenRempAnterior1 = "";
     var srcImagenRempAnterior2 = "";

      for (i = 2; i < fLen; i++)
      { 
         var idImagenAcierto = matrizLugaresAModificar[i][0]; // Cuando esta es null me voy 
         if (idImagenAcierto != 'undefined')
         {
           var idImagenDeRemplazo = matrizLugaresAModificar[i][2];
           var srcImagenDeRemplazo = matrizLugaresAModificar[i][3];
           var classImagenDeRemplazo = matrizLugaresAModificar[i][4];


           if(  idImagenDeRemplazo  =='' ||  idImagenDeRemplazo == 'imgundefined' )
           {
               srcImagenDeRemplazo = rutaImagenRandom();
               classImagenDeRemplazo = classImagenRandom(srcImagenDeRemplazo);
               classImagenDeRemplazo =classImagenDeRemplazo + " ui-draggable ui-draggable-handle ui-droppable";
           }

             

           $("#"+ idImagenAcierto).replaceWith("<img src='"+ srcImagenDeRemplazo +"'class='"+classImagenDeRemplazo+"' id='"+ idImagenAcierto + "' >");    
           agregarPropiedadDraggable(idImagenAcierto);
           agregarPropiedadDroppable(idImagenAcierto);

           srcImagenRempAnterior1 = srcImagenDeRemplazo;

          if(idImagenDeRemplazo != 'imgundefined' || idImagenDeRemplazo =='')
          {
            //En el while controlo que la imagen generada no sea la misma que la que reeemplaza, ni sea igual a la remmplazada anteriormente.
             srcImagenAleatoria =  rutaImagenRandom();
             while (srcImagenAleatoria == srcImagenDeRemplazo ||  (srcImagenRempAnterior2 !='' && srcImagenAleatoria == srcImagenRempAnterior2))
             {
                srcImagenAleatoria = rutaImagenRandom();
                
             }
             claseImagenAleatoria = classImagenRandom(srcImagenAleatoria);
              claseImagenAleatoria =claseImagenAleatoria + " ui-draggable ui-draggable-handle ui-droppable";
 

            //Aca debo generar una imagen aleatoria nueva  siempre
            $("#"+ idImagenDeRemplazo).replaceWith("<img src='"+ srcImagenAleatoria +"'class='"+claseImagenAleatoria+"' id='"+ idImagenDeRemplazo + "' >");
            srcImagenRempAnterior2 = srcImagenAleatoria;
      
            agregarPropiedadDraggable(idImagenDeRemplazo);
            agregarPropiedadDroppable(idImagenDeRemplazo);
          }
        }
     }
  }


 function classImagenRandom(imagenRandom)
 {
    if(imagenRandom=="image/1.png")
    {
      namClass = "clasImag1";
    }
    else if (imagenRandom=="image/2.png")
    {
      namClass = "clasImag2";
    }
     else if (imagenRandom=="image/3.png")
    {
      namClass = "clasImag3";
    }
     else if (imagenRandom=="image/4.png")
    {
      namClass = "clasImag4";
    }
    return namClass;
 }


 

 function  reempImagenesALugaresDeImagenesAcertadas(cantAcertado,tipoDeAcierto ,arrayUnAcierto,arrayLugaresAModificar)
 {
      var arrayReemplazosImg = [];
      var guardar =true; 
      var cantImagAcert =0;
      var lugaresARemp = 0; 
      var matrizLugaresAModificar =[];
      var DireccionFilas= true;
       var ubicAcierto ='';
      
       //HASTA ACA TENGO LOS LUGARES A MODIFICAR.
       for(  i = 0; i <= 10; i++ )
       {
          var lr = arrayLugaresAModificar[i]; 
          if (lr != '' && lr &&  lr!= 'undefined' &&  lr!= 'Empty' )
          {
            lugaresARemp ++;
          }
        }
         
          DireccionFilas = false;
          //////////reemplazos en matriz 
   
          var  u = cantAcertado -1;  
          var  x = lugaresARemp -1;
          var seguir = true;

          /*ARMO CABEZAL */
          matrizLugaresAModificar.push([ "ACIERT","|" ,"ImgREM","srcImg","classImg"]);
          matrizLugaresAModificar.push([ "------","|" ,"------","------","------"]);

  
       if (tipoDeAcierto =="Columna")
       {
          while  (x>=0 || u>=0)
          {
              // ACIERTO  // LUGAR A MOFIDICAR
              if (arrayUnAcierto[u] != undefined || arrayLugaresAModificar[x] != undefined)
              {
                if (arrayLugaresAModificar[x] != undefined)
                {
                  var idImagMover =   "img"+ arrayLugaresAModificar[x];
                  var idImagenMover = "#img"+ arrayLugaresAModificar[x];
                  var srcImgMover = $(idImagenMover).attr('src');
                  var classImgMover = $(idImagenMover).attr('class');
                }
                
               
                if(arrayUnAcierto[u] != undefined)
                {
                   ubicAcierto = arrayUnAcierto[u];
                }
                else
                {
                   var col = ubicAcierto.substring(3,4);
                   var fila =  ubicAcierto.substring(5,6);
                   fila--;
                   var ub =  "img"+col+"-"+fila;
                   ubicAcierto =ub ;
                }


                matrizLugaresAModificar.push( [ubicAcierto,"|" ,"img"+arrayLugaresAModificar[x],srcImgMover,classImgMover]);  
                u -- ; 
                x -- ;     
                i ++ ;
              } 
              else
              {
                seguir = false;
              }
           }
        } 
        else if (tipoDeAcierto =="Fila")
        {
           var u_aux =u; 
           var x_aux =x;   
           var contAcierto=0;  
           
              while  (x>=0 || u>=0)
              {
                // ACIERTO  // LUGAR A MOFIDICAR
                if (arrayUnAcierto[u] != undefined || arrayLugaresAModificar[x] != undefined)
                {
                  if (arrayLugaresAModificar[x] != undefined)
                  {
                     var idImagMover = "img"+ arrayLugaresAModificar[x];
                     var idImagenMover = "#img"+ arrayLugaresAModificar[x];
                     var srcImgMover = $(idImagenMover).attr('src');
                     var classImgMover = $(idImagenMover).attr('class');
                  }
                 
                
                 if(arrayUnAcierto[u] != undefined)
                 {
                    ubicAcierto = arrayUnAcierto[u];
                    arrayUnAcierto[u] = "img"+arrayLugaresAModificar[x];  
                    contAcierto ++;
                    if (contAcierto == cantAcertado && arrayUnAcierto[u] !="imgundefined") // acierto por fila
                    {
                       u = u_aux;  //Posiciono para comenzar el array aciertos nuevamente 
                       u++; //uno mas porque se lo resta abajo, no vuelvo hacer el if.
                       contAcierto= 0;
                    }
                 }
                 else
                 {
                    var col = ubicAcierto.substring(3,4);
                    var fila =  ubicAcierto.substring(5,6);
                    fila--;
                    var ub =  "img"+col+"-"+fila;
                    ubicAcierto =ub ;
                 }   


                 matrizLugaresAModificar.push( [ubicAcierto,"|" ,"img"+arrayLugaresAModificar[x],srcImgMover,classImgMover]);  
                 
                 u -- ;
                 x -- ;     
 
               } 
               else
               {
                 seguir = false;
               }
            }
        }
           return matrizLugaresAModificar;
 }
       




   function infoLugaresAmodificar(tipoDeAcierto,cantAcertado,arrayUnAcierto)
   {
      var arrayLugaresAModificar= [];
      var col =  arrayUnAcierto[0].substring(3,4);
      var fila =  arrayUnAcierto[0].substring(5,6);
      var colAux = col;

         if (tipoDeAcierto =="Columna")
         {
           for (i = 0 ; i< fila;  i++)
           {
              var ub =  "img"+col+"-"+i;
              
              if(ub == arrayUnAcierto[0])
              {
                return arrayLugaresAModificar;
              }
              arrayLugaresAModificar.push(col+"-"+i);  
           }
         }
         else if (tipoDeAcierto =="Fila")
         {
           for (i = 0 ; i< fila;  i++)
           {
            colAux=col;
            //Va corriendo a lo largo de la fila, de columna en columna
              for (c = 0 ; c< cantAcertado;  c++) 
              {
                var ub =  "img"+colAux+"-"+i;

                if(ub == arrayUnAcierto[0])
                {
                   return arrayLugaresAModificar;
                }
                arrayLugaresAModificar.push(colAux+"-"+i);  
                colAux ++;
             }
          }
         }
   
       return arrayLugaresAModificar;
    }




  function infoCantidadAcertado(arrayUnAcierto)
  {
      var cant =  arrayUnAcierto.length -1;  
      return cant; 
  }

  function informacionSobreTipoAcierto(arrayUnAcierto)
  {
    var fLen = arrayUnAcierto.length;
  
    for (i = 0; i < fLen; i++)
    {
       if (arrayUnAcierto[i] == "Fila")
       {
        delete arrayUnAcierto[i];
         return "Fila";
       }
       else if (arrayUnAcierto[i] == "Columna") 
       {
         delete arrayUnAcierto[i];
         return "Columna";
       }
     }
     return "";
  }

  function obtUbicDeAUnAcierto (ArrayConTodosLosAciertos)
  {   
     var fLen = ArrayConTodosLosAciertos.length; 
     var filaAux = 99;
     var colAux  = 99;
     var arrayUnAcierto=[];
     var  cerrarAcierto = false;
     var tipoDeAcierto="";

     var fila = 99;
     var col  = 99;
     var primeraVez = true;
   
      for(var i = 0 ; i < fLen ; i++)
      {
          idImagen  =ArrayConTodosLosAciertos[i];
         
          if(ArrayConTodosLosAciertos[i] !="x")
          {  
              //Obtiene posiciones ------------------------------------
              if(primeraVez  ==true )
              {
                // Primer imagen entra aca.
                 fila = idImagen.substring(5, 6);
                 col  = idImagen.substring(3,4);
                 arrayUnAcierto.push(idImagen);
                 ArrayConTodosLosAciertos[i] ="x";
                 primeraVez = false;    
              }
              else
              {
                //Segunda vez que entra (segunda imagen o mayor)
                 filaAux = idImagen.substring(5,6);
                 colAux  = idImagen.substring(3, 4);
              }
              //--------------------------------------------------------

              if (fila != 99  &&  filaAux != 99)
              {
                if(filaAux != fila && colAux == col  && tipoDeAcierto !="Fila") //Acierto en fila
                {
                  if(VerifCerrarAcierto(i,arrayUnAcierto,"COL" ,filaAux,colAux) == false)
                   {
                      arrayUnAcierto.push(idImagen);
                      ArrayConTodosLosAciertos[i] ="x";    
                      tipoDeAcierto = "Columna";
                   }
                   else
                   {
                      //Salir , ya finalize el armado de ArrayUnAcierto
                       fila = 99;
                       i = fLen;
                       arrayUnAcierto.push(tipoDeAcierto);
                       return arrayUnAcierto;
                   }
                }
                else if(filaAux == fila  &&  colAux != col && tipoDeAcierto !="Columna") //Acierto columna
                {
                   if(VerifCerrarAcierto(i,arrayUnAcierto,"FIL" ,filaAux,colAux) == false)
                   {
                      arrayUnAcierto.push(idImagen); 
                      ArrayConTodosLosAciertos[i] ="x";    
                      tipoDeAcierto = "Fila";
                   }
                    else
                   {
                      //Salir , ya finalize el armado de ArrayUnAcierto
                       fila = 99;
                       i = fLen;
                       arrayUnAcierto.push(tipoDeAcierto);
                       return arrayUnAcierto;
                   }
                }
                else
                {
                   fila = 99;
                   i = fLen;
                   arrayUnAcierto.push(tipoDeAcierto);
                   return arrayUnAcierto; 
                }  
            }  
      }
      }
      arrayUnAcierto.push(tipoDeAcierto);
      return arrayUnAcierto; 
  }

 
  function VerifCerrarAcierto(i,arrayUnAcierto,acierto ,filaAux,colAux)
  {
    //Comprobar con imagen anterior si incremento solo un lugar , de incrementar mas de un lugar quiere decir que empezo otro acierto, lo tomaremos en cuenta mas adelante , no ahora.
    
     var flenAcierto =arrayUnAcierto.length;
     
    if(flenAcierto ==0  || typeof flenAcierto === "undefined")
    {
      return false; //No tiene con que comparar , primer imagen a guardar
    }
    
     var diferencia = 0;
     var  posImgAnt = flenAcierto - 1; 
     idImagenAnterior  =arrayUnAcierto[posImgAnt] ;

      if (acierto == "FIL")
      {
        var colImgAnterior = idImagenAnterior.substring(3,4);
        diferencia =  colAux  - colImgAnterior;
      }
      else if("COL")
      {
        var  filImgAnterior  = idImagenAnterior.substring(5, 6);
        diferencia =  filaAux- filImgAnterior;
      }

    if(diferencia == 1 || diferencia == -1)
    {
      return false; //Sigue dentro del mismo acierto
    }
    else
    {
      return true; //Cerrar acierto , se salteo un espacio
    }
  }


 

/*********************FIN FUNCT SECUNDARIAS DEL METODO REEMPLAZAR IMAGENES ACERTADAS*/

 

  function GuardarIdImagenesAcertadas (idImagen1,idImagen2,ArrayUbicAciertos)
  {
    var imagenUnoYaGuardada = false;
    imagenUnoYaGuardada =ArrayUbicAciertos.includes(idImagen1);
  
    if(imagenUnoYaGuardada == false)
    {
      ArrayUbicAciertos.push(idImagen1);
    }
      ArrayUbicAciertos.push(idImagen2);
      return ArrayUbicAciertos;
  }

              
function GuardarImagenesArrayGlobalAnimar(ArrayUbicAciertos )
{
   var fLen = ArrayUbicAciertos.length;
   
    for (var i = 0; i <= 100; i++) 
    {
      var imagen = ArrayUbicAciertos[i];
       imagenGuardada =ArrayConTodosLosAciertos.includes(imagen);
       if(imagenGuardada == false &&  typeof imagen != "undefined")
       {
         ArrayConTodosLosAciertos.push(imagen);      
       }
    }
    return ArrayConTodosLosAciertos;
}
                
  
function contadorMovimiento()
{
  cant = $("#movimientos-text").text();
  $("#movimientos-text").text(parseInt(cant) + 1);
}

 
function tiempo (operacion)
{
  var tiempo = 
  {      
    minuto: 1,
    segundo: 59
  };

  var tiempo_corriendo = null;
  
  if ( operacion== 'Iniciar' )
  {
    $(this).text('Iniciar');                        
    tiempo_corriendo = setInterval(function()
    {
      //Segundos
      tiempo.segundo--;
      if( tiempo.segundo == 0)
      {
         tiempo.segundo = 59;
         tiempo.minuto--;
      }      
             
      $("#minute").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
      $("#second").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
          
              
      if(tiempo.minuto == 0 && tiempo.segundo ==1)
      {
     
        $("#second").text(tiempo.segundo < 10 ? '0' + 1 : 0);  
        clearInterval(tiempo_corriendo);
        finalizarJuego();
      }

    }, 1000);
  }
  else 
  {
    $(this).text('Reiniciar');
    clearInterval(tiempo_corriendo);
   } 
}

 
function agregarPropiedadDraggable(nameImag)
{
  $("#" + nameImag).draggable(
  { 
    containment: ".panel-tablero" , // limita movimiento dentro del tablero. 
    opacity: 0.35,                  // elemento arrastrado cambia opacity 
    zIndex: 100 ,                   // sobrepone el elemento arrastrado sobre los demas
    // disabled: true               // desahabilita dragg hasta iniciar juego
    //axis: "x " ,                   // perimitir movimientos horizontales y verticales
    revert: true
    // grid: [ 220,120 ]

       
  });
}

 
function agregarPropiedadDroppable(nameImag)
{  
 
  $("#" + nameImag).droppable(
  {
         drop: function( evento, ui ) 
         {         
            /*********************************************************************************/
            //Obtener  informacion completa de imagen numero uno , imagen que se va a mover.
            //--------------------------------------------------------------------------------
            imgMovId    = ui.helper.attr("id");
            imgMovClass = ui.helper.attr("class");  
            imgMovSrc   = ui.helper.attr("src");  
            imgMovId    = imgMovId.substring(0, 6);
            imgMovClass = imgMovClass.substring(0, 10);
            imgMovSrc   = imgMovSrc.substring(0, 11);
            /**************************************************************************************************************/
            //Obtener  informacion completa de imagen numero dos , es la imagen a la cual se le suelta la imagen uno arriba
            //-------------------------------------------------------------------------------------------------------------
            imgDosId    = $(this).attr("id");
            imgDosClass = $(this).attr("class");
            imgDosSrc   = $(this).attr("src");
            imgDosId    = imgDosId.substring(0, 6);
            imgDosClass = imgDosClass.substring(0, 10);
            imgDosSrc   = imgDosSrc.substring(0, 11);

             if (movimientoValido(imgMovId,imgDosId))
             {
                //El remplace no cambia el Id ya que es unico para la poscion  
                $("#"+ imgMovId).replaceWith("<img src='"+ imgDosSrc +"'class='"+imgDosClass+"' id='"+ imgMovId + "' >");
                $("#"+ imgDosId).replaceWith("<img src='"+ imgMovSrc +"'class='"+imgMovClass+"' id='"+ imgDosId + "' >");
               
                agregarPropiedadDraggable(imgMovId);
                agregarPropiedadDraggable(imgDosId);
                agregarPropiedadDroppable(imgMovId);
                agregarPropiedadDroppable(imgDosId);

                var acierto  = AciertoFilas_Columnas();
                
                contadorMovimiento();
                if(acierto == false)
                {
                  //Volver atras movimiento de imagen.
                   $("#"+ imgMovId).replaceWith("<img src='"+ imgMovSrc +"'class='"+imgMovClass+"' id='"+ imgMovId + "' >");
                   $("#"+ imgDosId).replaceWith("<img src='"+ imgDosSrc +"'class='"+imgDosClass+"' id='"+ imgDosId + "' >");
                   agregarPropiedadDraggable(imgMovId);
                   agregarPropiedadDraggable(imgDosId);
                   agregarPropiedadDroppable(imgMovId);
                   agregarPropiedadDroppable(imgDosId);
                }
             }
         }
    });
}

 

//****************************************************************************
//  FUNCIONES SECUNDARIAS / COMPLEMENTARIAS
//****************************************************************************


 function  Calcular_Actualizar_Puntaje(ArrayConTodosLosAciertos,existioAcierto)
 {

    if (existioAcierto){ 
    var cantAcierto = ArrayConTodosLosAciertos.length;
    valorActual = $("#score-text").text();
    var puntajeTotal = parseInt(cantAcierto) * parseInt(10);


    $("#score-text").text(parseInt(valorActual) + puntajeTotal);

  }
 }
     
 function InicializarVariablesComprobarAciertos()
 {

     columnaName="";
     filaname="";
     imagenRandom="";

     imagen1="";
     imagen2="";
     imagen3="";

     existioAcierto1 = false;

     primerCarga = true;
     imagenAcertada = "";


     contAcert   =1;
     cargaImgUno = true;
     ubicHastaAciert ="";

 }


function obtenerUbicacionDireccion(DireccionFilas,fila,col)
{

  if (DireccionFilas == false)
  {
    ubicacion = '#img'+ col + '-'+fila;
  }
  else
  {
    ubicacion = '#img'+ fila + '-'+col;
  }
  return ubicacion;

}



function movimientoValido(imgMovId,imgDosId)
{
   var colImgMov = imgMovId.substring(3,4);
   var filImgMov = imgMovId.substring(5,6);

   var colImgDos = imgDosId.substring(3,4);
   var filImgDos = imgDosId.substring(5,6);

   var lugaresMovidos = 0;

   if (colImgMov != colImgDos && filImgMov != filImgDos) //Movimiento en "diagonal" , incremento fila y col 
   {
      return false;
   }
   else if (colImgMov == colImgDos && filImgMov != filImgDos) // Movio fila 
   {
      lugaresMovidos = cantidadLugaresDesplasados(filImgMov,filImgDos);
   }
   else if (colImgMov != colImgDos && filImgMov == filImgDos) // Movio columna 
   {
      lugaresMovidos = cantidadLugaresDesplasados(colImgMov,colImgDos);
   }

   if (lugaresMovidos != 1 )
   {
     return false;
   }

   return true;
}

function cantidadLugaresDesplasados(valor1,valor2)
{
  
  var cantidad = 0;

  if (valor1 > valor2)
  {
    cantidad = parseInt(valor1) - parseInt(valor2);
  }
  else
  {
    cantidad = parseInt(valor2) - parseInt(valor1);
  }

  return cantidad;
}