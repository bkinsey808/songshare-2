import { HammerLogo } from "@/icons/HammerLogo";

export default function Page() {
  return (
    <>
      <HammerLogo style={{ display: "block", margin: "0 auto 1rem", width: 96, height: 96 }} />
      <h1 className={"font-bold text-3xl pb-4"}>My NEW Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>Interactive.</li>
      </ul>
    </>
  );
}
