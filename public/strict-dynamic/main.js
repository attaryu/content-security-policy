document.addEventListener('DOMContentLoaded', () => {
  const origin = 'http://localhost:3000/static/strict-dynamic/vendor-';

  const vendor1ScriptElement = document.createElement('script');

  vendor1ScriptElement.src = origin + '1.js';
  document.head.appendChild(vendor1ScriptElement);

  const vendor2ScriptElement = document.createElement('script');
  
  vendor2ScriptElement.src = origin + '2.js';
  document.head.appendChild(vendor2ScriptElement);
})