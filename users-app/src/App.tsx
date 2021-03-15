import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AddressBook from "./components/MainView/AddressBook";
import FilterSettings from "./components/SettingsView/FilterSettings";
import { FilterProvider } from "./context/FilterContext";
import { FilterType } from "./context/types";

function App(): React.ReactElement {
  const [filters, setFilters] = useState<FilterType>({
    firstName: "",
    lastName: "",
  });
  const queryClient = new QueryClient();

  const setFilter = (
    filterName: ("firstName" | "lastName")[],
    value: string[],
  ): void => {
    const newFilter: FilterType = { firstName: "", lastName: "" };
    filterName.forEach((name, idx) => {
      newFilter[name] = value[idx];
    });
    setFilters({ ...filters, ...newFilter });
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FilterProvider context={{ filters, setFilter }}>
          <Route exact path="/" component={AddressBook} />
          <Route exact path="/settings" component={FilterSettings} />
        </FilterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export default App;
