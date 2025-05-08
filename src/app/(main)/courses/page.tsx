'use client';

import { CourseCard } from '@/components/courses/course-card';
import { MOCK_COURSES } from '@/data/mock';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { Search, ListFilter } from 'lucide-react';
import { AppHeader } from '@/components/layout/app-header';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all'); // For course original language

  const categories = useMemo(() => {
    const cats = new Set(MOCK_COURSES.map(course => course.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const languages = useMemo(() => {
    const langs = new Set(MOCK_COURSES.map(course => course.language));
    // This is for course's original language, not user's preference
    const langMap: { [key: string]: string } = { 'en': 'English', 'hi': 'Hindi' }; // Add more as needed
    return ['all', ...Array.from(langs).map(code => ({ code, name: langMap[code] || code }))];
  }, []);

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      const matchesLanguage = languageFilter === 'all' || course.language === languageFilter;
      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [searchTerm, categoryFilter, languageFilter]);

  return (
    <>
    <AppHeader title="Explore Courses" showBackButton={false} />
    <div className="container mx-auto px-4 py-6">
      {/* Search and Filters */}
      <div className="mb-8 p-4 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="search-courses" className="block text-sm font-medium text-muted-foreground mb-1">
              Search Courses
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-courses"
                type="text"
                placeholder="Search by title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">
              Filter by Category
            </label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category-filter" className="h-12 text-base">
                <ListFilter className="h-5 w-5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-base">
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="language-filter" className="block text-sm font-medium text-muted-foreground mb-1">
              Filter by Language (Original)
            </label>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger id="language-filter" className="h-12 text-base">
                <ListFilter className="h-5 w-5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  typeof lang === 'string' ? 
                  <SelectItem key={lang} value={lang} className="text-base">All Languages</SelectItem> :
                  <SelectItem key={lang.code} value={lang.code} className="text-base">{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-116 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
    </>
  );
}
