function changeBg() {
    const colors = ['#1a1a1a', '#2c3e50', '#0f2027', '#200122'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}
