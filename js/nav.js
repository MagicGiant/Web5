
  const activePage = sessionStorage.getItem('activePage');

  if (activePage) {
    setActivePage(activePage);
  }

  function changePage(page) {
    const links = document.querySelectorAll('.header__nav-item');
    links.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`.header__nav-item[href="${page}"]`);
    activeLink.classList.add('active');

    sessionStorage.setItem('activePage', page);
  }

  function setActivePage(page) {
    const activeLink = document.querySelector(`.header__nav-item[href="${page}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }