import yo from 'yo-yo'
import translate from '../translate'
import moment from 'moment'

module.exports = function pictureCard(pic) {
  var el

  function render(picture) {
    return yo`
      <div class="card sticky-action ${picture.liked ? 'liked' : ''}">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${picture.src}" ondblclick=${like.bind(null, null, true)} >
          <i class="fa fa-heart like-heart-second ${ picture.likedHeart ? 'liked' : '' }"></i>
        </div>
        <div class="card-content">
          <a class="card-title" href="/${picture.user.username}">
            <img src="${picture.user.avatar}" class="avatar" />
            ${picture.user.username}
          </a>
          <small class="right time">${translate.date.format(new Date(picture.createdAt).getTime())}</small>      
          <p>
            <a href="#" class="left" onclick=${like.bind(null, true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
            <a href="#" class="left" onclick=${like.bind(null, false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
            <span class="left likes">${translate.message('likes', { likes: picture.likes || 0 })}</span>

            <i class="fa fa-comments-o activator comments" aria-hidden="true"></i>
            <span class="comments">${translate.message('comments', { comments: picture.comments || 0 })}</span>
          </p>
        </div>
        <div class="card-reveal">
          <i class="fa fa-times-circle card-title right" aria-hidden="true"></i>
          <p>
            <a href="/user/${picture.user.username}">
              <img src="${picture.user.avatar}" class="avatar" />
              ${picture.user.username} 
            </a><br>
            ${ translate.message('text.nocomments')} hola hola hola hola texto texto texto</p>
        </div>
      </div>
  `
  }

  function like(L, dbclick) {
    if (dbclick) {
      pic.likedHeart = pic.liked = !pic.liked
      L = pic.liked
    } else {
      pic.liked = L
    }

    pic.liked = L
    pic.likes += L ? 1 : -1

    function doRender() {
      let newEl = render(pic)
      yo.update(el, newEl)
    }

    doRender()

    setTimeout(() => {
      pic.likedHeart = false
      doRender()
    }, 1500)

    return false
  }

  el = render(pic)
  return el
}
