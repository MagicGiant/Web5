function getLoadTime() {
    const loadTime = performance.now();
    return `Время загрузки: ${loadTime} миллисекунд`;
}

function displayLoadTime() {
    console.log(getLoadTime());
}

window.addEventListener('load', displayLoadTime);