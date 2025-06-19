// JS ccho file mp3
// JS: Chỉ cho phép phát một file âm thanh tại một thời điểm
const allAudios = document.querySelectorAll('.single-audio');

allAudios.forEach(audio => {
  audio.addEventListener('play', () => {
    allAudios.forEach(other => {
      if (other !== audio) {
        other.pause();          // Dừng âm thanh khác
        other.currentTime = 0;  // Reset về đầu (có thể bỏ nếu không muốn)
      }
    });
  });
});

// JS cho bản dịch
    function toggleTranslation(id) {
    const translation = document.getElementById(id);
    translation.classList.toggle('hidden');
  }