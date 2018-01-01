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
};

if (document.readyState === 'complete' || document.readyState !== 'loading') {
} else {
  document.addEventListener('DOMContentLoaded', () => {
    eventHandlers()
  })
}
