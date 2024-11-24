import _ from "lodash";

export const sortByDate = <T extends Record<string, any>>(
  data: T[],
  dateKey: keyof T,
  ascending: boolean = true,
): T[] => {
  return _.chain(data)
    .filter((item: T) => {
      const value = _.get(item, dateKey);
      return !isNaN(new Date(value).getTime());
    })
    .orderBy(
      (item) => new Date(_.get(item, dateKey)),
      ascending ? "asc" : "desc",
    )
    .value();
};

export const detectType = (value: any): ColumnType["type"] => {
  if (value === null || value === undefined) return "unknown";
  if (!isNaN(Number(value)) && value !== "") return "number";
  if (typeof value === "boolean") return "boolean";
  if (!isNaN(Date.parse(value))) return "date";
  return "text";
};

export const toTitleCase = (word: string) =>
  `${word[0].toUpperCase()}${word.slice(1)}`;

export const parseSnakeCaseToLabel = (field: string | undefined) =>
  field
    ?.split("_")
    .map((word, idx) => (idx === 0 ? toTitleCase(word) : word))
    .join(" ");

export const sortData = (
  data: any[],
  columnKey: string | string[],
  asc: boolean = true,
) => (asc ? _.sortBy(data, columnKey) : _.sortBy(data, columnKey).reverse());
