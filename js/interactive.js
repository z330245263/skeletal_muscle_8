// 肌肉结构交互图
function createMuscleStructureInteractive() {
    const container = document.getElementById('muscle-structure-interactive');
    if (!container) return;
    
    // 创建交互式肌肉结构图的HTML内容
    const interactiveHTML = `
        <h4>骨骼肌结构交互图</h4>
        <p>使用滑块可以放大查看不同层次的骨骼肌结构，从整个肌肉到肌节水平。</p>
        <div class="interactive-controls mb-3">
            <label for="zoom-level" class="form-label">结构层次: <span id="zoom-level-text">肌肉</span></label>
            <input type="range" class="form-range" id="zoom-level" min="1" max="5" value="1">
        </div>
        <div class="muscle-structure-display">
            <div class="structure-level" id="level-1">
                <img src="images/muscle_level1.png" alt="整个肌肉结构" class="img-fluid rounded">
                <div class="structure-description">
                    <h5>整个肌肉</h5>
                    <p>骨骼肌由多种组织组成，包括肌纤维、神经组织、血液和结缔组织。整个肌肉被表膜(epimysium)包围，连接到骨骼的肌腱使肌肉能够产生运动。</p>
                </div>
            </div>
            <div class="structure-level" id="level-2" style="display: none;">
                <img src="images/muscle_level2.png" alt="肌束结构" class="img-fluid rounded">
                <div class="structure-description">
                    <h5>肌束(Fascicle)</h5>
                    <p>肌肉内部由多个肌束组成，每个肌束被束膜(perimysium)包围。肌束是肌纤维的集合，具有相似的功能特性。</p>
                </div>
            </div>
            <div class="structure-level" id="level-3" style="display: none;">
                <img src="images/muscle_level3.png" alt="肌纤维结构" class="img-fluid rounded">
                <div class="structure-description">
                    <h5>肌纤维(Muscle Fiber)</h5>
                    <p>肌纤维是骨骼肌的基本细胞单位，每个肌纤维被肌内膜(endomysium)包围。肌纤维是多核细胞，含有多个细胞核和专门的细胞器。</p>
                </div>
            </div>
            <div class="structure-level" id="level-4" style="display: none;">
                <img src="images/muscle_level4.png" alt="肌原纤维结构" class="img-fluid rounded">
                <div class="structure-description">
                    <h5>肌原纤维(Myofibril)</h5>
                    <p>肌纤维内部含有多个肌原纤维，这些线状结构含有收缩蛋白。肌原纤维的条纹状外观是由肌动蛋白和肌球蛋白的规则排列产生的。</p>
                </div>
            </div>
            <div class="structure-level" id="level-5" style="display: none;">
                <img src="images/muscle_level5.png" alt="肌节结构" class="img-fluid rounded">
                <div class="structure-description">
                    <h5>肌节(Sarcomere)</h5>
                    <p>肌节是肌原纤维的基本功能单位，由Z线之间的区域组成。肌节包含A带(暗带)和I带(亮带)，分别对应肌球蛋白和肌动蛋白的分布区域。肌肉收缩时，肌动蛋白丝滑向肌节中心，导致Z线相互靠近，肌节缩短。</p>
                </div>
            </div>
        </div>
        <div class="structure-navigation mt-3">
            <button class="btn btn-sm btn-outline-primary me-2" id="prev-level" disabled>上一级</button>
            <button class="btn btn-sm btn-outline-primary" id="next-level">下一级</button>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = interactiveHTML;
    
    // 添加交互功能
    const zoomSlider = document.getElementById('zoom-level');
    const zoomLevelText = document.getElementById('zoom-level-text');
    const prevButton = document.getElementById('prev-level');
    const nextButton = document.getElementById('next-level');
    
    // 结构层次名称
    const levelNames = ['肌肉', '肌束', '肌纤维', '肌原纤维', '肌节'];
    
    // 更新显示的结构层次
    function updateStructureLevel(level) {
        // 隐藏所有层次
        document.querySelectorAll('.structure-level').forEach(el => {
            el.style.display = 'none';
        });
        
        // 显示当前层次
        document.getElementById(`level-${level}`).style.display = 'block';
        
        // 更新文本
        zoomLevelText.textContent = levelNames[level-1];
        
        // 更新按钮状态
        prevButton.disabled = level === 1;
        nextButton.disabled = level === 5;
    }
    
    // 滑块事件监听
    zoomSlider.addEventListener('input', function() {
        const level = parseInt(this.value);
        updateStructureLevel(level);
    });
    
    // 按钮事件监听
    prevButton.addEventListener('click', function() {
        const currentLevel = parseInt(zoomSlider.value);
        if (currentLevel > 1) {
            zoomSlider.value = currentLevel - 1;
            updateStructureLevel(currentLevel - 1);
        }
    });
    
    nextButton.addEventListener('click', function() {
        const currentLevel = parseInt(zoomSlider.value);
        if (currentLevel < 5) {
            zoomSlider.value = currentLevel + 1;
            updateStructureLevel(currentLevel + 1);
        }
    });
}

// 神经肌肉连接动画
function createNeuromuscularJunctionAnimation() {
    const container = document.getElementById('neuromuscular-junction-interactive');
    if (!container) return;
    
    // 创建神经肌肉连接动画的HTML内容
    const animationHTML = `
        <h4>神经肌肉连接交互动画</h4>
        <p>下面的动画展示了神经冲动如何从运动神经元传递到肌纤维，以及乙酰胆碱在这一过程中的作用。</p>
        <div class="animation-container position-relative">
            <img src="images/nmj_static.png" alt="神经肌肉连接" class="img-fluid rounded" id="nmj-image">
            <div class="animation-overlay" id="animation-overlay"></div>
        </div>
        <div class="animation-controls mt-3">
            <button class="btn btn-primary" id="start-animation">开始动画</button>
            <button class="btn btn-outline-secondary ms-2" id="reset-animation">重置</button>
        </div>
        <div class="animation-steps mt-3">
            <div class="step-indicator">
                <span class="step active" id="step-1">1</span>
                <span class="step" id="step-2">2</span>
                <span class="step" id="step-3">3</span>
                <span class="step" id="step-4">4</span>
                <span class="step" id="step-5">5</span>
            </div>
            <div class="step-description mt-2" id="step-description">
                <p><strong>步骤1:</strong> 动作电位到达运动神经元末梢</p>
            </div>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = animationHTML;
    
    // 添加动画功能
    const startButton = document.getElementById('start-animation');
    const resetButton = document.getElementById('reset-animation');
    const stepDescription = document.getElementById('step-description');
    
    // 步骤描述
    const stepDescriptions = [
        '<p><strong>步骤1:</strong> 动作电位到达运动神经元末梢</p>',
        '<p><strong>步骤2:</strong> 乙酰胆碱从神经末梢释放到突触间隙</p>',
        '<p><strong>步骤3:</strong> 乙酰胆碱与肌纤维膜上的受体结合</p>',
        '<p><strong>步骤4:</strong> 肌纤维膜产生终板电位</p>',
        '<p><strong>步骤5:</strong> 终板电位触发肌纤维膜上的动作电位，启动肌肉收缩</p>'
    ];
    
    let currentStep = 1;
    let animationInterval;
    
    // 更新步骤指示器和描述
    function updateStep(step) {
        // 更新步骤指示器
        document.querySelectorAll('.step').forEach((el, index) => {
            el.classList.toggle('active', index + 1 <= step);
        });
        
        // 更新描述
        stepDescription.innerHTML = stepDescriptions[step - 1];
        
        // 更新图像或动画状态
        // 在实际实现中，这里可以切换不同的图像或更新动画状态
    }
    
    // 开始动画
    startButton.addEventListener('click', function() {
        // 禁用开始按钮
        startButton.disabled = true;
        
        // 重置步骤
        currentStep = 1;
        updateStep(currentStep);
        
        // 启动动画间隔
        animationInterval = setInterval(function() {
            currentStep++;
            if (currentStep > 5) {
                clearInterval(animationInterval);
                startButton.disabled = false;
                return;
            }
            updateStep(currentStep);
        }, 2000); // 每2秒更新一次
    });
    
    // 重置动画
    resetButton.addEventListener('click', function() {
        // 清除动画间隔
        clearInterval(animationInterval);
        
        // 重置步骤
        currentStep = 1;
        updateStep(currentStep);
        
        // 启用开始按钮
        startButton.disabled = false;
    });
}

// 肌肉收缩机制交互模拟
function createMuscleContractionSimulation() {
    const container = document.getElementById('muscle-contraction-interactive');
    if (!container) return;
    
    // 创建肌肉收缩机制交互模拟的HTML内容
    const simulationHTML = `
        <h4>肌肉收缩机制交互模拟</h4>
        <p>下面的交互模拟展示了肌肉收缩的分子机制，包括滑行丝模型和横桥循环。使用控制按钮可以逐步观察整个过程。</p>
        <div class="simulation-container position-relative">
            <img src="images/contraction_static.png" alt="肌肉收缩机制" class="img-fluid rounded" id="contraction-image">
            <div class="simulation-overlay" id="simulation-overlay"></div>
        </div>
        <div class="simulation-controls mt-3">
            <div class="btn-group" role="group">
                <button class="btn btn-outline-primary" id="step-1-btn">步骤1</button>
                <button class="btn btn-outline-primary" id="step-2-btn">步骤2</button>
                <button class="btn btn-outline-primary" id="step-3-btn">步骤3</button>
                <button class="btn btn-outline-primary" id="step-4-btn">步骤4</button>
                <button class="btn btn-outline-primary" id="step-5-btn">步骤5</button>
                <button class="btn btn-outline-primary" id="step-6-btn">步骤6</button>
            </div>
            <button class="btn btn-primary mt-2" id="play-all">播放全部</button>
        </div>
        <div class="simulation-description mt-3" id="simulation-description">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">横桥循环</h5>
                    <p class="card-text">点击上方按钮查看肌肉收缩过程中横桥循环的各个步骤。</p>
                </div>
            </div>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = simulationHTML;
    
    // 添加模拟功能
    const stepButtons = [
        document.getElementById('step-1-btn'),
        document.getElementById('step-2-btn'),
        document.getElementById('step-3-btn'),
        document.getElementById('step-4-btn'),
        document.getElementById('step-5-btn'),
        document.getElementById('step-6-btn')
    ];
    
    const playAllButton = document.getElementById('play-all');
    const simulationDescription = document.getElementById('simulation-description');
    
    // 步骤描述
    const stepDescriptions = [
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">步骤1: ATP结合</h5>
                <p class="card-text">ATP分子结合到肌球蛋白头部，使其从肌动蛋白上分离。这是横桥循环的起始点。</p>
            </div>
        </div>`,
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">步骤2: ATP水解</h5>
                <p class="card-text">ATP水解为ADP和Pi，释放能量。肌球蛋白头部处于"高能"状态，准备与肌动蛋白结合。</p>
            </div>
        </div>`,
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">步骤3: 横桥形成</h5>
                <p class="card-text">肌球蛋白头部与肌动蛋白结合形成横桥。此时Pi仍然结合在肌球蛋白上。</p>
            </div>
        </div>`,
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">步骤4: 力量产生冲程</h5>
                <p class="card-text">Pi释放，触发力量产生冲程。肌球蛋白头部发生构象变化，类似杠杆摆动，推动肌动蛋白丝向肌节中心滑动。</p>
            </div>
        </div>`,
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">步骤5: ADP释放</h5>
                <p class="card-text">ADP从肌球蛋白头部释放。肌球蛋白头部仍与肌动蛋白结合，处于"僵直"状态。</p>
            </div>
        </div>`,
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">步骤6: 循环重新开始</h5>
                <p class="card-text">新的ATP分子结合到肌球蛋白头部，使其从肌动蛋白上分离，横桥循环重新开始。只要有ATP供应和钙离子存在，这个循环就会持续进行。</p>
            </div>
        </div>`
    ];
    
    // 更新步骤
    function updateStep(step) {
        // 更新按钮状态
        stepButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === step - 1);
        });
        
        // 更新描述
        simulationDescription.innerHTML = stepDescriptions[step - 1];
        
        // 更新图像或模拟状态
        // 在实际实现中，这里可以切换不同的图像或更新模拟状态
    }
    
    // 为每个步骤按钮添加事件监听
    stepButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            updateStep(index + 1);
        });
    });
    
    // 播放全部按钮
    let currentStep = 1;
    let playInterval;
    
    playAllButton.addEventListener('click', function() {
        // 禁用所有按钮
        stepButtons.forEach(btn => btn.disabled = true);
        playAllButton.disabled = true;
        
        // 重置步骤
        currentStep = 1;
        updateStep(currentStep);
        
        // 启动播放间隔
        playInterval = setInterval(function() {
            currentStep++;
            if (currentStep > 6) {
                clearInterval(playInterval);
                stepButtons.forEach(btn => btn.disabled = false);
                playAllButton.disabled = false;
                return;
            }
            updateStep(currentStep);
        }, 2000); // 每2秒更新一次
    });
    
    // 初始显示第一步
    updateStep(1);
}

// 肌肉疲劳模拟
function createMuscleFatigueSimulation() {
    const container = document.getElementById('muscle-fatigue-interactive');
    if (!container) return;
    
    // 创建肌肉疲劳模拟的HTML内容
    const simulationHTML = `
        <h4>肌肉疲劳模拟</h4>
        <p>下面的交互模拟展示了不同类型运动对肌肉疲劳的影响。选择运动类型和强度，观察肌肉力量、能量底物和代谢产物的变化。</p>
        <div class="simulation-controls mb-3">
            <div class="row">
                <div class="col-md-6">
                    <label for="exercise-type" class="form-label">运动类型:</label>
                    <select class="form-select" id="exercise-type">
                        <option value="high">高强度短时间运动 (如短跑、举重)</option>
                        <option value="medium">中等强度持续运动 (如中长跑)</option>
                        <option value="low">低强度长时间运动 (如马拉松)</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="exercise-intensity" class="form-label">运动强度: <span id="intensity-value">50%</span></label>
                    <input type="range" class="form-range" id="exercise-intensity" min="10" max="100" value="50">
                </div>
            </div>
            <button class="btn btn-primary mt-3" id="start-simulation">开始模拟</button>
        </div>
        <div class="simulation-results">
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header">肌肉力量变化</div>
                        <div class="card-body">
                            <canvas id="force-chart" height="200"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header">能量底物变化</div>
                        <div class="card-body">
                            <canvas id="substrate-chart" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">代谢产物积累</div>
                        <div class="card-body">
                            <canvas id="metabolite-chart" height="200"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">疲劳分析</div>
                        <div class="card-body" id="fatigue-analysis">
                            <p>选择运动类型和强度，然后点击"开始模拟"按钮查看疲劳分析。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = simulationHTML;
    
    // 添加模拟功能
    const exerciseType = document.getElementById('exercise-type');
    const exerciseIntensity = document.getElementById('exercise-intensity');
    const intensityValue = document.getElementById('intensity-value');
    const startButton = document.getElementById('start-simulation');
    const fatigueAnalysis = document.getElementById('fatigue-analysis');
    
    // 更新强度值显示
    exerciseIntensity.addEventListener('input', function() {
        intensityValue.textContent = this.value + '%';
    });
    
    // 模拟数据生成函数
    function generateSimulationData(type, intensity) {
        const intensityFactor = intensity / 100;
        const timePoints = Array.from({length: 20}, (_, i) => i * 5); // 0到95秒
        let forceData, atpData, glycogenData, lactateData, h_ionData;
        
        switch(type) {
            case 'high':
                // 高强度短时间运动
                forceData = timePoints.map(t => 100 - (t > 30 ? (t - 30) * 2.5 * intensityFactor : 0));
                atpData = timePoints.map(t => 100 - (t * 3 * intensityFactor));
                glycogenData = timePoints.map(t => 100 - (t * 1.5 * intensityFactor));
                lactateData = timePoints.map(t => Math.min(100, t * 2 * intensityFactor));
                h_ionData = timePoints.map(t => Math.min(100, t * 1.8 * intensityFactor));
                break;
            case 'medium':
                // 中等强度持续运动
                forceData = timePoints.map(t => 100 - (t > 45 ? (t - 45) * 1.5 * intensityFactor : 0));
                atpData = timePoints.map(t => 100 - (t * 1.5 * intensityFactor));
                glycogenData = timePoints.map(t => 100 - (t * 2 * intensityFactor));
                lactateData = timePoints.map(t => Math.min(100, t * 1.2 * intensityFactor));
                h_ionData = timePoints.map(t => Math.min(100, t * 1 * intensityFactor));
                break;
            case 'low':
                // 低强度长时间运动
                forceData = timePoints.map(t => 100 - (t > 60 ? (t - 60) * 0.8 * intensityFactor : 0));
                atpData = timePoints.map(t => 100 - (t * 0.8 * intensityFactor));
                glycogenData = timePoints.map(t => 100 - (t * 2.5 * intensityFactor));
                lactateData = timePoints.map(t => Math.min(100, t * 0.5 * intensityFactor));
                h_ionData = timePoints.map(t => Math.min(100, t * 0.4 * intensityFactor));
                break;
        }
        
        // 确保数据在有效范围内
        forceData = forceData.map(v => Math.max(0, v));
        atpData = atpData.map(v => Math.max(0, v));
        glycogenData = glycogenData.map(v => Math.max(0, v));
        
        return {
            timePoints,
            forceData,
            atpData,
            glycogenData,
            lactateData,
            h_ionData
        };
    }
    
    // 创建图表
    let forceChart, substrateChart, metaboliteChart;
    
    function createCharts() {
        // 力量图表
        const forceCtx = document.getElementById('force-chart').getContext('2d');
        forceChart = new Chart(forceCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '肌肉力量 (%)',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        
        // 能量底物图表
        const substrateCtx = document.getElementById('substrate-chart').getContext('2d');
        substrateChart = new Chart(substrateCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'ATP (%)',
                        data: [],
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    },
                    {
                        label: '糖原 (%)',
                        data: [],
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        
        // 代谢产物图表
        const metaboliteCtx = document.getElementById('metabolite-chart').getContext('2d');
        metaboliteChart = new Chart(metaboliteCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: '乳酸 (%)',
                        data: [],
                        borderColor: 'rgb(255, 159, 64)',
                        tension: 0.1
                    },
                    {
                        label: '氢离子 (%)',
                        data: [],
                        borderColor: 'rgb(153, 102, 255)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // 更新图表
    function updateCharts(data) {
        // 更新力量图表
        forceChart.data.labels = data.timePoints.map(t => t + 's');
        forceChart.data.datasets[0].data = data.forceData;
        forceChart.update();
        
        // 更新能量底物图表
        substrateChart.data.labels = data.timePoints.map(t => t + 's');
        substrateChart.data.datasets[0].data = data.atpData;
        substrateChart.data.datasets[1].data = data.glycogenData;
        substrateChart.update();
        
        // 更新代谢产物图表
        metaboliteChart.data.labels = data.timePoints.map(t => t + 's');
        metaboliteChart.data.datasets[0].data = data.lactateData;
        metaboliteChart.data.datasets[1].data = data.h_ionData;
        metaboliteChart.update();
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
    
    // 初始化图表
    createCharts();
    
    // 开始模拟按钮事件
    startButton.addEventListener('click', function() {
        const type = exerciseType.value;
        const intensity = parseInt(exerciseIntensity.value);
        
        // 生成模拟数据
        const data = generateSimulationData(type, intensity);
        
        // 更新图表
        updateCharts(data);
        
        // 更新疲劳分析
        fatigueAnalysis.innerHTML = generateFatigueAnalysis(type, intensity);
    });
}

// 肌纤维类型比较
function createFiberTypeComparison() {
    const container = document.getElementById('fiber-type-interactive');
    if (!container) return;
    
    // 创建肌纤维类型比较的HTML内容
    const comparisonHTML = `
        <h4>肌纤维类型比较</h4>
        <p>下面的交互图表比较了三种主要肌纤维类型的特性。点击不同特性可查看详细比较。</p>
        <div class="comparison-controls mb-3">
            <div class="btn-group" role="group">
                <button class="btn btn-outline-primary active" id="property-contraction">收缩速度</button>
                <button class="btn btn-outline-primary" id="property-fatigue">疲劳抵抗</button>
                <button class="btn btn-outline-primary" id="property-force">力量产生</button>
                <button class="btn btn-outline-primary" id="property-metabolism">代谢特性</button>
                <button class="btn btn-outline-primary" id="property-mitochondria">线粒体含量</button>
            </div>
        </div>
        <div class="comparison-chart">
            <canvas id="fiber-chart" height="300"></canvas>
        </div>
        <div class="comparison-description mt-3">
            <div class="card">
                <div class="card-body" id="comparison-text">
                    <h5 class="card-title">收缩速度比较</h5>
                    <p class="card-text">I型纤维（慢肌纤维）收缩速度最慢，IIx型纤维（快肌纤维）收缩速度最快，IIa型纤维（中间纤维）收缩速度介于两者之间。这种差异主要由肌球蛋白ATPase活性的不同导致。</p>
                </div>
            </div>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = comparisonHTML;
    
    // 添加比较功能
    const propertyButtons = {
        contraction: document.getElementById('property-contraction'),
        fatigue: document.getElementById('property-fatigue'),
        force: document.getElementById('property-force'),
        metabolism: document.getElementById('property-metabolism'),
        mitochondria: document.getElementById('property-mitochondria')
    };
    
    const comparisonText = document.getElementById('comparison-text');
    
    // 特性数据
    const propertyData = {
        contraction: {
            label: '收缩速度',
            data: [30, 70, 100],
            description: `
                <h5 class="card-title">收缩速度比较</h5>
                <p class="card-text">I型纤维（慢肌纤维）收缩速度最慢，IIx型纤维（快肌纤维）收缩速度最快，IIa型纤维（中间纤维）收缩速度介于两者之间。这种差异主要由肌球蛋白ATPase活性的不同导致。</p>
            `
        },
        fatigue: {
            label: '疲劳抵抗能力',
            data: [100, 65, 30],
            description: `
                <h5 class="card-title">疲劳抵抗能力比较</h5>
                <p class="card-text">I型纤维具有最高的疲劳抵抗能力，适合长时间低强度活动。IIx型纤维疲劳抵抗能力最低，很快疲劳。IIa型纤维具有中等疲劳抵抗能力。这种差异与线粒体含量、毛细血管密度和代谢特性相关。</p>
            `
        },
        force: {
            label: '力量产生能力',
            data: [40, 75, 100],
            description: `
                <h5 class="card-title">力量产生能力比较</h5>
                <p class="card-text">IIx型纤维产生最大力量，I型纤维产生最小力量，IIa型纤维力量产生能力介于两者之间。这种差异与肌纤维横截面积和肌球蛋白分子特性有关。</p>
            `
        },
        metabolism: {
            label: '代谢特性',
            data: [90, 60, 20],
            description: `
                <h5 class="card-title">代谢特性比较</h5>
                <p class="card-text">I型纤维主要依赖有氧代谢，具有高氧化酶活性。IIx型纤维主要依赖无氧糖酵解，具有高糖酵解酶活性。IIa型纤维兼具有氧和无氧代谢能力。这种差异决定了不同纤维类型适合的运动类型。</p>
            `
        },
        mitochondria: {
            label: '线粒体含量',
            data: [100, 60, 30],
            description: `
                <h5 class="card-title">线粒体含量比较</h5>
                <p class="card-text">I型纤维线粒体含量最高，这使其能够高效进行有氧代谢。IIx型纤维线粒体含量最低，主要依赖糖酵解产生ATP。IIa型纤维线粒体含量中等。线粒体含量直接影响纤维的有氧能力和疲劳抵抗能力。</p>
            `
        }
    };
    
    // 创建图表
    let fiberChart;
    
    function createFiberChart(property) {
        const ctx = document.getElementById('fiber-chart').getContext('2d');
        
        // 如果图表已存在，销毁它
        if (fiberChart) {
            fiberChart.destroy();
        }
        
        // 创建新图表
        fiberChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['I型纤维 (慢肌)', 'IIa型纤维 (中间)', 'IIx型纤维 (快肌)'],
                datasets: [{
                    label: propertyData[property].label,
                    data: propertyData[property].data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // 更新比较描述
    function updateComparison(property) {
        comparisonText.innerHTML = propertyData[property].description;
    }
    
    // 为每个特性按钮添加事件监听
    Object.keys(propertyButtons).forEach(property => {
        propertyButtons[property].addEventListener('click', function() {
            // 更新按钮状态
            Object.values(propertyButtons).forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // 更新图表和描述
            createFiberChart(property);
            updateComparison(property);
        });
    });
    
    // 初始显示收缩速度比较
    createFiberChart('contraction');
}

// 肌肉动作类型演示
function createMuscleActionDemo() {
    const container = document.getElementById('muscle-action-interactive');
    if (!container) return;
    
    // 创建肌肉动作类型演示的HTML内容
    const demoHTML = `
        <h4>肌肉动作类型演示</h4>
        <p>下面的交互动画展示了三种基本肌肉动作类型。点击不同类型可查看详细演示。</p>
        <div class="action-controls mb-3">
            <div class="btn-group" role="group">
                <button class="btn btn-outline-primary active" id="action-concentric">向心收缩</button>
                <button class="btn btn-outline-primary" id="action-eccentric">离心收缩</button>
                <button class="btn btn-outline-primary" id="action-isometric">等长收缩</button>
            </div>
        </div>
        <div class="action-animation">
            <div class="row">
                <div class="col-md-6">
                    <div class="animation-container position-relative">
                        <img src="images/concentric_action.png" alt="肌肉动作类型" class="img-fluid rounded" id="action-image">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body" id="action-description">
                            <h5 class="card-title">向心收缩 (Concentric Action)</h5>
                            <p class="card-text">向心收缩是指肌肉在产生张力的同时缩短的过程。这是最常见的肌肉动作类型，例如二头肌收缩使肘关节弯曲，或提举重物时的上推阶段。在向心收缩中，肌肉产生的力量大于外部负荷，导致肌肉缩短并产生运动。</p>
                            <h6>应用示例:</h6>
                            <ul>
                                <li>举重的上推阶段</li>
                                <li>站立时从蹲姿站起</li>
                                <li>引体向上的上拉阶段</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = demoHTML;
    
    // 添加演示功能
    const actionButtons = {
        concentric: document.getElementById('action-concentric'),
        eccentric: document.getElementById('action-eccentric'),
        isometric: document.getElementById('action-isometric')
    };
    
    const actionImage = document.getElementById('action-image');
    const actionDescription = document.getElementById('action-description');
    
    // 动作描述
    const actionData = {
        concentric: {
            image: 'images/concentric_action.png',
            description: `
                <h5 class="card-title">向心收缩 (Concentric Action)</h5>
                <p class="card-text">向心收缩是指肌肉在产生张力的同时缩短的过程。这是最常见的肌肉动作类型，例如二头肌收缩使肘关节弯曲，或提举重物时的上推阶段。在向心收缩中，肌肉产生的力量大于外部负荷，导致肌肉缩短并产生运动。</p>
                <h6>应用示例:</h6>
                <ul>
                    <li>举重的上推阶段</li>
                    <li>站立时从蹲姿站起</li>
                    <li>引体向上的上拉阶段</li>
                </ul>
            `
        },
        eccentric: {
            image: 'images/eccentric_action.png',
            description: `
                <h5 class="card-title">离心收缩 (Eccentric Action)</h5>
                <p class="card-text">离心收缩是指肌肉在产生张力的同时被拉长的过程。这种动作通常发生在控制运动或抵抗重力的情况下。在离心收缩中，外部负荷大于肌肉产生的力量，但肌肉仍在产生张力以控制运动速度。</p>
                <h6>应用示例:</h6>
                <ul>
                    <li>下楼梯时股四头肌的控制作用</li>
                    <li>放下重物时二头肌的控制作用</li>
                    <li>深蹲下降阶段的股四头肌</li>
                </ul>
                <p class="card-text">离心收缩可以产生比向心收缩更大的力量，但也更容易导致肌肉损伤和延迟性肌肉酸痛。</p>
            `
        },
        isometric: {
            image: 'images/isometric_action.png',
            description: `
                <h5 class="card-title">等长收缩 (Isometric Action)</h5>
                <p class="card-text">等长收缩是指肌肉产生张力但长度不变的过程。这种动作通常发生在维持姿势或抵抗不可移动物体的情况下。在等长收缩中，肌肉产生的力量等于外部负荷，因此肌肉长度不变。</p>
                <h6>应用示例:</h6>
                <ul>
                    <li>保持平板支撑姿势</li>
                    <li>推不动的墙壁</li>
                    <li>握紧固定物体</li>
                </ul>
                <p class="card-text">等长训练对关节受伤恢复期特别有用，因为它可以在不引起关节运动的情况下增强肌肉力量。</p>
            `
        }
    };
    
    // 更新动作演示
    function updateActionDemo(action) {
        // 更新图像
        actionImage.src = actionData[action].image;
        actionImage.alt = action + " action";
        
        // 更新描述
        actionDescription.innerHTML = actionData[action].description;
    }
    
    // 为每个动作按钮添加事件监听
    Object.keys(actionButtons).forEach(action => {
        actionButtons[action].addEventListener('click', function() {
            // 更新按钮状态
            Object.values(actionButtons).forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // 更新演示
            updateActionDemo(action);
        });
    });
}

// 训练计划设计工具
function createTrainingProgramTool() {
    const container = document.getElementById('training-program-interactive');
    if (!container) return;
    
    // 创建训练计划设计工具的HTML内容
    const toolHTML = `
        <h4>训练计划设计工具</h4>
        <p>使用下面的交互工具，根据您的目标和特点设计个性化的训练计划。</p>
        <div class="tool-controls mb-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="training-goal" class="form-label">训练目标:</label>
                        <select class="form-select" id="training-goal">
                            <option value="strength">最大力量</option>
                            <option value="hypertrophy">肌肉增长</option>
                            <option value="endurance">肌肉耐力</option>
                            <option value="power">爆发力</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="experience-level" class="form-label">经验水平:</label>
                        <select class="form-select" id="experience-level">
                            <option value="beginner">初学者</option>
                            <option value="intermediate">中级</option>
                            <option value="advanced">高级</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="training-days" class="form-label">每周训练天数:</label>
                        <select class="form-select" id="training-days">
                            <option value="2">2天</option>
                            <option value="3">3天</option>
                            <option value="4">4天</option>
                            <option value="5">5天</option>
                            <option value="6">6天</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="muscle-focus" class="form-label">重点肌群:</label>
                        <select class="form-select" id="muscle-focus">
                            <option value="all">全身平衡</option>
                            <option value="upper">上肢重点</option>
                            <option value="lower">下肢重点</option>
                            <option value="core">核心重点</option>
                        </select>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" id="generate-program">生成训练计划</button>
        </div>
        <div class="training-program mt-3" id="program-result" style="display: none;">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">个性化训练计划</h5>
                </div>
                <div class="card-body" id="program-content">
                    <!-- 训练计划内容将在这里生成 -->
                </div>
            </div>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = toolHTML;
    
    // 添加工具功能
    const trainingGoal = document.getElementById('training-goal');
    const experienceLevel = document.getElementById('experience-level');
    const trainingDays = document.getElementById('training-days');
    const muscleFocus = document.getElementById('muscle-focus');
    const generateButton = document.getElementById('generate-program');
    const programResult = document.getElementById('program-result');
    const programContent = document.getElementById('program-content');
    
    // 训练计划模板
    const programTemplates = {
        strength: {
            beginner: {
                description: "这个计划专注于建立基础力量，使用复合动作和适中的重量。",
                sets: "3-4组",
                reps: "5-8次",
                rest: "2-3分钟",
                tempo: "2-0-2-0 (2秒向心，0秒暂停，2秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2次"
            },
            intermediate: {
                description: "这个计划使用更高的强度和更多的复合动作来增加最大力量。",
                sets: "4-5组",
                reps: "3-6次",
                rest: "3-4分钟",
                tempo: "1-0-3-0 (1秒向心，0秒暂停，3秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次"
            },
            advanced: {
                description: "这个高级计划使用周期化方法和高强度技术来最大化力量增长。",
                sets: "5-6组",
                reps: "1-5次",
                rest: "3-5分钟",
                tempo: "X-0-3-0 (爆发式向心，0秒暂停，3秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次，使用波浪式负荷"
            }
        },
        hypertrophy: {
            beginner: {
                description: "这个计划专注于肌肉增长，使用中等重量和适中的训练量。",
                sets: "3组",
                reps: "8-12次",
                rest: "60-90秒",
                tempo: "2-0-2-0 (2秒向心，0秒暂停，2秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2次"
            },
            intermediate: {
                description: "这个计划增加了训练量和强度，使用多种动作刺激肌肉生长。",
                sets: "3-4组",
                reps: "8-12次主动作，12-15次辅助动作",
                rest: "60-90秒",
                tempo: "2-0-3-0 (2秒向心，0秒暂停，3秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次"
            },
            advanced: {
                description: "这个高级计划使用高容量训练和高级技术如超级组、递减组等最大化肌肉生长。",
                sets: "4-5组",
                reps: "6-12次，使用递减组和超级组",
                rest: "45-90秒",
                tempo: "2-1-3-0 (2秒向心，1秒收缩顶点暂停，3秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次，使用分化训练"
            }
        },
        endurance: {
            beginner: {
                description: "这个计划专注于提高肌肉耐力，使用较轻的重量和较高的重复次数。",
                sets: "2-3组",
                reps: "15-20次",
                rest: "30-60秒",
                tempo: "1-0-1-0 (1秒向心，0秒暂停，1秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次"
            },
            intermediate: {
                description: "这个计划使用循环训练和较短的休息时间来提高肌肉耐力和心肺功能。",
                sets: "3组",
                reps: "15-25次",
                rest: "30秒或更少",
                tempo: "1-0-1-0 (1秒向心，0秒暂停，1秒离心，0秒暂停)",
                frequency: "每个肌群每周训练3次"
            },
            advanced: {
                description: "这个高级计划使用高容量、短休息和复合组合来最大化肌肉耐力。",
                sets: "3-4组",
                reps: "20-30次或时间为基础的组",
                rest: "15-30秒",
                tempo: "1-0-1-0 (1秒向心，0秒暂停，1秒离心，0秒暂停)",
                frequency: "每个肌群每周训练3-4次"
            }
        },
        power: {
            beginner: {
                description: "这个计划专注于发展基础爆发力，使用中等重量和爆发式动作。",
                sets: "3-4组",
                reps: "3-6次",
                rest: "2-3分钟",
                tempo: "X-0-2-0 (爆发式向心，0秒暂停，2秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2次"
            },
            intermediate: {
                description: "这个计划结合了力量和速度训练，使用复杂的动作模式发展爆发力。",
                sets: "4-5组",
                reps: "3-5次",
                rest: "2-3分钟",
                tempo: "X-0-2-0 (爆发式向心，0秒暂停，2秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次"
            },
            advanced: {
                description: "这个高级计划使用复杂的训练方法如复合训练和震荡训练来最大化爆发力。",
                sets: "4-6组",
                reps: "1-5次",
                rest: "3-5分钟",
                tempo: "X-0-2-0 (爆发式向心，0秒暂停，2秒离心，0秒暂停)",
                frequency: "每个肌群每周训练2-3次，使用复合训练方法"
            }
        }
    };
    
    // 肌群训练模板
    const muscleGroupTemplates = {
        all: {
            2: [
                "第1天: 全身训练",
                "第2天: 休息",
                "第3天: 全身训练",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            3: [
                "第1天: 全身训练",
                "第2天: 休息",
                "第3天: 全身训练",
                "第4天: 休息",
                "第5天: 全身训练",
                "第6天: 休息",
                "第7天: 休息"
            ],
            4: [
                "第1天: 上肢",
                "第2天: 下肢",
                "第3天: 休息",
                "第4天: 上肢",
                "第5天: 下肢",
                "第6天: 休息",
                "第7天: 休息"
            ],
            5: [
                "第1天: 胸/三头肌",
                "第2天: 背/二头肌",
                "第3天: 腿/核心",
                "第4天: 肩/手臂",
                "第5天: 全身",
                "第6天: 休息",
                "第7天: 休息"
            ],
            6: [
                "第1天: 胸",
                "第2天: 背",
                "第3天: 腿",
                "第4天: 肩",
                "第5天: 手臂",
                "第6天: 核心/弱点",
                "第7天: 休息"
            ]
        },
        upper: {
            2: [
                "第1天: 上肢",
                "第2天: 休息",
                "第3天: 上肢",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            3: [
                "第1天: 胸/三头肌",
                "第2天: 背/二头肌",
                "第3天: 肩/手臂",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            4: [
                "第1天: 胸",
                "第2天: 背",
                "第3天: 休息",
                "第4天: 肩",
                "第5天: 手臂",
                "第6天: 休息",
                "第7天: 休息"
            ],
            5: [
                "第1天: 胸",
                "第2天: 背",
                "第3天: 肩",
                "第4天: 手臂",
                "第5天: 上肢综合",
                "第6天: 休息",
                "第7天: 休息"
            ],
            6: [
                "第1天: 胸",
                "第2天: 背",
                "第3天: 休息",
                "第4天: 肩",
                "第5天: 二头肌",
                "第6天: 三头肌",
                "第7天: 休息"
            ]
        },
        lower: {
            2: [
                "第1天: 下肢",
                "第2天: 休息",
                "第3天: 下肢",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            3: [
                "第1天: 股四头肌重点",
                "第2天: 臀腿后侧链重点",
                "第3天: 下肢综合",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            4: [
                "第1天: 股四头肌重点",
                "第2天: 臀腿后侧链重点",
                "第3天: 休息",
                "第4天: 小腿/足踝",
                "第5天: 下肢综合",
                "第6天: 休息",
                "第7天: 休息"
            ],
            5: [
                "第1天: 股四头肌重点",
                "第2天: 臀腿后侧链重点",
                "第3天: 小腿/足踝",
                "第4天: 下肢爆发力",
                "第5天: 下肢综合",
                "第6天: 休息",
                "第7天: 休息"
            ],
            6: [
                "第1天: 股四头肌重点",
                "第2天: 臀腿后侧链重点",
                "第3天: 休息",
                "第4天: 小腿/足踝",
                "第5天: 下肢爆发力",
                "第6天: 下肢综合",
                "第7天: 休息"
            ]
        },
        core: {
            2: [
                "第1天: 核心训练",
                "第2天: 休息",
                "第3天: 核心训练",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            3: [
                "第1天: 前侧核心",
                "第2天: 侧面核心",
                "第3天: 后侧核心",
                "第4天: 休息",
                "第5天: 休息",
                "第6天: 休息",
                "第7天: 休息"
            ],
            4: [
                "第1天: 前侧核心",
                "第2天: 侧面核心",
                "第3天: 休息",
                "第4天: 后侧核心",
                "第5天: 综合核心",
                "第6天: 休息",
                "第7天: 休息"
            ],
            5: [
                "第1天: 前侧核心",
                "第2天: 侧面核心",
                "第3天: 后侧核心",
                "第4天: 动态核心",
                "第5天: 综合核心",
                "第6天: 休息",
                "第7天: 休息"
            ],
            6: [
                "第1天: 前侧核心",
                "第2天: 侧面核心",
                "第3天: 后侧核心",
                "第4天: 动态核心",
                "第5天: 抗旋转核心",
                "第6天: 综合核心",
                "第7天: 休息"
            ]
        }
    };
    
    // 生成训练计划
    function generateTrainingProgram() {
        const goal = trainingGoal.value;
        const level = experienceLevel.value;
        const days = trainingDays.value;
        const focus = muscleFocus.value;
        
        // 获取训练模板
        const programTemplate = programTemplates[goal][level];
        const scheduleTemplate = muscleGroupTemplates[focus][days];
        
        // 生成计划内容
        let programHTML = `
            <h5>训练目标: ${getGoalName(goal)}</h5>
            <p>${programTemplate.description}</p>
            
            <div class="training-parameters mb-3">
                <div class="row">
                    <div class="col-md-6">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>组数:</strong> ${programTemplate.sets}</li>
                            <li class="list-group-item"><strong>重复次数:</strong> ${programTemplate.reps}</li>
                            <li class="list-group-item"><strong>休息时间:</strong> ${programTemplate.rest}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>动作节奏:</strong> ${programTemplate.tempo}</li>
                            <li class="list-group-item"><strong>训练频率:</strong> ${programTemplate.frequency}</li>
                            <li class="list-group-item"><strong>经验水平:</strong> ${getLevelName(level)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <h5>每周训练安排</h5>
            <div class="weekly-schedule mb-3">
                <ul class="list-group">
        `;
        
        // 添加每周安排
        scheduleTemplate.forEach(day => {
            programHTML += `<li class="list-group-item">${day}</li>`;
        });
        
        programHTML += `
                </ul>
            </div>
            
            <div class="training-notes">
                <h5>训练注意事项</h5>
                <ul>
                    <li>始终进行适当的热身，包括5-10分钟的有氧活动和动态拉伸</li>
                    <li>保持正确的动作形式，必要时减轻重量</li>
                    <li>根据个人恢复能力调整训练量和强度</li>
                    <li>确保充分的营养和休息以支持训练目标</li>
                    <li>每4-6周调整训练计划以避免适应平台期</li>
                </ul>
            </div>
        `;
        
        // 显示计划内容
        programContent.innerHTML = programHTML;
        programResult.style.display = 'block';
    }
    
    // 辅助函数
    function getGoalName(goal) {
        const goalNames = {
            strength: '最大力量',
            hypertrophy: '肌肉增长',
            endurance: '肌肉耐力',
            power: '爆发力'
        };
        return goalNames[goal];
    }
    
    function getLevelName(level) {
        const levelNames = {
            beginner: '初学者',
            intermediate: '中级',
            advanced: '高级'
        };
        return levelNames[level];
    }
    
    // 生成按钮事件
    generateButton.addEventListener('click', generateTrainingProgram);
}

// 综合测验
function createComprehensiveQuiz() {
    const container = document.getElementById('comprehensive-quiz');
    if (!container) return;
    
    // 创建综合测验的HTML内容
    const quizHTML = `
        <h4>骨骼肌结构与功能综合测验</h4>
        <p>完成以下测验，检验您对骨骼肌结构与功能的理解。</p>
        <div id="quiz-container">
            <!-- 测验题目将在这里生成 -->
        </div>
        <div class="quiz-controls mt-3">
            <button class="btn btn-primary" id="submit-quiz">提交答案</button>
            <button class="btn btn-outline-secondary ms-2" id="reset-quiz">重置测验</button>
        </div>
    `;
    
    // 将HTML内容添加到容器中
    container.innerHTML = quizHTML;
    
    // 测验题目
    const quizQuestions = [
        {
            type: 'multiple',
            question: '骨骼肌纤维被以下哪种结缔组织包围？',
            options: ['表膜', '束膜', '肌内膜', '基底膜'],
            correctAnswer: 2
        },
        {
            type: 'multiple',
            question: '以下哪种肌纤维类型具有最高的疲劳抵抗能力？',
            options: ['I型纤维', 'IIa型纤维', 'IIx型纤维', 'III型纤维'],
            correctAnswer: 0
        },
        {
            type: 'multiple',
            question: '肌肉收缩过程中，钙离子的主要作用是什么？',
            options: [
                '激活肌球蛋白ATPase',
                '与肌钙蛋白C结合，导致原肌球蛋白移位',
                '促进ATP合成',
                '增加肌节长度'
            ],
            correctAnswer: 1
        },
        {
            type: 'multiple',
            question: '以下哪种肌肉动作类型可以产生最大的力量？',
            options: ['向心收缩', '离心收缩', '等长收缩', '等速收缩'],
            correctAnswer: 1
        },
        {
            type: 'multiple',
            question: '运动单位募集遵循什么原则？',
            options: [
                '随机原则',
                '大小原则（先小后大）',
                '逆大小原则（先大后小）',
                '同时激活原则'
            ],
            correctAnswer: 1
        },
        {
            type: 'multiple',
            question: '肌浆网的主要功能是什么？',
            options: [
                '产生ATP',
                '储存和释放钙离子',
                '合成蛋白质',
                '分解代谢废物'
            ],
            correctAnswer: 1
        },
        {
            type: 'multiple',
            question: '以下哪项不是卫星细胞的功能？',
            options: [
                '肌肉修复',
                '肌肉生长',
                '提供新的细胞核',
                '产生肌肉收缩力'
            ],
            correctAnswer: 3
        },
        {
            type: 'multiple',
            question: '肌肉收缩的直接能量来源是什么？',
            options: [
                'ATP',
                '葡萄糖',
                '肌酸磷酸',
                '脂肪酸'
            ],
            correctAnswer: 0
        },
        {
            type: 'multiple',
            question: '神经肌肉接头处释放的神经递质是什么？',
            options: [
                '多巴胺',
                '去甲肾上腺素',
                '乙酰胆碱',
                '谷氨酸'
            ],
            correctAnswer: 2
        },
        {
            type: 'multiple',
            question: '肌节的基本功能单位是什么？',
            options: [
                'Z线之间的区域',
                'A带',
                'I带',
                'H区'
            ],
            correctAnswer: 0
        }
    ];
    
    // 生成测验
    function generateQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        let quizContent = '';
        
        quizQuestions.forEach((q, index) => {
            quizContent += `
                <div class="card mb-3 quiz-question" id="question-${index}">
                    <div class="card-header">问题 ${index + 1}</div>
                    <div class="card-body">
                        <p class="card-text">${q.question}</p>
                        <div class="options">
            `;
            
            if (q.type === 'multiple') {
                q.options.forEach((option, optIndex) => {
                    quizContent += `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="question-${index}" id="q${index}-option${optIndex}" value="${optIndex}">
                            <label class="form-check-label" for="q${index}-option${optIndex}">
                                ${option}
                            </label>
                        </div>
                    `;
                });
            }
            
            quizContent += `
                        </div>
                    </div>
                </div>
            `;
        });
        
        quizContainer.innerHTML = quizContent;
    }
    
    // 评分测验
    function gradeQuiz() {
        let score = 0;
        let feedback = '';
        
        quizQuestions.forEach((q, index) => {
            const questionCard = document.getElementById(`question-${index}`);
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            
            if (selectedOption) {
                const selectedValue = parseInt(selectedOption.value);
                
                if (selectedValue === q.correctAnswer) {
                    score++;
                    questionCard.classList.add('border-success');
                    feedback += `<p>问题 ${index + 1}: <span class="text-success">正确</span></p>`;
                } else {
                    questionCard.classList.add('border-danger');
                    feedback += `<p>问题 ${index + 1}: <span class="text-danger">错误</span>. 正确答案是: ${q.options[q.correctAnswer]}</p>`;
                }
            } else {
                questionCard.classList.add('border-warning');
                feedback += `<p>问题 ${index + 1}: <span class="text-warning">未回答</span></p>`;
            }
        });
        
        // 计算百分比得分
        const percentScore = Math.round((score / quizQuestions.length) * 100);
        
        // 显示结果
        showQuizResults(percentScore, feedback);
    }
    
    // 显示测验结果
    function showQuizResults(score, feedback) {
        // 创建结果模态框
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'quizResultModal';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'quizResultModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        
        // 根据得分确定标题和颜色
        let resultTitle = '';
        let resultClass = '';
        
        if (score >= 90) {
            resultTitle = '优秀!';
            resultClass = 'text-success';
        } else if (score >= 70) {
            resultTitle = '良好!';
            resultClass = 'text-primary';
        } else if (score >= 60) {
            resultTitle = '及格';
            resultClass = 'text-warning';
        } else {
            resultTitle = '需要改进';
            resultClass = 'text-danger';
        }
        
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="quizResultModalLabel">测验结果</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3 class="${resultClass}">${resultTitle} - ${score}%</h3>
                        <p>您在${quizQuestions.length}个问题中答对了${score / 10 * quizQuestions.length}个。</p>
                        <div class="progress mb-3">
                            <div class="progress-bar ${resultClass.replace('text', 'bg')}" role="progressbar" style="width: ${score}%"></div>
                        </div>
                        <div class="quiz-feedback">
                            ${feedback}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" id="retakeQuizBtn">重新测验</button>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到文档
        document.body.appendChild(modal);
        
        // 显示模态框
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        
        // 模态框关闭后移除
        modal.addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(modal);
        });
        
        // 重新测验按钮
        const retakeButton = modal.querySelector('#retakeQuizBtn');
        retakeButton.addEventListener('click', function() {
            modalInstance.hide();
            resetQuiz();
        });
    }
    
    // 重置测验
    function resetQuiz() {
        // 移除所有边框类
        document.querySelectorAll('.quiz-question').forEach(card => {
            card.classList.remove('border-success', 'border-danger', 'border-warning');
        });
        
        // 清除所有选择
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
    }
    
    // 生成测验
    generateQuiz();
    
    // 添加按钮事件
    const submitButton = document.getElementById('submit-quiz');
    const resetButton = document.getElementById('reset-quiz');
    
    submitButton.addEventListener('click', gradeQuiz);
    resetButton.addEventListener('click', resetQuiz);
}

// 初始化所有交互元素
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否存在相应的容器，然后初始化交互元素
    if (document.getElementById('muscle-structure-interactive')) {
        createMuscleStructureInteractive();
    }
    
    if (document.getElementById('neuromuscular-junction-interactive')) {
        createNeuromuscularJunctionAnimation();
    }
    
    if (document.getElementById('muscle-contraction-interactive')) {
        createMuscleContractionSimulation();
    }
    
    if (document.getElementById('muscle-fatigue-interactive')) {
        createMuscleFatigueSimulation();
    }
    
    if (document.getElementById('fiber-type-interactive')) {
        createFiberTypeComparison();
    }
    
    if (document.getElementById('muscle-action-interactive')) {
        createMuscleActionDemo();
    }
    
    if (document.getElementById('training-program-interactive')) {
        createTrainingProgramTool();
    }
    
    if (document.getElementById('comprehensive-quiz')) {
        createComprehensiveQuiz();
    }
});
