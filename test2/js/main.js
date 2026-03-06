/**
 * 메인 스크립트 파일
 * 네비게이션, 모바일 메뉴, 스킬 바 애니메이션, PDF 다운로드 등
 */

// ==================== 1. 모바일 메뉴 초기화 ====================
(function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconHamburger = document.getElementById('iconHamburger');
  const iconClose = document.getElementById('iconClose');

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
      // 메뉴 닫기
      mobileMenu.classList.add('hidden');
      iconHamburger.classList.remove('hidden');
      iconClose.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      // 메뉴 열기
      mobileMenu.classList.remove('hidden');
      iconHamburger.classList.add('hidden');
      iconClose.classList.remove('hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // 모바일 메뉴 링크 클릭 시 자동 닫기
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      iconHamburger.classList.remove('hidden');
      iconClose.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ==================== 2. 활성 섹션 자동 감지 ====================
(function initActiveSection() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length === 0 || sections.length === 0) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-80px 0px 0px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    // 가장 상위에 있는 visible 섹션 찾기
    let mostVisibleSection = null;
    let maxVisibility = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
        maxVisibility = entry.intersectionRatio;
        mostVisibleSection = entry.target;
      }
    });

    // 네비게이션 링크 업데이트
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href?.substring(1); // '#' 제거

      if (mostVisibleSection && targetId === mostVisibleSection.id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
})();

// ==================== 3. 네비게이션 스크롤 스타일 ====================
(function initNavScrollStyle() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let rafId = null;

  window.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });
  });
})();

// ==================== 4. 스킬 바 애니메이션 ====================
(function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observerOptions = {
    threshold: 0.3
  };

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    if (hasAnimated) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hasAnimated = true;

        // 모든 스킬 바 애니메이션
        const skillBars = skillsSection.querySelectorAll('.skill-bar-fill');
        let delay = 0;

        skillBars.forEach(bar => {
          setTimeout(() => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
          }, delay);

          delay += 100; // 100ms 간격으로 순차 애니메이션
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(skillsSection);
})();

// ==================== 5. 스킬 탭 네비게이션 ====================
(function initSkillTabs() {
  const skillTabs = document.querySelectorAll('[data-skill-tab]');
  const skillSections = document.querySelectorAll('.skill-section');

  if (skillTabs.length === 0 || skillSections.length === 0) return;

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-skill-tab');

      // 모든 탭과 섹션 비활성화
      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      skillSections.forEach(section => {
        section.classList.remove('active');
      });

      // 선택된 탭과 섹션 활성화
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetSection = document.getElementById(`${targetTab}-content`);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
})();

// ==================== 6. PDF 다운로드 ====================
(function initPdfDownload() {
  const downloadBtn = document.getElementById('downloadBtn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', (e) => {
    // href 속성이 있으면 기본 동작 유지 (다운로드 시도)
    // 파일이 없으면 fetch로 확인 후 인쇄 다이얼로그 표시
    const pdfUrl = downloadBtn.getAttribute('href');

    // 파일 존재 여부 확인 (HEAD 요청)
    fetch(pdfUrl, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error('파일 없음');
        }
      })
      .catch(() => {
        // 파일이 없으면 인쇄 다이얼로그
        e.preventDefault();
        window.print();
      });
  });
})();

// 페이지 로드 완료 메시지
document.addEventListener('DOMContentLoaded', () => {
  console.log('이력서 페이지 로드 완료');
});
