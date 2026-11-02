/**
 * Centralized Storage Service
 * Provides full Local Storage persistence for Users, Session, Projects, Skills, Blogs, Messages, Bookmarks, and Theming.
 */

export const STORAGE_KEYS = {
  THEME: 'portfolio_theme_mode',
  USERS: 'portfolio_users',
  CURRENT_USER: 'portfolio_current_user',
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  BLOGS: 'portfolio_blogs',
  MESSAGES: 'portfolio_messages',
  BOOKMARKS: 'portfolio_bookmarks'
};

// Initial Seed Data for Demo Projects
const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    title: 'Personal Portfolio Platform',
    description: 'A modular, high-performance portfolio application with role-based routing, admin management, and local storage state persistence.',
    category: 'Full Stack',
    technologies: ['React', 'Vite', 'CSS3', 'Local Storage'],
    liveUrl: '#',
    githubUrl: 'https://github.com/venkatapavan78/Portfolio',
    image: '/assets/images/project-portfolio.svg',
    featured: true,
    createdAt: '2026-09-24T06:00:00.000Z'
  },
  {
    id: 'proj_2',
    title: 'Enterprise Task & Sprint Manager',
    description: 'Collaborative agile sprint planning tool featuring kanban drag-and-drop boards, analytics metrics, and team workflow automation.',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
    liveUrl: '#',
    githubUrl: 'https://github.com/venkatapavan78',
    image: '/assets/images/project-task-manager.svg',
    featured: true,
    createdAt: '2026-09-20T10:30:00.000Z'
  },
  {
    id: 'proj_3',
    title: 'Smart Water Supply Monitoring System',
    description: 'IoT telemetry dashboard for municipal water flow tracking, leak detection heuristics, and automated sensory alert dispatches.',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'WebSockets'],
    liveUrl: '#',
    githubUrl: 'https://github.com/venkatapavan78',
    image: '/assets/images/project-water-supply.svg',
    featured: true,
    createdAt: '2026-09-15T14:15:00.000Z'
  }
];

// Initial Seed Data for Skills
const INITIAL_SKILLS = [
  { id: 'skill_1', name: 'React / Next.js', category: 'frontend', level: 90 },
  { id: 'skill_2', name: 'JavaScript (ES6+) / TypeScript', category: 'frontend', level: 95 },
  { id: 'skill_3', name: 'HTML5 & Modern CSS / Tailwind', category: 'frontend', level: 95 },
  { id: 'skill_4', name: 'Node.js & Express APIs', category: 'backend', level: 85 },
  { id: 'skill_5', name: 'PostgreSQL & MongoDB', category: 'backend', level: 80 },
  { id: 'skill_6', name: 'Git, GitHub & CI/CD Workflows', category: 'devops', level: 88 },
  { id: 'skill_7', name: 'Vercel / Cloud Deployment', category: 'devops', level: 85 },
  { id: 'skill_8', name: 'Python & Java Basics', category: 'languages', level: 75 }
];

// Initial Seed Data for Blogs
const INITIAL_BLOGS = [
  {
    id: 'blog_1',
    title: 'Mastering Component Architecture in React & Vite',
    excerpt: 'An in-depth look at designing modular, reusable React components with zero bloat and lightning-fast Vite compilation.',
    content: 'Building production-grade client applications requires careful modularity, separation of concerns, and clean state abstractions. In this article, we explore how React and Vite combine to provide exceptional DX and blazing runtime speed...',
    category: 'React & Frontend',
    readTime: '6 min read',
    author: 'Venkata Pavan',
    date: 'Oct 15, 2026',
    published: true,
    createdAt: '2026-10-15T09:00:00.000Z'
  },
  {
    id: 'blog_2',
    title: 'Client-Side Authentication Strategies and Trade-Offs',
    excerpt: 'Understanding session management, Local Storage security constraints, and transitioning smoothly from client prototypes to OAuth 2.0 backends.',
    content: 'While browser LocalStorage is fantastic for rapid prototyping, assignments, and offline client experiences, it lacks server-side HTTP-only cookies and cryptographic secrets. Let us explore best practices to ensure security hygiene...',
    category: 'Architecture & Security',
    readTime: '8 min read',
    author: 'Venkata Pavan',
    date: 'Oct 08, 2026',
    published: true,
    createdAt: '2026-10-08T11:30:00.000Z'
  }
];

// Initial Seed Data for Messages
const INITIAL_MESSAGES = [
  {
    id: 'msg_1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techventures.io',
    subject: 'Full Stack Frontend Engineering Role',
    message: 'Hi Venkata, I was thoroughly impressed by your portfolio and clean architecture! Would you be open to discussing a senior frontend developer position with our team?',
    createdAt: '2026-10-28T16:20:00.000Z',
    read: false
  }
];

// Helper: Safe JSON get
export function getStoredItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[StorageService] Failed to read key "${key}":`, err);
    return defaultValue;
  }
}

// Helper: Safe JSON set
export function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[StorageService] Failed to save key "${key}":`, err);
  }
}

// Initialize Seed Data idempotently
export function initializeStorage() {
  // 1. Seed demo admin user if not exists
  const users = getStoredItem(STORAGE_KEYS.USERS, []);
  const adminExists = users.some(u => u.email.toLowerCase() === 'admin@portfolio.com');
  if (!adminExists) {
    users.unshift({
      id: 'user_admin_01',
      fullName: 'System Administrator',
      email: 'admin@portfolio.com',
      password: 'Admin123',
      role: 'admin',
      createdAt: '2026-09-24T00:00:00.000Z'
    });
    setStoredItem(STORAGE_KEYS.USERS, users);
  }

  // 2. Seed projects if empty
  const projects = getStoredItem(STORAGE_KEYS.PROJECTS, null);
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    setStoredItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  }

  // 3. Seed skills if empty
  const skills = getStoredItem(STORAGE_KEYS.SKILLS, null);
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    setStoredItem(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  }

  // 4. Seed blogs if empty
  const blogs = getStoredItem(STORAGE_KEYS.BLOGS, null);
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    setStoredItem(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  }

  // 5. Seed messages if empty
  const messages = getStoredItem(STORAGE_KEYS.MESSAGES, null);
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    setStoredItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  }
}

/* ============================================================================
   USER & SESSION STORAGE APIS
   ============================================================================ */

export function getUsers() {
  return getStoredItem(STORAGE_KEYS.USERS, []);
}

export function saveUsers(users) {
  setStoredItem(STORAGE_KEYS.USERS, users);
}

export function findUserByEmail(email) {
  if (!email) return null;
  const users = getUsers();
  const normalized = email.trim().toLowerCase();
  return users.find(u => u.email.toLowerCase() === normalized) || null;
}

export function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

export function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
    return users[index];
  }
  return null;
}

export function getCurrentUser() {
  return getStoredItem(STORAGE_KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return;
  }
  // Strictly sanitize session: NEVER include password
  const sanitized = {
    id: user.id,
    fullName: user.fullName || user.name || 'User',
    email: user.email,
    role: user.role || 'user',
    loginTime: new Date().toISOString()
  };
  setStoredItem(STORAGE_KEYS.CURRENT_USER, sanitized);
  return sanitized;
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

/* ============================================================================
   PROJECTS CRUD APIS
   ============================================================================ */

export function getProjects() {
  return getStoredItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

export function saveProjects(projects) {
  setStoredItem(STORAGE_KEYS.PROJECTS, projects);
}

export function addProject(project) {
  const projects = getProjects();
  const newProj = {
    id: 'proj_' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    ...project
  };
  projects.unshift(newProj);
  saveProjects(projects);
  return newProj;
}

export function updateProject(id, updates) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
    saveProjects(projects);
    return projects[index];
  }
  return null;
}

export function deleteProject(id) {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveProjects(filtered);
  return filtered;
}

/* ============================================================================
   SKILLS CRUD APIS
   ============================================================================ */

export function getSkills() {
  return getStoredItem(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
}

export function saveSkills(skills) {
  setStoredItem(STORAGE_KEYS.SKILLS, skills);
}

export function addSkill(skill) {
  const skills = getSkills();
  const newSkill = {
    id: 'skill_' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    ...skill
  };
  skills.push(newSkill);
  saveSkills(skills);
  return newSkill;
}

export function updateSkill(id, updates) {
  const skills = getSkills();
  const index = skills.findIndex(s => s.id === id);
  if (index !== -1) {
    skills[index] = { ...skills[index], ...updates };
    saveSkills(skills);
    return skills[index];
  }
  return null;
}

export function deleteSkill(id) {
  const skills = getSkills();
  const filtered = skills.filter(s => s.id !== id);
  saveSkills(filtered);
  return filtered;
}

/* ============================================================================
   BLOGS CRUD APIS
   ============================================================================ */

export function getBlogs() {
  return getStoredItem(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
}

export function saveBlogs(blogs) {
  setStoredItem(STORAGE_KEYS.BLOGS, blogs);
}

export function addBlog(blog) {
  const blogs = getBlogs();
  const newBlog = {
    id: 'blog_' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: 'Venkata Pavan',
    ...blog
  };
  blogs.unshift(newBlog);
  saveBlogs(blogs);
  return newBlog;
}

export function updateBlog(id, updates) {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === id);
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...updates };
    saveBlogs(blogs);
    return blogs[index];
  }
  return null;
}

export function deleteBlog(id) {
  const blogs = getBlogs();
  const filtered = blogs.filter(b => b.id !== id);
  saveBlogs(filtered);
  return filtered;
}

/* ============================================================================
   MESSAGES CRUD APIS
   ============================================================================ */

export function getMessages() {
  return getStoredItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
}

export function saveMessages(messages) {
  setStoredItem(STORAGE_KEYS.MESSAGES, messages);
}

export function addMessage(message) {
  const messages = getMessages();
  const newMsg = {
    id: 'msg_' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    read: false,
    ...message
  };
  messages.unshift(newMsg);
  saveMessages(messages);
  return newMsg;
}

export function markMessageRead(id, isRead = true) {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index !== -1) {
    messages[index].read = isRead;
    saveMessages(messages);
    return messages[index];
  }
  return null;
}

export function deleteMessage(id) {
  const messages = getMessages();
  const filtered = messages.filter(m => m.id !== id);
  saveMessages(filtered);
  return filtered;
}

/* ============================================================================
   USER BOOKMARKS APIS
   ============================================================================ */

export function getBookmarks(userId) {
  if (!userId) return [];
  const allBookmarks = getStoredItem(STORAGE_KEYS.BOOKMARKS, {});
  return allBookmarks[userId] || [];
}

export function toggleBookmark(userId, projectId) {
  if (!userId || !projectId) return [];
  const allBookmarks = getStoredItem(STORAGE_KEYS.BOOKMARKS, {});
  const userBookmarks = allBookmarks[userId] || [];
  let updated;
  if (userBookmarks.includes(projectId)) {
    updated = userBookmarks.filter(id => id !== projectId);
  } else {
    updated = [...userBookmarks, projectId];
  }
  allBookmarks[userId] = updated;
  setStoredItem(STORAGE_KEYS.BOOKMARKS, allBookmarks);
  return updated;
}

