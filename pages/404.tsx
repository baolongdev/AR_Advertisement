import React from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <section>
      <div className="content min-h-screen min-w-full">
        <div className="code-area text-4xl w-fit">
          <span style={{ color: "#777", fontStyle: "italic" }}>
            // 404 page not found.
          </span>
          <span>
            <span style={{ color: "#d65562" }}>if</span>(
            <span style={{ color: "#4ca8ef" }}>!found</span>){" {"}
          </span>
          <span>
            <span style={{ paddingLeft: "15px", color: "#2796ec" }}>
              <i style={{ width: "10px", display: "inline-block" }}></i>throw
            </span>
            <span>({`"╯°□°）╯︵ ┻━┻"`});</span>
          </span>
          <span style={{ display: "block" }}>{"}"}</span>
          <button className="btn btn--hero italic pt-1" onClick={goBack}>
            // Go home!
          </button>
          {/* <a href="/">Go home!</a> */}
        </div>
      </div>
    </section>
  );
}
