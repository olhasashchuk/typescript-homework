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

   constructor(movie: IMovie[]) {
      this.movie =  movie
   }
}

class CategoryOfMovies {
   public category: ICategory[];

   constructor(category: ICategory[]) {
      this.category = category
   }
}