/**
 * 다크모드 테마 전환
 * 사용자의 테마 선택을 LocalStorage에 저장하고 시스템 설정을 감지
 */

/**
 * 현재 테마 가져오기
 * 우선순위: localStorage > 시스템 다크모드 설정 > 기본값(light)
 * @returns {string} 'light' 또는 'dark'
 */
const getTheme = () => {
  // 1순위: localStorage에 저장된 값
  const saved = localStorage.getItem('theme');
  if (saved) {
    return saved;
  }

  // 2순위: 시스템 다크모드 설정
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

/**
 * 테마 설정
 * @param {string} theme - 'light' 또는 'dark'
 */
const setTheme = (theme) => {
  // localStorage에 저장
  localStorage.setItem('theme', theme);

  // HTML 요소 클래스 업데이트
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // 테마 토글 버튼 업데이트
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggle.setAttribute(
      'aria-label',
      isDark ? '라이트 모드로 전환' : '다크 모드로 전환'
    );
  }

  // meta theme-color 업데이트
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#1f2937' : '#3B82F6');
  }
};

/**
 * 테마 토글
 */
const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

/**
 * DOMContentLoaded 이벤트 핸들러
 */
document.addEventListener('DOMContentLoaded', () => {
  // 초기 테마 적용
  const initialTheme = getTheme();
  setTheme(initialTheme);

  // 테마 토글 버튼 클릭 이벤트
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // 시스템 다크모드 설정 변경 감지 (사용자 설정이 없을 때)
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    const saved = localStorage.getItem('theme');
    // 사용자가 명시적으로 테마를 설정하지 않은 경우에만
    if (!saved) {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    }
  });
});
