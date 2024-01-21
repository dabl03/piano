const TIME_NORMAL = "X1";
var type_sound = "triangle",
  level_sound = 1,
  id_time_note = TIME_NORMAL,
  /***@todo:Falta hacer los diferentes tipos que hay en los comentarios y modificar los botones.*/
  synth=new Tone.AMSynth().toDestination()/*MonoSynth({
    oscillator: {
      type: "square"
    },
    envelope: {
      attack: 0.1
    }
  }).toDestination()
  new Tone.Synth().toDestination()
  new Tone.MembraneSynth().toDestination()
  new Tone.FMSynth().toDestination()
  new Tone.DuoSynth().toDestination()
  new Tone.AMSynth().toDestination()
  */,
  if_sound=false,
  is_first_down=true,
  duration=0;
;
class position{
  constructor(x,y,w=undefined,h=undefined){
      this.x=x;
      this.y=y;
      this.width=w;
      this.height=h;
  }
};
function level_change(input_range) {
  synth.volume.value = input_range.value;
}
////Eventos. Siempre pido this__ que es el elemento a modificar
//// e es el evento para detener la propagación.
/**We animate the key and start the key sound.
 * @param {DomElement} this__ : Dom element to resize.
 * @param {Event} e : To stop the spread of events.
 */
function click_key(this__,e) {
  if(is_first_down)
    return;
  e.stopPropagation();
  let height=parseInt(this__.getAttribute("data-height"));
  this__.setAttribute("height",height-20);
  if (if_sound)
    sound(this__.getAttribute("data-note"), type_sound, parseInt(recortar_cadena(id_time_note, 1)));
}
/**We adjust the key and stop the sound.
 * @param {DomElement} this__ : Dom element to resize.
 * @param {Event} e : To stop the spread of events.
 */
function mouseup(this__,e){
  mouseout(this__,e);
  if_sound=false;
  synth.triggerRelease(0);
}
/**We adjust the key.
 * @param {DomElement} this__ : Dom element to resize.
 * @param {Event} e : To stop the spread of events.
 */
function mouseout(this__,e){
  e.stopPropagation();
  let height=parseInt(this__.getAttribute("data-height"));
  this__.setAttribute("height",height);
}
/**We start the animation of the key and the sound. Then we adjust the key and stop the sound
 * @param {DomElement} this__ : Dom element to resize.
 * @param {Event} e : To stop the spread of events.
 */
function click(this__,e){
  if_sound=true;
  click_key(this__,e);
  setTimeout(()=>{
    mouseup(this__,e);
  },duration);
  if_sound=false;
}
//Empezar el sonido.
function sound(NOTE, OSC_TYPE, TIME) {
  //Creamos nuestro oscilador.
  synth.triggerAttack(NOTE, 0.5);
}
////Controles.
function change_type_sound(this__) {
  //Desactivamos el botón anterior.
  document.getElementById(type_sound).setAttribute("fill", "#000");
  //Activamos la selección actual.
  this__.setAttribute("fill", "#888");
  type_sound = this__.getAttribute("id");
}
function change_sound_duration(this__) {
  //Desactivamos al botón anterior.
  document.getElementById(id_time_note).setAttribute("fill", "#444");
  //Activamos al actual.
  this__.setAttribute("fill", "#fff");
  //Por último actualizamos el control
  id_time_note=this__.getAttribute("id");
  duration=(parseInt(id_time_note[1])-1)*200;
}
//Utilidades.
function recortar_cadena(str__, indice) {
  let str_actual = "";
  for (let i = indice; i < str__.length; i++) {
    str_actual += str__[i];
  }
  return str_actual;
}
function set_attributes(obj,attributes){
  for (let att in attributes){
    obj.setAttribute(att,attributes[att]);
  }
}