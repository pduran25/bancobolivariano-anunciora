/* globals AFRAME */

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  //const observer = new MutationObserver(() => {
    /** ****** */
    const soundButton = document.getElementById('sound-button')
    if (soundButton) {
      observer.disconnect()  // Detiene la observación una vez encontrado
      soundButton.addEventListener('click', () => {
        const videos = document.querySelectorAll('video')
        videos.forEach((video) => {
          video.muted = false
          video.play().catch(err => console.error('Error al reproducir el video:', err))
        })
        soundButton.hidden = true
      })
    }
  //})

  // Observa cambios en el DOM
  //observer.observe(document.body, {childList: true, subtree: true})
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
