import { createRoot } from "react-dom/client";
import BiodataDiri from "./BiodataDiri";
import Container from "./Container2";
import './custom2.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
                <BiodataDiri/>
            </Container>
        </div>
    )
    