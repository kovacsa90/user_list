import React, { createContext, useContext } from "react";
import { FilterType } from "./types";

interface Filter {
  filters: FilterType;
  setFilter: (label: ("firstName" | "lastName")[], value: string[]) => void;
}

type FilterProps = {
  context: Filter;
  children: React.ReactNode;
};

const FilterContext = createContext({} as Filter);

const FilterProvider: React.FC<FilterProps> = ({
  context,
  children,
}: FilterProps) => {
  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
};

const useFilters = (): Filter => {
  const { setFilter, filters } = useContext(FilterContext);
  if (setFilter === undefined || filters === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return { filters, setFilter };
};

export { FilterProvider, useFilters };
