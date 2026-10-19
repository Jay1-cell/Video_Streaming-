import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero.jsx';
import CategoryFilters from '../components/CategoryFilters.jsx';
import CourseGrid from '../components/CourseGrid.jsx';
import CourseModal from '../components/CourseModal.jsx';
import { SAMPLE_COURSES, SAMPLE_CATEGORIES } from '../data/sampleCourses.js';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [sortBy, setSortBy] = useState('popular');
  const [previewCourse, setPreviewCourse] = useState(null);

  // Compute course counts per category
  const categoryCounts = useMemo(() => {
    const counts = {
      'All Courses': SAMPLE_COURSES.length,
    };
    SAMPLE_CATEGORIES.forEach((cat) => {
      if (cat !== 'All Courses') {
        counts[cat] = SAMPLE_COURSES.filter((c) => c.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let result = [...SAMPLE_COURSES];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Courses') {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Search query filter (title, instructor, description, tags, category)
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((course) => {
        const titleMatch = course.title.toLowerCase().includes(query);
        const instructorMatch = course.instructor.toLowerCase().includes(query);
        const descMatch = course.description.toLowerCase().includes(query);
        const categoryMatch = course.category.toLowerCase().includes(query);
        const tagMatch = course.tags.some((tag) => tag.toLowerCase().includes(query));
        return titleMatch || instructorMatch || descMatch || categoryMatch || tagMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'highest-rated') {
        return b.rating - a.rating;
      }
      if (sortBy === 'lessons') {
        return b.lessonsCount - a.lessonsCount;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Default: 'popular'
      const numA = parseInt(a.studentsCount.replace(/,/g, ''), 10) || 0;
      const numB = parseInt(b.studentsCount.replace(/,/g, ''), 10) || 0;
      return numB - numA;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Handlers
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Courses');
    setSortBy('popular');
  };

  return (
    <div className="homepage-view">
      {/* Hero & Search Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={() => setSearchQuery('')}
        totalCoursesCount={SAMPLE_COURSES.length}
      />

      <div className="catalog-wrapper">
        {/* Category Filter Chips */}
        <CategoryFilters
          categories={SAMPLE_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          categoryCounts={categoryCounts}
        />

        {/* Courses Grid & Results */}
        <CourseGrid
          courses={filteredAndSortedCourses}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          onSelectCourse={(course) => setPreviewCourse(course)}
        />
      </div>

      {/* Quick Course Preview Modal */}
      <CourseModal
        course={previewCourse}
        onClose={() => setPreviewCourse(null)}
      />
    </div>
  );
}
