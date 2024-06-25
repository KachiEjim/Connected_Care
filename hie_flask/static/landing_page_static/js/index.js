document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33', '#FF8C33', '#8CFF33', '#338CFF',
        '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
        '#6633FF', '#33FF66', '#FF9933', '#9933FF', '#33FF99', '#FF33CC', '#CC33FF', '#33FFCC', '#FFCC33', '#CCFF33',
        '#FF33ff', '#33FFff', '#3333ff', '#FF33ff', '#33FFff', '#FFFF33', '#FF6633', '#66FF33'
    ];
    let colorIndex = 0;

    function changeBackgroundColor() {
        const element = document.getElementById('navigateText');
        const currentColor = colors[colorIndex];
        element.style.backgroundColor = currentColor;

        // Change text color based on background brightness
        const brightness = getBrightness(currentColor);
        element.style.color = brightness > 128 ? 'black' : 'white';

        colorIndex = (colorIndex + 1) % colors.length;
    }

    function getBrightness(hexColor) {
        const rgb = hexToRgb(hexColor);
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // Change color every 5 seconds
    setInterval(changeBackgroundColor, 1000);

    // Initial color change
    changeBackgroundColor();

    const navigateText = document.getElementById('navigateText');
    let originalBackgroundColor = navigateText.style.backgroundColor;

    navigateText.addEventListener('mouseover', function() {
        originalBackgroundColor = navigateText.style.backgroundColor;
        navigateText.style.backgroundColor = 'red';
    });

    navigateText.addEventListener('mouseout', function() {
        navigateText.style.backgroundColor = originalBackgroundColor;
    });

    navigateText.addEventListener('touchstart', function() {
        originalBackgroundColor = navigateText.style.backgroundColor;
        navigateText.style.backgroundColor = 'red';
    });

    navigateText.addEventListener('touchend', function() {
        navigateText.style.backgroundColor = originalBackgroundColor;
    });
});