import React from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__header">
                <div className="footer__project-name">
                    <span><span className="light-green">A</span>vocado</span>
                </div>
            </div>

            <div className="footer__contact">
                <div>
                    <i class="fa-solid fa-square-phone" />
                    <a target={"_blank"} className="contact--link" href="tel:+48730071565"> +48 730 071 565</a>
                    <br/>
                    <i class="fa-solid fa-envelope" />
                    <a target={"_blank"} className="contact--link" href="mailto:kuchhubert@gmail.com"> kuchhubert@gmail.com</a>
                </div>
                <div>
                    <i class="fa-solid fa-code-branch"></i>
                    <a target={"_blank"} className="contact--link" href="https://github.com/HubertKuch/Avocado"> Repository</a>
                </div>
                <div>
                    <i class="fa-solid fa-user-astronaut"></i>
                    <a target={"_blank"} className="contact--link" href="https://hubertkuch.pl"> My portfolio</a>
                    <br/>
                    <i class="fa-brands fa-github-alt"></i> 
                    <a target={"_blank"} className="contact--link" href="https:/github.com/HubertKuch/"> My GitHub</a>
                </div>
            </div>

            <div className="footer__copy">
                Hubert Kuch &copy; 2022
            </div>
        </footer>
    );
}
