import { siteConfig } from "@/config/site";
import { Icons } from "../icons";

export default function SiteFooter() {
  return (
    <section id="footer">
      <div className="container mx-auto px-5 py-24 flex flex-wrap flex-col">
        <div className="flex mx-auto text-center flex-wrap flex-col">
          <div className="p-2 w-full">
            <h1 className="font-heading text-2xl mb-3">
              {siteConfig.name}
            </h1>
            <p className="leading-relaxed text-center desc">{siteConfig.description}</p>
          </div>
        </div>
        <div className="flex mx-auto text-center flex-wrap flex-col">
          <div className="p-2 w-full">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.gitHub className="w-10 h-10" />
            </a>
          </div>
        </div>
        <div className="flex mx-auto text-center flex-wrap flex-col">
          <div className="p-2 w-full">
            <p className="text-sm text-gray-400 mb-2">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
