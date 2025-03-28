/**
 * 骨骼肌：结构与功能 - 主脚本文件
 * 处理页面基本功能和交互
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化工具提示
    initializeTooltips();
    
    // 初始化滚动监听
    initializeScrollSpy();
    
    // 初始化返回顶部按钮
    initializeBackToTop();
    
    // 初始化深色模式切换
    initializeDarkMode();
    
    // 初始化字体大小调整
    initializeFontSize();
    
    // 初始化进度保存
    initializeProgressTracking();
    
    // 初始化开始学习按钮
    initializeStartButton();
});

/**
 * 初始化工具提示
 */
function initializeTooltips() {
    // 使用Bootstrap的工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * 初始化滚动监听，用于更新导航状态
 */
function initializeScrollSpy() {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 获取所有章节
        const sections = document.querySelectorAll('section[id]');
        
        // 更新导航状态
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 移除所有活动状态
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加当前活动状态
                document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    });
}

/**
 * 初始化返回顶部按钮
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // 点击返回顶部
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 初始化深色模式切换
 */
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');
    
    // 检查本地存储中的深色模式设置
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // 应用初始设置
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // 切换深色模式
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // 更新图标
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

/**
 * 初始化字体大小调整
 */
function initializeFontSize() {
    const fontSizeButton = document.getElementById('fontSizeIncrease');
    
    // 检查本地存储中的字体大小设置
    const isLargeText = localStorage.getItem('largeText') === 'true';
    
    // 应用初始设置
    if (isLargeText) {
        document.body.classList.add('large-text');
    }
    
    // 切换字体大小
    fontSizeButton.addEventListener('click', function() {
        document.body.classList.toggle('large-text');
        
        // 保存设置
        if (document.body.classList.contains('large-text')) {
            localStorage.setItem('largeText', 'true');
        } else {
            localStorage.setItem('largeText', 'false');
        }
    });
}

/**
 * 初始化进度跟踪
 */
function initializeProgressTracking() {
    const saveProgressButton = document.getElementById('saveProgress');
    const resetProgressButton = document.getElementById('resetProgress');
    const progressBar = document.getElementById('progressBar');
    
    // 加载保存的进度
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        updateProgressBar(progress.percentage);
    }
    
    // 保存进度
    saveProgressButton.addEventListener('click', function() {
        // 计算当前进度
        const sections = document.querySelectorAll('.module-section');
        const totalSections = sections.length;
        
        // 简单计算：基于滚动位置估算已完成的部分
        const scrollPosition = window.scrollY;
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.min(Math.round((scrollPosition / documentHeight) * 100), 100);
        
        // 保存进度
        const progress = {
            timestamp: new Date().toISOString(),
            percentage: scrollPercentage,
            lastSection: getCurrentSection()
        };
        
        localStorage.setItem('courseProgress', JSON.stringify(progress));
        updateProgressBar(scrollPercentage);
        
        // 显示确认消息
        alert('进度已保存！');
    });
    
    // 重置进度
    resetProgressButton.addEventListener('click', function() {
        if (confirm('确定要重置学习进度吗？')) {
            localStorage.removeItem('courseProgress');
            updateProgressBar(0);
        }
    });
}

/**
 * 更新进度条
 */
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
    progressBar.textContent = percentage + '%';
}

/**
 * 获取当前章节
 */
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY;
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section.getAttribute('id');
        }
    }
    
    return null;
}

/**
 * 初始化开始学习按钮
 */
function initializeStartButton() {
    const startButton = document.getElementById('startCourse');
    
    startButton.addEventListener('click', function() {
        // 滚动到第一个模块
        const firstModule = document.getElementById('module1');
        if (firstModule) {
            firstModule.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
