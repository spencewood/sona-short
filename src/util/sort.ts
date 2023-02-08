export enum SortDirection {
  Ascending,
  Descending,
}

export const sort = <T, U extends keyof T>(
  links: T[],
  sortBy: U,
  sortDirection: SortDirection
): T[] => {
  return links.sort((a, b) => {
    if (sortDirection === SortDirection.Ascending) {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
    return b[sortBy] < a[sortBy] ? 1 : -1;
  });
};

export const flipDirection = (sortDirection: SortDirection) => {
  return sortDirection === SortDirection.Ascending
    ? SortDirection.Descending
    : SortDirection.Ascending;
};
