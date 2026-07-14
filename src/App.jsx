import React, { useEffect, useMemo, useRef, useState } from 'react';

const tabs = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'stories', label: 'Historias', icon: 'story' },
  { id: 'explore', label: 'Explorar', icon: 'explore' },
  { id: 'community', label: 'Comunidad', icon: 'community' },
  { id: 'profile', label: 'Perfil', icon: 'profile' }
];

const onboardingSlides = [
  {
    title: 'Llegar sin perder tu raíz',
    copy: 'Una app cálida para encontrar historias, apoyo y sentido de pertenencia en Cartagena.',
    accent: 'Tu nueva red de acompañamiento, a un toque.',
    icon: 'leaf'
  },
  {
    title: 'Aprende de quienes ya llegaron',
    copy: 'Escucha relatos reales, consejos útiles y recursos que hacen más amable la adaptación.',
    accent: 'La ciudad se entiende mejor cuando la compartes.',
    icon: 'book'
  },
  {
    title: 'Construye tu comunidad',
    copy: 'Conecta con mentores, actividades y personas que entienden lo que estás viviendo.',
    accent: 'Pertenecer empieza con un primer gesto.',
    icon: 'people'
  }
];

const stories = [
  {
    id: 1,
    name: 'Mina',
    origin: 'Medellín',
    career: 'Diseño',
    timeInCity: '7 meses',
    emotion: 'Nostalgia',
    difficulty: 'Hablar con la gente',
    advice: 'Aprendí que el barrio se hace más habitable cuando compartes un café y una historia.',
    quote: 'No necesitaba una solución rápida, necesitaba una puerta abierta.',
    highlight: 'La primera vez que me sentí “en casa” fue en el mercado de Getsemaní.'
  },
  {
    id: 2,
    name: 'Sofía',
    origin: 'Bogotá',
    career: 'Economía',
    timeInCity: '3 meses',
    emotion: 'Ansiedad',
    difficulty: 'La multitud y el calor',
    advice: 'Empecé a caminar temprano, antes de que la ciudad me absorbiera por completo.',
    quote: 'El sol no me asustó, me enseñó a ir más despacio.',
    highlight: 'La brisa de la noche en la Bocana cambió mi estado de ánimo.'
  },
  {
    id: 3,
    name: 'León',
    origin: 'Cali',
    career: 'Arquitectura',
    timeInCity: '11 meses',
    emotion: 'Confianza',
    difficulty: 'Encontrar gente de confianza',
    advice: 'A veces la amistad nace de un gesto pequeño: invitar a un helado o a caminar.',
    quote: 'El barrio no se entiende de golpe, se aprende con el cuerpo.',
    highlight: 'Encontré mi círculo en un taller de cocina y memoria.'
  },
  {
    id: 4,
    name: 'Ari',
    origin: 'Barranquilla',
    career: 'Educación',
    timeInCity: '1 año',
    emotion: 'Bienestar',
    difficulty: 'La lengua y las costumbres',
    advice: 'Aprendí a preguntar sin miedo: “¿cómo se llama esto?”',
    quote: 'Cada pregunta me dio una pequeña forma de pertenecer.',
    highlight: 'Los saludos del barrio me ayudaron a suavizar la distancia.'
  },
  {
    id: 5,
    name: 'Camilo',
    origin: 'Quibdó',
    career: 'Ingeniería Ambiental',
    timeInCity: '5 meses',
    emotion: 'Orgullo',
    difficulty: 'Sentir que mi acento se notaba demasiado',
    advice: 'Dejé de esconder mi forma de hablar; mi acento del Pacífico se volvió parte de mi identidad, no un problema de lenguaje.',
    quote: 'Mi voz también es una raíz.',
    highlight: 'En un conversatorio de la universidad me pidieron compartir palabras de mi región y sentí que por fin pertenecía.'
  },
  {
    id: 6,
    name: 'Yamile',
    origin: 'Riohacha',
    career: 'Antropología',
    timeInCity: '4 meses',
    emotion: 'Nostalgia',
    difficulty: 'Extrañar la comida de mi tierra',
    advice: 'Empecé a cocinar con otras estudiantes wayuu los domingos; la comida nos volvió a unir con nuestra tierra.',
    quote: 'El sabor de mi tierra me recuerda quién soy incluso lejos de casa.',
    highlight: 'Un grupo de compañeras empezó a pedirme recetas y ahora cocinamos juntas cada mes.'
  },
  {
    id: 7,
    name: 'Simón',
    origin: 'Bucaramanga',
    career: 'Ingeniería de Sistemas',
    timeInCity: '2 meses',
    emotion: 'Ansiedad',
    difficulty: 'El calor y la ansiedad social',
    advice: 'Aprendí técnicas de respiración y empecé a unirme a caminatas grupales para no aislarme.',
    quote: 'La ansiedad bajaba cada vez que encontraba una cara conocida en el camino.',
    highlight: 'El círculo de adaptación de los domingos se volvió mi ancla semanal.'
  },
  {
    id: 8,
    name: 'Renata',
    origin: 'São Paulo, Brasil',
    career: 'Relaciones Internacionales',
    timeInCity: '8 meses',
    emotion: 'Curiosidad',
    difficulty: 'El idioma y los modismos locales',
    advice: 'Pedí que me corrigieran el español caribeño sin miedo; reírme de mis propios errores de lenguaje me acercó a la gente.',
    quote: 'Equivocarme en otro idioma terminó abriéndome más puertas que hablar perfecto.',
    highlight: 'Ahora hago bromas en "costeño" y mis amigas dicen que ya casi soy cartagenera.'
  },
  {
    id: 9,
    name: 'Julián',
    origin: 'Zona rural de Montería',
    career: 'Medicina',
    timeInCity: '1 año',
    emotion: 'Determinación',
    difficulty: 'Sentirme menos preparado que mis compañeros de ciudad',
    advice: 'Formé un grupo de estudio con otros estudiantes de zonas rurales; entre todos llenamos los vacíos sin sentir vergüenza.',
    quote: 'Nadie llega sabiendo todo, solo llega con ganas distintas.',
    highlight: 'Ese grupo de estudio hoy es mi red de amistades más cercana en la universidad.'
  },
  {
    id: 10,
    name: 'Estefanía',
    origin: 'Ciudad de México, México',
    career: 'Diseño Gráfico',
    timeInCity: '6 meses',
    emotion: 'Soledad',
    difficulty: 'Hacer amistades verdaderas, no solo conocidos',
    advice: 'Dejé de esperar que la amistad llegara sola y empecé a invitar yo primero a tomar café.',
    quote: 'La soledad se rompe con una invitación, no con un milagro.',
    highlight: 'Hoy tengo un grupo de amigas con las que salgo cada semana sin falta.'
  },
  {
    id: 11,
    name: 'Andrés',
    origin: 'Ibagué',
    career: 'Música',
    timeInCity: '9 meses',
    emotion: 'Alegría',
    difficulty: 'Encontrar espacios para tocar y compartir mi música',
    advice: 'Empecé a tocar guitarra en el parque los viernes; la música se volvió mi manera de hacer amigos sin necesitar muchas palabras.',
    quote: 'La música habla el idioma que todos entienden, incluso lejos de casa.',
    highlight: 'Ahora toco con una banda de estudiantes que se formó gracias a esas tardes en el parque.'
  },
  {
    id: 12,
    name: 'Laura',
    origin: 'Neiva',
    career: 'Psicología',
    timeInCity: '3 meses',
    emotion: 'Gratitud',
    difficulty: 'Pedir ayuda sin sentir que era una carga',
    advice: 'Aprendí que pedir apoyo emocional no me hacía débil; mi mentora me enseñó a nombrar lo que sentía.',
    quote: 'Pedir ayuda también es una forma de valentía.',
    highlight: 'Mi mentora se convirtió en la primera persona a la que llamo cuando algo me abruma.'
  },
  {
    id: 13,
    name: 'Kevin',
    origin: 'Cúcuta',
    career: 'Administración de Empresas',
    timeInCity: '2 meses',
    emotion: 'Nostalgia',
    difficulty: 'Extrañar la comida de la casa de mi mamá',
    advice: 'Aprendí a cocinar arepas de mi tierra los domingos, y ahora comparto la mesa con otros estudiantes que también extrañan su comida.',
    quote: 'Una comida compartida cura más nostalgia que cualquier consejo.',
    highlight: 'Ese ritual dominical se volvió mi manera de sentir un poco de casa cada semana.'
  },
  {
    id: 14,
    name: 'Valentina',
    origin: 'Popayán',
    career: 'Derecho',
    timeInCity: '7 meses',
    emotion: 'Confianza',
    difficulty: 'Aprender a moverme sola por la ciudad',
    advice: 'Empecé por rutas cortas de día y fui ampliando mi radio poco a poco, acompañada de otras estudiantes.',
    quote: 'La ciudad deja de dar miedo cuando empiezas a reconocerla paso a paso.',
    highlight: 'Ahora soy yo quien guía a las nuevas estudiantes de derecho por el centro histórico.'
  },
  {
    id: 15,
    name: 'Tomás',
    origin: 'Pasto',
    career: 'Ingeniería Civil',
    timeInCity: '5 meses',
    emotion: 'Bienestar',
    difficulty: 'El cambio brusco de clima frío a calor extremo',
    advice: 'Aprendí a organizar mis horarios de estudio para las horas de menos calor y a hidratarme constantemente.',
    quote: 'El cuerpo también necesita adaptarse, no solo el corazón.',
    highlight: 'Ahora disfruto las tardes de playa que antes me parecían impensables.'
  },
  {
    id: 16,
    name: 'Manuela',
    origin: 'Manizales',
    career: 'Trabajo Social',
    timeInCity: '10 meses',
    emotion: 'Orgullo',
    difficulty: 'Sentir que mi forma de hablar paisa llamaba la atención',
    advice: 'Aprendí a reírme de las bromas sobre mi acento y a usarlo como una forma de conectar en vez de esconderme.',
    quote: 'Mi acento dejó de ser un problema de lenguaje y se volvió una carta de presentación.',
    highlight: 'Ahora mis amigas me piden que les enseñe palabras paisas para "sonar como yo".'
  }
];

const mentors = [
  { name: 'Diana', role: 'Mentora cultural', vibe: 'Conecta con estudiantes de primer ingreso', availability: 'Hoy · 18:00', icon: 'compass' },
  { name: 'Emilio', role: 'Guía de barrio', vibe: 'Conoce rutas tranquilas y lugares de calma', availability: 'Mañana · 10:30', icon: 'map' },
  { name: 'Valeria', role: 'Mediadora de comunidad', vibe: 'Especialista en transición emocional', availability: 'Viernes · 16:00', icon: 'handshake' },
  { name: 'Rafael', role: 'Mentor académico', vibe: 'Apoya en la elección de materias y horarios', availability: 'Miércoles · 14:00', icon: 'cap' },
  { name: 'Camila', role: 'Mentora de bienestar', vibe: 'Acompaña procesos emocionales y de ansiedad', availability: 'Lunes · 17:00', icon: 'wellness' }
];

const peers = [
  { name: 'Nicolás', role: 'Compañero · Ingeniería, 2do semestre', vibe: 'Lleva 3 meses en Cartagena, también es de Bucaramanga', availability: 'Disponible para café', icon: 'backpack' },
  { name: 'Daniela', role: 'Compañera · Diseño, 3er semestre', vibe: 'Le encanta explorar cafés y espacios de arte', availability: 'Disponible los fines de semana', icon: 'palette' },
  { name: 'Esteban', role: 'Compañero · Derecho, 1er semestre', vibe: 'Recién llegado de Cali, busca grupo de estudio', availability: 'Disponible entre semana', icon: 'books' },
  { name: 'Paula', role: 'Compañera · Medicina, 4to semestre', vibe: 'Organiza caminatas y actividades al aire libre', availability: 'Disponible sábados', icon: 'hike' },
  { name: 'Tatiana', role: 'Compañera · Psicología, 2do semestre', vibe: 'Le gusta acompañar a estudiantes con ansiedad social', availability: 'Disponible por las tardes', icon: 'chat' }
];

const places = [
  { name: 'La Casa del Agua', category: 'Café y pausa', why: 'Ideal para leer con calma y hablar con alguien.', mood: 'Silencio y luz', icon: 'coffee' },
  { name: 'Cafetería El Retiro', category: 'Café y pausa', why: 'Un rincón silencioso cerca del campus, ideal para estudiar con calma.', mood: 'Calma y concentración', icon: 'coffee' },
  { name: 'Mercado de Getsemaní', category: 'Comida y barrio', why: 'Te ayuda a aprender el ritmo del territorio.', mood: 'Color y conversación', icon: 'food' },
  { name: 'Fritos de la Popa', category: 'Comida y barrio', why: 'Puesto callejero clásico para probar comida costeña auténtica y barata.', mood: 'Sabor y calle', icon: 'food' },
  { name: 'Muelle de la Marina', category: 'Paseo', why: 'La vista del mar baja la ansiedad de la semana.', mood: 'Cielo y viento', icon: 'boat' },
  { name: 'Cerro de la Popa', category: 'Paseo', why: 'Mirador con vista completa de la ciudad, ideal para despejar la mente.', mood: 'Altura y perspectiva', icon: 'mountain' },
  { name: 'Taller de Cocina de Tita', category: 'Memoria', why: 'Una forma amable de aprender costumbres.', mood: 'Calor y recuerdo', icon: 'cooking' },
  { name: 'Archivo Histórico de Cartagena', category: 'Memoria', why: 'Un lugar para entender la historia de la ciudad que ahora habitas.', mood: 'Raíces y contexto', icon: 'archive' },
  { name: 'Centro de Bienestar Universitario', category: 'Bienestar', why: 'Espacio de acompañamiento psicológico gratuito para estudiantes foráneos.', mood: 'Cuidado y escucha', icon: 'wellness' },
  { name: 'Playa de Manzanillo del Mar', category: 'Bienestar', why: 'Una playa menos concurrida ideal para bajar el estrés de la semana.', mood: 'Silencio y mar', icon: 'wellness' },
  { name: 'Casa de la Cultura Getsemaní', category: 'Cultura', why: 'Talleres de danza, teatro y música abiertos a nuevos estudiantes.', mood: 'Expresión y comunidad', icon: 'culture' },
  { name: 'Museo de Arte Moderno', category: 'Cultura', why: 'Exposiciones locales que ayudan a entender la identidad cartagenera.', mood: 'Arte y memoria', icon: 'museum' }
];

const placeCategories = ['Todo', 'Café y pausa', 'Comida y barrio', 'Paseo', 'Memoria', 'Bienestar', 'Cultura'];

const tips = [
  'Lleva agua y una pequeña conversación para el primer día.',
  'Los barrios más tranquilos para caminar temprano son Manga y Getsemaní.',
  'Si te sientes perdido, busca una panadería y pregunta por la ruta más bonita.',
  'La gente de Cartagena suele responder mejor a una pregunta abierta que a un “estoy perdido”.'
];

const activities = [
  { title: 'Cocina y memoria', time: 'Jueves · 19:00', note: 'Compartimos recetas y relatos de hogar.', icon: 'cooking' },
  { title: 'Caminata de la tarde', time: 'Sábado · 17:30', note: 'Paseo por el bastión con puntos de conversación.', icon: 'walk' },
  { title: 'Círculo de adaptación', time: 'Domingo · 15:00', note: 'Espacio de escucha y apoyo mutuo.', icon: 'circle' }
];

const manualChapters = [
  { title: 'Primeros días', icon: 'sun' },
  { title: 'Lenguaje local', icon: 'language' },
  { title: 'Clima y costumbres', icon: 'weather' },
  { title: 'Movilidad', icon: 'mobility' },
  { title: 'Amistades', icon: 'people' },
  { title: 'Errores comunes', icon: 'idea' }
];

const recipes = [
  { name: 'Té de guayaba y silencio', note: 'Para las noches que piden bajar la velocidad.' },
  { name: 'Aguacate con sal y limón', note: 'Un ritual de comida simple y acogedor.' },
  { name: 'Café con anís para la mañana', note: 'Cuando el día empieza cargado y necesitas calma.' }
];

const notifications = [
  { id: 1, title: 'Diana te respondió', body: 'Tu mentora cultural dejó un mensaje sobre el encuentro del jueves.', time: 'Hace 12 min', icon: 'chat' },
  { id: 2, title: 'Nueva historia cerca de ti', body: 'Un estudiante de Cali compartió cómo encontró su primer círculo.', time: 'Hace 2 h', icon: 'spark' },
  { id: 3, title: 'Recordatorio de actividad', body: 'Círculo de adaptación este domingo a las 15:00.', time: 'Ayer', icon: 'circle' }
];

const interestOptions = ['hacer amigos', 'entender la ciudad', 'orientación emocional', 'lugares útiles', 'actividades culturales', 'apoyo entre pares', 'recomendaciones prácticas', 'bienestar', 'comida y memoria'];

const initialDraft = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  origin: '',
  university: '',
  career: '',
  semester: '',
  timeInCartagena: '',
  age: '',
  gender: '',
  avatarUrl: null,
  contributionsCount: 0,
  experienceType: 'recién llegado',
  interests: ['hacer amigos', 'entender la ciudad'],
  notifications: true,
  location: false,
  privacy: false,
  terms: false
};

const defaultUser = {
  id: 1,
  fullName: 'Ana Torres',
  email: 'ana@raiz.com',
  password: 'Raiz1234',
  origin: 'Bogotá',
  university: 'Universidad Jorge Tadeo Lozano',
  career: 'Diseño',
  semester: '4°',
  timeInCartagena: '2 meses',
  age: '21',
  gender: 'Mujer',
  avatarUrl: null,
  contributionsCount: 0,
  experienceType: 'recién llegado',
  interests: ['hacer amigos', 'entender la ciudad', 'apoyo entre pares'],
  notifications: true,
  location: false,
  terms: true,
  privacy: true
};

function AppShell({ children, theme }) {
  return (
    <div className="app-shell">
      <div className={`phone-frame ${theme === 'dark' ? 'theme-dark' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <Icon name="signal" />
        <Icon name="wifi" />
        <Icon name="battery" />
      </div>
    </div>
  );
}

function TopBar({ title, subtitle, action }) {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">{subtitle}</p>
        <h3 className="title-sm">{title}</h3>
      </div>
      {action}
    </header>
  );
}

function ScreenContent({ children }) {
  return <div className="screen-content">{children}</div>;
}

function Icon({ name, className = '' }) {
  const svgClassName = `svg-icon ${className}`.trim();

  switch (name) {
    case 'home':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20H4z" /><path d="M9 20v-6h6v6" /></svg>;
    case 'story':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h7a3 3 0 0 1 3 3v11H9a3 3 0 0 0-3 3V5z" /><path d="M18 5h-7a3 3 0 0 0-3 3v11h7a3 3 0 0 1 3 3V5z" /></svg>;
    case 'explore':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.25" /><path d="m14.8 9.2-1.7 5.3-5.2 1.7 1.7-5.3 5.2-1.7Z" /></svg>;
    case 'community':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8.2" r="2.5" /><circle cx="16" cy="8.2" r="2.5" /><path d="M4.6 18.2c.8-2.8 2.8-4.2 5.4-4.2s4.6 1.4 5.4 4.2" /><path d="M12 13.6c.9-1.6 2.2-2.4 4-2.4 2.4 0 4 1.4 4.7 4" /></svg>;
    case 'profile':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" /><path d="M5.4 19c1.3-3.4 4-5 6.6-5s5.3 1.6 6.6 5" /></svg>;
    case 'leaf':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 5.5C11 4.8 5.5 10.4 5.5 16.5 5.5 18 6.6 19 8 19c6.1 0 11.7-5.5 10.5-13.5Z" /><path d="M8 16c2.2-1.6 4.7-3.7 7-7" /></svg>;
    case 'book':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h5.5c1.9 0 3.5 1.6 3.5 3.5V19H9.5C7 19 5 17 5 14.5V6a1 1 0 0 1 1-1Z" /><path d="M18 5h-5.5C10.6 5 9 6.6 9 8.5V19h5.5C17 19 19 17 19 14.5V6a1 1 0 0 0-1-1Z" /></svg>;
    case 'people':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="2.4" /><circle cx="16.5" cy="9" r="2" /><path d="M4.8 18c.7-2.8 2.6-4.3 5.2-4.3S14.5 15.2 15.2 18" /><path d="M13.2 18c.4-1.9 1.8-3.1 3.6-3.1 1.6 0 2.9.9 3.4 3.1" /></svg>;
    case 'compass':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m14.8 9.2-1.7 5.3-5.2 1.7 1.7-5.3 5.2-1.7Z" /></svg>;
    case 'map':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7.5 9 6l6 1.5L19 6v10.5L15 18l-6-1.5L5 18z" /><path d="M9 6v10.5M15 7.5V18" /></svg>;
    case 'handshake':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12.5 10.2 9.3a2 2 0 0 1 2.8 0l1 1" /><path d="M5 14l3.2-3.2a2 2 0 0 1 2.8 0l.5.5" /><path d="M13.5 10.5 16 8a2 2 0 0 1 2.8 0L21 10.2" /><path d="M8 15.5 10 17a2 2 0 0 0 2.5 0l2.1-1.6" /><path d="M14.5 14.5 16 16a2 2 0 0 0 2.8 0l1.2-1.2" /></svg>;
    case 'cap':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5 3 9.5 12 14l9-4.5-9-4.5Z" /><path d="M6 11v3.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11" /></svg>;
    case 'wellness':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 18c-2.2 0-4-1.8-4-4 0-2.1 1.6-3.9 3.7-4.1C11.9 8.1 12 9.8 12 12c0 2.2-.1 4-.3 6Z" /><path d="M12 18c2.2 0 4-1.8 4-4 0-2.1-1.6-3.9-3.7-4.1-.1 2.2-.2 3.9-.2 6.1 0 .8 0 1.5-.1 2Z" /><circle cx="12" cy="12" r="2.1" /></svg>;
    case 'backpack':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5A3 3 0 0 1 12 4a3 3 0 0 1 3 2.5V7H9z" /><path d="M7.5 7h9A2.5 2.5 0 0 1 19 9.5V19H5V9.5A2.5 2.5 0 0 1 7.5 7Z" /><path d="M9 12h6" /></svg>;
    case 'palette':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 0 0 0 16h1.6a1.4 1.4 0 0 0 1.4-1.4V17a1.8 1.8 0 0 1 1.8-1.8H18a2 2 0 0 0 0-4h-.2A1.8 1.8 0 0 1 16 9.4V8a4 4 0 0 0-4-4Z" /><circle cx="8.4" cy="10" r=".9" /><circle cx="9.8" cy="14.2" r=".9" /><circle cx="13" cy="12.2" r=".9" /></svg>;
    case 'books':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h10a2 2 0 0 1 2 2v1H8A2 2 0 0 0 6 10V5Z" /><path d="M6 10h12v9H8a2 2 0 0 1-2-2v-7Z" /><path d="M8.5 12h6" /></svg>;
    case 'hike':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19 11 7l4 7 2-3 3 8H4Z" /><path d="M12 7l2-3" /></svg>;
    case 'chat':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4.5 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" /></svg>;
    case 'coffee':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10h10v3a4 4 0 0 1-4 4H8a2 2 0 0 1-2-2v-5Z" /><path d="M16 11h1.5A2.5 2.5 0 0 1 20 13.5 2.5 2.5 0 0 1 17.5 16H16" /><path d="M8 6c0 1 .8 1.2.8 2.1S8 9.1 8 10" /><path d="M11 6c0 1 .8 1.2.8 2.1S11 9.1 11 10" /></svg>;
    case 'food':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13c0 3.9 3.1 7 7 7s7-3.1 7-7H5Z" /><path d="M6 13c1.2-2 3.3-3.2 6-3.2S16.8 11 18 13" /></svg>;
    case 'boat':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v9" /><path d="M12 5 18 11h-6z" /><path d="M5 15h14l-2 4H7l-2-4Z" /><path d="M3 20c1.5-1 3.2-1 4.7 0 1.5 1 3.1 1 4.6 0 1.5-1 3.1-1 4.6 0 1.5 1 3.1 1 4.6 0" /></svg>;
    case 'mountain':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 19 10 8.5l3.3 5.2 2.3-2.7L20.5 19z" /><path d="M10 8.5 12 5l2 3.2" /></svg>;
    case 'cooking':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10h12v4a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-4Z" /><path d="M8 10V8a4 4 0 0 1 8 0v2" /><path d="M7 18h10" /></svg>;
    case 'archive':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14v4H5z" /><path d="M6 10h12v8H6z" /><path d="M9 13h6" /></svg>;
    case 'culture':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h10l1 5-3 8H9L6 10l1-5Z" /><path d="M9.5 11.5c.7-1 1.6-1.5 2.5-1.5s1.8.5 2.5 1.5" /></svg>;
    case 'museum':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5 12 5l8 4.5" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" /><path d="M4 18h16" /></svg>;
    case 'sun':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 4.5V3M12 21v-1.5M4.5 12H3M21 12h-1.5M6.2 6.2 5.1 5.1M18.9 18.9l-1.1-1.1M6.2 17.8 5.1 18.9M18.9 5.1l-1.1 1.1" /></svg>;
    case 'language':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H11l-4 3v-3H7a2 2 0 0 1-2-2V8a2 2 0 0 1 0-2Z" /><path d="M14 6h5a2 2 0 0 1 2 2v5" /><path d="M8 10h4M10 8v4" /></svg>;
    case 'weather':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 16h10a3 3 0 0 0 0-6 4.5 4.5 0 0 0-8.7-1.3A2.7 2.7 0 0 0 7 16Z" /><path d="M16.5 5.5c0 1.8 1.4 2.2 1.4 3.8" /></svg>;
    case 'mobility':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16h10l2-4H8l-2 4Z" /><circle cx="8" cy="18" r="1.4" /><circle cx="16" cy="18" r="1.4" /><path d="M9 12V8h5" /></svg>;
    case 'idea':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 4a5 5 0 0 0-3 9c.5.5.8 1.1 1 1.8h4c.2-.7.5-1.3 1-1.8A5 5 0 0 0 12 4Z" /></svg>;
    case 'spark':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /></svg>;
    case 'bell':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a5 5 0 0 0-5 5v3.1c0 .8-.3 1.6-.8 2.2L5 16h14l-1.2-1.7c-.5-.6-.8-1.4-.8-2.2V9a5 5 0 0 0-5-5Z" /><path d="M10 18a2 2 0 0 0 4 0" /></svg>;
    case 'plus':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>;
    case 'camera':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h2l1.5-2h3L15 7h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="3" /></svg>;
    case 'search':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="4.8" /><path d="M14.2 14.2 19 19" /></svg>;
    case 'pin':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s5-4.7 5-9a5 5 0 0 0-10 0c0 4.3 5 9 5 9Z" /><circle cx="12" cy="12" r="1.7" /></svg>;
    case 'clock':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.8 1.7" /></svg>;
    case 'heart':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.3-7-9.3A4.7 4.7 0 0 1 9.7 6c1.4 0 2.4.7 2.9 1.6C13.1 6.7 14.1 6 15.5 6A4.7 4.7 0 0 1 19 10.7C19 15.7 12 20 12 20Z" /></svg>;
    case 'heart-fill':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 20s-7-4.3-7-9.3A4.7 4.7 0 0 1 9.7 6c1.4 0 2.4.7 2.9 1.6C13.1 6.7 14.1 6 15.5 6A4.7 4.7 0 0 1 19 10.7C19 15.7 12 20 12 20Z" /></svg>;
    case 'chevron-left':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>;
    case 'chevron-right':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>;
    case 'settings':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4.7a7 7 0 0 0-1.7-1l-.3-2.4H9.5l-.3 2.4a7 7 0 0 0-1.7 1l-2.4-.7-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-.7a7 7 0 0 0 1.7 1l.3 2.4h4.8l.3-2.4a7 7 0 0 0 1.7-1l2.4.7 2-3.5-2-1.5c.1-.3.1-.7.1-1Z" /></svg>;
    case 'signal':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17v-2M9 17v-5M14 17v-8M19 17V7" /></svg>;
    case 'wifi':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9a11 11 0 0 1 14 0" /><path d="M8 12a7 7 0 0 1 8 0" /><path d="M11 15a3 3 0 0 1 2 0" /></svg>;
    case 'battery':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="10" rx="2" /><path d="M20 10h1v4h-1" /><path d="M7 12h7" /></svg>;
    case 'logout':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><path d="M10 7V5a1 1 0 0 1 1-1h8v16h-8a1 1 0 0 1-1-1v-2" /><path d="M3 12h12" /><path d="m9 8 4 4-4 4" /></svg>;
    case 'walk':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="13" cy="5.5" r="1.7" /><path d="m12 8 2 3 2 1.5" /><path d="m10 20 1.3-5.5 2-2.5 1.7 3.8L17 20" /><path d="M8 13.5 10 12" /></svg>;
    case 'circle':
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5" /><path d="M12 7v10M7 12h10" /></svg>;
    default:
      return <svg className={svgClassName} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /></svg>;
  }
}

function BottomTabBar({ activeTab, onChange }) {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button key={tab.id} className={activeTab === tab.id ? 'nav-item active' : 'nav-item'} onClick={() => onChange(tab.id)}>
          <span className="nav-icon"><Icon name={tab.icon} /></span>
          <small>{tab.label}</small>
        </button>
      ))}
    </nav>
  );
}

function Switch({ on, onToggle }) {
  return (
    <button type="button" className={on ? 'switch on' : 'switch'} onClick={onToggle} aria-pressed={on} />
  );
}

function SettingRow({ label, description, value, control, onClick, danger }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag className={danger ? 'settings-row danger' : 'settings-row'} onClick={onClick}>
      <div className="settings-row-text">
        <span className="settings-row-label">{label}</span>
        {description && <span className="settings-row-description">{description}</span>}
      </div>
      <div className="settings-row-control">
        {value && <span className="settings-row-value">{value}</span>}
        {control}
        {onClick && !control && <span className="settings-chevron"><Icon name="chevron-right" /></span>}
      </div>
    </Tag>
  );
}

function AvatarImage({ user, size }) {
  const sizeClass = size === 'large' ? ' large' : '';
  const letter = (user?.fullName || 'A').charAt(0).toUpperCase();
  if (user?.avatarUrl) {
    return <img src={user.avatarUrl} alt="" className={`avatar-photo${sizeClass}`} />;
  }
  return <div className={`avatar${sizeClass}`}>{letter}</div>;
}

function App() {
  const [view, setView] = useState('splash');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([defaultUser]);
  const [transitionKey, setTransitionKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todo');
  const [placeFilter, setPlaceFilter] = useState('Todo');
  const [selectedStory, setSelectedStory] = useState(null);
  const [storyDetailOpen, setStoryDetailOpen] = useState(false);
  const [savedStoryIds, setSavedStoryIds] = useState([1]);
  const [editProfile, setEditProfile] = useState(false);
  const [signupStep, setSignupStep] = useState(0);
  const [signupErrors, setSignupErrors] = useState({});
  const [signupDraft, setSignupDraft] = useState(initialDraft);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: true });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [contributionForm, setContributionForm] = useState({ type: 'Testimonio', title: '', note: '' });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('raiz-prestada-user');
    const storedTheme = window.localStorage.getItem('raiz-prestada-theme');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setView('main');
    }
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (view === 'main') {
      const timer = window.setTimeout(() => setLoading(false), 800);
      return () => window.clearTimeout(timer);
    }
  }, [view]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('raiz-prestada-user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('raiz-prestada-user');
    }
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem('raiz-prestada-theme', theme);
  }, [theme]);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const haystack = `${story.name} ${story.origin} ${story.career} ${story.emotion} ${story.difficulty} ${story.advice} ${story.highlight} ${story.quote}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesFilter = selectedFilter === 'Todo' || haystack.includes(selectedFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => placeFilter === 'Todo' || place.category === placeFilter);
  }, [placeFilter]);

  const openStoryDetail = (story) => {
    setSelectedStory(story);
    setStoryDetailOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTransitionKey((prev) => prev + 1);
  };

  const toggleSaveStory = (storyId) => {
    setSavedStoryIds((current) => {
      const exists = current.includes(storyId);
      const next = exists ? current.filter((id) => id !== storyId) : [...current, storyId];
      setToast(exists ? 'Quitado de tus guardados' : 'Guardado en tu colección');
      return next;
    });
  };

  const handleContribution = (event) => {
    event.preventDefault();
    setSheetOpen(false);
    setUser((prev) => prev ? { ...prev, contributionsCount: (prev.contributionsCount || 0) + 1 } : prev);
    setContributionForm({ type: 'Testimonio', title: '', note: '' });
    setToast('Tu aporte se compartió con la comunidad');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUser((prev) => prev ? { ...prev, avatarUrl: reader.result } : prev);
      showToast('Foto de perfil actualizada');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const showToast = (message) => setToast(message);

  const validateSignupStep = (step) => {
    const errors = {};
    if (step === 0) {
      if (!signupDraft.fullName.trim()) errors.fullName = 'Tu nombre es necesario.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupDraft.email)) errors.email = 'Usa un correo válido.';
      if (signupDraft.password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres.';
      if (signupDraft.confirmPassword !== signupDraft.password) errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (step === 1) {
      if (!signupDraft.origin.trim()) errors.origin = 'Tu ciudad de origen ayuda a encontrar comunidad.';
      if (!signupDraft.university.trim()) errors.university = 'La universidad es importante para conectar con pares.';
      if (!signupDraft.career.trim()) errors.career = 'Tu carrera da contexto a tus recomendaciones.';
      if (!signupDraft.semester.trim()) errors.semester = 'El semestre aporta contexto.';
      if (!signupDraft.timeInCartagena.trim()) errors.timeInCartagena = 'Tu tiempo en la ciudad ayuda a contextualizar.';
      if (!signupDraft.age.trim()) errors.age = 'Tu edad es útil para personalizar.';
    }

    if (step === 3 && signupDraft.interests.length === 0) {
      errors.interests = 'Elige al menos un interés.';
    }

    if (step === 4) {
      if (!signupDraft.terms) errors.terms = 'Debes aceptar los términos.';
      if (!signupDraft.privacy) errors.privacy = 'Debes aceptar la política de privacidad.';
    }

    return errors;
  };

  const handleSignupNext = () => {
    const errors = validateSignupStep(signupStep);
    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      showToast('Revisa los campos destacados');
      return;
    }
    setSignupErrors({});
    setSignupStep((prev) => prev + 1);
  };

  const handleSignupBack = () => {
    setSignupErrors({});
    setSignupStep((prev) => prev - 1);
  };

  const handleRegisterComplete = (event) => {
    event.preventDefault();
    const errors = validateSignupStep(signupStep);
    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      showToast('Revisa los campos destacados');
      return;
    }

    const newUser = {
      id: Date.now(),
      ...signupDraft,
      terms: true,
      privacy: true,
      notifications: signupDraft.notifications
    };

    setUsers((prev) => [newUser, ...prev]);
    setUser(newUser);
    setSignupDraft(initialDraft);
    setSignupStep(0);
    setView('main');
    setActiveTab('home');
    showToast('Bienvenid@ a Raíz Prestada');
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Ingresa tu correo y contraseña.');
      return;
    }

    const found = users.find((item) => item.email === loginForm.email && item.password === loginForm.password);
    if (!found) {
      setLoginError('No encontramos esa combinación. Prueba con ana@raiz.com / Raiz1234');
      return;
    }

    setUser(found);
    setView('main');
    setActiveTab('home');
    showToast('Sesión iniciada');
    setLoginError('');
  };

  const handleGuestEntry = () => {
    const guestUser = {
      ...defaultUser,
      id: 999,
      fullName: 'Invitado',
      email: 'guest@raiz.com',
      password: '',
      gender: '',
      avatarUrl: null,
      contributionsCount: 0,
      experienceType: 'estudiante en transición',
      interests: ['lugar útil', 'bienestar', 'apoyo entre pares']
    };
    setUser(guestUser);
    setView('main');
    setActiveTab('home');
    showToast('Entrando como invitado');
  };

  const handleLogout = () => {
    setUser(null);
    setEditProfile(false);
    setView('auth');
    setActiveTab('home');
    showToast('Sesión cerrada');
  };

  const handleConnectMentor = (name) => {
    showToast(`Solicitud enviada a ${name}`);
  };

  const handleJoinActivity = (title) => {
    showToast(`Te uniste a "${title}"`);
  };

  const handleOpenChapter = (title) => {
    showToast(`Abriendo capítulo: ${title}`);
  };

  const handleProfileSave = () => {
    if (!user) return;
    const nextUser = {
      ...user,
      fullName: user.fullName,
      origin: user.origin,
      university: user.university,
      career: user.career,
      semester: user.semester,
      timeInCartagena: user.timeInCartagena,
      age: user.age,
      experienceType: user.experienceType,
      notifications: user.notifications,
      location: user.location,
      interests: user.interests
    };
    setUser(nextUser);
    setEditProfile(false);
    showToast('Perfil actualizado');
  };

  const renderSkeleton = () => (
    <div className="skeleton-stack" aria-hidden="true">
      <div className="skeleton-card" />
      <div className="skeleton-card short" />
      <div className="skeleton-card" />
    </div>
  );

  const renderMainContent = () => {
    const name = user?.fullName?.split(' ')[0] || 'amiga';
    const progress = Math.min(92, 48 + (user?.interests?.length || 0) * 7 + (user?.experienceType === 'recién llegado' ? 8 : 0));
    const featuredStory = stories[0];

    switch (activeTab) {
      case 'home':
        return (
          <div className="screen-stack">
            <section className="hero-card">
              <div className="hero-copy">
                <p className="eyebrow">Tu red de llegada</p>
                <h2 className="title-lg">Hola, {name}. Tu próxima puerta ya está aquí.</h2>
                <p className="body">Te recomendamos historias, recursos y encuentros que encajan con tu etapa actual.</p>
              </div>
              <button className="floating-action" onClick={() => setSheetOpen(true)} aria-label="Agregar contribución"><Icon name="plus" /></button>
            </section>

            <section className="section-card">
              <div className="section-header">
                <div>
                  <p className="eyebrow">Progreso</p>
                  <h4 className="title-sm">Continúa tu recorrido</h4>
                </div>
                <span className="pill">{progress}%</span>
              </div>
              <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
              {loading ? renderSkeleton() : (
                <>
                  <div className="soft-card">
                    <div className="card-row">
                      <div>
                        <p className="eyebrow icon-line"><Icon name="spark" /> Historia recomendada</p>
                        <h5 className="body-strong">{featuredStory.name} desde {featuredStory.origin}</h5>
                        <p className="body-sm">{featuredStory.quote}</p>
                      </div>
                      <button className="chip-btn" onClick={() => { setActiveTab('stories'); openStoryDetail(featuredStory); }}>Abrir</button>
                    </div>
                  </div>
                  <div className="mini-grid">
                    <div className="mini-card accent">
                      <p className="label icon-line"><Icon name="idea" /> Tip del día</p>
                      <strong className="body-sm">{tips[0]}</strong>
                    </div>
                    <div className="mini-card">
                      <p className="label">Próximo encuentro</p>
                      <strong className="body-sm icon-line"><Icon name="cooking" /> Cocina y memoria · 19:00</strong>
                    </div>
                  </div>
                </>
              )}
            </section>

            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Recursos cercanos</h4>
                <span className="pill">En 10 min</span>
              </div>
              <div className="place-list">
                {places.slice(0, 2).map((place) => (
                  <div key={place.name} className="place-item">
                    <div>
                      <strong className="body-strong icon-line"><Icon name={place.icon} /> {place.name}</strong>
                      <p className="body-sm">{place.category}</p>
                    </div>
                    <span className="pill soft">{place.mood}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'stories': {
        if (storyDetailOpen && selectedStory) {
          return (
            <div className="screen-stack">
              <button className="text-btn back-link" onClick={() => setStoryDetailOpen(false)}><Icon name="chevron-left" /> Volver a historias</button>
              <section className="section-card">
                <div className="section-header">
                  <div>
                    <p className="eyebrow icon-line"><Icon name="pin" /> {selectedStory.origin} · {selectedStory.career}</p>
                    <h4 className="title-md">{selectedStory.name}</h4>
                  </div>
                  <button className="icon-btn small" onClick={() => toggleSaveStory(selectedStory.id)} aria-label={savedStoryIds.includes(selectedStory.id) ? 'Quitar de guardados' : 'Guardar historia'}>
                    <Icon name={savedStoryIds.includes(selectedStory.id) ? 'heart-fill' : 'heart'} />
                  </button>
                </div>
                <div className="chip-row compact">
                  <span className="pill soft icon-line"><Icon name="clock" /> {selectedStory.timeInCity}</span>
                  <span className="pill soft icon-line"><Icon name="chat" /> {selectedStory.emotion}</span>
                </div>
                <blockquote className="story-quote">“{selectedStory.quote}”</blockquote>
                <p className="body-sm">{selectedStory.highlight}</p>
                <div className="detail-list">
                  <div><strong className="body-strong icon-line"><Icon name="compass" /> Dificultad</strong><p className="body-sm">{selectedStory.difficulty}</p></div>
                  <div><strong className="body-strong icon-line"><Icon name="idea" /> Aprendizaje</strong><p className="body-sm">{selectedStory.advice}</p></div>
                </div>
              </section>
            </div>
          );
        }
        return (
          <div className="screen-stack">
            <section className="section-card">
              <div className="section-header">
                <div>
                  <p className="eyebrow">Biblioteca</p>
                  <h4 className="title-sm">Historias</h4>
                </div>
                <span className="pill">{filteredStories.length} relatos</span>
              </div>
              <label className="search-box">
                <span>⌕</span>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por ciudad o emoción" />
              </label>
              <div className="chip-row">
                {['Todo', 'Nostalgia', 'Ansiedad', 'Comida', 'Amistades', 'Lenguaje'].map((filter) => (
                  <button key={filter} className={selectedFilter === filter ? 'chip active' : 'chip'} onClick={() => setSelectedFilter(filter)}>{filter}</button>
                ))}
              </div>
              {filteredStories.length === 0 ? (
                <div className="empty-state">
                  <h5 className="title-sm">No hay relatos con ese filtro</h5>
                  <p className="body-sm">Prueba con otra emoción o palabra clave para seguir descubriendo.</p>
                </div>
              ) : (
                <div className="story-list">
                  {filteredStories.map((story) => (
                    <article key={story.id} className="story-card">
                      <div className="card-row">
                        <div>
                          <p className="eyebrow icon-line"><Icon name="pin" /> {story.origin}</p>
                          <h5 className="body-strong">{story.name}</h5>
                        </div>
                        <button className="icon-btn small" onClick={() => toggleSaveStory(story.id)} aria-label={savedStoryIds.includes(story.id) ? 'Quitar de guardados' : 'Guardar historia'}>
                          <Icon name={savedStoryIds.includes(story.id) ? 'heart-fill' : 'heart'} />
                        </button>
                      </div>
                      <p className="body-sm">{story.advice}</p>
                      <div className="chip-row compact">
                        <span className="pill soft">{story.emotion}</span>
                        <span className="pill soft">{story.timeInCity}</span>
                      </div>
                      <button className="text-btn icon-line" onClick={() => openStoryDetail(story)}>Leer detalle <Icon name="chevron-right" /></button>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        );
      }
      case 'explore':
        return (
          <div className="screen-stack">
            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Manual interactivo</h4>
                <span className="pill">Capítulos</span>
              </div>
              <div className="manual-grid">
                {manualChapters.map((item) => (
                  <button key={item.title} className="manual-item" onClick={() => handleOpenChapter(item.title)}>
                    <Icon name={item.icon} />
                    <strong className="body-strong">{item.title}</strong>
                  </button>
                ))}
              </div>
            </section>
            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Recursos hiperlocales</h4>
                <span className="pill">{filteredPlaces.length} lugares</span>
              </div>
              <div className="chip-row">
                {placeCategories.map((category) => (
                  <button key={category} className={placeFilter === category ? 'chip active' : 'chip'} onClick={() => setPlaceFilter(category)}>{category}</button>
                ))}
              </div>
              <div className="place-list">
                {filteredPlaces.map((place) => (
                  <div key={place.name} className="place-item">
                    <div>
                      <strong className="body-strong icon-line"><Icon name={place.icon} /> {place.name}</strong>
                      <p className="body-sm">{place.why}</p>
                    </div>
                    <span className="pill soft">{place.mood}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Rituales de cocina y memoria</h4>
                <span className="pill">{recipes.length} recursos</span>
              </div>
              <div className="recipe-stack">
                {recipes.map((recipe) => (
                  <div key={recipe.name} className="recipe-card">
                    <strong className="body-strong icon-line"><Icon name="coffee" /> {recipe.name}</strong>
                    <p className="body-sm">{recipe.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'community':
        return (
          <div className="screen-stack">
            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Red de apoyo</h4>
                <span className="pill">Mentores</span>
              </div>
              <div className="mentor-stack">
                {mentors.map((mentor) => (
                  <div key={mentor.name} className="mentor-card">
                    <div className="avatar">{mentor.name[0]}</div>
                    <div>
                      <strong className="body-strong">{mentor.name}</strong>
                      <p className="body-sm icon-line"><Icon name={mentor.icon} /> {mentor.role}</p>
                      <span className="caption">{mentor.vibe}</span>
                    </div>
                    <button className="chip-btn" onClick={() => handleConnectMentor(mentor.name)}>Conectar</button>
                  </div>
                ))}
              </div>
            </section>
            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Compañeros cerca de ti</h4>
                <span className="pill">Pares</span>
              </div>
              <div className="mentor-stack">
                {peers.map((peer) => (
                  <div key={peer.name} className="mentor-card">
                    <div className="avatar">{peer.name[0]}</div>
                    <div>
                      <strong className="body-strong">{peer.name}</strong>
                      <p className="body-sm icon-line"><Icon name={peer.icon} /> {peer.role}</p>
                      <span className="caption">{peer.vibe}</span>
                    </div>
                    <button className="chip-btn" onClick={() => handleConnectMentor(peer.name)}>Conectar</button>
                  </div>
                ))}
              </div>
            </section>
            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Actividades</h4>
                <span className="pill">Próximas</span>
              </div>
              <div className="activity-stack">
                {activities.map((activity) => (
                  <div key={activity.title} className="activity-card">
                    <div className="card-row">
                      <div>
                        <strong className="body-strong icon-line"><Icon name={activity.icon} /> {activity.title}</strong>
                        <p className="body-sm">{activity.time}</p>
                        <span className="caption">{activity.note}</span>
                      </div>
                      <button className="chip-btn" onClick={() => handleJoinActivity(activity.title)}>Unirme</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'profile': {
        const savedCount = savedStoryIds.length;
        const contributionsCount = user?.contributionsCount || 0;
        return (
          <div className="screen-stack">
            <section className="section-card profile-card">
              <div className="profile-top">
                <div className="avatar-wrap">
                  <AvatarImage user={user} size="large" />
                  <button className="avatar-edit-btn" onClick={() => avatarInputRef.current && avatarInputRef.current.click()} aria-label="Cambiar foto de perfil"><Icon name="camera" /></button>
                  <input ref={avatarInputRef} type="file" accept="image/*" className="visually-hidden" onChange={handleAvatarChange} />
                </div>
                <div>
                  <h4 className="title-sm">{user?.fullName || 'Ana Torres'}</h4>
                  <p className="body-sm">{user?.career || 'Diseño'} · {user?.timeInCartagena || '2 meses'} en Cartagena</p>
                </div>
              </div>
              <div className="progress-row">
                <div><strong>{progress}%</strong><p className="caption icon-line"><Icon name="leaf" /> Adaptación</p></div>
                <div><strong>{contributionsCount}</strong><p className="caption icon-line"><Icon name="handshake" /> Contribuciones</p></div>
                <div><strong>{savedCount}</strong><p className="caption icon-line"><Icon name="books" /> Guardados</p></div>
              </div>
            </section>

            {editProfile ? (
              <section className="section-card">
                <div className="section-header">
                  <h4 className="title-sm">Editar perfil</h4>
                  <button className="text-btn" onClick={() => setEditProfile(false)}>Cancelar</button>
                </div>
                <div className="form-grid">
                  <label className="field">
                    <span className="label">Nombre</span>
                    <input value={user?.fullName || ''} onChange={(event) => setUser((prev) => prev ? { ...prev, fullName: event.target.value } : prev)} />
                  </label>
                  <label className="field">
                    <span className="label">Universidad</span>
                    <input value={user?.university || ''} onChange={(event) => setUser((prev) => prev ? { ...prev, university: event.target.value } : prev)} />
                  </label>
                  <label className="field">
                    <span className="label">Carrera</span>
                    <input value={user?.career || ''} onChange={(event) => setUser((prev) => prev ? { ...prev, career: event.target.value } : prev)} />
                  </label>
                  <label className="field">
                    <span className="label">Semestre</span>
                    <input value={user?.semester || ''} onChange={(event) => setUser((prev) => prev ? { ...prev, semester: event.target.value } : prev)} />
                  </label>
                  <label className="field">
                    <span className="label">Género</span>
                    <select value={user?.gender || ''} onChange={(event) => setUser((prev) => prev ? { ...prev, gender: event.target.value } : prev)}>
                      <option value="">Prefiero no decir</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Hombre">Hombre</option>
                      <option value="No binario">No binario</option>
                    </select>
                  </label>
                </div>
                <button className="primary-btn full" onClick={handleProfileSave}>Guardar cambios</button>
              </section>
            ) : (
              <section className="section-card">
                <div className="section-header">
                  <h4 className="title-sm">Guardados</h4>
                  <span className="pill">{savedCount}</span>
                </div>
                {savedCount === 0 ? (
                  <p className="body-sm">Aún no has guardado historias. Toca el corazón en una historia que te inspire.</p>
                ) : (
                  <>
                    <div className="story-list">
                      {stories.filter((story) => savedStoryIds.includes(story.id)).slice(0, 3).map((story) => (
                        <article key={story.id} className="story-card">
                          <h5 className="body-strong">{story.name}</h5>
                          <p className="body-sm">{story.quote}</p>
                        </article>
                      ))}
                    </div>
                    <button className="text-btn icon-line" onClick={() => handleTabChange('stories')}>Ver más <Icon name="chevron-right" /></button>
                  </>
                )}
              </section>
            )}

            <section className="section-card">
              <div className="section-header">
                <h4 className="title-sm">Tu cuenta</h4>
              </div>
              <div className="settings-group flat">
                <SettingRow label="Ajustes y preferencias" description="Cuenta, privacidad, notificaciones, soporte" onClick={() => setView('settings')} />
              </div>
            </section>
          </div>
        );
      }
      default:
        return null;
    }
  };

  if (view === 'main') {
    return (
      <AppShell theme={theme}>
        <div className="phone-screen">
          <StatusBar />
          <TopBar title={user?.fullName?.split(' ')[0] || 'Hola'} subtitle={activeTab === 'home' ? 'Cartagena, hoy' : 'Raíz Prestada'} action={<button className="icon-btn" onClick={() => setNotificationsOpen(true)} aria-label="Abrir notificaciones"><Icon name="bell" /></button>} />
          <ScreenContent>
            <div key={transitionKey} className="screen-content-inner">
              {renderMainContent()}
            </div>
          </ScreenContent>
          <BottomTabBar activeTab={activeTab} onChange={handleTabChange} />

          {sheetOpen && (
            <div className="sheet-backdrop" onClick={() => setSheetOpen(false)}>
              <div className="sheet" onClick={(event) => event.stopPropagation()}>
                <div className="sheet-handle" />
                <h4 className="title-sm">Contribuir a la red</h4>
                <p className="body-sm">Comparte una recomendación, un testimonio o un lugar que te haya ayudado.</p>
                <form onSubmit={handleContribution} className="sheet-form">
                  <label className="field">
                    <span className="label">Tipo</span>
                    <select value={contributionForm.type} onChange={(event) => setContributionForm((prev) => ({ ...prev, type: event.target.value }))}>
                      <option>Testimonio</option>
                      <option>Consejo</option>
                      <option>Lugar</option>
                    </select>
                  </label>
                  <label className="field">
                    <span className="label">Título</span>
                    <input value={contributionForm.title} onChange={(event) => setContributionForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Ej. El primer mercado que me hizo sentir parte" />
                  </label>
                  <label className="field">
                    <span className="label">Detalle</span>
                    <textarea value={contributionForm.note} onChange={(event) => setContributionForm((prev) => ({ ...prev, note: event.target.value }))} placeholder="Escribe lo útil, humano y concreto que quisieras compartir" />
                  </label>
                  <button className="primary-btn full" type="submit">Enviar</button>
                </form>
              </div>
            </div>
          )}

          {notificationsOpen && (
            <div className="sheet-backdrop" onClick={() => setNotificationsOpen(false)}>
              <div className="sheet" onClick={(event) => event.stopPropagation()}>
                <div className="sheet-handle" />
                <div className="section-header">
                  <h4 className="title-sm">Notificaciones</h4>
                  <button className="text-btn" onClick={() => setNotificationsOpen(false)}>Cerrar</button>
                </div>
                <div className="notification-stack">
                  {notifications.map((item) => (
                    <div key={item.id} className="notification-item">
                      <div className="notification-icon"><Icon name={item.icon} /></div>
                      <div>
                        <strong className="body-strong">{item.title}</strong>
                        <p className="body-sm">{item.body}</p>
                        <span className="caption">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {toast && <div className="toast">{toast}</div>}
        </div>
      </AppShell>
    );
  }

  if (view === 'splash') {
    return (
      <AppShell theme={theme}>
        <div className="phone-screen">
          <div className="splash-screen">
            <div className="brand-pill">Raíz Prestada</div>
            <div className="sunburst" />
            <h1 className="title-lg">Llegar sin perder tu raíz.</h1>
            <p className="body">Historias, apoyo y recomendaciones reales para estudiantes que empiezan una nueva vida en Cartagena.</p>
            <div className="stack-actions">
              <button className="primary-btn full" onClick={() => setView('onboarding')}>Empezar</button>
              <button className="ghost-btn full" onClick={() => setView('auth')}>Ya tengo cuenta</button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (view === 'onboarding') {
    const slide = onboardingSlides[onboardingStep];
    return (
      <AppShell theme={theme}>
        <div className="phone-screen">
          <div className="onboarding-screen">
            <div className="onboarding-card">
              <div className="onboarding-glyph"><Icon name={slide.icon} /></div>
              <p className="eyebrow center">Paso {onboardingStep + 1} / {onboardingSlides.length}</p>
              <h2 className="title-lg">{slide.title}</h2>
              <p className="body">{slide.copy}</p>
              <div className="quote-card">{slide.accent}</div>
              <div className="dot-row">
                {onboardingSlides.map((item, index) => (
                  <span key={item.title} className={index === onboardingStep ? 'dot active' : 'dot'} />
                ))}
              </div>
              <div className="button-row">
                {onboardingStep > 0 ? <button className="ghost-btn" onClick={() => setOnboardingStep((prev) => prev - 1)}>Atrás</button> : <button className="ghost-btn" onClick={() => setView('auth')}>Saltar</button>}
                <button className="primary-btn" onClick={() => {
                  if (onboardingStep === onboardingSlides.length - 1) {
                    setView('auth');
                  } else {
                    setOnboardingStep((prev) => prev + 1);
                  }
                }}>
                  {onboardingStep === onboardingSlides.length - 1 ? 'Continuar' : 'Siguiente'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (view === 'auth') {
    return (
      <AppShell theme={theme}>
        <div className="phone-screen">
          <div className="auth-screen">
            <div className="auth-card">
              <div className="brand-pill">Raíz Prestada</div>
              <h2 className="title-lg">Llegar sin perder tu raíz.</h2>
              <p className="body">Historias, apoyo y recomendaciones reales para estudiantes que empiezan una nueva vida en Cartagena.</p>
              <div className="stack-actions">
                <button className="primary-btn full" onClick={() => setView('signup')}>Crear cuenta</button>
                <button className="ghost-btn full" onClick={() => setView('login')}>Ya tengo cuenta</button>
                <button className="text-btn center" onClick={handleGuestEntry}>Explorar como invitado</button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (view === 'login') {
    return (
      <AppShell theme={theme}>
        <div className="phone-screen padded-screen auth-flow-screen">
          <div className="auth-header">
            <button className="icon-btn" onClick={() => setView('auth')} aria-label="Volver"><Icon name="chevron-left" /></button>
            <div>
              <p className="eyebrow">Acceso</p>
              <h2 className="title-sm">Iniciar sesión</h2>
            </div>
          </div>
          <div className="auth-card compact">
            <label className="field">
              <span className="label">Correo</span>
              <input value={loginForm.email} onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="ana@raiz.com" />
            </label>
            <label className="field">
              <span className="label">Contraseña</span>
              <div className="input-with-action">
                <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))} placeholder="••••••••" />
                <button className="text-btn" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? 'Ocultar' : 'Ver'}</button>
              </div>
            </label>
            {loginError && <p className="error-text">{loginError}</p>}
            <div className="toggle-row">
              <span className="body-sm">Recordarme</span>
              <button className="chip-btn" onClick={() => setLoginForm((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}>{loginForm.rememberMe ? 'Sí' : 'No'}</button>
            </div>
            <button className="primary-btn full" onClick={handleLogin}>Entrar</button>
            <button className="ghost-btn full" onClick={() => { setLoginError(''); showToast('Recuperación enviada a tu correo'); }}>Olvidé mi contraseña</button>
            <button className="text-btn center" onClick={handleGuestEntry}>Continuar como invitado</button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (view === 'signup') {
    const progress = ((signupStep + 1) / 6) * 100;
    const experienceTypes = [
      { id: 'recién llegado', title: 'Recién llegado', description: 'Necesito orientación, referencias y calma.' },
      { id: 'estudiante adaptado', title: 'Estudiante adaptado', description: 'Quiero ayudar y aportar desde mi experiencia.' },
      { id: 'estudiante en transición', title: 'Estudiante en transición', description: 'Busco comunidad y pertenencia más profunda.' }
    ];

    const interestOptions = ['hacer amigos', 'entender la ciudad', 'orientación emocional', 'lugares útiles', 'actividades culturales', 'apoyo entre pares', 'recomendaciones prácticas', 'bienestar', 'comida y memoria'];

    return (
      <AppShell theme={theme}>
        <div className="phone-screen padded-screen auth-flow-screen">
          <div className="auth-header">
            <button className="icon-btn" onClick={() => signupStep === 0 ? setView('auth') : handleSignupBack()} aria-label="Volver"><Icon name="chevron-left" /></button>
            <div>
              <p className="eyebrow">Paso {signupStep + 1} de 6</p>
              <h2 className="title-sm">Crear cuenta</h2>
            </div>
          </div>
          <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
          <div className="auth-card compact">
            {signupStep === 0 && (
              <>
                <label className="field">
                  <span className="label">Nombre completo</span>
                  <input value={signupDraft.fullName} onChange={(event) => setSignupDraft((prev) => ({ ...prev, fullName: event.target.value }))} />
                  {signupErrors.fullName && <p className="error-text">{signupErrors.fullName}</p>}
                </label>
                <label className="field">
                  <span className="label">Correo</span>
                  <input value={signupDraft.email} onChange={(event) => setSignupDraft((prev) => ({ ...prev, email: event.target.value }))} />
                  {signupErrors.email && <p className="error-text">{signupErrors.email}</p>}
                </label>
                <label className="field">
                  <span className="label">Contraseña</span>
                  <input type="password" value={signupDraft.password} onChange={(event) => setSignupDraft((prev) => ({ ...prev, password: event.target.value }))} />
                  {signupErrors.password && <p className="error-text">{signupErrors.password}</p>}
                </label>
                <label className="field">
                  <span className="label">Confirmar contraseña</span>
                  <input type="password" value={signupDraft.confirmPassword} onChange={(event) => setSignupDraft((prev) => ({ ...prev, confirmPassword: event.target.value }))} />
                  {signupErrors.confirmPassword && <p className="error-text">{signupErrors.confirmPassword}</p>}
                </label>
              </>
            )}
            {signupStep === 1 && (
              <>
                <label className="field"><span className="label">Ciudad de origen</span><input value={signupDraft.origin} onChange={(event) => setSignupDraft((prev) => ({ ...prev, origin: event.target.value }))} />{signupErrors.origin && <p className="error-text">{signupErrors.origin}</p>}</label>
                <label className="field"><span className="label">Universidad</span><input value={signupDraft.university} onChange={(event) => setSignupDraft((prev) => ({ ...prev, university: event.target.value }))} />{signupErrors.university && <p className="error-text">{signupErrors.university}</p>}</label>
                <label className="field"><span className="label">Carrera</span><input value={signupDraft.career} onChange={(event) => setSignupDraft((prev) => ({ ...prev, career: event.target.value }))} />{signupErrors.career && <p className="error-text">{signupErrors.career}</p>}</label>
                <label className="field"><span className="label">Semestre</span><input value={signupDraft.semester} onChange={(event) => setSignupDraft((prev) => ({ ...prev, semester: event.target.value }))} />{signupErrors.semester && <p className="error-text">{signupErrors.semester}</p>}</label>
                <label className="field"><span className="label">Tiempo viviendo en Cartagena</span><input value={signupDraft.timeInCartagena} onChange={(event) => setSignupDraft((prev) => ({ ...prev, timeInCartagena: event.target.value }))} />{signupErrors.timeInCartagena && <p className="error-text">{signupErrors.timeInCartagena}</p>}</label>
                <label className="field"><span className="label">Edad</span><input value={signupDraft.age} onChange={(event) => setSignupDraft((prev) => ({ ...prev, age: event.target.value }))} />{signupErrors.age && <p className="error-text">{signupErrors.age}</p>}</label>
                <label className="field">
                  <span className="label">Género</span>
                  <select value={signupDraft.gender} onChange={(event) => setSignupDraft((prev) => ({ ...prev, gender: event.target.value }))}>
                    <option value="">Prefiero no decir</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                    <option value="No binario">No binario</option>
                  </select>
                </label>
              </>
            )}
            {signupStep === 2 && (
              <div className="experience-grid">
                {experienceTypes.map((item) => (
                  <button key={item.id} className={signupDraft.experienceType === item.id ? 'experience-card active' : 'experience-card'} onClick={() => setSignupDraft((prev) => ({ ...prev, experienceType: item.id }))}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </button>
                ))}
              </div>
            )}
            {signupStep === 3 && (
              <div className="chip-grid">
                {interestOptions.map((interest) => {
                  const active = signupDraft.interests.includes(interest);
                  return (
                    <button key={interest} className={active ? 'chip active' : 'chip'} onClick={() => {
                      const next = active ? signupDraft.interests.filter((item) => item !== interest) : [...signupDraft.interests, interest];
                      setSignupDraft((prev) => ({ ...prev, interests: next }));
                    }}>{interest}</button>
                  );
                })}
                {signupErrors.interests && <p className="error-text">{signupErrors.interests}</p>}
              </div>
            )}
            {signupStep === 4 && (
              <div className="stack-actions">
                <label className="toggle-row"><span className="body-sm">Aceptar términos</span><button className="chip-btn" onClick={() => setSignupDraft((prev) => ({ ...prev, terms: !prev.terms }))}>{signupDraft.terms ? 'Sí' : 'No'}</button></label>
                <label className="toggle-row"><span className="body-sm">Política de privacidad</span><button className="chip-btn" onClick={() => setSignupDraft((prev) => ({ ...prev, privacy: !prev.privacy }))}>{signupDraft.privacy ? 'Sí' : 'No'}</button></label>
                <label className="toggle-row"><span className="body-sm">Notificaciones</span><button className="chip-btn" onClick={() => setSignupDraft((prev) => ({ ...prev, notifications: !prev.notifications }))}>{signupDraft.notifications ? 'On' : 'Off'}</button></label>
                <label className="toggle-row"><span className="body-sm">Compartir ubicación</span><button className="chip-btn" onClick={() => setSignupDraft((prev) => ({ ...prev, location: !prev.location }))}>{signupDraft.location ? 'Sí' : 'No'}</button></label>
              </div>
            )}
            {signupStep === 5 && (
              <div className="soft-card">
                <p className="eyebrow">Todo listo</p>
                <h3 className="title-sm">Tu perfil está casi listo.</h3>
                <p className="body-sm">{signupDraft.fullName || 'Tu cuenta'} será acompañada con recomendaciones personalizadas según tu contexto.</p>
                <div className="detail-list">
                  <div><strong className="body-strong">Universidad</strong><p className="body-sm">{signupDraft.university || 'Tu institución'}</p></div>
                  <div><strong className="body-strong">Intereses</strong><p className="body-sm">{signupDraft.interests.join(', ') || 'Sin intereses aún'}</p></div>
                </div>
              </div>
            )}
            <div className="button-row spaced">
              {signupStep > 0 ? <button className="ghost-btn" onClick={handleSignupBack}>Atrás</button> : <button className="ghost-btn" onClick={() => setView('auth')}>Cancelar</button>}
              {signupStep < 5 ? <button className="primary-btn" onClick={handleSignupNext}>Continuar</button> : <button className="primary-btn" onClick={handleRegisterComplete}>Crear cuenta</button>}
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (view === 'settings') {
    const totalInterests = user?.interests?.length || 0;
    return (
      <AppShell theme={theme}>
        <div className="phone-screen padded-screen">
          <div className="auth-header">
            <button className="icon-btn" onClick={() => { setView('main'); setActiveTab('profile'); }} aria-label="Volver"><Icon name="chevron-left" /></button>
            <div>
              <p className="eyebrow">Perfil</p>
              <h2 className="title-sm">Ajustes</h2>
            </div>
          </div>

          <div className="settings-header">
            <AvatarImage user={user} size="large" />
            <div>
              <h3 className="title-sm">{user?.fullName || 'Ana Torres'}</h3>
              <p className="body-sm">{user?.email || 'ana@raiz.com'}</p>
            </div>
          </div>

          <p className="settings-group-title">Cuenta</p>
          <div className="settings-group">
            <SettingRow label="Editar perfil" description="Nombre, universidad, carrera y más" onClick={() => { setView('main'); setActiveTab('profile'); setEditProfile(true); }} />
            <SettingRow label="Ciudad de origen" value={user?.origin || 'Sin definir'} />
            <SettingRow label="Tiempo en Cartagena" value={user?.timeInCartagena || 'Sin definir'} />
            <SettingRow label="Género" value={user?.gender || 'Prefiero no decir'} />
            <SettingRow label="Intereses" value={`${totalInterests} seleccionados`} />
          </div>

          <p className="settings-group-title">Preferencias</p>
          <div className="settings-group">
            <SettingRow label="Modo oscuro" description="Cambia la apariencia de la app" control={<Switch on={theme === 'dark'} onToggle={() => setTheme((prev) => prev === 'light' ? 'dark' : 'light')} />} />
            <SettingRow label="Notificaciones" description="Mentorías, historias y recordatorios" control={<Switch on={!!user?.notifications} onToggle={() => setUser((prev) => prev ? { ...prev, notifications: !prev.notifications } : prev)} />} />
            <SettingRow label="Compartir ubicación" description="Recomendaciones según tu zona" control={<Switch on={!!user?.location} onToggle={() => setUser((prev) => prev ? { ...prev, location: !prev.location } : prev)} />} />
          </div>

          <p className="settings-group-title">Privacidad y datos</p>
          <div className="settings-group">
            <SettingRow label="Guardados" value={`${savedStoryIds.length} historias`} onClick={() => { setView('main'); setActiveTab('profile'); }} />
            <SettingRow label="Política de privacidad" onClick={() => showToast('Abriendo política de privacidad')} />
            <SettingRow label="Términos y condiciones" onClick={() => showToast('Abriendo términos y condiciones')} />
          </div>

          <p className="settings-group-title">Soporte</p>
          <div className="settings-group">
            <SettingRow label="Centro de ayuda" onClick={() => showToast('Abriendo centro de ayuda')} />
            <SettingRow label="Reportar un problema" onClick={() => showToast('Gracias, revisaremos tu reporte')} />
            <SettingRow label="Enviar sugerencia" onClick={() => showToast('Sugerencia enviada, gracias por aportar')} />
          </div>

          <p className="settings-group-title">Acerca de</p>
          <div className="settings-group">
            <SettingRow label="Versión de la app" value="1.0.0 · Beta cultural" />
          </div>

          <button className="settings-logout" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </AppShell>
    );
  }

  return null;
}

export default App;
