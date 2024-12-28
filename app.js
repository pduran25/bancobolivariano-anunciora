/* globals AFRAME */

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  var interval = setInterval(function () {
    // Busca el botón de sonido
    var soundButton = document.getElementById('sound-button');
    if (soundButton) {
      // Detiene el temporizador una vez encontrado
      clearInterval(interval);

      // Agrega el evento al botón
      soundButton.addEventListener('click', function () {
        // Busca todos los videos en la página
        var videos = document.querySelectorAll('video');
        videos.forEach(function (video) {
          video.muted = false; // Desactiva el mute
          video.play().catch(function (err) {
            console.error('Error al reproducir el video:', err);
          });
        });

        // Oculta el botón después de activar el sonido
        soundButton.hidden = true;
      });
    }
  }, 500); // Verifica cada 500 ms si el botón está disponible
}

// Registro del componente
AFRAME.registerComponent('my-named-image-target', {
  schema: {
    name: {type: 'string'},
  },
  init() {
    const {object3D} = this.el
    const {name} = this.data
    const watermark = document.getElementById('watermark')

    // Inicialmente, el target no está visible
    object3D.visible = false
    watermark.style.display = 'block'

    const showImage = ({detail}) => {
      if (name !== detail.name) {
        return
      }
      object3D.position.copy(detail.position)
      object3D.quaternion.copy(detail.rotation)
      object3D.scale.set(detail.scale, detail.scale, detail.scale)
      object3D.visible = true
      watermark.style.display = 'none'  // Ocultar marca de agua
    }
    const hideImage = ({detail}) => {
      if (name !== detail.name) {
        return
      }
      object3D.visible = false
      watermark.style.display = 'block'  // Mostrar marca de agua
    }

    // Escuchar eventos de detección
    this.el.sceneEl.addEventListener('xrimagefound', showImage)
    this.el.sceneEl.addEventListener('xrimageupdated', showImage)
    this.el.sceneEl.addEventListener('xrimagelost', hideImage)
  },
})
