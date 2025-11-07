document.addEventListener('DOMContentLoaded', function() {

    // Мобильді меню
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Header-дің жабысуы
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Төмен қарай scroll
            if (scrollTop > 100) {
                 header.style.top = '-100px';
            }
        } else {
            // Жоғары қарай scroll
            header.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    // Жобалар бетіндегі фильтр
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Active класын ауыстыру
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Жобалар галереясы үшін Modal
    const modal = document.getElementById('project-modal');
    if (modal) {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.querySelector('.close-btn');

        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img').src;
                const title = item.querySelector('h3').innerText;
                const desc = item.querySelector('p').innerText;

                modalImage.src = img;
                modalTitle.innerText = title;
                modalDescription.innerText = `Орналасқан жері: ${desc}. Бұл біздің ең үздік жобаларымыздың бірі. Заманауи дизайн мен сапалы материалдардың үйлесімі.`;
                
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Байланыс формасын тексеру
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formMessage = document.getElementById('form-message');
            
            // Қарапайым тексеру
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                formMessage.textContent = 'Барлық өрістерді толтырыңыз!';
                formMessage.style.color = 'red';
                return;
            }

            // "Жіберу" процесін имитациялау
            formMessage.textContent = 'Хабарлама жіберілуде...';
            formMessage.style.color = 'orange';

            setTimeout(() => {
                formMessage.textContent = 'Хабарламаңыз сәтті жіберілді! Біз сізбен жақын арада хабарласамыз.';
                formMessage.style.color = 'green';
                contactForm.reset();
            }, 2000);
        });
    }

    // Басты беттегі жобалар каруселі
    const projectsCarousel = document.querySelector('.projects-carousel');
    if (projectsCarousel) {
        const projects = [
            { img: 'https://via.placeholder.com/1200x600?text=Жоба+1', title: 'Заманауи Вилла' },
            { img: 'https://via.placeholder.com/1200x600?text=Жоба+2', title: 'Кеңсе Ғимараты' },
            { img: 'https://via.placeholder.com/1200x600?text=Жоба+3', title: 'Сауда Орталығы' }
        ];

        let currentIndex = 0;
        
        function showProject(index) {
            projectsCarousel.innerHTML = `
                <div class="carousel-item">
                    <img src="${projects[index].img}" alt="${projects[index].title}">
                    <h3>${projects[index].title}</h3>
                </div>
            `;
        }
        
        showProject(currentIndex);
        
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % projects.length;
            showProject(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            showProject(currentIndex);
        });
        
        setInterval(() => {
            nextBtn.click();
        }, 5000); // 5 секунд сайын ауысады
    }
    
    // Элементтердің пайда болу анимациясы
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animation');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('section > *, .feature-item, .service-card, .team-member, .timeline-item');
    hiddenElements.forEach(el => observer.observe(el));
    
    // CSS-ке анимация үшін қосымша стильдер
    const style = document.createElement('style');
    style.innerHTML = `
        .show-animation {
            animation: fadeInUp 1s ease-out;
            animation-fill-mode: both;
        }
    `;
    document.head.appendChild(style);

});
