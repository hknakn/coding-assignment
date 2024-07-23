export const fetchMovies = jest.fn(() =>
  Promise.resolve({
    results: [
      {
        id: 1,
        title: "Inception",
        overview: "A mind-bending thriller",
        release_date: "2010-07-16",
        poster_path: "/path/to/poster.jpg",
      },
    ],
  })
);