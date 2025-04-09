'use client'
import { FireBaseProvider } from "@/context/FireBase";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
  return (
    <FireBaseProvider>
      <div className="container">
        <Button variant="success">Click me</Button>
      </div>
    </FireBaseProvider>
  );
}
