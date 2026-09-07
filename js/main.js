/**
 * Raja Shahi — Himalayan Field Journal
 * Interactive Scripts & Lightbox Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Image Loading Transitions
  initImageTransitions();

  // 2. Intersection Observer for Scroll Reveals
  initScrollReveals();

  // 3. Mobile Menu Toggle
  initMobileMenu();

  // 4. Photo Moments Lightbox
  initLightbox();

  // 5. Story Reader Modal
  initStoryModals();
});

/* ==========================================================================
   1. Image Smooth Loading Transitions
   ========================================================================== */
function initImageTransitions() {
  const images = document.querySelectorAll('.hero-image, .story-card-image, .moment-image, .about-darkroom-img');

  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      // Small staggered delay for initial load elegance
      requestAnimationFrame(() => {
        img.classList.add('is-loaded');
      });
    } else {
      img.addEventListener('load', () => {
        img.classList.add('is-loaded');
      });
      img.addEventListener('error', () => {
        img.classList.add('is-loaded');
      });
    }
  });
}

/* ==========================================================================
   1. Scroll Reveals
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-scroll');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuDrawer = document.getElementById('mobileMenuDrawer');

  if (!menuBtn || !menuDrawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = menuDrawer.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.innerHTML = isOpen
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Close drawer on link click
  menuDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuDrawer.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', false);
      menuBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

/* ==========================================================================
   3. Photo Moments Lightbox
   ========================================================================== */
const photoMoments = [
  {
    src: 'images/waterfall.jpg',
    alt: 'Cascading tiered mountain waterfall under bright sunny blue skies',
    caption: 'Crisp mountain waterfall cascading down rocky cliffs.'
  },
  {
    src: 'images/ride.jpg',
    alt: 'Three riders with motorcycles navigating a rugged mountain trail',
    caption: 'Off-road ride through the rugged mountain canyons.'
  },
  {
    src: 'images/view.jpg',
    alt: 'Night panorama of the illuminated city valley from a high vantage point',
    caption: 'Valley lights glittering like embers under the midnight sky.'
  },
  {
    src: 'images/huhu.jpg',
    alt: 'Motorcycle parked at night overlooking sparkling valley city lights',
    caption: 'Late night ride overlooking the shimmering city horizon.'
  },
  {
    src: 'images/raja.jpg',
    alt: 'Standing atop the summit ridge with arms spread wide into the misty clouds',
    caption: 'Embracing the vast mist and endless mountain breeze.'
  }
];

let currentLightboxIndex = 0;

function initLightbox() {
  const lightboxBackdrop = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const momentItems = document.querySelectorAll('.moment-item');

  if (!lightboxBackdrop || !momentItems.length) return;

  function updateLightbox(index) {
    if (index < 0) index = momentItems.length - 1;
    if (index >= momentItems.length) index = 0;
    currentLightboxIndex = index;

    const currentItem = momentItems[currentLightboxIndex];
    const domImg = currentItem ? currentItem.querySelector('img') : null;
    const item = photoMoments[currentLightboxIndex] || {};

    lightboxImg.src = (domImg && domImg.getAttribute('src')) || item.src;
    lightboxImg.alt = (domImg && domImg.getAttribute('alt')) || item.alt || '';
    lightboxCaption.textContent = item.caption || (domImg ? domImg.getAttribute('alt') : '');
  }

  function openLightbox(index) {
    updateLightbox(index);
    lightboxBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  momentItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentLightboxIndex - 1);
  });
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentLightboxIndex + 1);
  });

  lightboxBackdrop.addEventListener('click', (e) => {
    if (e.target === lightboxBackdrop || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxBackdrop.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
  });
}

/* ==========================================================================
   4. Story Reader Modals
   ========================================================================== */
const storiesData = [
  {
    id: 'manungkot',
    title: 'Above the sea of morning clouds',
    meta: 'Manungkot, Tanahun · 1,080m · Sunrise',
    img: 'images/la.jpg',
    alt: 'Raja Shahi standing above the morning sea of clouds at Manungkot, Tanahun',
    body: `
      <p>Perched high above Damauli in Tanahun, Manungkot offers one of Nepal’s most dramatic dawn views. Long before the sun crosses the horizon, a dense, swirling ocean of white clouds rolls through the Madi and Seti river valleys below.</p>
      <p>Standing on the grassy cliff edge, the cold mountain breeze brushes past as the morning light turns the mist from slate gray into soft gold. You are literally standing above the sky, while the distant snowcaps of Annapurna, Manaslu, and Dhaulagiri wake up on the northern ridge.</p>
      <p>It is a quiet, breathtaking reminder that magic doesn’t always require climbing 5,000 meters—sometimes all it takes is greeting the sunrise above the clouds in the heart of the hills.</p>
    `
  },
  {
    id: 'kathmandu',
    title: 'A constellation of valley lights',
    meta: 'Whitehouse Resort, Kathmandu · 1,850m · Night Ride',
    img: 'images/haha.jpg',
    alt: 'Raja Shahi on his scrambler motorcycle overlooking the night lights of Kathmandu from Whitehouse Resort',
    body: `
      <p>There is a special freedom in taking the bike up through the quiet, winding pine forest road toward Whitehouse Resort as darkness blankets the valley. With every hairpin turn, the noise, smoke, and rush of Kathmandu fade into cool mountain air.</p>
      <p>Killing the engine at the edge of the hill, the only sound left is the quiet tick of cooling engine fins and the gentle night breeze. Below, the entire Kathmandu basin unfolds in a spectacular panorama—a sprawling galaxy of golden embers and glittering city lights stretching to the horizon.</p>
      <p>Sitting on the motorcycle seat looking out over the illuminated bowl of the capital, the city feels peaceful, vast, and full of stories. These quiet midnight ridge rides are where thoughts settle and perspective returns.</p>
    `
  },
  {
    id: 'pokhara',
    title: 'Where the hills touch glass',
    meta: 'Pokhara · 4,300m · Apr',
    img: 'images/don.jpg',
    alt: 'Terraced green fields and a turquoise glacial lake in the valley',
    body: `
      <p>Five oligotrophic glacial lakes cascade down the valley, fed by the massive glaciers. In the calm dawn before the katabatic winds awaken, the emerald and turquoise waters turn to polished mirrors.</p>
      <p>The mountain range towers at the head of the valley, an 8,000-meter wall of ice and rock reflecting upside down across the glass surface.</p>
      <p>A yak's bronze bell rang once across the distance, echoing off the moraine wall, and everything fell back into absolute stillness. This is the heart of the high Himalaya.</p>
    `
  }
];

function initStoryModals() {
  const storyBackdrop = document.getElementById('storyModal');
  const closeBtn = document.getElementById('storyCloseBtn');
  const modalImg = document.getElementById('storyModalImg');
  const modalMeta = document.getElementById('storyModalMeta');
  const modalTitle = document.getElementById('storyModalTitle');
  const modalBody = document.getElementById('storyModalBody');
  const storyCards = document.querySelectorAll('.story-card');

  if (!storyBackdrop || !storyCards.length) return;

  function openStoryModal(storyId) {
    const story = storiesData.find(
      s => s.id.toLowerCase() === (storyId || '').toLowerCase() ||
           (storyId.toLowerCase() === 'gokyo' && s.id.toLowerCase() === 'pokhara') ||
           (storyId.toLowerCase() === 'pokhara' && s.id.toLowerCase() === 'gokyo')
    );
    if (!story) return;

    modalImg.src = story.img;
    modalImg.alt = story.alt;
    modalMeta.textContent = story.meta;
    modalTitle.textContent = story.title;
    modalBody.innerHTML = story.body;

    storyBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeStoryModal() {
    storyBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  storyCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const storyId = card.getAttribute('data-story-id');
      if (storyId) openStoryModal(storyId);
    });
  });

  closeBtn?.addEventListener('click', closeStoryModal);

  storyBackdrop.addEventListener('click', (e) => {
    if (e.target === storyBackdrop) {
      closeStoryModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyBackdrop.classList.contains('is-active')) {
      closeStoryModal();
    }
  });
}
