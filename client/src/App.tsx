import "./App.css";
import Layout from "./layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { MantineProvider } from "@mantine/core";
import Employees from "./pages/employee/Employees";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Layout>
          <Routes>
            <Route path="/home" Component={Home} />
            <Route path="/employees" Component={Employees} />
          </Routes>
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
