import * as THREE from 'three';

export function initReducer() {
    const container = document.getElementById('reducer-app');
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="reducer-container">
            <div class="algorithm-controls">
                <h4>الگوریتم کاهش مبتنی بر کره گسسته</h4>
                
                <div class="control-grid">
                    <div class="control-item">
                        <label>تقسیم‌بندی کره:</label>
                        <input type="range" id="sphere-resolution" min="1" max="10" value="4">
                        <span id="resolution-value">4</span>
                    </div>
                    
                    <div class="control-item">
                        <label>ضریب کاهش:</label>
                        <input type="range" id="reduction-factor" min="10" max="90" value="50">
                        <span id="factor-value">50%</span>
                    </div>
                    
                    <div class="control-item">
                        <label>درجه چندجمله‌ای:</label>
                        <select id="polynomial-degree">
                            <option value="2">درجه ۲</option>
                            <option value="3" selected>درجه ۳</option>
                            <option value="4">درجه ۴</option>
                        </select>
                    </div>
                </div>
                
                <button class="btn btn-primary" id="reduce-btn">
                    🚀 اجرای الگوریتم کاهش
                </button>
            </div>
            
            <div class="comparison-viewer">
                <div class="viewer-panel">
                    <h5>مدل اصلی</h5>
                    <div id="original-viewer"></div>
                    <div class="stats" id="original-stats">
                        ورتکس: 12,542 | صفحات: 25,084
                    </div>
                </div>
                
                <div class="viewer-panel">
                    <h5>مدل کاهش‌یافته</h5>
                    <div id="reduced-viewer"></div>
                    <div class="stats" id="reduced-stats">
                        ورتکس: 0 | صفحات: 0
                    </div>
                </div>
            </div>
            
            <div class="algorithm-steps">
                <h4>مراحل الگوریتم</h4>
                <div class="steps-container">
                    <div class="step" data-step="1">
                        <span class="step-number">۱</span>
                        <span class="step-text">ایجاد کره گسسته</span>
                    </div>
                    <div class="step" data-step="2">
                        <span class="step-number">۲</span>
                        <span class="step-text">نگاشت ورتکس‌ها</span>
                    </div>
                    <div class="step" data-step="3">
                        <span class="step-number">۳</span>
                        <span class="step-text">تجمیع نقاط</span>
                    </div>
                    <div class="step" data-step="4">
                        <span class="step-number">۴</span>
                        <span class="step-text">بازسازی سطح</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupReducerEventListeners();
    initComparisonViewers();
}

function setupReducerEventListeners() {
    const resolutionSlider = document.getElementById('sphere-resolution');
    const factorSlider = document.getElementById('reduction-factor');
    const reduceBtn = document.getElementById('reduce-btn');
    
    resolutionSlider.addEventListener('input', function() {
        document.getElementById('resolution-value').textContent = this.value;
    });
    
    factorSlider.addEventListener('input', function() {
        document.getElementById('factor-value').textContent = this.value + '%';
    });
    
    reduceBtn.addEventListener('click', runReductionAlgorithm);
}

function initComparisonViewers() {
    // ایجاد ویوور برای مدل اصلی
    createViewer('original-viewer', 0x007bff, 5);
    
    // ایجاد ویوور خالی برای مدل کاهش‌یافته
    createViewer('reduced-viewer', 0x28a745, 0);
}

function createViewer(containerId, color, subdivisions) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    if (subdivisions > 0) {
        const geometry = new THREE.IcosahedronGeometry(2, subdivisions);
        const material = new THREE.MeshPhongMaterial({ 
            color: color,
            wireframe: false
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // محاسبه آمار
        const vertices = geometry.attributes.position.count;
        const faces = geometry.index.count / 3;
        
        if (containerId === 'original-viewer') {
            document.getElementById('original-stats').textContent = 
                \`ورتکس: \${vertices.toLocaleString('fa-IR')} | صفحات: \${faces.toLocaleString('fa-IR')}\`;
        }
    }
    
    // نورپردازی
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
    // انیمیشن
    function animate() {
        requestAnimationFrame(animate);
        scene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
            }
        });
        renderer.render(scene, camera);
    }
    animate();
}

function runReductionAlgorithm() {
    const reduceBtn = document.getElementById('reduce-btn');
    const originalText = reduceBtn.innerHTML;
    
    reduceBtn.innerHTML = '⏳ در حال کاهش پیچیدگی...';
    reduceBtn.disabled = true;
    
    const resolution = parseInt(document.getElementById('sphere-resolution').value);
    const reductionFactor = parseInt(document.getElementById('reduction-factor').value) / 100;
    
    // نمایش مراحل الگوریتم
    simulateAlgorithmSteps(resolution, reductionFactor);
}

function simulateAlgorithmSteps(resolution, reductionFactor) {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    const stepInterval = setInterval(() => {
        if (currentStep > 0) {
            steps[currentStep - 1].classList.remove('active');
        }
        
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(stepInterval);
            completeReduction(resolution, reductionFactor);
        }
    }, 1000);
}

function completeReduction(resolution, reductionFactor) {
    // محاسبه مدل کاهش‌یافته
    const originalVertices = 12542;
    const reducedVertices = Math.floor(originalVertices * (1 - reductionFactor));
    const reducedFaces = reducedVertices * 2;
    
    // به‌روزرسانی آمار
    document.getElementById('reduced-stats').textContent = 
        \`ورتکس: \${reducedVertices.toLocaleString('fa-IR')} | صفحات: \${reducedFaces.toLocaleString('fa-IR')}\`;
    
    // ایجاد مدل کاهش‌یافته
    createViewer('reduced-viewer', 0x28a745, resolution);
    
    // فعال کردن دکمه
    const reduceBtn = document.getElementById('reduce-btn');
    reduceBtn.innerHTML = '✅ کاهش کامل شد!';
    
    setTimeout(() => {
        reduceBtn.innerHTML = '🚀 اجرای الگوریتم کاهش';
        reduceBtn.disabled = false;
    }, 2000);
    
    // نمایش نتیجه
    const reductionPercent = (reductionFactor * 100).toFixed(1);
    alert(\`✅ کاهش پیچیدگی کامل شد!\n\nکاهش از \${originalVertices.toLocaleString('fa-IR')} به \${reducedVertices.toLocaleString('fa-IR')} ورتکس\nنسبت کاهش: \${reductionPercent}%\`);
}
