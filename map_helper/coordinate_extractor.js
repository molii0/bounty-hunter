document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageInput = document.getElementById('imageInput');
    const coordinatesDiv = document.getElementById('coordinates');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const undoButton = document.getElementById('undoButton');

    canvas.width = 1000;
    canvas.height = 800;

    let cachedImage = null;
    let wallx = [];
    let wally = [];
    let startPoint = null;
    let history = [];

    const SNAP_DISTANCE = 10; // 吸附距离

    function getSnapPoint(x, y) {
        if (!cachedImage) return null;

        // 坐标取整
        x = Math.round(x);
        y = Math.round(y);

        // 检查所有墙壁端点
        const allPoints = [];
        
        // 收集水平墙的起点和终点
        wallx.forEach(wall => {
            allPoints.push({x: wall[0], y: wall[1]});
            allPoints.push({x: wall[0] + wall[2], y: wall[1]});
        });
        
        // 收集垂直墙的起点和终点
        wally.forEach(wall => {
            allPoints.push({x: wall[0], y: wall[1]});
            allPoints.push({x: wall[0], y: wall[1] + wall[2]});
        });
        
        // 检查是否有在吸附距离内的点
        for (const point of allPoints) {
            const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
            if (distance <= SNAP_DISTANCE) {
                return point;
            }
        }
        
        return null;
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 图片现在通过CSS背景显示，无需在此处绘制
        // if (cachedImage) {
        //     ctx.drawImage(cachedImage, imageOffset.x, imageOffset.y);
        // }

        // 绘制墙壁
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        
        // 绘制水平墙
        wallx.forEach(wall => {
            ctx.beginPath();
            ctx.moveTo(wall[0], wall[1]);
            ctx.lineTo(wall[0] + wall[2], wall[1]);
            ctx.stroke();
        });
        
        // 绘制垂直墙
        wally.forEach(wall => {
            ctx.beginPath();
            ctx.moveTo(wall[0], wall[1]);
            ctx.lineTo(wall[0], wall[1] + wall[2]);
            ctx.stroke();
        });
    }

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    cachedImage = img;
// 设置背景图片居中
canvas.style.backgroundImage = `url(${img.src})`;
canvas.style.backgroundSize = 'auto';
canvas.style.backgroundRepeat = 'no-repeat';
canvas.style.backgroundPosition = 'center center';
ctx.clearRect(0, 0, canvas.width, canvas.height);
                    redrawCanvas();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    canvas.addEventListener('click', (e) => {
        if (!cachedImage) return;

        const rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // 检查是否需要吸附
        const snapPoint = getSnapPoint(x, y);
        if (snapPoint) {
            x = snapPoint.x;
            y = snapPoint.y;
        }

        if (!startPoint) {
            startPoint = { x: Math.round(x), y: Math.round(y) };
            history.push({ type: 'startPoint' });
            redrawCanvas();
        } else {
            const endPoint = { x: Math.round(x), y: Math.round(y) };
            const dx = Math.abs(startPoint.x - endPoint.x); // TODO fixme
            const dy = Math.abs(startPoint.y - endPoint.y);

            if (dx > dy) {
                const wall = [
                    Math.min(startPoint.x, endPoint.x),
                    startPoint.y,
                    dx
                ];
                wallx.push(wall);
                history.push({ type: 'wallx' });
            } else {
                const wall = [
                    startPoint.x,
                    Math.min(startPoint.y, endPoint.y),
                    dy
                ];
                wally.push(wall);
                history.push({ type: 'wally' });
            }

            startPoint = null;
            updateCoordinatesList();
            redrawCanvas();
        }
    });

    function updateCoordinatesList() {
        coordinatesDiv.innerHTML = '';
        
        const wallxTitle = document.createElement('h3');
        wallxTitle.textContent = '水平墙 (wallx):';
        coordinatesDiv.appendChild(wallxTitle);
        
        wallx.forEach(wall => {
            const wallElement = document.createElement('div');
            wallElement.textContent = `[${wall[0]}, ${wall[1]}, ${wall[2]}]`;
            coordinatesDiv.appendChild(wallElement);
        });
        
        const wallyTitle = document.createElement('h3');
        wallyTitle.textContent = '垂直墙 (wally):';
        coordinatesDiv.appendChild(wallyTitle);
        
        wally.forEach(wall => {
            const wallElement = document.createElement('div');
            wallElement.textContent = `[${wall[0]}, ${wall[1]}, ${wall[2]}]`;
            coordinatesDiv.appendChild(wallElement);
        });
    }

    copyButton.addEventListener('click', () => {
        const wallxString = `const wallx = ${JSON.stringify(wallx)};`;
        const wallyString = `const wally = ${JSON.stringify(wally)};`;
        const combinedString = `${wallxString}\n\n${wallyString}`;
        navigator.clipboard.writeText(combinedString).then(() => {
            alert('墙壁坐标已复制到剪贴板！');
        }).catch(err => {
            console.error('无法复制坐标: ', err);
        });
    });

    clearButton.addEventListener('click', () => {
        wallx = [];
        wally = [];
        startPoint = null;
        history = [];
        updateCoordinatesList();
        redrawCanvas();
    });

    undoButton.addEventListener('click', () => {
        const lastAction = history.pop();
        if (!lastAction) return;

        if (lastAction.type === 'startPoint') {
            startPoint = null;
        } else if (lastAction.type === 'wallx') {
            wallx.pop();
        } else if (lastAction.type === 'wally') {
            wally.pop();
        }

        updateCoordinatesList();
        redrawCanvas();
    });
});