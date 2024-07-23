import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { debounce } from "lodash";
import "../styles/header.scss";

interface HeaderProps {
  searchMovies: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ searchMovies, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const { starredMovies } = useAppSelector((state) => state.starred);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useMemo(
    () => debounce((query: string) => searchMovies(query), 300),
    [searchMovies]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      setLocalSearchQuery(newQuery);
      debouncedSearch(newQuery);
    },
    [debouncedSearch]
  );

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      searchMovies(localSearchQuery);
    },
    [searchMovies, localSearchQuery]
  );

  const handleLogoClick = useCallback(() => {
    setLocalSearchQuery("");
    searchMovies("");
  }, [searchMovies]);

  // Cancel the debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={handleLogoClick}>
          <i className="bi bi-film"></i>
          <span>Movieland</span>
        </Link>
        <nav>
          <NavLink to="/starred" className="nav-link">
            <i className="bi bi-star-fill"></i>
            <span>Starred</span>
            {starredMovies.length > 0 && (
              <span className="badge">{starredMovies.length}</span>
            )}
          </NavLink>
          <NavLink to="/watch-later" className="nav-link">
            <i className="bi bi-clock-fill"></i>
            <span>Watch Later</span>
          </NavLink>
        </nav>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="search"
            value={localSearchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
          <button type="submit" aria-label="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </header>
  );
};

export default React.memo(Header);
