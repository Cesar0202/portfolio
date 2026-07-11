const skillsCategorized = [
  {
    category: "Lenguajes",
    items: [
      { name: "JavaScript", icon: "./images/skills/js.svg" },
      { name: "TypeScript", icon: "./images/skills/typescript.svg" },
      { name: "Python", icon: "./images/skills/python.svg" },
      { name: "PHP", icon: "./images/skills/php.svg" }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: "./images/skills/html.svg" },
      { name: "CSS", icon: "./images/skills/css.svg" },
      { name: "React", icon: "./images/skills/react.svg" },
      { name: "Flutter", icon: "./images/skills/flutter.svg" },
      { name: "Tailwind", icon: "./images/skills/tailwind.svg" },
      { name: "Bootstrap", icon: "./images/skills/bootstrap.svg" }
    ]
  },
  {
    category: "Backend y Bases de Datos",
    items: [
      { name: "Node.js", icon: "./images/skills/node.svg" },
      { name: "Express", icon: "./images/skills/express.svg" },
      { name: "SQL", icon: "./images/skills/sql.svg" },
      { name: "PostgreSQL", icon: "./images/skills/postgresql.svg" },
      { name: "MongoDB", icon: "./images/skills/mongodb.svg" }
    ]
  },
  {
    category: "Ciencia de Datos e IA",
    items: [
      { name: "scikit-learn", icon: "./images/skills/scikit-learn.svg" },
      { name: "Pandas", icon: "./images/skills/pandas.svg" },
      { name: "NumPy", icon: "./images/skills/numpy.svg" }
    ]
  },
  {
    category: "DevOps y Herramientas",
    items: [
      { name: "Git", icon: "./images/skills/git.svg" },
      { name: "Docker", icon: "./images/skills/docker.svg" },
      { name: "Linux", icon: "./images/skills/linux.svg" },
      { name: "Airflow", icon: "./images/skills/airflow.svg" },
      { name: "n8n", icon: "./images/skills/n8n.svg" },
      { name: "Selenium", icon: "./images/skills/selenium.svg" },
      { name: "Postman", icon: "./images/skills/postman.svg" }
    ]
  },
  {
    category: "Software y Analítica",
    items: [
      { name: "Excel", icon: "./images/skills/excel.svg" },
      { name: "Power BI", icon: "./images/skills/powerbi.svg" },
      { name: "Figma", icon: "./images/skills/figma.svg" }
    ]
  }
];

const skills = skillsCategorized.flatMap(group => group.items);

// Selecciona TODOS los contenedores de skills (tienes 3 en tu HTML)
const allSkillsContainers = document.querySelectorAll('.skills-content');

allSkillsContainers.forEach(container => {
  container.innerHTML = ""; // Limpia el contenido previo de cada contenedor

  skills.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'skills-item';

    const icon = document.createElement('img');
    icon.className = 'skills-icon';
    icon.src = skill.icon;
    icon.alt = skill.name;

    const name = document.createElement('span');
    name.className = 'skills-name';
    name.textContent = skill.name;

    item.appendChild(icon);
    item.appendChild(name);
    container.appendChild(item);
  });
});

// Renderiza las habilidades agrupadas por categorías en la vista expandida
const expandedContainer = document.querySelector('.skills-expanded-content');
if (expandedContainer) {
  expandedContainer.innerHTML = "";
  skillsCategorized.forEach(group => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'skills-group';
    
    const title = document.createElement('h3');
    title.className = 'skills-group-title';
    title.textContent = group.category;
    
    const grid = document.createElement('div');
    grid.className = 'skills-group-grid';
    
    group.items.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skills-item';

      const icon = document.createElement('img');
      icon.className = 'skills-icon';
      icon.src = skill.icon;
      icon.alt = skill.name;

      const name = document.createElement('span');
      name.className = 'skills-name';
      name.textContent = skill.name;

      item.appendChild(icon);
      item.appendChild(name);
      grid.appendChild(item);
    });
    
    groupDiv.appendChild(title);
    groupDiv.appendChild(grid);
    expandedContainer.appendChild(groupDiv);
  });
}

const dots = document.querySelectorAll('.slider-nav a');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Quita la clase activa de todas las bolas
    dots.forEach(d => d.style.backgroundColor = 'white');
    dots.forEach(d => d.style.opacity = '0.5');
    
    // Pon amarilla la bola clickeada
    dot.style.backgroundColor = '#d79b2c';
    dot.style.opacity = '1';
  });
});

let currentIndex = 0;
let autoPlayInterval;

// Función para mover al slide específico
function goToSlide(index) {
    currentIndex = index;
    dots[currentIndex].click();
}

// Inicia el ciclo automático de 2 segundos
function startAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        goToSlide(currentIndex);
    }, 2000); // 2 segundos exactos
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        // 1. Estética de la bola
        dots.forEach(d => {
            d.style.backgroundColor = 'white';
            d.style.opacity = '0.5';
        });
        dot.style.backgroundColor = '#d79b2c';
        dot.style.opacity = '1';

        // 2. Si el clic es del usuario (humano), pausamos el mundo
        if (e.isTrusted) {
            clearInterval(autoPlayInterval); // Detiene el autoplay de 2s de inmediato
            
            // Reinicia el autoplay tras 5 segundos exactos
            setTimeout(() => {
                startAutoPlay();
            }, 5000); 
        }
    });
});

// Arrancar el carrusel al cargar
startAutoPlay();

// Pausar el carrusel al poner el mouse encima, reanudar al quitarlo
const projectsSlider = document.querySelector('.projects-slider');
if (projectsSlider) {
    projectsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    projectsSlider.addEventListener('mouseleave', () => {
        // Solo reanudar si no hay ninguna tarjeta expandida en toda la página
        const anyExpanded = document.querySelector('.content-item.expanded') !== null;
        if (!anyExpanded) {
            startAutoPlay();
        }
    });
}

// --- Lógica para expandir/contraer tarjetas por clic ---
const toggleButtons = document.querySelectorAll('.card-toggle-btn');

toggleButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = button.closest('.content-item');
    if (!card) return;

    // 1. Cerrar cualquier otra tarjeta que esté expandida
    document.querySelectorAll('.content-item.expanded').forEach(expandedCard => {
      if (expandedCard !== card) {
        expandedCard.classList.remove('expanded');
        const otherBtn = expandedCard.querySelector('.card-toggle-btn');
        if (otherBtn) {
          otherBtn.setAttribute('aria-label', 'Expandir');
        }
      }
    });

    // 2. Alternar la clase en la tarjeta actual
    card.classList.toggle('expanded');

    // 3. Actualizar el aria-label para accesibilidad
    if (card.classList.contains('expanded')) {
      button.setAttribute('aria-label', 'Cerrar');
    } else {
      button.setAttribute('aria-label', 'Expandir');
    }

    // 4. Controlar el Autoplay del carrusel de proyectos (se detiene al expandir, se reanuda al cerrar)
    const anyExpanded = document.querySelector('.content-item.expanded') !== null;
    if (anyExpanded) {
      clearInterval(autoPlayInterval);
    } else {
      startAutoPlay();
    }
  });
});
