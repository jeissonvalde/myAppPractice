import yo from 'yo-yo'
import layout from '../layout'
import translate from '../translate'
import picture from '../picture-card'
import request from 'superagent'

module.exports = function template(pictures) {
  var el = yo`
    <div class="container timeline">
      <div id="modalCamara" class="modal center-align modal-camera">
        <div class="modal-content">
          <div class="camara-picture" id="camara-input"></div>
          <div class="camara-picture hide" id="picture-preview"></div>
        </div>
        <div class="modal-footer center">
          <button class="waves-effect waves-light btn" id="shoot">
            <i class="fa fa-camera"></i>
          </button>
          <button class="waves-effect waves-light cyan btn hide" id="uploadBtn">
            <i class="fa fa-cloud-upload"></i>
          </button>
          <button class="waves-effect waves-light red btn hide" id="cancelPicture">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m10 offset-m1 center-align">
          <form enctype="multipart/form-data" id="formUpload" class="form-upload" onsubmit=${onsubmit}>
            <a href="#modalCamara" class="waves-effect waves-light btn modal-trigger">
              <i class="fa fa-camera-retro" aria-hidden="true"></i>
            </a>
            <div id="fileName" class="fileUpload btn btn-flat cyan">
              <span><i class="fa fa-cloud-upload" aria-hidden="true"></i>
                ${ translate.message('upload-picture')}</span>
              <input name="picture" id="file" type="file" class="upload" onchange=${onchange} />
            </div>
            <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${ translate.message('upload')}</button>
            <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fa fa-window-close" aria-hidden="true"></i></button>
          </form>
        </div>
        <div id="picture-container" class="col s12 m10 offset-m1 l6 offset-l3">
          ${ pictures.map(pic => {
            return picture(pic)
          })}
        </div>
      </div>
    </div>
  `

  function toggleButtons() {
    document.getElementById('fileName').classList.toggle('hide')
    document.getElementById('btnCancel').classList.toggle('hide')
    document.getElementById('btnUpload').classList.toggle('hide')
  }

  function cancel() {
    toggleButtons()
    document.getElementById('formUpload').reset()
  }

  function onchange() {
    toggleButtons()
  }

  function onsubmit(ev) {
    ev.preventDefault()

    let data = new FormData(this)
    request
      .post('/api/picture')
      .send(data)
      .end(function (err, res) {
        console.log(arguments) // Arguments es un array con todos los parámetros que recibe
        cancel()
      })
  }

  return layout(el)
}
