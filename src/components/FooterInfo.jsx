import gitHubIcon from "../assets/github-original.svg";

function FooterInfo() {
  return (
    <footer className="links">
      <a href="https://github.com/JLouisa" target="__blank">
        <img src={gitHubIcon} alt="gitHubIcon" />
      </a>
      <span className="copyright">©2023 | Jonathan Louisa</span>
    </footer>
  );
}

export default FooterInfo;
