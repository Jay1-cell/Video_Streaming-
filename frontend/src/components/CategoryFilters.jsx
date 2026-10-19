import React from 'react';

export default function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) {
  return (
    <div className="category-filter-section" id="categories-section">
      <div className="filter-header">
        <h2 className="section-title">Explore by Domain</h2>
        <span className="filter-subtitle">Select a category to filter the video catalog</span>
      </div>

      <div className="category-chips-list" role="tablist" aria-label="Course categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category] ?? 0;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`category-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="chip-label">{category}</span>
              <span className="chip-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
