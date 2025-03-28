/**
 * 骨骼肌：结构与功能 - 测验功能脚本
 * 处理页面中的测验和评估功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化测验功能
    initializeQuizFunctions();
});

/**
 * 初始化测验功能
 */
function initializeQuizFunctions() {
    // 这里将在后续开发中添加具体的测验功能代码
    console.log('测验功能准备就绪');
}

/**
 * 创建多选题测验
 * @param {string} containerId - 容器元素的ID
 * @param {Array} questions - 问题数组
 */
function createMultipleChoiceQuiz(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建测验表单
    const form = document.createElement('form');
    form.className = 'quiz-form';
    
    // 添加问题
    questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question mb-4';
        
        // 问题标题
        const questionTitle = document.createElement('h4');
        questionTitle.className = 'quiz-question-title';
        questionTitle.textContent = `${qIndex + 1}. ${question.text}`;
        questionDiv.appendChild(questionTitle);
        
        // 选项
        question.options.forEach((option, oIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'form-check';
            
            const input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'radio';
            input.name = `question-${qIndex}`;
            input.id = `question-${qIndex}-option-${oIndex}`;
            input.value = oIndex;
            
            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = `question-${qIndex}-option-${oIndex}`;
            label.textContent = option;
            
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            questionDiv.appendChild(optionDiv);
        });
        
        form.appendChild(questionDiv);
    });
    
    // 提交按钮
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = '提交答案';
    submitButton.addEventListener('click', function() {
        evaluateQuiz(form, questions);
    });
    
    form.appendChild(submitButton);
    container.appendChild(form);
}

/**
 * 评估测验结果
 * @param {HTMLFormElement} form - 测验表单
 * @param {Array} questions - 问题数组
 */
function evaluateQuiz(form, questions) {
    let score = 0;
    let feedback = '';
    
    // 检查每个问题的答案
    questions.forEach((question, qIndex) => {
        const selectedOption = form.querySelector(`input[name="question-${qIndex}"]:checked`);
        
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            
            // 检查是否正确
            if (selectedValue === question.correctAnswer) {
                score++;
                feedback += `<p>问题 ${qIndex + 1}: <span class="text-success">正确</span></p>`;
            } else {
                feedback += `<p>问题 ${qIndex + 1}: <span class="text-danger">错误</span>. 正确答案是: ${question.options[question.correctAnswer]}</p>`;
            }
        } else {
            feedback += `<p>问题 ${qIndex + 1}: <span class="text-warning">未回答</span></p>`;
        }
    });
    
    // 计算百分比得分
    const percentScore = Math.round((score / questions.length) * 100);
    
    // 显示结果
    showQuizResults(percentScore, feedback);
}

/**
 * 显示测验结果
 * @param {number} score - 得分百分比
 * @param {string} feedback - 反馈HTML
 */
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
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="quizResultModalLabel">测验结果</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3 class="${resultClass}">${resultTitle} - ${score}%</h3>
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
        // 重置表单
        const forms = document.querySelectorAll('.quiz-form');
        forms.forEach(form => {
            form.reset();
        });
    });
}

/**
 * 创建拖放匹配练习
 * @param {string} containerId - 容器元素的ID
 * @param {Array} items - 匹配项数组
 */
function createDragDropExercise(containerId, items) {
    // 这里将在后续开发中添加具体的拖放匹配练习代码
    console.log('拖放匹配练习功能准备就绪');
}

/**
 * 创建标记图像练习
 * @param {string} containerId - 容器元素的ID
 * @param {string} imageSrc - 图像路径
 * @param {Array} markers - 标记点数组
 */
function createImageLabelingExercise(containerId, imageSrc, markers) {
    // 这里将在后续开发中添加具体的图像标记练习代码
    console.log('图像标记练习功能准备就绪');
}

/**
 * 创建步骤排序练习
 * @param {string} containerId - 容器元素的ID
 * @param {Array} steps - 步骤数组
 */
function createSequencingExercise(containerId, steps) {
    // 这里将在后续开发中添加具体的步骤排序练习代码
    console.log('步骤排序练习功能准备就绪');
}
