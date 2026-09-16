window.loadSidebar = function(activeId) {
  fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
      // Mengganti div placeholder dengan isi sidebar secara utuh
      document.getElementById('sidebar-container').outerHTML = data;
      
      // Menambahkan class active sesuai ID yang dilempar dari HTML utama
      const activeBtn = document.getElementById(activeId);
      if (activeBtn) {
        activeBtn.classList.add('active');
      }
    })
    .catch(error => console.error('Error loading sidebar:', error));
};