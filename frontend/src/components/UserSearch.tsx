import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import type { User } from "../types";
import { Search } from "lucide-react";

interface UserSearchProps {
  onSelect: (user: User) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Fetch default users
  const fetchUsers = async (search?: string) => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/v1/user/bulk", {
        params: search ? { q: search } : {},
      });
      setResults(data.users ?? data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setResults([]);
    }
    setLoading(false);
  };

  // Fetch when input focused
  const handleFocus = () => {
    setOpen(true);
    if (!query.trim()) fetchUsers();
  };

  // Search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        fetchUsers(query);
      } else {
        fetchUsers(); // when cleared → default users
      }
    }, 400); // debounce delay

    return () => clearTimeout(handler);
  }, [query]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Input box */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={query}
          placeholder="Search users by name or email"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="button"
          onClick={() => fetchUsers(query)}
          className="px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Dropdown results */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-2 sm:mt-3 
                bg-white border border-slate-200 
                rounded-xl shadow-lg z-10 
                max-h-60 sm:max-h-72 overflow-y-auto"
        >
          {loading && (
            <div className="p-3 text-sm text-slate-500">Searching…</div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-red-500">No users found</div>
          )}

          <ul className="divide-y divide-slate-200">
            {results.map((u) => (
              <li
                key={u.id}
                className="py-3 sm:py-2 flex justify-between items-center hover:bg-slate-50 px-3 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-sm text-slate-500">{u.email}</p>
                </div>
                <button
                  className="px-3 py-2 sm:px-3 sm:py-1.5 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700"
                  onClick={() => {
                    onSelect(u);
                    setOpen(false);
                  }}
                >
                  Send
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
