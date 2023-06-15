const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalBtn = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}


modalTrigger.onclick = () => openModal()
closeModalBtn.onclick = () => closeModal()
modal.onclick = () => closeModal()

setTimeout(() => {
    openModal()
}, 10000)

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.body.clientHeight
    const bottomThreshold = documentHeight - windowHeight - 0
    if (scrollPosition >= bottomThreshold) {
        openModal()
    }
})