const _submenuHtml = (items) => {
	let ul = '<ul>'
	items.forEach(item =>  {
      ul += `<li><a href="${item.link}">${item.text}</a></li>`
  })

  ul += '</ul>'
	return ul
}

const plusIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="open" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
</svg>
`

const minusIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="close" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
</svg>
`

const _addStyles = () => {
  const style = document.createElement('style');
  
  style.textContent = `
      .super-navbar__item-list,.super-navbar__content{
        overflow: unset !important
      }
      .submenu{
        display: none;
        background: #232424c7;
        padding: 10px;
        border-radius: 10px;
        z-index: 100;
        backdrop-filter: blur(18px);
        position:absolute;
        top: 50px !important;
        opacity:1 !important;
      }
      .submenu ul {
        list-style: none;
        padding: 0 10px;
      }
      .submenu ul li {
        margin-bottom: 10px;
      }
      .submenu ul a{
        text-decoration: none;
        color:white;
      }
      .super-navbar__item:hover .submenu {
        display: block;
      }
      .super-navbar__menu .submenu{
          display: none;
          background: none !important;
          position: inherit !important;
          top: 0 !important
      }
      .super-navbar__menu .super-navbar__item {
        display: flex;
        flex-direction: column;
        align-items: start;
        display: block !important;
        text-decoration: none !important
      }
      .menu-open .submenu{
        display: block !important
      }
      .menuActions {
        display:none;
        width: 26px;
        height: 26px;
        position: absolute;
        top: 14px;
        right: -37px;
        overflow: hidden;
      }
      .menuActions svg{
        position: absolute;
        top: 3px;
        left: 3px;
        color: white;
        width: 20px;
      }
      .super-navbar__menu .super-navbar__item .menuActions{
        display:block
      }
      .open{
        display:block;
      }
      .close{
        display:none;
      }
      .menu-open .open{
        display:none
      }
      .menu-open .close {
        display:block;
      }
      .super-navbar__menu .super-navbar__item:hover .submenu {
        display: none;
      }
      .newsletter{
        position: fixed;
        width: 100%;
        z-index: 1000;
        height: 100vh;
        background: #14141fa6;
        display: none;
        align-items: center;
        justify-content: center;
        top: 0;
        
      }
      .newsletter iframe{
        background: white !important;
        border-radius: 12px;
        margin: 10px;
      }  
      .show-newsletter {
          display:flex !important;
      }

  `;
  
  document.head.appendChild(style);
}


const _replaceTag = (el,path) => {
     const div = document.createElement('div');
     // div
     div.setAttribute('class',el.getAttribute('class'));
     div.style.position = 'relative'

    // wrap submenu name inside span
    const span = document.createElement('span')
    span.innerHTML = el.firstChild.textContent
    span.addEventListener('click', () => {
       window.location.href = `/${path}`
     })
  
    el.replaceChild(span,el.firstChild);
    
   
     while(el.firstChild) {
          
         div.appendChild(el.firstChild);
     }
     el.parentNode.replaceChild(div,el);
    _createToggle(div)
}

const _createToggle = (el) => {
 
  const open = document.createElement('div')
  open.setAttribute('class', 'menuActions')
  el.addEventListener('click', () =>{
    if(el.matches('.menu-open')){
      el.classList.remove('menu-open')
    }else{
      el.classList.add('menu-open')
    }
  }) 
  open.innerHTML = `${plusIcon} ${minusIcon}`
  el.appendChild(open)
}

const _addSubmenu = (path) => {
  const menuLink = document.querySelectorAll(`.super-navbar [href*="${path}"]`)
  if(menuLink){
    const navs = Array.from(menuLink)
  
    navs.forEach(nav => {
    
        const div = document.createElement('DIV')
        div.innerHTML = _submenuHtml(submenus[path])
        div.classList.add('submenu')
        nav.appendChild(div)
        _replaceTag(nav,path)
    })

  }

}

// Newsletter Code

const _newsletter = `
<iframe src="https://alexepstein.substack.com/embed" width="480" height="320" style="border:0px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
`

const _setupNewsletter = () => {
  const div = document.createElement('DIV')
  div.classList.add('newsletter')
  div.innerHTML = _newsletter
  div.addEventListener('click', () => {
    div.classList.remove('show-newsletter')
  })
  document.body.appendChild(div)
  const newsletterclicks = document.querySelectorAll('[href*="https://alexepstein.substack.com"]')

  if(newsletterclicks){
    const links = Array.from(newsletterclicks)
    links.forEach(link => {
      link.removeAttribute("href")
      link.addEventListener('click', () => {
        div.classList.add('show-newsletter')
      })
    })

  }
}

const createSubMenus = () => {
  _addStyles()
  const paths = Object.keys(submenus);
  paths.forEach(path =>_addSubmenu(path))
  _setupNewsletter()
}

window.onload = createSubMenus
