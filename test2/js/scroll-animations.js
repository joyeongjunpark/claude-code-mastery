/**
 * 스크롤 애니메이션
 * Intersection Observer를 활용한 페이드인 및 슬라이드업 효과
 */

// Intersection Observer 설정
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in', 'opacity-100');
      entry.target.classList.remove('opacity-0');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 애니메이션할 요소들 선택 및 관찰 시작
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .experience-item, section').forEach(element => {
    element.classList.add('opacity-0');
    observer.observe(element);
  });
});
