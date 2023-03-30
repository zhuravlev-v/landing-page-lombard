// import getDocumentScrollHeight from "../functions/get-document-scrollHeight";
import vars from '../_vars'

window.addEventListener('scroll', function() {
  const header = vars.header
  const headerHeight = header.clientHeight
  const body = vars.bodyEl
  const bodyScroll = body.getBoundingClientRect().y
  
  if (bodyScroll < headerHeight / 2 * -1) {
    header.classList.add('fixed')
    body.style.paddingTop = '80px'
  }
  else {
    header.classList.remove('fixed')
    body.style.paddingTop = '0px'
  }
});