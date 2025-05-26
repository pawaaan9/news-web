import Cookies from 'js-cookie';

interface CategoryView {
  name: string;
  count: number;
  lastViewed: number;
}

const CATEGORY_VIEWS_COOKIE = 'category_views';
const MAX_CATEGORIES = 5;

export const getCategoryViews = (): CategoryView[] => {
  const views = Cookies.get(CATEGORY_VIEWS_COOKIE);
  return views ? JSON.parse(views) : [];
};

export const updateCategoryView = (categoryName: string) => {
  const views = getCategoryViews();
  const existingView = views.find(v => v.name === categoryName);
  
  if (existingView) {
    existingView.count += 1;
    existingView.lastViewed = Date.now();
  } else {
    views.push({
      name: categoryName,
      count: 1,
      lastViewed: Date.now()
    });
  }

  // Sort by count and last viewed, then take top MAX_CATEGORIES
  const sortedViews = views
    .sort((a, b) => {
      if (b.count === a.count) {
        return b.lastViewed - a.lastViewed;
      }
      return b.count - a.count;
    })
    .slice(0, MAX_CATEGORIES);

  Cookies.set(CATEGORY_VIEWS_COOKIE, JSON.stringify(sortedViews), { expires: 365 }); // Store for 1 year
  return sortedViews;
};

export const getTopCategories = (): string[] => {
  return getCategoryViews().map(view => view.name);
}; 