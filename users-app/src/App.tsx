import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AddressBook from "./components/MainView/AddressBook";
import FilterSettings from "./components/SettingsView/FilterSettings";

function App(): React.ReactElement {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Route exact path="/" component={AddressBook} />
        <Route exact path="/settings" component={FilterSettings} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export default App;
