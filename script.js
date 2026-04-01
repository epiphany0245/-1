// DOM元素
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击导航链接关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 滚动时导航栏效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.padding = '0.8rem 2rem';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.padding = '1rem 2rem';
    }
    
    // 更新活跃的导航链接
    updateActiveLink();
});

// 更新活跃的导航链接
function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 元素进入视口动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有卡片和内容
document.querySelectorAll('.info-card, .skill-card, .contact-card, .about-description').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 技能卡片悬停效果增强
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.skill-icon').style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.skill-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// 标签点击效果
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// 按钮点击波纹效果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 打字效果（可选增强）
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 鼠标跟随效果（可选）
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        const speed = (index + 1) * 0.02;
        const xOffset = (x - 0.5) * 50 * speed;
        const yOffset = (y - 0.5) * 50 * speed;
        
        card.style.transform = `translateY(${yOffset}px) translateX(${xOffset}px)`;
    });
});

// 重置鼠标跟随效果
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) translateX(0)';
    });
});

// 控制台彩蛋
console.log('%c欢迎来到我的个人主页！', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%c感谢你的访问！', 'color: #FFD700; font-size: 16px;');
console.log('%c如果你对我的作品感兴趣，欢迎联系我！', 'color: #b0b0b0; font-size: 14px;');

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用节流优化滚动事件
window.addEventListener('scroll', throttle(() => {
    // 滚动相关的优化处理
}, 100));

// 图片懒加载（如果有的话）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 防止移动端双击缩放
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    const lastTouch = e.target.dataset.lastTouch || 0;
    const delta = now - lastTouch;
    
    if (delta < 300 && delta > 0) {
        e.preventDefault();
    }
    
    e.target.dataset.lastTouch = now;
}, { passive: false });

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停动画等
        document.body.classList.add('page-hidden');
    } else {
        // 页面显示时恢复
        document.body.classList.remove('page-hidden');
    }
});

console.log('✨ 页面加载完成，所有交互效果已就绪！');