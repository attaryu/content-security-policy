document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1');

  h1.textContent = 'The original content changed by server\'s script';

  console.log('running!');
})
