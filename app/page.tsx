import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <h2>Main page</h2>
      <a href="/login">login</a>
      <a href="/dashboard">dashboard</a>
    </div>
  );
}
