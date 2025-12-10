import React, { useState, useEffect } from "react";

const unique = (arr, key) =>
  [...new Set(arr.map((i) => i[key]))].filter(Boolean);

export default function JobFilters({ filters, onChange }) {
  const [local, setLocal] = useState(filters);

  useEffect(() => setLocal(filters), [filters]);

  // load dynamic options
  const jobs = require("../../static/jobs.json");
  const locations = unique(jobs, "location");
  const types = unique(jobs, "type");
  const skills = [...new Set(jobs.flatMap((j) => j.skills || []))];

  const apply = () => onChange(local);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={local.q}
          onChange={(e) => setLocal({ ...local, q: e.target.value })}
          className="px-4 py-2 border rounded-md"
        />

        <select
          value={local.location}
          onChange={(e) => setLocal({ ...local, location: e.target.value })}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={local.type}
          onChange={(e) => setLocal({ ...local, type: e.target.value })}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Salary min / max simple numeric inputs */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            placeholder="Min (LPA)"
            value={local.minSalary || ""}
            onChange={(e) =>
              setLocal({
                ...local,
                minSalary: e.target.value ? Number(e.target.value) : 0,
              })
            }
            className="px-4 py-2 border rounded-md w-full"
          />
          <input
            type="number"
            min="0"
            placeholder="Max (LPA)"
            value={local.maxSalary || ""}
            onChange={(e) =>
              setLocal({
                ...local,
                maxSalary: e.target.value ? Number(e.target.value) : 100,
              })
            }
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>

        {/* Experience */}
        <select
          value={local.experience || ""}
          onChange={(e) => setLocal({ ...local, experience: e.target.value })}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Any experience</option>
          <option value="0">0+</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="5">5+</option>
        </select>

        {/* Skills multi-select (simple comma input for now) */}
        <input
          placeholder="Filter skills (comma separated)"
          value={local.skills ? local.skills.join(", ") : ""}
          onChange={(e) =>
            setLocal({
              ...local,
              skills: e.target.value
                ? e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
            })
          }
          className="px-4 py-2 border rounded-md col-span-full"
        />
      </div>

      <div className="mt-4 flex gap-3 justify-end">
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => {
            setLocal({
              q: "",
              location: "",
              type: "",
              minSalary: 0,
              maxSalary: 100,
              skills: [],
              experience: "",
            });
            onChange({
              q: "",
              location: "",
              type: "",
              minSalary: 0,
              maxSalary: 100,
              skills: [],
              experience: "",
            });
          }}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={apply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
