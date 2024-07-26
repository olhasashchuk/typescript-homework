// У вас є дві сутності - список фільмів і список категорій фільмів.

// Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.

// Категорія містить поля: назва і фільми.

// У кожного списку є пошук за ім'ям (це, по суті, фільтрація), у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.

// У нас визначено три типи фільтрів:

// Фільтр відповідності має поле filter
// Фільтр діапазону має поле filter і filterTo
// Фільтр пошуку за значеннями має поле values
// Кожен список містить стан його фільтрів, який може бути змінений тільки методом applySearchValue або applyFiltersValue (за наявності додаткових фільтрів)

// Вам необхідно подумати про поділ вашого коду на різні сутності, інтерфеси і типи, щоб зробити ваше рішення типобезпечним. Реалізація всіх методів не є необхідною - це за бажанням.

enum GridFilterTypeEnum {
   Match = 'MATCH',
   Range = 'RANGE',
   Set = 'SET',
}

type MappedFilter<T> = {
   [P in keyof T]?: T[P];
}

type GridFilterValue<T> = {
   type: GridFilterTypeEnum;
   filter: Extract<T, string | number>;
   filterTo?: Extract<T, string | number>;
 };
 
type GridFilterSetValues<T> = {
   values: T[];
};

interface Filter {
   nameFilter?: GridFilterValue<string>;
   yearFilter?: GridFilterValue<number>;
   ratingFilter?: GridFilterValue<number>;
   awardFilter?: GridFilterSetValues<string>;
}

interface IMovie {
   name: string;
   year: number;
   rating: number;
   award: string[];
};

interface ICategory{
   name: string;
   movies: IMovie[]; 
}

class MovieList {
   public movie: IMovie[];
   private filters: Filter;

   constructor(movie: IMovie[]) {
      this.movie =  movie,
      this.filters = {}
   }

   public applySearchValue(filtersType: keyof Filter, filter: any): void {
      this.filters[filtersType] = filter;
   } 


   public applyFiltersValue(filters: MappedFilter<Filter>): void {
      this.filters = { ...this.filters, ...filters };
   }

   getFilteredMovies(): IMovie[] {
      return this.movie.filter(movie => {
        const { nameFilter, yearFilter, ratingFilter, awardFilter } = this.filters;
    
        if (nameFilter) {
          if (nameFilter.type === GridFilterTypeEnum.Match && !movie.name.includes(nameFilter.filter)) {
            return false;
          }
        }
    
        if (yearFilter) {
          if (yearFilter.type === GridFilterTypeEnum.Range && (movie.year < yearFilter.filter || movie.year > yearFilter.filterTo!)) {
            return false;
          }
        }
    
        if (ratingFilter) {
          if (ratingFilter.type === GridFilterTypeEnum.Range && (movie.rating < ratingFilter.filter || movie.rating > ratingFilter.filterTo!)) {
            return false;
          }
        }
    
        if (awardFilter) {
          if (awardFilter.values.length > 0 && !awardFilter.values.every(value => movie.award.includes(value))) {
            return false;
          }
        }
    
        return true;
      });
    }
}

class CategoryOfMovies {
   public category: ICategory[];
   private filters: Filter;

   constructor(category: ICategory[]) {
      this.category = category
      this.filters = {}
   }

   public applySearchValue(filtersType: keyof Filter, filter: any): void {
      this.filters[filtersType] = filter;
   }

   getFilteredCategories(): ICategory[] {
      return this.category.filter(category => {
        const { nameFilter } = this.filters;
    
        if (nameFilter) {
          if (nameFilter.type === GridFilterTypeEnum.Match && !category.name.includes(nameFilter.filter)) {
            return false;
          }
        }
        return true;
      });
    }
}

const movies: IMovie[] = [
   { name: 'Inception', year: 2010, rating: 8.8, award: ['Oscar'] },
   { name: 'The Matrix', year: 1999, rating: 8.7, award: ['Oscar'] },
   { name: 'Interstellar', year: 2014, rating: 8.6, award: ['Oscar', 'BAFTA'] }
 ];
 
 const categories: ICategory[] = [
   { name: 'Sci-Fi', movies: movies },
   { name: 'Drama', movies: [] }
 ];
 
 const movieList = new MovieList(movies);
 const categoryList = new CategoryOfMovies(categories);
 
 movieList.applySearchValue('nameFilter', { type: GridFilterTypeEnum.Match, filter: 'The Matrix' });

 movieList.applyFiltersValue({
  ratingFilter: { type: GridFilterTypeEnum.Range, filter: 8.7, filterTo: 8.8 },
 });
 
 categoryList.applySearchValue('nameFilter', { type: GridFilterTypeEnum.Match, filter: 'Sci-Fi' });
 
 console.log(movieList.getFilteredMovies());
 console.log(categoryList.getFilteredCategories());

