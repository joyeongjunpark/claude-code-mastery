/**
 * 모달 관리 스크립트
 * 포트폴리오 프로젝트 카드 클릭 시 모달 열기/닫기
 */

let currentModal = null;
let previousFocusElement = null;

/**
 * 모달 열기
 * @param {string} modalId - 모달 요소의 ID
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  currentModal = modal;
  previousFocusElement = document.activeElement;

  // 모달 표시
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // 스크롤 방지
  document.body.classList.add('overflow-hidden');

  // main, nav에 aria-hidden 속성 추가
  const main = document.querySelector('main');
  const nav = document.querySelector('nav');
  if (main) main.setAttribute('aria-hidden', 'true');
  if (nav) nav.setAttribute('aria-hidden', 'true');

  // CSS transition 트리거를 위해 다음 프레임에서 modal-visible 추가
  requestAnimationFrame(() => {
    modal.classList.add('modal-visible');
  });

  // 첫 포커스 가능 요소로 이동
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

/**
 * 모달 닫기
 */
function closeModal() {
  if (!currentModal) return;

  // CSS transition 시작
  currentModal.classList.remove('modal-visible');

  // transition 완료 후 hidden 추가
  setTimeout(() => {
    currentModal.classList.add('hidden');
    currentModal.classList.remove('flex');

    // 스크롤 복구
    document.body.classList.remove('overflow-hidden');

    // aria-hidden 제거
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    if (main) main.removeAttribute('aria-hidden');
    if (nav) nav.removeAttribute('aria-hidden');

    // 이전 포커스 복원
    if (previousFocusElement && previousFocusElement.focus) {
      previousFocusElement.focus();
    }

    currentModal = null;
    previousFocusElement = null;
  }, 300);
}

/**
 * 모달 내에서 Tab 키 순환
 * @param {KeyboardEvent} event
 */
function trapFocus(event) {
  if (!currentModal) return;

  const focusableElements = currentModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  // Shift + Tab: 첫 요소에서 마지막 요소로
  if (event.shiftKey) {
    if (activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  }
  // Tab: 마지막 요소에서 첫 요소로
  else {
    if (activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

/**
 * DOMContentLoaded 이벤트 핸들러
 */
document.addEventListener('DOMContentLoaded', () => {
  // 포트폴리오 카드 클릭 이벤트
  document.querySelectorAll('[data-modal-target]').forEach(card => {
    const handleCardClick = () => {
      const modalId = card.getAttribute('data-modal-target');
      openModal(modalId);
    };

    card.addEventListener('click', handleCardClick);

    // 키보드 접근성: Enter 키와 Space 키
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    });
  });

  // 모달 닫기 버튼 클릭
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // 모달 배경 클릭 (배경 자신일 때만)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModal) {
      closeModal();
    }
  });

  // Tab 키 순환
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && currentModal) {
      trapFocus(e);
    }
  });
});
