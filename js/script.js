// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Generic Formspree handler for all forms
document.querySelectorAll('form[action*="formspree"]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Odesílání...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert('Děkujeme! Vaše zpráva byla odeslána.');
        form.reset();
      } else {
        alert('Jejda! Něco se pokazilo. Zkuste to prosím znovu.');
      }
    } catch (error) {
      alert('Jejda! Něco se pokazilo. Zkuste to prosím znovu.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});

// Category filter
const categoryLinks = document.querySelectorAll('.category-link');
const postCards = document.querySelectorAll('.post-card');

categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;

    // Update active state
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Show/hide posts
    postCards.forEach(card => {
      if (filter === 'všechny' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
