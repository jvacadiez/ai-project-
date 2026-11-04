const progressBar = document.querySelector('.reading-progress span');
const sections = [...document.querySelectorAll('main section[id]')];
const navigationLinks = [...document.querySelectorAll('nav a')];

function updateReadingProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.width = `${Math.min(progress * 100, 100)}%`;
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navigationLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visibleSection.target.id}`;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  },
  { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.4] }
);

sections.forEach((section) => sectionObserver.observe(section));
window.addEventListener('scroll', updateReadingProgress, { passive: true });
updateReadingProgress();
