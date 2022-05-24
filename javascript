const newsletterEmbed = `
<iframe src="https://alexepstein.substack.com/embed" width="480" height="320" style="border:0px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
`
const loadEmbed = document.createElement('div')
loadEmbed.classList.add ('newsletter')
loadEmbed.innerHTML = newsletterEmbed
loadEmbed.addEventListener('click', () => {
    loadEmbed.classList.remove('show-newsletter')
  })
document.body.appendChild(loadEmbed)


const newsletterclicks = document.querySelectorAll('[href*="https://alexepstein.substack.com"]')

if(newsletterclicks) {
    const links = Array.from(newsletterclicks)
    links.forEach(link => {
      link.removeAttribute("href")
      link.addEventListener('click', () => {
        loadEmbed.classList.add('show-newsletter')
    })

  })
}
