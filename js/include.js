function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(el => {
      const file = el.getAttribute('data-include');
      fetch(file)
        .then(res => res.text())
        .then(data => el.innerHTML = data)
        .catch(err => console.error('Error including file:', err));
    });
  }
  
  document.addEventListener('DOMContentLoaded', includeHTML);