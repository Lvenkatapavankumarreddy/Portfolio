import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext(null);

export function BrowserRouter({ children }) {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [currentSearch, setCurrentSearch] = useState(() => window.location.search || '');
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setCurrentSearch(window.location.search || '');
      setCurrentHash(window.location.hash || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to, options = {}) => {
    if (typeof to === 'number') {
      window.history.go(to);
      return;
    }

    if (to.startsWith('#')) {
      // In-page anchor hash link
      window.history.replaceState(null, '', to);
      setCurrentHash(to);
      const el = document.getElementById(to.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const [pathWithSearch, hashPart] = to.split('#');
    const [pathPart, searchPart] = pathWithSearch.split('?');
    const newPath = pathPart || '/';
    const newSearch = searchPart ? `?${searchPart}` : '';
    const newHash = hashPart ? `#${hashPart}` : '';

    if (options.replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }

    setCurrentPath(newPath);
    setCurrentSearch(newSearch);
    setCurrentHash(newHash);

    if (hashPart) {
      setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (!options.preventScrollReset) {
      window.scrollTo(0, 0);
    }
  }, []);

  const location = {
    pathname: currentPath,
    search: currentSearch,
    hash: currentHash
  };

  return (
    <RouterContext.Provider value={{ location, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a BrowserRouter');
  }
  return context;
}

export function useLocation() {
  return useRouter().location;
}

export function useNavigate() {
  return useRouter().navigate;
}

export function Routes({ children }) {
  const { location } = useRouter();
  const path = location.pathname;

  let match = null;
  React.Children.forEach(children, child => {
    if (!match && React.isValidElement(child)) {
      const { path: routePath, element } = child.props;
      if (routePath === '*' || routePath === path) {
        match = element;
      }
    }
  });

  return match || null;
}

export function Route({ path, element }) {
  return element;
}

export function Link({ to, children, className = '', onClick, ...rest }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:')) {
        return; // External
      }
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function NavLink({ to, children, className = '', activeClassName = 'active', ...rest }) {
  const { location } = useRouter();
  const isActive = location.pathname === to;

  const computedClass = typeof className === 'function' 
    ? className({ isActive })
    : `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <Link to={to} className={computedClass} {...rest}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  );
}

export function Navigate({ to, replace = true }) {
  const { navigate } = useRouter();
  useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
}

