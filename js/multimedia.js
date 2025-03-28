// 创建骨骼肌结构与功能的3D模型展示
function create3DMuscleFiberModel() {
    const container = document.getElementById('3d-muscle-model');
    if (!container) return;
    
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // 创建肌纤维模型
    const sarcomereGroup = new THREE.Group();
    
    // 创建Z线
    const zLineGeometry = new THREE.BoxGeometry(0.05, 2, 0.05);
    const zLineMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const zLine1 = new THREE.Mesh(zLineGeometry, zLineMaterial);
    zLine1.position.x = -2;
    sarcomereGroup.add(zLine1);
    
    const zLine2 = new THREE.Mesh(zLineGeometry, zLineMaterial);
    zLine2.position.x = 0;
    sarcomereGroup.add(zLine2);
    
    const zLine3 = new THREE.Mesh(zLineGeometry, zLineMaterial);
    zLine3.position.x = 2;
    sarcomereGroup.add(zLine3);
    
    // 创建肌动蛋白丝
    const actinGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8);
    const actinMaterial = new THREE.MeshPhongMaterial({ color: 0xff4444 });
    
    // 左侧肌动蛋白丝
    for (let i = 0; i < 8; i++) {
        const actin = new THREE.Mesh(actinGeometry, actinMaterial);
        actin.rotation.z = Math.PI / 2;
        actin.position.x = -1;
        actin.position.y = -0.8 + i * 0.25;
        sarcomereGroup.add(actin);
    }
    
    // 右侧肌动蛋白丝
    for (let i = 0; i < 8; i++) {
        const actin = new THREE.Mesh(actinGeometry, actinMaterial);
        actin.rotation.z = Math.PI / 2;
        actin.position.x = 1;
        actin.position.y = -0.8 + i * 0.25;
        sarcomereGroup.add(actin);
    }
    
    // 创建肌球蛋白丝
    const myosinGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const myosinMaterial = new THREE.MeshPhongMaterial({ color: 0x4444ff });
    
    for (let i = 0; i < 6; i++) {
        const myosin = new THREE.Mesh(myosinGeometry, myosinMaterial);
        myosin.rotation.z = Math.PI / 2;
        myosin.position.y = -0.6 + i * 0.25;
        sarcomereGroup.add(myosin);
    }
    
    // 创建肌球蛋白头部
    const headGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    
    for (let i = 0; i < 6; i++) {
        // 左侧头部
        const leftHead = new THREE.Mesh(headGeometry, headMaterial);
        leftHead.position.x = -0.7;
        leftHead.position.y = -0.6 + i * 0.25;
        sarcomereGroup.add(leftHead);
        
        // 右侧头部
        const rightHead = new THREE.Mesh(headGeometry, headMaterial);
        rightHead.position.x = 0.7;
        rightHead.position.y = -0.6 + i * 0.25;
        sarcomereGroup.add(rightHead);
    }
    
    scene.add(sarcomereGroup);
    
    // 添加控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    
    // 添加动画
    let animationState = 'relaxed'; // 'relaxed', 'contracting', 'contracted'
    let animationProgress = 0;
    
    // 动画控制按钮
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-3 d-flex justify-content-center';
    
    const relaxedButton = document.createElement('button');
    relaxedButton.className = 'btn btn-outline-primary me-2';
    relaxedButton.textContent = '放松状态';
    relaxedButton.onclick = () => { animationState = 'relaxed'; };
    
    const contractingButton = document.createElement('button');
    contractingButton.className = 'btn btn-outline-primary me-2';
    contractingButton.textContent = '收缩过程';
    contractingButton.onclick = () => { 
        if (animationState !== 'contracting') {
            animationState = 'contracting';
            animationProgress = 0;
        }
    };
    
    const contractedButton = document.createElement('button');
    contractedButton.className = 'btn btn-outline-primary';
    contractedButton.textContent = '收缩状态';
    contractedButton.onclick = () => { animationState = 'contracted'; };
    
    buttonContainer.appendChild(relaxedButton);
    buttonContainer.appendChild(contractingButton);
    buttonContainer.appendChild(contractedButton);
    container.appendChild(buttonContainer);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 更新控制器
        controls.update();
        
        // 根据动画状态更新模型
        if (animationState === 'relaxed') {
            zLine1.position.x = -2;
            zLine3.position.x = 2;
        } else if (animationState === 'contracting') {
            animationProgress += 0.01;
            if (animationProgress >= 1) {
                animationState = 'contracted';
                animationProgress = 1;
            }
            
            zLine1.position.x = -2 + animationProgress * 0.5;
            zLine3.position.x = 2 - animationProgress * 0.5;
        } else if (animationState === 'contracted') {
            zLine1.position.x = -1.5;
            zLine3.position.x = 1.5;
        }
        
        // 渲染场景
        renderer.render(scene, camera);
    }
    
    // 处理窗口大小变化
    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    window.addEventListener('resize', onWindowResize, false);
    
    // 开始动画
    animate();
}

// 创建肌肉收缩过程动画
function createMuscleContractionAnimation() {
    const container = document.getElementById('muscle-contraction-animation');
    if (!container) return;
    
    // 创建动画容器
    const animationContainer = document.createElement('div');
    animationContainer.className = 'position-relative';
    animationContainer.style.height = '400px';
    container.appendChild(animationContainer);
    
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = 400;
    animationContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 动画参数
    let frame = 0;
    const totalFrames = 120;
    let animationState = 'paused'; // 'playing', 'paused'
    
    // 绘制肌节
    function drawSarcomere(contraction) {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 设置背景
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 计算Z线位置
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const baseWidth = canvas.width * 0.7;
        const currentWidth = baseWidth * (1 - contraction * 0.3);
        
        const z1X = centerX - currentWidth / 2;
        const z2X = centerX + currentWidth / 2;
        
        // 绘制Z线
        ctx.fillStyle = '#000';
        ctx.fillRect(z1X - 2, centerY - 100, 4, 200);
        ctx.fillRect(z2X - 2, centerY - 100, 4, 200);
        
        // 绘制肌动蛋白丝
        ctx.strokeStyle = '#dc3545';
        ctx.lineWidth = 3;
        
        // 左侧肌动蛋白丝
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(z1X, centerY - 80 + i * 40);
            ctx.lineTo(centerX - 20, centerY - 80 + i * 40);
            ctx.stroke();
        }
        
        // 右侧肌动蛋白丝
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(z2X, centerY - 80 + i * 40);
            ctx.lineTo(centerX + 20, centerY - 80 + i * 40);
            ctx.stroke();
        }
        
        // 绘制肌球蛋白丝
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 5;
        
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX - 100, centerY - 60 + i * 40);
            ctx.lineTo(centerX + 100, centerY - 60 + i * 40);
            ctx.stroke();
        }
        
        // 绘制肌球蛋白头部
        ctx.fillStyle = '#007bff';
        
        // 计算头部位置 - 随着收缩移动
        const headOffset = contraction * 40;
        
        // 左侧肌球蛋白头部
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                const baseX = centerX - 80 + j * 30;
                const currentX = baseX + headOffset;
                
                ctx.beginPath();
                ctx.arc(currentX, centerY - 60 + i * 40, 8, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        
        // 右侧肌球蛋白头部
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                const baseX = centerX + 80 - j * 30;
                const currentX = baseX - headOffset;
                
                ctx.beginPath();
                ctx.arc(currentX, centerY - 60 + i * 40, 8, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        
        // 添加标签
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('Z线', z1X - 20, centerY - 110);
        ctx.fillText('Z线', z2X + 5, centerY - 110);
        ctx.fillText('肌动蛋白丝', centerX - 150, centerY - 80);
        ctx.fillText('肌球蛋白丝', centerX - 150, centerY - 40);
        
        // 添加收缩百分比
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#dc3545';
        ctx.fillText(`收缩: ${Math.round(contraction * 100)}%`, centerX - 70, 50);
    }
    
    // 动画循环
    function animate() {
        if (animationState === 'playing') {
            frame = (frame + 1) % totalFrames;
            
            // 计算收缩程度 - 使用正弦函数使动画平滑
            const contraction = Math.sin(frame / totalFrames * Math.PI) ** 2;
            
            // 绘制当前帧
            drawSarcomere(contraction);
        }
        
        requestAnimationFrame(animate);
    }
    
    // 初始绘制
    drawSarcomere(0);
    
    // 创建控制按钮
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'mt-3 d-flex justify-content-center';
    container.appendChild(controlsContainer);
    
    const playButton = document.createElement('button');
    playButton.className = 'btn btn-primary me-2';
    playButton.innerHTML = '<i class="fas fa-play"></i> 播放';
    playButton.onclick = () => {
        animationState = 'playing';
        playButton.disabled = true;
        pauseButton.disabled = false;
    };
    
    const pauseButton = document.createElement('button');
    pauseButton.className = 'btn btn-secondary me-2';
    pauseButton.innerHTML = '<i class="fas fa-pause"></i> 暂停';
    pauseButton.disabled = true;
    pauseButton.onclick = () => {
        animationState = 'paused';
        playButton.disabled = false;
        pauseButton.disabled = true;
    };
    
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn-outline-primary';
    resetButton.innerHTML = '<i class="fas fa-redo"></i> 重置';
    resetButton.onclick = () => {
        frame = 0;
        animationState = 'paused';
        drawSarcomere(0);
        playButton.disabled = false;
        pauseButton.disabled = true;
    };
    
    controlsContainer.appendChild(playButton);
    controlsContainer.appendChild(pauseButton);
    controlsContainer.appendChild(resetButton);
    
    // 添加说明文本
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'mt-3';
    descriptionContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">肌肉收缩动画说明</h5>
                <p class="card-text">
                    此动画展示了肌节在收缩过程中的变化。随着肌球蛋白头部拉动肌动蛋白丝，
                    Z线相互靠近，肌节长度减小，产生收缩力。这个过程需要ATP提供能量，
                    并由钙离子触发和调节。
                </p>
            </div>
        </div>
    `;
    container.appendChild(descriptionContainer);
    
    // 开始动画循环
    animate();
    
    // 处理窗口大小变化
    function onWindowResize() {
        canvas.width = container.clientWidth;
        drawSarcomere(Math.sin(frame / totalFrames * Math.PI) ** 2);
    }
    
    window.addEventListener('resize', onWindowResize, false);
}

// 创建肌纤维类型比较图表
function createFiberTypeComparisonChart() {
    const container = document.getElementById('fiber-type-chart-container');
    if (!container) return;
    
    // 创建图表容器
    const chartContainer = document.createElement('div');
    chartContainer.style.height = '400px';
    container.appendChild(chartContainer);
    
    // 创建图表
    const chart = Highcharts.chart(chartContainer, {
        chart: {
            type: 'column'
        },
        title: {
            text: '肌纤维类型特性比较'
        },
        xAxis: {
            categories: ['I型纤维 (慢肌)', 'IIa型纤维 (中间)', 'IIx型纤维 (快肌)'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '相对值 (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '收缩速度',
            data: [30, 70, 100]
        }, {
            name: '疲劳抵抗能力',
            data: [100, 65, 30]
        }, {
            name: '力量产生能力',
            data: [40, 75, 100]
        }, {
            name: '有氧能力',
            data: [90, 60, 20]
        }, {
            name: '线粒体含量',
            data: [100, 60, 30]
        }]
    });
    
    // 添加说明文本
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'mt-3';
    descriptionContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">肌纤维类型比较图表说明</h5>
                <p class="card-text">
                    此图表比较了三种主要肌纤维类型的关键特性。I型纤维(慢肌)具有较高的疲劳抵抗能力和有氧能力，
                    但收缩速度和力量产生能力较低。IIx型纤维(快肌)具有最高的收缩速度和力量产生能力，
                    但疲劳抵抗能力和有氧能力较低。IIa型纤维(中间)则兼具两者的特性。
                </p>
                <p class="card-text">
                    不同类型的运动员肌纤维类型分布存在差异：耐力运动员(如马拉松选手)通常拥有较高比例的I型纤维，
                    而力量和速度运动员(如短跑选手)则拥有较高比例的II型纤维。
                </p>
            </div>
        </div>
    `;
    container.appendChild(descriptionContainer);
}

// 创建肌肉疲劳模拟图表
function createMuscleFatigueSimulationChart() {
    const container = document.getElementById('muscle-fatigue-chart-container');
    if (!container) return;
    
    // 创建控制面板
    const controlPanel = document.createElement('div');
    controlPanel.className = 'card mb-3';
    controlPanel.innerHTML = `
        <div class="card-header">
            <h5 class="mb-0">肌肉疲劳模拟控制面板</h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="exercise-type" class="form-label">运动类型:</label>
                        <select class="form-select" id="exercise-type">
                            <option value="high">高强度短时间运动 (如短跑、举重)</option>
                            <option value="medium">中等强度持续运动 (如中长跑)</option>
                            <option value="low">低强度长时间运动 (如马拉松)</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="exercise-intensity" class="form-label">运动强度: <span id="intensity-value">50%</span></label>
                        <input type="range" class="form-range" id="exercise-intensity" min="10" max="100" value="50">
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" id="simulate-button">开始模拟</button>
        </div>
    `;
    container.appendChild(controlPanel);
    
    // 创建图表容器
    const chartContainer = document.createElement('div');
    chartContainer.style.height = '400px';
    container.appendChild(chartContainer);
    
    // 初始化图表
    const chart = Highcharts.chart(chartContainer, {
        chart: {
            type: 'line'
        },
        title: {
            text: '肌肉疲劳模拟'
        },
        xAxis: {
            categories: Array.from({length: 20}, (_, i) => i * 5 + 's'),
            title: {
                text: '时间 (秒)'
            }
        },
        yAxis: {
            title: {
                text: '相对值 (%)'
            },
            min: 0,
            max: 100
        },
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            name: '肌肉力量',
            data: Array(20).fill(100)
        }, {
            name: 'ATP水平',
            data: Array(20).fill(100)
        }, {
            name: '糖原水平',
            data: Array(20).fill(100)
        }, {
            name: '乳酸积累',
            data: Array(20).fill(0)
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
    
    // 添加分析容器
    const analysisContainer = document.createElement('div');
    analysisContainer.className = 'card mt-3';
    analysisContainer.innerHTML = `
        <div class="card-header">
            <h5 class="mb-0">疲劳分析</h5>
        </div>
        <div class="card-body" id="fatigue-analysis">
            <p>选择运动类型和强度，然后点击"开始模拟"按钮查看疲劳分析。</p>
        </div>
    `;
    container.appendChild(analysisContainer);
    
    // 获取DOM元素
    const exerciseType = document.getElementById('exercise-type');
    const exerciseIntensity = document.getElementById('exercise-intensity');
    const intensityValue = document.getElementById('intensity-value');
    const simulateButton = document.getElementById('simulate-button');
    const fatigueAnalysis = document.getElementById('fatigue-analysis');
    
    // 更新强度值显示
    exerciseIntensity.addEventListener('input', function() {
        intensityValue.textContent = this.value + '%';
    });
    
    // 模拟数据生成函数
    function generateSimulationData(type, intensity) {
        const intensityFactor = intensity / 100;
        const timePoints = Array.from({length: 20}, (_, i) => i * 5); // 0到95秒
        let forceData, atpData, glycogenData, lactateData;
        
        switch(type) {
            case 'high':
                // 高强度短时间运动
                forceData = timePoints.map(t => 100 - (t > 30 ? (t - 30) * 2.5 * intensityFactor : 0));
                atpData = timePoints.map(t => 100 - (t * 3 * intensityFactor));
                glycogenData = timePoints.map(t => 100 - (t * 1.5 * intensityFactor));
                lactateData = timePoints.map(t => Math.min(100, t * 2 * intensityFactor));
                break;
            case 'medium':
                // 中等强度持续运动
                forceData = timePoints.map(t => 100 - (t > 45 ? (t - 45) * 1.5 * intensityFactor : 0));
                atpData = timePoints.map(t => 100 - (t * 1.5 * intensityFactor));
                glycogenData = timePoints.map(t => 100 - (t * 2 * intensityFactor));
                lactateData = timePoints.map(t => Math.min(100, t * 1.2 * intensityFactor));
                break;
            case 'low':
                // 低强度长时间运动
                forceData = timePoints.map(t => 100 - (t > 60 ? (t - 60) * 0.8 * intensityFactor : 0));
                atpData = timePoints.map(t => 100 - (t * 0.8 * intensityFactor));
                glycogenData = timePoints.map(t => 100 - (t * 2.5 * intensityFactor));
                lactateData = timePoints.map(t => Math.min(100, t * 0.5 * intensityFactor));
                break;
        }
        
        // 确保数据在有效范围内
        forceData = forceData.map(v => Math.max(0, v));
        atpData = atpData.map(v => Math.max(0, v));
        glycogenData = glycogenData.map(v => Math.max(0, v));
        
        return {
            forceData,
            atpData,
            glycogenData,
            lactateData
        };
    }
    
    // 生成疲劳分析
    function generateFatigueAnalysis(type, intensity) {
        let analysis = '';
        const intensityFactor = intensity / 100;
        
        switch(type) {
            case 'high':
                analysis = `
                    <h5>高强度短时间运动疲劳分析</h5>
                    <p>在${intensity}%强度的高强度运动中，主要疲劳机制为：</p>
                    <ul>
                        <li><strong>ATP和肌酸磷酸快速耗竭</strong>：这是限制因素，导致力量在约30秒后迅速下降</li>
                        <li><strong>磷酸盐积累</strong>：抑制横桥循环，降低肌肉产生力量的能力</li>
                        <li><strong>乳酸和氢离子积累</strong>：导致肌肉酸化，影响酶活性和钙离子处理</li>
                    </ul>
                    <p>这种类型的疲劳主要发生在肌纤维水平，恢复时间相对较短（通常为几分钟到几十分钟）。</p>
                `;
                break;
            case 'medium':
                analysis = `
                    <h5>中等强度持续运动疲劳分析</h5>
                    <p>在${intensity}%强度的中等强度运动中，主要疲劳机制为：</p>
                    <ul>
                        <li><strong>糖原耗竭</strong>：成为主要限制因素，特别是在II型纤维中</li>
                        <li><strong>中等程度的乳酸积累</strong>：导致部分肌肉酸化</li>
                        <li><strong>钙离子处理障碍</strong>：影响兴奋-收缩耦联效率</li>
                    </ul>
                    <p>这种类型的疲劳涉及肌纤维和中枢神经系统，恢复时间中等（通常为几小时）。</p>
                `;
                break;
            case 'low':
                analysis = `
                    <h5>低强度长时间运动疲劳分析</h5>
                    <p>在${intensity}%强度的低强度长时间运动中，主要疲劳机制为：</p>
                    <ul>
                        <li><strong>中枢神经系统疲劳</strong>：大脑激活肌肉的能力下降</li>
                        <li><strong>糖原严重耗竭</strong>：特别是在I型纤维中</li>
                        <li><strong>肌纤维微损伤</strong>：导致肌肉功能下降</li>
                        <li><strong>体温调节问题</strong>：长时间运动可能导致体温升高</li>
                    </ul>
                    <p>这种类型的疲劳主要涉及中枢神经系统和多种代谢因素，恢复时间较长（通常为数天）。</p>
                `;
                break;
        }
        
        return analysis;
    }
    
    // 模拟按钮事件
    simulateButton.addEventListener('click', function() {
        const type = exerciseType.value;
        const intensity = parseInt(exerciseIntensity.value);
        
        // 生成模拟数据
        const data = generateSimulationData(type, intensity);
        
        // 更新图表
        chart.series[0].setData(data.forceData);
        chart.series[1].setData(data.atpData);
        chart.series[2].setData(data.glycogenData);
        chart.series[3].setData(data.lactateData);
        
        // 更新疲劳分析
        fatigueAnalysis.innerHTML = generateFatigueAnalysis(type, intensity);
    });
}

// 创建肌肉收缩力量-速度关系图表
function createForceVelocityChart() {
    const container = document.getElementById('force-velocity-chart-container');
    if (!container) return;
    
    // 创建图表容器
    const chartContainer = document.createElement('div');
    chartContainer.style.height = '400px';
    container.appendChild(chartContainer);
    
    // 生成数据
    const velocityPoints = Array.from({length: 41}, (_, i) => -20 + i);
    
    // 力量-速度关系
    const forceData = velocityPoints.map(v => {
        if (v < 0) { // 离心收缩
            return 150 - 50 * Math.exp(0.05 * v);
        } else { // 向心收缩
            return 100 * (1 - v / 20);
        }
    });
    
    // 功率-速度关系
    const powerData = velocityPoints.map((v, i) => {
        if (v < 0) { // 离心收缩 - 负功率
            return v * forceData[i] / 100;
        } else { // 向心收缩 - 正功率
            return v * forceData[i] / 100;
        }
    });
    
    // 创建图表
    const chart = Highcharts.chart(chartContainer, {
        chart: {
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: '肌肉收缩的力量-速度和功率-速度关系'
        },
        xAxis: {
            title: {
                text: '收缩速度 (相对单位)'
            },
            plotLines: [{
                value: 0,
                color: '#888',
                width: 2,
                label: {
                    text: '等长收缩',
                    align: 'center',
                    style: {
                        color: '#888'
                    }
                }
            }]
        },
        yAxis: [{
            title: {
                text: '力量 (%)',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }, {
            title: {
                text: '功率 (相对单位)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: '力量',
            data: forceData,
            yAxis: 0,
            tooltip: {
                valueSuffix: '%'
            }
        }, {
            name: '功率',
            data: powerData,
            yAxis: 1
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
    
    // 添加说明文本
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'mt-3';
    descriptionContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">力量-速度和功率-速度关系说明</h5>
                <p class="card-text">
                    此图表展示了肌肉收缩速度与产生力量和功率之间的关系：
                </p>
                <ul>
                    <li><strong>力量-速度关系</strong>：随着收缩速度增加，肌肉产生的力量减小。在等长收缩(速度为零)时，
                    力量处于中等水平。在离心收缩(负速度)时，肌肉可以产生比等长收缩更大的力量。</li>
                    <li><strong>功率-速度关系</strong>：功率(力量×速度)与速度的关系呈倒U形曲线。在非常低或非常高的
                    速度下，功率较低；在中等速度下，功率达到最大值。</li>
                </ul>
                <p class="card-text">
                    这些关系对运动表现有重要影响。例如，爆发力运动(如跳跃)需要在中等速度下产生最大功率，
                    而力量训练则可以利用离心收缩产生更大的机械张力。
                </p>
            </div>
        </div>
    `;
    container.appendChild(descriptionContainer);
}

// 初始化所有多媒体组件
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否存在相应的容器，然后初始化多媒体组件
    if (document.getElementById('3d-muscle-model')) {
        create3DMuscleFiberModel();
    }
    
    if (document.getElementById('muscle-contraction-animation')) {
        createMuscleContractionAnimation();
    }
    
    if (document.getElementById('fiber-type-chart-container')) {
        createFiberTypeComparisonChart();
    }
    
    if (document.getElementById('muscle-fatigue-chart-container')) {
        createMuscleFatigueSimulationChart();
    }
    
    if (document.getElementById('force-velocity-chart-container')) {
        createForceVelocityChart();
    }
});
