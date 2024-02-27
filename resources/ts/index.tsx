import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("app") as HTMLElement);

root.render(
    <React.StrictMode>
        <h1>Laravel SPA</h1>
    </React.StrictMode>
);
