import Form from "./Form";
import Header from "./Header";
import {MoviesProvider} from "../MoviesContext";

export default function App() {
  return (
    <div className="bg-light text-primary min-h-screen py-12">
      <Header />
      <MoviesProvider>
        <Form />
      </MoviesProvider>
    </div>
  );
}
