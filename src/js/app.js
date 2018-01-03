// Place JS here.
function eventHandlers () {
  const howMany = document.getElementsByName('numguests')
  const howManyField = document.getElementById('how-many')
  howMany.forEach(elem => {
    elem.addEventListener('click', (e) => {
      howManyField.value = e.target.value
    })
  })

  const where = document.getElementsByName('location')
  const whereField = document.getElementById('where')
  where.forEach(elem => {
    elem.addEventListener('click', (e) => {
      whereField.value = e.target.value
    })
  })

  const burger = document.getElementById('burger')
  const closeMe = document.getElementById('close-me')
  const navLinks = document.querySelectorAll('nav.mobile-only ul a')
  burger.addEventListener('click', e => {
    e.preventDefault()
    burger.classList.toggle('hide')
    closeMe.classList.toggle('hide')
    document.querySelectorAll('nav.mobile-only .container')[0].classList.toggle('add-flex')
  })
  closeMe.addEventListener('click', e => {
    e.preventDefault(e)
    burger.classList.toggle('hide')
    closeMe.classList.toggle('hide')
    document.querySelectorAll('nav.mobile-only .container')[0].classList.toggle('add-flex')
  })
  navLinks.forEach(elem => {
    elem.addEventListener('click', e => {
      burger.classList.toggle('hide')
      closeMe.classList.toggle('hide')
      document.querySelectorAll('nav.mobile-only .container')[0].classList.toggle('add-flex')
    })
  })
};

// document.addEventListener('DOMContentLoaded', () => {
//   eventHandlers()
// })

const loader = evt => {
  if (evt.target.readyState === 'interactive') {
  } else if (evt.target.readyState === 'complete') {
    document.getElementsByClassName('loading')[0].classList.add('hide')
    eventHandlers()
  }
}

document.addEventListener('readystatechange', loader, false)
