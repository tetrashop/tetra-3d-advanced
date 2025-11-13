import * as THREE from 'three';

export function initConverter() {
    const container = document.getElementById('converter-app');
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="converter-container">
            <div class="upload-section">
                <div class="upload-box" id="upload-box">
                    <input type="file" id="image-upload" accept="image/*" hidden>
                    <div class="upload-content">
                        <i class="upload-icon">📁</i>
                        <h4>تصویر 2D خود را آپلود کنید</h4>
                        <p>فرمت‌های پشتیبانی شده: JPG, PNG, WebP</p>
                        <button class="btn btn-primary" onclick="document.getElementById('image-upload').click()">
                            انتخاب فایل
                        </button>
                    </div>
                </div>
                
                <div class="controls">
                    <div class="control-group">
                        <label>کیفیت خروجی:</label>
                        <select id="quality-select">
                            <option value="low">پایین (سریع)</option>
                            <option value="medium" selected>متوسط</option>
                            <option value="high">بالا (دقیق)</option>
                        </select>
                    </div>
                    
                    <button class="btn btn-secondary" id="convert-btn">
                        🔄 تبدیل به 3D
                    </button>
                </div>
            </div>
            
            <div class="result-section">
                <div class="viewer-container">
                    <div id="converter-viewer"></div>
                    <div class="viewer-stats" id="viewer-stats">
                        <div>ورتکس‌ها: <span id="vertex-count">0</span></div>
                        <div>صفحات: <span id="face-count">0</span></div>
                        <div>زمان پردازش: <span id="process-time">0</span> ثانیه</div>
                    </div>
                </div>
                
                <div class="download-options" id="download-options" style="display: none;">
                    <h4>دانلود مدل</h4>
                    <div class="download-buttons">
                        <button class="btn btn-primary" onclick="downloadModel('glb')">GLB</button>
                        <button class="btn btn-primary" onclick="downloadModel('obj')">OBJ</button>
                        <button class="btn btn-primary" onclick="downloadModel('stl')">STL</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupConverterEventListeners();
}

function setupConverterEventListeners() {
    const fileInput = document.getElementById('image-upload');
    const convertBtn = document.getElementById('convert-btn');
    
    fileInput.addEventListener('change', handleImageUpload);
    convertBtn.addEventListener('click', startConversion);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const uploadBox = document.getElementById('upload-box');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        uploadBox.innerHTML = `
            <div class="upload-preview">
                <img src="${e.target.result}" alt="Preview">
                <p>${file.name}</p>
                <button class="btn btn-secondary" onclick="resetUpload()">تغییر تصویر</button>
            </div>
        `;
    };
    
    reader.readAsDataURL(file);
}

function startConversion() {
    const fileInput = document.getElementById('image-upload');
    if (!fileInput.files[0]) {
        alert('لطفاً ابتدا یک تصویر انتخاب کنید');
        return;
    }
    
    const quality = document.getElementById('quality-select').value;
    simulateConversion(quality);
}

function simulateConversion(quality) {
    const convertBtn = document.getElementById('convert-btn');
    const originalText = convertBtn.innerHTML;
    
    convertBtn.innerHTML = '⏳ در حال پردازش...';
    convertBtn.disabled = true;
    
    // شبیه‌سازی پردازش
    setTimeout(() => {
        const vertices = quality === 'low' ? 1500 : quality === 'medium' ? 5000 : 15000;
        const faces = vertices * 2;
        
        displayConversionResult(vertices, faces);
        convertBtn.innerHTML = originalText;
        convertBtn.disabled = false;
    }, 3000);
}

function displayConversionResult(vertices, faces) {
    document.getElementById('vertex-count').textContent = vertices.toLocaleString('fa-IR');
    document.getElementById('face-count').textContent = faces.toLocaleString('fa-IR');
    document.getElementById('process-time').textContent = '3.2';
    
    document.getElementById('download-options').style.display = 'block';
    
    // ایجاد مدل نمونه در ویوور
    initConverterViewer();
}

function initConverterViewer() {
    const container = document.getElementById('converter-viewer');
    container.innerHTML = '';
    
    // پیاده‌سازی Three.js Viewer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // ایجاد مدل نمونه
    const geometry = new THREE.IcosahedronGeometry(2, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x007bff,
        wireframe: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
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
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// توابع global برای event handlers
window.resetUpload = function() {
    document.getElementById('upload-box').innerHTML = `
        <div class="upload-content">
            <i class="upload-icon">📁</i>
            <h4>تصویر 2D خود را آپلود کنید</h4>
            <p>فرمت‌های پشتیبانی شده: JPG, PNG, WebP</p>
            <button class="btn btn-primary" onclick="document.getElementById('image-upload').click()">
                انتخاب فایل
            </button>
        </div>
    `;
    document.getElementById('image-upload').value = '';
};

window.downloadModel = function(format) {
    alert(\`مدل با فرمت \${format.toUpperCase()} آماده دانلود است (شبیه‌سازی)\`);
};
