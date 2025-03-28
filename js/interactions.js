/**
 * 骨骼肌：结构与功能 - 交互功能脚本
 * 处理页面中的交互元素
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化交互式图表
    initializeCharts();
    
    // 初始化交互式图像
    initializeInteractiveImages();
    
    // 初始化知识测验
    initializeQuizzes();
});

/**
 * 初始化交互式图表
 */
function initializeCharts() {
    // 这里将在后续开发中添加具体的图表初始化代码
    console.log('图表初始化功能准备就绪');
}

/**
 * 初始化交互式图像
 */
function initializeInteractiveImages() {
    // 这里将在后续开发中添加具体的交互式图像代码
    console.log('交互式图像功能准备就绪');
    
    // 为所有带有interactive-image类的图像添加交互功能
    document.querySelectorAll('.interactive-image').forEach(image => {
        // 添加鼠标悬停效果
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // 添加点击事件（如果有）
        if (image.dataset.target) {
            image.style.cursor = 'pointer';
            image.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}

/**
 * 初始化知识测验
 */
function initializeQuizzes() {
    // 这里将在后续开发中添加具体的测验功能代码
    console.log('知识测验功能准备就绪');
}

/**
 * 创建肌肉结构交互图
 * @param {string} containerId - 容器元素的ID
 */
function createMuscleStructureInteractive(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 这里将在后续开发中添加具体的肌肉结构交互图代码
}

/**
 * 创建肌肉收缩模拟
 * @param {string} containerId - 容器元素的ID
 */
function createMuscleContractionSimulation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 这里将在后续开发中添加具体的肌肉收缩模拟代码
}

/**
 * 创建肌纤维类型比较图表
 * @param {string} containerId - 容器元素的ID
 */
function createFiberTypeComparisonChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 这里将在后续开发中添加具体的肌纤维类型比较图表代码
}

/**
 * 创建力量-速度关系图表
 * @param {string} containerId - 容器元素的ID
 */
function createForceVelocityChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 这里将在后续开发中添加具体的力量-速度关系图表代码
}

/**
 * 创建肌肉动作类型演示
 * @param {string} containerId - 容器元素的ID
 */
function createMuscleActionDemo(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 这里将在后续开发中添加具体的肌肉动作类型演示代码
}

/**
 * 显示弹出信息
 * @param {string} title - 标题
 * @param {string} content - 内容
 */
function showPopupInfo(title, content) {
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'infoModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'infoModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="infoModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">关闭</button>
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
}
